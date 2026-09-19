import { useState, useEffect } from 'react';
import {
  X,
  Send,
  Mail,
  MapPin,
  Clock,
  CheckCircle2,
  Copy,
  ExternalLink,
} from 'lucide-react';
import { usePortfolioContent } from '../../context/PortfolioContext';
import { GithubIcon, LinkedInIcon, InstagramIcon, DiscordIcon, FacebookIcon } from '../ui/SocialIcons';
import './ContactDetailModal.css';

export function ContactDetailModal({ onClose }) {
  const { content } = usePortfolioContent();
  const { profile, socials } = content;
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitStatus, setSubmitStatus] = useState(null); // 'sending' | 'success' | 'error'

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profile.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setSubmitStatus('sending');
    setTimeout(() => {
      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setSubmitStatus(null), 4000);
    }, 1000);
  };

  const getSocialIcon = (platform) => {
    switch (platform.toLowerCase()) {
      case 'github': return <GithubIcon size={16} />;
      case 'linkedin': return <LinkedInIcon size={16} />;
      case 'instagram': return <InstagramIcon size={16} />;
      case 'discord': return <DiscordIcon size={16} />;
      case 'facebook': return <FacebookIcon size={16} />;
      default: return <ExternalLink size={16} />;
    }
  };

  return (
    <div
      className="detail-modal-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="contact-modal-title"
    >
      <div className="detail-modal-card contact-modal-card" onClick={(e) => e.stopPropagation()}>
        {/* Top Header */}
        <header className="detail-modal-header">
          <div className="detail-modal-meta">
            <span className="meta-pill meta-pill--status">
              <span className="status-dot-pulse" />
              <span>{profile.availability}</span>
            </span>
            <span className="meta-pill meta-pill--cat">
              <MapPin size={11} />
              <span>{profile.location}</span>
            </span>
          </div>

          <button className="detail-modal-close" onClick={onClose} aria-label="Close Contact Dossier">
            <X size={18} />
          </button>
        </header>

        {/* Scrollable Body */}
        <div className="detail-modal-body">
          <div className="case-study-hero">
            <h2 id="contact-modal-title" className="case-study-title">
              Get In Touch
            </h2>
            <p className="case-study-tagline">
              Have a question, collaboration idea, or opportunity? Fill out the form or reach out directly via email or LinkedIn.
            </p>
          </div>

          <div className="contact-deep-grid">
            {/* Left: Contact Info & Channels */}
            <div className="contact-deep-info">
              {/* Direct Email Box */}
              <div className="case-card">
                <div className="case-card-header">
                  <Mail size={16} className="text-primary" />
                  <h3>Email</h3>
                </div>

                <div className="contact-email-capsule">
                  <span className="contact-email-str">{profile.email}</span>
                  <button
                    className="contact-copy-btn"
                    onClick={handleCopyEmail}
                    title="Copy email to clipboard"
                  >
                    {copied ? (
                      <>
                        <CheckCircle2 size={13} className="text-accent" />
                        <span>COPIED</span>
                      </>
                    ) : (
                      <>
                        <Copy size={13} />
                        <span>COPY EMAIL</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Social Channels */}
              <div className="case-card">
                <div className="case-card-header">
                  <Clock size={16} className="text-secondary" />
                  <h3>Online Profiles</h3>
                </div>

                <div className="contact-social-list">
                  {socials.map((s) => (
                    <a
                      key={s.platform}
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="contact-social-item"
                    >
                      <span className="contact-social-icon">{getSocialIcon(s.platform)}</span>
                      <div className="contact-social-text">
                        <span className="contact-social-platform">{s.platform}</span>
                        <span className="contact-social-label">{s.label || s.url}</span>
                      </div>
                      <ExternalLink size={12} className="contact-social-arrow" />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Message Form */}
            <div className="case-card contact-form-card">
              <div className="case-card-header">
                <Send size={16} className="text-accent" />
                <h3>Send a Message</h3>
              </div>

              <form className="contact-modal-form" onSubmit={handleSubmit}>
                <div className="form-field-group">
                  <label htmlFor="contact-name">Your Name / Organization</label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    placeholder="e.g. Alex Rivera"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="modal-field-input"
                  />
                </div>

                <div className="form-field-group">
                  <label htmlFor="contact-email">Email Address</label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    placeholder="e.g. alex@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="modal-field-input"
                  />
                </div>

                <div className="form-field-group">
                  <label htmlFor="contact-message">Message</label>
                  <textarea
                    id="contact-message"
                    required
                    rows={4}
                    placeholder="Tell me about your project, timeline, or engineering inquiry..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="modal-field-textarea"
                  />
                </div>

                {submitStatus === 'sending' && (
                  <div className="status-pill status-pill--sending">
                    Sending message...
                  </div>
                )}
                {submitStatus === 'success' && (
                  <div className="status-pill status-pill--success">
                    ✓ Message received! I will respond within 24 hours.
                  </div>
                )}

                <button
                  type="submit"
                  disabled={submitStatus === 'sending'}
                  className="case-study-btn case-study-btn--primary contact-submit-btn"
                >
                  <Send size={14} />
                  <span>Send Message</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
