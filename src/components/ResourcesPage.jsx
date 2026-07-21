import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Search, Upload, FileText, Download, Eye, Trash2, X, Lock, LogOut,
  Calendar, HardDrive, ChevronRight, Sprout, Leaf, Droplet, FolderOpen,
  FileSpreadsheet, FileImage, File
} from 'lucide-react';
import { supabase } from '../supabase';
import './ResourcesPage.css';
import '../App.css';
import logoImg from '../assets/logo.png';

const MAX_FILE_SIZE_MB = 10;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

/* ── Helper: pretty file-size ── */
function formatSize(bytes) {
  if (!bytes) return '';
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
}

/* ── Helper: file extension → type label ── */
function getFileType(name) {
  return name.split('.').pop().toLowerCase();
}

/* ── Helper: icon for file type ── */
function FileTypeIcon({ type, size = 18 }) {
  switch (type) {
    case 'pdf': return <FileText size={size} />;
    case 'doc':
    case 'docx': return <File size={size} />;
    case 'ppt':
    case 'pptx': return <FileImage size={size} />;
    case 'xls':
    case 'xlsx': return <FileSpreadsheet size={size} />;
    default: return <FileText size={size} />;
  }
}

/* ── Helper: format date ── */
function formatDate(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}

/* ================================================================
   Document Viewer Modal
   ================================================================ */
