import React from 'react';
import './Contact.css';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

const InstagramIcon = () => (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>);
const TwitterIcon = () => (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>);
const LinkedinIcon = () => (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>);

const Contact = () => {
  return (
    <section className="contact-section" id="contact">
      <div className="container">
        <div className="contact-inner">
          
          <div className="contact-info">
            <div className="tag">CONTACT US</div>
            <h2>Ready to transform your field teams?</h2>
            <p className="contact-lead">
              Get in touch with our team to schedule a demo or request a diagnostic for your agribusiness.
            </p>
            
            <div className="contact-details">
              <div className="contact-detail-item">
                <div className="detail-icon"><Mail size={20} /></div>
                <div>
                  <h5>Email Us</h5>
                  <p>agrostart@skilldesk.ai</p>
                </div>
              </div>
              
              <div className="contact-detail-item">
                <div className="detail-icon"><Phone size={20} /></div>
                <div>
                  <h5>Call Us</h5>
                  <p>+91 94385 26400</p>
                </div>
              </div>
              
              <div className="contact-detail-item">
                <div className="detail-icon"><MapPin size={20} /></div>
                <div>
                  <h5>Visit Us</h5>
                  <p>Innovation Hub, Agri-Tech Park<br/>Bangalore, India 560001</p>
                </div>
              </div>
            </div>
            
            <div className="social-links">
              <a href="#" className="social-btn"><InstagramIcon /></a>
              <a href="#" className="social-btn"><TwitterIcon /></a>
              <a href="#" className="social-btn"><LinkedinIcon /></a>
            </div>
          </div>
          
          <div className="contact-form-card glass shadow-lg">
            <h3>Send a Message</h3>
            <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
              <div className="form-group">
                <label>Full Name</label>
                <input type="text" placeholder="John Doe" />
              </div>
              
              <div className="form-group">
                <label>Work Email</label>
                <input type="email" placeholder="john@company.com" />
              </div>
              
              <div className="form-group">
                <label>Company</label>
                <input type="text" placeholder="AgriBusiness Corp" />
              </div>
              
              <div className="form-group">
                <label>How can we help?</label>
                <textarea placeholder="Tell us about your training needs..." rows="4"></textarea>
              </div>
              
              <button className="btn btn-primary btn-submit">
                Submit Request <Send size={16} />
              </button>
            </form>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default Contact;
