import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowRight, Users, Zap, CheckCircle2, Leaf, GraduationCap, TrendingUp, BookOpen, ChevronRight, Sprout, Droplet } from 'lucide-react';
import './ServicesPage.css';
import '../App.css';
import Contact from './Contact';

// Images
import imgFieldForce from '../assets/service_fieldforce.png';
import imgProductLaunch from '../assets/service_product_launch.png';
import imgCompliance from '../assets/service_compliance.png';
import imgFarmer from '../assets/service_farmer_capability.png';
import imgFpo from '../assets/service_fpo.png';
import imgAgri from '../assets/service_agripreneurship.png';

const services = [
  {
    id: 'field-force',
    number: '01',
    icon: <Users size={20} />,
    title: 'Frontline Field-Force Enablement',
    badgeLabel: 'Field Teams',
    lead: 'Continuous capability and performance support for agribusiness field teams, tied to real job tasks and KPIs. We bridge the gap between classroom training and on-ground execution.',
    image: imgFieldForce,
    steps: [
      {
        title: 'Role-Mapped Learning Journeys',
        desc: 'Each field officer gets a personalised training path aligned to their territory, crop, and sales targets.',
      },
      {
        title: 'Real-Time Performance Nudges',
        desc: 'AI sends contextual micro-learning nudges before key farmer meetings and after field visits to reinforce skills.',
      },
      {
        title: 'Manager Dashboards & Coaching',
        desc: 'Area managers track individual readiness scores and trigger targeted coaching with one click.',
      },
    ],
  },
  {
    id: 'product-launch',
    number: '02',
    icon: <Zap size={20} />,
    title: 'Product & New-Launch Enablement',
    badgeLabel: 'New Launches',
    lead: 'Rapid, role-specific onboarding of new product knowledge for field teams, dealers, and distributors. Launch faster and with confidence across every channel.',
    image: imgProductLaunch,
    steps: [
      {
        title: 'Pre-Launch Knowledge Sprints',
        desc: 'Structured 3–5 day digital sprints covering product benefits, positioning, and objection handling for every channel.',
      },
      {
        title: 'Channel Partner Certification',
        desc: 'Dealers and distributors complete digital assessments and earn certificates, driving accountability and pride.',
      },
      {
        title: 'Launch Readiness Analytics',
        desc: 'Track readiness scores by territory and by role before the launch date to avoid any coverage gaps.',
      },
    ],
  },
  {
    id: 'compliance',
    number: '03',
    icon: <CheckCircle2 size={20} />,
    title: 'Role-Based & Compliance Training',
    badgeLabel: 'Compliance',
    lead: 'Technical accuracy, compliance, and process adherence for agri-input and frontline roles. Reduce errors, pass audits, and protect your brand in the field.',
    image: imgCompliance,
    steps: [
      {
        title: 'Regulatory & Safety Modules',
        desc: 'Pre-built content libraries covering pesticide safety, handling protocols, and regulatory requirements — updated every season.',
      },
      {
        title: 'Mandatory Assessment Gates',
        desc: 'Role-specific quizzes and scenario tests that must be passed before field deployment, reducing liability exposure.',
      },
      {
        title: 'Audit-Ready Reports',
        desc: 'Downloadable compliance completion records and certificates ready for internal audits and regulatory inspections.',
      },
    ],
  },
  {
    id: 'farmer-capability',
    number: '04',
    icon: <Leaf size={20} />,
    title: 'Farmer Capability Programmes',
    badgeLabel: 'Farmers',
    lead: 'Package-of-practice, pest and disease, and crop-cycle training for farmers in their local language. Practical knowledge that translates directly to better yields.',
    image: imgFarmer,
    steps: [
      {
        title: 'Vernacular Micro-Content',
        desc: 'Short video-based learning in 10+ regional languages, designed for low-literacy users with voice-over and visual cues.',
      },
      {
        title: 'Crop-Calendar Notifications',
        desc: 'Farmers receive timely push alerts and training modules aligned to their crop stage and local weather events.',
      },
      {
        title: 'Peer Learning Circles',
        desc: 'Gamified group challenges and leaderboards build community knowledge sharing among farmer clusters.',
      },
    ],
  },
  {
    id: 'fpo',
    number: '05',
    icon: <Users size={20} />,
    title: 'FPO Leadership & Business Training',
    badgeLabel: 'Producer Orgs',
    lead: 'Governance, leadership, and business-planning capability for Farmer Producer Organisations. Equip FPO leaders to run sustainable, profitable agri-enterprises.',
    image: imgFpo,
    steps: [
      {
        title: 'Board Governance Modules',
        desc: 'Structured curriculum covering FPO governance, financial management, and legal compliance for elected leaders.',
      },
      {
        title: 'Business Planning Workshops',
        desc: 'Interactive digital workshops that guide FPOs through market linkage, value addition, and procurement planning.',
      },
      {
        title: 'Leadership Cohorts',
        desc: 'Peer cohorts of FPO CEOs and chairpersons share experiences and co-create solutions with mentor support.',
      },
    ],
  },
  {
    id: 'agripreneurship',
    number: '06',
    icon: <GraduationCap size={20} />,
    title: 'Agripreneurship & Youth Skilling',
    badgeLabel: 'Rural Youth',
    lead: 'Employability, digital literacy, and enterprise-development pathways for rural youth. Turn aspiring agripreneurs into job-ready professionals and rural business owners.',
    image: imgAgri,
    steps: [
      {
        title: 'Digital & Financial Literacy',
        desc: 'Foundational modules on smartphone usage, UPI, digital banking, and agri-fintech tools for first-time users.',
      },
      {
        title: 'Agri-Enterprise Development',
        desc: 'Step-by-step courses on setting up agri-input shops, drone services, soil testing labs, and custom hiring centres.',
      },
      {
        title: 'Job-Readiness & Placement',
        desc: 'Sector-skill aligned certifications recognised by NSDC and agribusiness partners with active placement support.',
      },
    ],
  },
];