function DocViewer({ doc: docData, onClose }) {
  if (!docData) return null;
  const isPdf = docData.file_type === 'pdf';

  return (
    <div className="pdf-viewer-overlay" onClick={onClose}>
      <div className="pdf-viewer-modal" onClick={(e) => e.stopPropagation()}>
        <div className="pdf-viewer-header">
          <h4>{docData.title}</h4>
          <div className="pdf-viewer-header-actions">
            <a href={docData.file_url} target="_blank" rel="noopener noreferrer"
              className="btn btn-download" download>
              <Download size={14} /> Download
            </a>
            <button className="btn-close-viewer" onClick={onClose}>
              <X size={18} />
            </button>
          </div>
        </div>

        {isPdf ? (
          <div className="pdf-viewer-body">
            <iframe src={docData.file_url} title={docData.title} />
          </div>
        ) : (
          <div className="non-pdf-preview">
            <FileTypeIcon type={docData.file_type} size={72} />
            <h3>{docData.file_name}</h3>
            <p>
              In-browser preview is not available for .{docData.file_type} files.
              Please download the file to view it.
            </p>
            <a href={docData.file_url} target="_blank" rel="noopener noreferrer"
              className="btn btn-primary" download>
              <Download size={16} /> Download File
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

/* ================================================================
   MAIN PAGE COMPONENT
   ================================================================ */
export default function ResourcesPage() {
  const [user, setUser] = useState(null);
  const [resources, setResources] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewingDoc, setViewingDoc] = useState(null);

  // Admin login modal
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Upload state
  const [uploadTitle, setUploadTitle] = useState('');
  const [uploadDesc, setUploadDesc] = useState('');
  const [uploadFile, setUploadFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  /* ── Auth: check session on mount ── */
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);

  /* ── Fetch resources ── */
  async function fetchResources() {
    const { data, error } = await supabase
      .from('resources')
      .select('*')
      .order('created_at', { ascending: false });
    if (!error) setResources(data || []);
  }

  useEffect(() => { fetchResources(); }, []);

  /* ── Realtime subscription ── */
  useEffect(() => {
    const channel = supabase
      .channel('resources-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'resources' }, () => {
        fetchResources();
      })
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, []);

  /* ── Login ── */
  async function handleLogin(e) {
    e.preventDefault();
    setLoginError('');
    const { error } = await supabase.auth.signInWithPassword({
      email: loginEmail,
      password: loginPassword,
    });
    if (error) {
      setLoginError('Invalid email or password.');
    } else {
      setShowLoginModal(false);
      setLoginEmail('');
      setLoginPassword('');
    }
  }

  /* ── Logout ── */
  async function handleLogout() {
    await supabase.auth.signOut();
  }

  /* ── Upload ── */
  async function handleUpload(e) {
    e.preventDefault();
    if (!uploadFile || !uploadTitle) return;

    if (uploadFile.size > MAX_FILE_SIZE_BYTES) {
      alert(`File size exceeds ${MAX_FILE_SIZE_MB} MB limit.`);
      return;
    }

    setUploading(true);

    try {
      const fileType = getFileType(uploadFile.name);
      const storagePath = `${Date.now()}_${uploadFile.name}`;

      // 1. Upload file to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('resources')
        .upload(storagePath, uploadFile);

      if (uploadError) throw uploadError;

      // 2. Get public URL
      const { data: urlData } = supabase.storage
        .from('resources')
        .getPublicUrl(storagePath);

      // 3. Insert metadata into the database
      const { error: dbError } = await supabase
        .from('resources')
        .insert({
          title: uploadTitle,
          description: uploadDesc,
          file_type: fileType,
          file_size: uploadFile.size,
          file_url: urlData.publicUrl,
          file_name: uploadFile.name,
          storage_path: storagePath,
        });

      if (dbError) throw dbError;

      // Reset form
      setUploadTitle('');
      setUploadDesc('');
      setUploadFile(null);
      fetchResources();
    } catch (err) {
      console.error(err);
      alert('Upload failed: ' + err.message);
    } finally {
      setUploading(false);
    }
  }

  /* ── Delete ── */
  async function handleDelete(resource) {
    if (!window.confirm(`Delete "${resource.title}"?`)) return;
    try {
      // Delete from storage
      await supabase.storage.from('resources').remove([resource.storage_path]);
      // Delete from database
      await supabase.from('resources').delete().eq('id', resource.id);
      fetchResources();
    } catch (err) {
      console.error(err);
      alert('Delete failed: ' + err.message);
    }
  }

  /* ── Filtered list ── */
  const filtered = resources.filter((r) => {
    const q = searchQuery.toLowerCase();
    return (
      r.title?.toLowerCase().includes(q) ||
      r.description?.toLowerCase().includes(q) ||
      r.file_name?.toLowerCase().includes(q)
    );
  });

  /* ── Scroll to top on mount ── */
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }); }, []);

  return (
    <div className="app">

      {/* ── SHARED HEADER ── */}
      <header className="header glass">
        <div className="container header-inner">
          <Link to="/" className="logo">
            <div className="animated-logo-wrap">
              <div className="anim-hand-seed">
                <span style={{ fontSize: '18px', lineHeight: 1 }}>🤏🏽</span>
              </div>
              <div className="anim-seed"></div>
              <div className="anim-hand-water">
                <span style={{ fontSize: '18px', lineHeight: 1 }}>🖐🏽</span>
              </div>
              <div className="anim-water"><Droplet size={18} fill="currentColor" strokeWidth={0} /></div>
              <div className="anim-sprout"><Sprout size={32} /></div>
              <div className="anim-leaf"><Leaf size={32} /></div>
            </div>
            <div className="logo-text">
              <span className="logo-title">AgroStart</span>
              <span className="logo-subtitle">Digital Agriculture Academy</span>
            </div>
          </Link>

          <nav className="nav">
            <Link to="/#platform">Platform</Link>
            <Link to="/#why">Why AgroStart</Link>
            <Link to="/services">Services</Link>
            <Link to="/#impact">Impact</Link>
            <Link to="/resources" className="highlight-green">Resources <ChevronRight size={14} className="nav-icon" /></Link>
          </nav>

          <div className="header-actions">
            <Link to="/#contact" className="btn btn-outline">Free Consultation</Link>
            <a href="https://calendly.com/skilldeskdemo/skilldesk-demo?month=2026-07" target="_blank" rel="noopener noreferrer" className="btn btn-primary">Book Demo</a>
          </div>
        </div>
      </header>

      {/* ── HERO ── */}
      <section className="resources-hero">
        <div className="container">
          <div className="tag">KNOWLEDGE LIBRARY</div>
          <h1>Resources &amp; <span className="highlight-green">Research</span></h1>
          <p>
            Access reports, guides, and training materials curated for agricultural
            professionals. Download, read, and share.
          </p>

          <div className="resources-search-wrap">
            <img src={logoImg} alt="AgroStart" className="search-logo-icon" />
            <input
              type="text"
              className="resources-search"
              placeholder="Search by title, description, or filename…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </section>

      {/* ── GRID SECTION ── */}
      <section className="resources-grid-section">
        <div className="container">

          {/* Admin panel (only for authenticated user) */}
          {user && (
            <div className="admin-panel glass">
              <div className="admin-panel-header">
                <h3>
                  <Upload size={20} /> Upload Resource
                  <span className="admin-badge"><Lock size={12} /> Admin</span>
                </h3>
                <button className="btn btn-outline" onClick={handleLogout} style={{ fontSize: '0.82rem', padding: '0.4rem 1rem' }}>
                  <LogOut size={14} /> Sign Out
                </button>
              </div>

              <form className="upload-form" onSubmit={handleUpload}>
                <div className="form-group">
                  <label>Title *</label>
                  <input
                    type="text"
                    placeholder="e.g., Integrated Pest Management Guide"
                    value={uploadTitle}
                    onChange={(e) => setUploadTitle(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Description</label>
                  <input
                    type="text"
                    placeholder="Short description of the document"
                    value={uploadDesc}
                    onChange={(e) => setUploadDesc(e.target.value)}
                  />
                </div>

                <div
                  className="file-dropzone"
                  onClick={() => document.getElementById('file-input').click()}
                >
                  <input
                    id="file-input"
                    type="file"
                    accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx"
                    style={{ display: 'none' }}
                    onChange={(e) => setUploadFile(e.target.files[0] || null)}
                  />
                  <Upload size={24} style={{ color: 'var(--color-primary)', marginBottom: '0.5rem' }} />
                  <p>Click to select a file (PDF, DOCX, PPT, XLS) — max {MAX_FILE_SIZE_MB} MB</p>
                  {uploadFile && (
                    <p className="selected-file">{uploadFile.name} ({formatSize(uploadFile.size)})</p>
                  )}
                </div>

                <div className="upload-actions">
                  <button type="submit" className="btn btn-primary" disabled={uploading || !uploadFile || !uploadTitle}>
                    {uploading ? 'Uploading…' : 'Publish Resource'}
                  </button>
                </div>
              </form>

              {/* Existing docs list with delete */}
              {resources.length > 0 && (
                <div className="admin-doc-list">
                  <h4>Manage Published ({resources.length})</h4>
                  {resources.map((r) => (
                    <div className="admin-doc-row" key={r.id}>
                      <div className="admin-doc-info">
                        <span className={`file-badge ${r.file_type}`}>
                          <FileTypeIcon type={r.file_type} size={12} /> {r.file_type}
                        </span>
                        <span>{r.title}</span>
                      </div>
                      <button className="btn-delete" onClick={() => handleDelete(r)}>
                        <Trash2 size={13} /> Delete
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Header row */}
          <div className="resources-grid-header">
            <span className="resources-count">
              {filtered.length} resource{filtered.length !== 1 ? 's' : ''} available
            </span>
            {!user && (
              <button className="admin-login-trigger" onClick={() => setShowLoginModal(true)}>
                <Lock size={12} /> Admin
              </button>
            )}
          </div>

          {/* Cards grid */}
          <div className="resources-grid">
            {filtered.length === 0 ? (
              <div className="resources-empty">
                <FolderOpen size={56} className="empty-icon" />
                <h3>No resources found</h3>
                <p>
                  {searchQuery
                    ? 'Try adjusting your search query.'
                    : 'Resources will appear here once published.'}
                </p>
              </div>
            ) : (
              filtered.map((r) => (
                <div className="resource-card" key={r.id}>
                  <span className={`file-badge ${r.file_type}`}>
                    <FileTypeIcon type={r.file_type} size={13} /> {r.file_type}
                  </span>
                  <h4>{r.title}</h4>
                  {r.description && <p className="resource-desc">{r.description}</p>}
                  <div className="resource-meta">
                    <span><Calendar size={13} /> {formatDate(r.created_at)}</span>
                    <span><HardDrive size={13} /> {formatSize(r.file_size)}</span>
                  </div>
                  <div className="resource-actions">
                    <button className="btn btn-view" onClick={() => setViewingDoc(r)}>
                      <Eye size={14} /> View
                    </button>
                    <a href={r.file_url} target="_blank" rel="noopener noreferrer"
                      className="btn btn-download" download>
                      <Download size={14} /> Download
                    </a>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* ── Login Modal ── */}
      {showLoginModal && (
        <div className="admin-login-overlay" onClick={() => setShowLoginModal(false)}>
          <div className="admin-login-modal" onClick={(e) => e.stopPropagation()}>
            <h3><Lock size={18} /> Admin Login</h3>
            <form onSubmit={handleLogin}>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  required
                  autoFocus
                />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  required
                />
              </div>
              {loginError && <p className="login-error">{loginError}</p>}
              <div className="login-actions">
                <button type="button" className="btn btn-outline" onClick={() => setShowLoginModal(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Sign In</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── Document Viewer ── */}
      {viewingDoc && <DocViewer doc={viewingDoc} onClose={() => setViewingDoc(null)} />}
    </div>
  );
}
