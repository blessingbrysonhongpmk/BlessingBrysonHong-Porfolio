import { useState } from 'react';
import { PORTFOLIO_DATA } from '../../data/portfolio';
import { GithubIcon, LinkedinIcon } from '../ui/SocialIcons';
import { Mail, Copy, Check, Send, ExternalLink } from 'lucide-react';
import './Contact.css';

export function Contact() {
  const { profile, socials } = PORTFOLIO_DATA;
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formStatus, setFormStatus] = useState(null); // null, 'sending', 'sent', 'error'

  const linkedinObj = socials.find((s) => s.platform.toLowerCase() === 'linkedin');
  const githubObj = socials.find((s) => s.platform.toLowerCase() === 'github');

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profile.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setFormStatus({ type: 'error', text: 'Please fill in all required fields.' });
      return;
    }

    setFormStatus({ type: 'sending', text: 'Preparing message link...' });

    setTimeout(() => {
      const subject = encodeURIComponent(`Portfolio Inquiry from ${formData.name}`);
      const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`);
      window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
      
      setFormStatus({
        type: 'sent',
        text: 'Opening your default mail client with your pre-filled message.',
      });
    }, 600);
  };

  return (
    <section id="contact" className="contact-section" aria-label="Contact Me">
      <div className="container contact-container">
        
        {/* Section Header */}
        <div className="contact-header">
          <span className="section-label">CONTACT</span>
          <h2 className="contact-title">
            LET'S BUILD <span className="text-accent">SOMETHING</span>
          </h2>
          <p className="contact-subtitle">
            Have a project, internship opportunity, collaboration idea, or simply want to connect? Reach out directly.
          </p>
        </div>

        <div className="contact-grid">
          
          {/* Left Column: Direct Contact Info & Socials */}
          <div className="contact-info-card">
            <div className="info-header">
              <span className="status-dot" />
              <span className="status-label">DIRECT CHANNELS</span>
            </div>

            <h3 className="info-heading">Direct Email</h3>
            
            {/* Visible & Copyable Email Box */}
            <div className="email-display-box">
              <div className="email-text-wrap">
                <Mail size={16} className="text-accent" />
                <span className="email-address">{profile.email}</span>
              </div>
              <button
                onClick={handleCopyEmail}
                className={`copy-btn ${copied ? 'is-copied' : ''}`}
                aria-label="Copy email address"
              >
                {copied ? (
                  <>
                    <Check size={14} /> EMAIL COPIED
                  </>
                ) : (
                  <>
                    <Copy size={14} /> COPY EMAIL
                  </>
                )}
              </button>
            </div>

            <div className="action-buttons-group">
              <a
                href={`mailto:${profile.email}`}
                className="action-btn action-btn--primary"
              >
                EMAIL ME <Send size={14} />
              </a>

              {linkedinObj && (
                <a
                  href={linkedinObj.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="action-btn action-btn--outline"
                >
                  <LinkedinIcon size={15} /> LINKEDIN <ExternalLink size={12} />
                </a>
              )}

              {githubObj && (
                <a
                  href={githubObj.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="action-btn action-btn--outline"
                >
                  <GithubIcon size={15} /> GITHUB <ExternalLink size={12} />
                </a>
              )}
            </div>
          </div>

          {/* Right Column: Contact Message Form */}
          <div className="contact-form-card">
            <h3 className="form-heading">Send a Message</h3>

            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-group">
                <label htmlFor="contact-name" className="form-label">YOUR NAME *</label>
                <input
                  id="contact-name"
                  type="text"
                  required
                  placeholder="e.g. Alex Morgan"
                  className="form-input"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label htmlFor="contact-email" className="form-label">YOUR EMAIL *</label>
                <input
                  id="contact-email"
                  type="email"
                  required
                  placeholder="e.g. alex@company.com"
                  className="form-input"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label htmlFor="contact-message" className="form-label">MESSAGE *</label>
                <textarea
                  id="contact-message"
                  required
                  rows={4}
                  placeholder="Describe your project, opportunity, or inquiry..."
                  className="form-textarea"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                />
              </div>

              {formStatus && (
                <div className={`form-feedback feedback--${formStatus.type}`}>
                  {formStatus.text}
                </div>
              )}

              <button type="submit" className="submit-btn">
                <span>SEND MESSAGE</span>
                <Send size={15} />
              </button>
            </form>
          </div>

        </div>

      </div>
    </section>
  );
}
