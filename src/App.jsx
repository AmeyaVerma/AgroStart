import React, { useState } from 'react';
import './App.css';
import { Routes, Route, Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, ChevronRight, Zap, TrendingUp, Users, Target, GraduationCap, Database, Leaf, Sprout, Droplet, Menu, X } from 'lucide-react';
import TheChallenge from './components/TheChallenge';
import OurSolution from './components/OurSolution';
import Contact from './components/Contact';
import ServicesPage from './components/ServicesPage';
import ResourcesPage from './components/ResourcesPage';

import performanceImg from './assets/performance_impact_illustration.png';
import microLearningImg from './assets/micro_learning_illustration.png';
import learningPathsImg from './assets/master_trainer_illustration.png';
import fieldForceImg from './assets/service_fieldforce.png';

function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const closeMobile = () => setMobileMenuOpen(false);
  return (
    <div className="app">
      {/* HEADER */}
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
            <a href="#platform" onClick={closeMobile}>Platform</a>
            <a href="#why" onClick={closeMobile}>Why AgroStart</a>
            <Link to="/services" onClick={closeMobile}>Services</Link>
            <a href="#impact" onClick={closeMobile}>Impact</a>
            <Link to="/resources" onClick={closeMobile}>Resources <ChevronRight size={14} className="nav-icon" /></Link>
          </nav>
          <div className="header-actions">
            <a href="#contact" className="btn btn-outline">Free Consultation</a>
            <a href="https://calendly.com/skilldeskdemo/skilldesk-demo?month=2026-07" target="_blank" rel="noopener noreferrer" className="btn btn-primary">Book Demo</a>
          </div>
          {/* Mobile hamburger */}
          <button
            className="hamburger-btn"
            onClick={() => setMobileMenuOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        {/* Mobile nav drawer */}
        {mobileMenuOpen && (
          <div className="mobile-nav-drawer">
            <a href="#platform" onClick={closeMobile}>Platform</a>
            <a href="#why" onClick={closeMobile}>Why AgroStart</a>
            <Link to="/services" onClick={closeMobile}>Services</Link>
            <a href="#impact" onClick={closeMobile}>Impact</a>
            <Link to="/resources" onClick={closeMobile}>Resources</Link>
            <div className="mobile-nav-actions">
              <a href="#contact" className="btn btn-outline" onClick={closeMobile}>Free Consultation</a>
              <a href="https://calendly.com/skilldeskdemo/skilldesk-demo?month=2026-07" target="_blank" rel="noopener noreferrer" className="btn btn-primary" onClick={closeMobile}>Book Demo</a>
            </div>
          </div>
        )}
      </header>

      {/* HERO SECTION */}
      <section className="hero" id="hero">
        <div className="hero-background"></div>
        <div className="container hero-inner">
          <div className="hero-content animate-fade-in-up">
            <div className="tag">AI-ENABLED AGRICULTURE LEARNING PLATFORM</div>
            <h1>Turn agricultural learning into <span className="highlight-green">measurable</span> field performance.</h1>
            <p>AI-powered, mobile-first training and performance enablement platform for agribusinesses, field teams, dealers, and farmers.</p>
            <div className="hero-actions">
              <a href="https://calendly.com/skilldeskdemo/skilldesk-demo?month=2026-07" target="_blank" rel="noopener noreferrer" className="btn btn-primary">Book Demo <ArrowRight size={16} /></a>
              <a href="#contact" className="btn btn-outline">Request a Diagnostic</a>
            </div>
            
            <div className="hero-metrics">
              <div className="metric">
                <TrendingUp size={20} className="metric-icon" />
                <div>
                  <strong>15-25%</strong>
                  <span>Productivity Uplift</span>
                </div>
              </div>
              <div className="metric">
                <Database size={20} className="metric-icon" />
                <div>
                  <strong>80%</strong>
                  <span>Knowledge Retention</span>
                </div>
              </div>
              <div className="metric">
                <Users size={20} className="metric-icon" />
                <div>
                  <strong>500K+</strong>
                  <span>Users Trained</span>
                </div>
              </div>
              <div className="metric">
                <Target size={20} className="metric-icon" />
                <div>
                  <strong>50+</strong>
                  <span>Enterprises</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="hero-visual animate-fade-in-up delay-200">
             {/* Abstract Dashboard/App visualization */}
             <div className="flower-mockup-container">
                {/* Left - Odia */}
                <div className="mockup-phone glass shadow-lg side-phone left-phone">
                  <div className="phone-header">
                    <span>ଶୁଭ ସକାଳ,<br/><strong>ରବି କୁମାର</strong></span>
                    <div className="avatar">RK</div>
                  </div>
                  <div className="phone-card">
                    <div className="card-title">ଆପଣଙ୍କର ପ୍ରଗତି</div>
                    <div className="progress-bar"><div className="progress-fill" style={{width: '76%'}}></div></div>
                  </div>
                  <div className="phone-card dark">
                    <div className="card-title text-white">ସମନ୍ୱିତ କୀଟ ପରିଚାଳନା</div>
                    <button className="btn btn-primary btn-small">ପୁନରାରମ୍ଭ କରନ୍ତୁ</button>
                  </div>
                  
                  <div className="phone-card shadow-sm" style={{background: 'white'}}>
                     <div className="card-title">ଅନୁପାଳନ ସ୍କୋର</div>
                     <div className="score-val">92%</div>
                     <span className="badge-green">ଉତ୍କୃଷ୍ଟ</span>
                  </div>
                  
                  <div className="phone-card shadow-sm" style={{background: 'white'}}>
                     <div className="card-title">ସକ୍ରିୟ ଉପଭୋକ୍ତା</div>
                     <div className="score-val" style={{fontSize: '1.5rem'}}>12,846</div>
                     <span className="trend-up">+18% ଏହି ମାସରେ</span>
                  </div>
                </div>

                {/* Center - English */}
                <div className="mockup-phone glass shadow-lg center-phone">
                  <div className="phone-header">
                    <span>Good morning,<br/><strong>Ravi Kumar</strong></span>
                    <div className="avatar">RK</div>
                  </div>
                  <div className="phone-card">
                    <div className="card-title">Your Progress</div>
                    <div className="progress-bar"><div className="progress-fill" style={{width: '76%'}}></div></div>
                  </div>
                  <div className="phone-card dark">
                    <div className="card-title text-white">Integrated Pest Management</div>
                    <button className="btn btn-primary btn-small">Resume</button>
                  </div>
                  
                  {/* Now placed inside the center phone instead of floating */}
                  <div className="phone-card shadow-sm" style={{background: 'white'}}>
                     <div className="card-title">Compliance Score</div>
                     <div className="score-val">92%</div>
                     <span className="badge-green">Excellent</span>
                  </div>
                  
                  <div className="phone-card shadow-sm" style={{background: 'white'}}>
                     <div className="card-title">Active Users</div>
                     <div className="score-val" style={{fontSize: '1.5rem'}}>12,846</div>
                     <span className="trend-up">+18% this month</span>
                  </div>
                </div>

                {/* Right - Hindi */}
                <div className="mockup-phone glass shadow-lg side-phone right-phone">
                  <div className="phone-header">
                    <span>सुप्रभात,<br/><strong>रवि कुमार</strong></span>
                    <div className="avatar">RK</div>
                  </div>
                  <div className="phone-card">
                    <div className="card-title">आपकी प्रगति</div>
                    <div className="progress-bar"><div className="progress-fill" style={{width: '76%'}}></div></div>
                  </div>
                  <div className="phone-card dark">
                    <div className="card-title text-white">एकीकृत कीट प्रबंधन</div>
                    <button className="btn btn-primary btn-small">फिर से शुरू करें</button>
                  </div>

                  <div className="phone-card shadow-sm" style={{background: 'white'}}>
                     <div className="card-title">अनुपालन स्कोर</div>
                     <div className="score-val">92%</div>
                     <span className="badge-green">उत्कृष्ट</span>
                  </div>
                  
                  <div className="phone-card shadow-sm" style={{background: 'white'}}>
                     <div className="card-title">सक्रिय उपयोगकर्ता</div>
                     <div className="score-val" style={{fontSize: '1.5rem'}}>12,846</div>
                     <span className="trend-up">+18% इस महीने</span>
                  </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* THE CHALLENGE — Phase 2 */}
      <TheChallenge />

      {/* OUR SOLUTION — Phase 2 */}
      <OurSolution />

      {/* PLATFORM EXPERIENCE */}
      <section className="platform bg-section-alt" id="platform">
        <div className="container">
          <div className="section-header center">
             <div className="tag">PLATFORM EXPERIENCE</div>
             <h2>Everything you need. All in one place.</h2>
          </div>
          <div className="platform-grid">
             <div className="platform-features">
               <div className="plat-feat-item">
                 <img src={performanceImg} alt="Smart Dashboards" className="plat-feat-img" />
                 <div>
                   <h4>Smart Dashboards</h4>
                   <p>Track progress, performance and impact in real-time.</p>
                 </div>
               </div>
               <div className="plat-feat-item">
                 <img src={microLearningImg} alt="Localized Content" className="plat-feat-img" />
                 <div>
                   <h4>Localized Content</h4>
                   <p>Deliver training in regional languages.</p>
                 </div>
               </div>
               <div className="plat-feat-item">
                 <img src={fieldForceImg} alt="Mobile First" className="plat-feat-img" />
                 <div>
                   <h4>Mobile First</h4>
                   <p>Built for the field. Works offline too.</p>
                 </div>
               </div>
               <div className="plat-feat-item">
                 <img src={learningPathsImg} alt="AI Recommendations" className="plat-feat-img" />
                 <div>
                   <h4>AI Recommendations</h4>
                   <p>Personalized learning paths for every user.</p>
                 </div>
               </div>
             </div>
          </div>
        </div>
      </section>

      {/* SOLUTIONS GRID */}
      <section className="solutions-section" id="services">
        <div className="container">
          <div className="section-header">
             <div className="tag">OUR SOLUTIONS</div>
             <h2>Solutions for every role in the agri value chain.</h2>
          </div>
          
          <div className="solutions-grid">
            <Link to="/services#field-force" className="solution-card-link">
              <div className="solution-card">
                <div className="icon-wrapper"><Users size={24}/></div>
                <h3>Frontline Field-Force Enablement</h3>
                <p>Continuous capability and performance support for agribusiness field teams, tied to real job tasks and KPIs.</p>
                <ArrowRight className="card-arrow" size={20}/>
              </div>
            </Link>

            <Link to="/services#product-launch" className="solution-card-link">
              <div className="solution-card">
                <div className="icon-wrapper"><Zap size={24}/></div>
                <h3>Product &amp; New-Launch Enablement</h3>
                <p>Rapid, role-specific onboarding of new product knowledge for field teams, dealers, and distributors.</p>
                <ArrowRight className="card-arrow" size={20}/>
              </div>
            </Link>

            <Link to="/services#compliance" className="solution-card-link">
              <div className="solution-card">
                <div className="icon-wrapper"><CheckCircle2 size={24}/></div>
                <h3>Role-Based &amp; Compliance Training</h3>
                <p>Technical accuracy, compliance, and process adherence for agri-input and frontline roles.</p>
                <ArrowRight className="card-arrow" size={20}/>
              </div>
            </Link>

            <Link to="/services#farmer-capability" className="solution-card-link">
              <div className="solution-card">
                <div className="icon-wrapper"><Leaf size={24}/></div>
                <h3>Farmer Capability Programmes</h3>
                <p>Package-of-practice, pest and disease, and crop-cycle training for farmers.</p>
                <ArrowRight className="card-arrow" size={20}/>
              </div>
            </Link>

            <Link to="/services#fpo" className="solution-card-link">
              <div className="solution-card">
                <div className="icon-wrapper"><Users size={24}/></div>
                <h3>FPO Leadership &amp; Business Training</h3>
                <p>Governance, leadership, and business-planning capability for producer organisations.</p>
                <ArrowRight className="card-arrow" size={20}/>
              </div>
            </Link>

            <Link to="/services#agripreneurship" className="solution-card-link">
              <div className="solution-card">
                <div className="icon-wrapper"><GraduationCap size={24}/></div>
                <h3>Agripreneurship &amp; Youth Skilling</h3>
                <p>Employability, digital literacy, and enterprise-development pathways for rural youth.</p>
                <ArrowRight className="card-arrow" size={20}/>
              </div>
            </Link>
          </div>
        </div>
      </section>
      
      {/* IMPACT SECTION */}
      <section className="impact bg-section-alt" id="impact">
        <div className="container">
           <div className="section-header center">
             <div className="tag">IMPACT THAT MATTERS</div>
             <h2>Real impact. Measurable results.</h2>
           </div>
           
           <div className="impact-grid">
              <div className="impact-stat-box shadow-sm glass">
                 <span className="stat-label">Skills Upliftment</span>
                 <div className="stat-value highlight-green">+25.4%</div>
                 <span className="stat-desc">vs last quarter</span>
              </div>
              <div className="impact-stat-box shadow-sm glass">
                 <span className="stat-label">Knowledge Retention</span>
                 <div className="stat-value">80%</div>
                 <span className="stat-desc">improvement</span>
              </div>
              <div className="impact-stat-box shadow-sm glass">
                 <span className="stat-label">Compliance Errors</span>
                 <div className="stat-value">-32%</div>
                 <span className="stat-desc">Reduction</span>
              </div>
              <div className="impact-stat-box shadow-sm glass">
                 <span className="stat-label">Training Completion</span>
                 <div className="stat-value highlight-green">+60%</div>
                 <span className="stat-desc">from last quarter</span>
              </div>
           </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <Contact />
      
    </div>
  );
}

function NotFoundPage() {
  return (
    <div className="app">
      <div className="not-found-page">
        <div className="not-found-inner">
          <div className="not-found-emoji">🌾</div>
          <h1>404 — Page Not Found</h1>
          <p>Looks like this field hasn't been planted yet.</p>
          <Link to="/" className="btn btn-primary">Back to Home <ArrowRight size={16} /></Link>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/services" element={<ServicesPage />} />
      <Route path="/resources" element={<ResourcesPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
