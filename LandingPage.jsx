import { useState } from 'react';
import LoginModal from './LoginModal';
import SignupModal from './SignupModal';

function LandingNav({ onLogin, onSignup }) {
  const [scrolled, setScrolled] = useState(false);
  useState(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);
  return (
    <nav className="navbar" style={{ boxShadow: scrolled ? '0 2px 16px rgba(0,0,0,0.09)' : undefined }}>
      <a className="navbar-logo" href="#">
        <div className="navbar-logo-icon">👥</div>
        <span>EMS</span>
      </a>
      <div className="navbar-links">
        <a className="navbar-link active" href="#">Home</a>
        <a className="navbar-link" href="#features">Features</a>
        <a className="navbar-link" href="#how">How it Works</a>
      </div>
      <div className="navbar-actions">
        <button className="btn btn-outline btn-sm" onClick={onLogin}>Log In</button>
        <button className="btn btn-primary btn-sm" onClick={onSignup}>Get Started</button>
      </div>
    </nav>
  );
}

function HeroSection({ onGetStarted, onLogin }) {
  return (
    <section className="hero">
      <div className="hero-blob hero-blob-1" />
      <div className="hero-blob hero-blob-2" />
      <div className="hero-blob hero-blob-3" />
      <div className="hero-content">
        <div className="hero-badge animate-fadeInUp">
          <div className="hero-badge-dot" />
          Now with AI-powered insights
        </div>
        <h1 className="hero-title animate-fadeInUp delay-1">
          Manage Your<br /><span>Employees</span><br />Efficiently
        </h1>
        <p className="hero-tagline animate-fadeInUp delay-2">
          A simple and powerful system to manage your entire workforce — from onboarding to performance tracking, all in one beautiful dashboard.
        </p>
        <div className="hero-actions animate-fadeInUp delay-3">
          <button className="btn btn-primary btn-lg" onClick={onGetStarted}>🚀 Get Started Free</button>
          <button className="btn btn-outline btn-lg" onClick={onLogin}>Log In</button>
        </div>
        <div className="hero-stats animate-fadeInUp delay-4">
          {[['10K+','Employees Managed'],['99.9%','Uptime SLA'],['50+','Integrations']].map(([num, lbl]) => (
            <div key={lbl} className="hero-stat">
              <div className="hero-stat-num">{num}</div>
              <div className="hero-stat-label">{lbl}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="hero-visual animate-slideInR delay-2">
        <div style={{ position: 'relative' }}>
          <div className="hero-card-mock">
            <div className="mock-header">
              <div className="mock-avatar">AS</div>
              <div className="mock-info">
                <h4>Admin Dashboard</h4>
                <p>Employee Overview</p>
              </div>
              <div className="mock-badge active">● Live</div>
            </div>
            <div className="mock-stats">
              {[['128','Employees'],['6','Depts'],['94%','Active']].map(([n, l]) => (
                <div key={l} className="mock-stat-card">
                  <div className="num">{n}</div>
                  <div className="lbl">{l}</div>
                </div>
              ))}
            </div>
            <div className="mock-list">
              {[
                {n:'Alice J.',r:'Engineer',s:'$92k',c:'#3b82f6'},
                {n:'Bob M.',r:'Designer',s:'$78k',c:'#8b5cf6'},
                {n:'Carol W.',r:'Manager',s:'$105k',c:'#10b981'},
              ].map(e => (
                <div key={e.n} className="mock-emp">
                  <div className="mock-emp-av" style={{ background: e.c }}>{e.n[0]}</div>
                  <div>
                    <div className="mock-emp-name">{e.n}</div>
                    <div className="mock-emp-role">{e.r}</div>
                  </div>
                  <div className="mock-emp-sal">{e.s}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="float-badge badge-tl">
            <div className="float-badge-icon" style={{background:'#dbeafe'}}>📊</div>
            <span style={{color:'#1d4ed8'}}>+24% Growth</span>
          </div>
          <div className="float-badge badge-br">
            <div className="float-badge-icon" style={{background:'#d1fae5'}}>✅</div>
            <span style={{color:'#059669'}}>Synced</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function FeaturesSection() {
  const cards = [
    { icon:'⚡', title:'Full CRUD Operations', desc:'Create, read, update, and delete employee records effortlessly with a smooth and intuitive interface.', bg:'#dbeafe', color:'#1d4ed8' },
    { icon:'🔍', title:'Smart Search & Filter', desc:'Instantly search by name, department, or role. Apply multi-filters to find anyone in seconds.', bg:'#d1fae5', color:'#059669' },
    { icon:'🛡️', title:'Form Validation', desc:'Built-in real-time validation ensures all data entered is accurate, complete, and error-free.', bg:'#ede9fe', color:'#7c3aed' },
    { icon:'💾', title:'Data Persistence', desc:'All your employee data is stored locally using localStorage — no backend required, always available.', bg:'#fef3c7', color:'#d97706' },
  ];
  return (
    <section className="features" id="features">
      <div className="features-header">
        <div className="section-tag">✨ Features</div>
        <h2 className="section-title">Everything You Need</h2>
        <p className="section-subtitle">Packed with powerful features to streamline your HR workflows and boost team productivity.</p>
      </div>
      <div className="features-grid">
        {cards.map((c, i) => (
          <div key={c.title} className="feature-card animate-fadeInUp" style={{ animationDelay: `${i * 0.1}s` }}>
            <div className="feature-icon-wrap" style={{ background: c.bg }}>
              <span style={{ fontSize: 26 }}>{c.icon}</span>
            </div>
            <h3>{c.title}</h3>
            <p>{c.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    { n:'1', title:'Sign Up', desc:'Create your free account in under 30 seconds. No credit card required.' },
    { n:'2', title:'Add Employees', desc:'Import or manually add your team members with all necessary details.' },
    { n:'3', title:'Organize & Assign', desc:'Group by departments, assign roles, and set permissions easily.' },
    { n:'4', title:'Track & Manage', desc:'Monitor performance, manage leaves, and stay on top of your team.' },
  ];
  return (
    <section className="how" id="how">
      <div style={{ textAlign: 'center' }}>
        <div className="section-tag">🗺️ Process</div>
        <h2 className="section-title">How It Works</h2>
        <p className="section-subtitle" style={{ margin: '0 auto' }}>Get your HR system up and running in just a few simple steps.</p>
      </div>
      <div className="steps-grid">
        {steps.map((s, i) => (
          <div key={s.n} className="step-item animate-fadeInUp" style={{ animationDelay: `${i * 0.12}s` }}>
            <div className="step-num">{s.n}</div>
            <h4>{s.title}</h4>
            <p>{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function CTASection({ onGetStarted }) {
  return (
    <section className="cta">
      <h2>Ready to Transform Your HR?</h2>
      <p>Join thousands of companies that trust EMS to manage their most valuable asset — their people.</p>
      <div className="cta-actions">
        <button className="btn btn-white btn-lg" onClick={onGetStarted}>🚀 Start For Free</button>
        <button className="btn btn-ghost btn-lg">📅 Schedule a Demo</button>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <p>© 2026 Employee Management System · Built with ❤️ · <a href="#">Privacy</a> · <a href="#">Terms</a></p>
    </footer>
  );
}

function LandingPage({ onEnter }) {
  const [modal, setModal] = useState(null); // 'login' | 'signup'

  return (
    <div>
      <LandingNav onLogin={() => setModal('login')} onSignup={() => setModal('signup')} />
      <HeroSection onGetStarted={() => setModal('signup')} onLogin={() => setModal('login')} />
      <FeaturesSection />
      <HowItWorks />
      <CTASection onGetStarted={() => setModal('signup')} />
      <Footer />

      {modal === 'login'  && <LoginModal  onClose={() => setModal(null)} onSuccess={onEnter} onSwitch={() => setModal('signup')} />}
      {modal === 'signup' && <SignupModal onClose={() => setModal(null)} onSuccess={onEnter} onSwitch={() => setModal('login')} />}
    </div>
  );
}

export default LandingPage;