export default function ServicesPage() {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      // Small timeout so the DOM renders before scrolling
      const id = hash.replace('#', '');
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [hash]);

  return (
    <div className="app">

      {/* ── SHARED HEADER (identical to main page) ── */}
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
            <Link to="/services" className="highlight-green">Services</Link>
            <Link to="/#impact">Impact</Link>
            <Link to="/#resources">Resources <ChevronRight size={14} className="nav-icon" /></Link>
          </nav>

          <div className="header-actions">
            <Link to="/#contact" className="btn btn-outline">Free Consultation</Link>
            <Link to="/#services" className="btn btn-primary">Book Demo</Link>
          </div>
        </div>
      </header>

      {/* ── PAGE HERO ── */}
      <section className="services-hero">
        <div className="container">
          <div className="tag">OUR SERVICES</div>
          <h1>
            Solutions for every role in the{' '}
            <span className="highlight-green">agri value chain.</span>
          </h1>
          <p>
            From frontline field teams to rural youth, AgroStart delivers targeted,
            measurable capability programmes that drive real agricultural outcomes.
          </p>
          <div className="services-hero-actions">
            <a href="#field-force" className="btn btn-primary">Explore Services <ArrowRight size={16} /></a>
            <Link to="/#contact" className="btn btn-outline">Free Consultation</Link>
          </div>
        </div>
      </section>

      {/* ── SERVICES LIST ── */}
      <section className="services-list-section">
        <div className="container">
          {services.map((svc, i) => (
            <div
              key={svc.id}
              id={svc.id}
              className={`service-block${i % 2 !== 0 ? ' reverse' : ''}`}
            >
              {/* Image */}
              <div className="service-block-image">
                <img src={svc.image} alt={svc.title} />
                <div className="service-img-badge">
                  <div className="badge-icon">{svc.icon}</div>
                  {svc.badgeLabel}
                </div>
              </div>

              {/* Content */}
              <div className="service-block-content">
                <span className="service-block-number">{svc.number} / 06</span>
                <div className="icon-wrapper">{svc.icon}</div>
                <h2>{svc.title}</h2>
                <p className="lead">{svc.lead}</p>

                <div className="service-how-steps">
                  {svc.steps.map((step, si) => (
                    <div className="service-step" key={si}>
                      <div className="service-step-num">{si + 1}</div>
                      <div className="service-step-text">
                        <strong>{step.title}</strong>
                        {step.desc}
                      </div>
                    </div>
                  ))}
                </div>

                <a href="#contact" className="service-cta-link">
                  Talk to us about this service <ArrowRight size={16} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── BOTTOM CTA ── */}
      <section className="services-cta-band">
        <div className="container">
          <h2>Ready to build capability across your agri value chain?</h2>
          <p>
            Get a free consultation and see how AgroStart can be tailored
            to your organisation's unique needs.
          </p>
          <Link to="/#contact" className="btn-white">
            Book a Free Consultation <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* ── CONTACT (same as main page) ── */}
      <Contact />
    </div>
  );
}
