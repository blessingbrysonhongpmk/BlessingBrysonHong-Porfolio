import { useState } from 'react';
import emailjs from '@emailjs/browser';
import { Mail, ArrowUpRight, Send, Check, Copy, AlertCircle, Loader2 } from 'lucide-react';
import { usePortfolioContent } from '../../context/PortfolioContext';
import { GithubIcon, LinkedinIcon } from '../ui/SocialIcons';
import './Contact.css';

export function Contact() {
  const { content } = usePortfolioContent();
  const { profile, socials } = content;

  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle'); // 'idle' | 'sending' | 'success' | 'error'
  const [errorMessage, setErrorMessage] = useState('');
  const [copied, setCopied] = useState(false);

  const linkedinObj = (socials || []).find((s) => s.platform.toLowerCase() === 'linkedin');
  const githubObj = (socials || []).find((s) => s.platform.toLowerCase() === 'github');

  const handleCopyEmail = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText(profile.email || 'blessingbrysonhongpmk@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2400);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus('error');
      setErrorMessage('Please fill in all fields before sending.');
      return;
    }

    setStatus('sending');
    setErrorMessage('');

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    // If EmailJS credentials are provided, send via API
    if (serviceId && templateId && publicKey) {
      try {
        await emailjs.send(
          serviceId,
          templateId,
          {
            from_name: formData.name,
            from_email: formData.email,
            message: formData.message,
            to_name: profile.name || 'Blessing Bryson Hong',
          },
          publicKey
        );
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } catch (err) {
        console.error('EmailJS error:', err);
        setStatus('error');
        setErrorMessage('Failed to send message. Please reach out directly via email below.');
      }
    } else {
      // Graceful fallback: opens mailto pre-filled + marks success
      const subject = encodeURIComponent(`Portfolio Message from ${formData.name}`);
      const body = encodeURIComponent(
        `Hi Blessing,\n\n${formData.message}\n\nFrom: ${formData.name} (${formData.email})`
      );
      window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
    }
  };

  return (
    <section id="contact" className="contact-section" aria-label="Contact Section">
      {/* Background Environment Accents */}
      <div className="contact-ambient-glow" aria-hidden="true" />
      <div className="contact-king-silhouette" aria-hidden="true">♔</div>

      <div className="container contact-container">
        <header className="contact-header">
          <span className="section-label">Connect</span>
        </header>

        <div className="contact-grid">
          {/* Left Column: Human, powerful editorial pitch */}
          <div className="contact-info">
            <h2 className="contact-heading">
              LET&rsquo;S BUILD<br />
              <span className="contact-heading-accent">SOMETHING REAL.</span>
            </h2>
            <p className="contact-description">
              Have a project, an idea, or an engineering role in mind? I&rsquo;m open to internships, machine learning pipelines, and full-stack opportunities for 2026.
            </p>

            {/* Direct Channel Strip */}
            <div className="contact-channels">
              <div className="contact-channel-item desk-card">
                <div className="contact-channel-icon contact-channel-icon--email" aria-hidden="true">
                  <Mail size={18} />
                </div>
                <div className="contact-channel-text">
                  <span className="contact-channel-meta">Direct Email</span>
                  <a href={`mailto:${profile.email}`} className="contact-channel-value">
                    {profile.email}
                  </a>
                </div>
                <button
                  type="button"
                  className="contact-copy-pill"
                  onClick={handleCopyEmail}
                  aria-label="Copy email address"
                >
                  {copied ? <Check size={12} /> : <Copy size={12} />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
              </div>

              {linkedinObj && (
                <a
                  href={linkedinObj.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-channel-link-card desk-card contact-channel-link-card--linkedin"
                  aria-label="Connect on LinkedIn"
                >
                  <div className="contact-channel-icon contact-channel-icon--linkedin" aria-hidden="true">
                    <LinkedinIcon size={18} />
                  </div>
                  <div className="contact-channel-text">
                    <span className="contact-channel-meta">Professional Profile</span>
                    <span className="contact-channel-value">Blessing Bryson Hong</span>
                  </div>
                  <ArrowUpRight size={16} className="contact-card-arrow" />
                </a>
              )}

              {githubObj && (
                <a
                  href={githubObj.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-channel-link-card desk-card contact-channel-link-card--github"
                  aria-label="View GitHub code repositories"
                >
                  <div className="contact-channel-icon contact-channel-icon--github" aria-hidden="true">
                    <GithubIcon size={18} />
                  </div>
                  <div className="contact-channel-text">
                    <span className="contact-channel-meta">Open Source Work</span>
                    <span className="contact-channel-value">github.com/blessingbrysonhongpmk</span>
                  </div>
                  <ArrowUpRight size={16} className="contact-card-arrow" />
                </a>
              )}
            </div>
          </div>

          {/* Right Column: Studio-grade Final Card Form */}
          <div className="contact-form-panel desk-card">
            <span className="contact-card-pip" aria-hidden="true">♔</span>
            <div className="contact-form-header">
              <span className="contact-form-badge">Send a Message</span>
              <span className="contact-form-hint">Fastest response within 24h</span>
            </div>

            <form onSubmit={handleSubmit} className="contact-form" noValidate>
              <div className="form-group">
                <label htmlFor="contact-name" className="form-label">
                  Your Name
                </label>
                <input
                  id="contact-name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Maya Lin"
                  required
                  className="form-input"
                  autoComplete="name"
                />
              </div>

              <div className="form-group">
                <label htmlFor="contact-email" className="form-label">
                  Your Email
                </label>
                <input
                  id="contact-email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="e.g. maya@company.com"
                  required
                  className="form-input"
                  autoComplete="email"
                />
              </div>

              <div className="form-group">
                <label htmlFor="contact-message" className="form-label">
                  Project or Opportunity
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell me about what you're looking to build or explore together..."
                  rows={4}
                  required
                  className="form-input form-textarea"
                />
              </div>

              {status === 'error' && (
                <div className="form-alert form-alert--error" role="alert">
                  <AlertCircle size={16} />
                  <span>{errorMessage}</span>
                </div>
              )}

              {status === 'success' && (
                <div className="form-alert form-alert--success" role="status">
                  <Check size={16} />
                  <span>Thank you! Your message has been prepared and sent.</span>
                </div>
              )}

              <button
                type="submit"
                disabled={status === 'sending'}
                className="contact-submit-btn"
                id="contact-submit-btn"
              >
                {status === 'sending' ? (
                  <>
                    <Loader2 size={16} className="btn-spinner" />
                    <span>SENDING...</span>
                  </>
                ) : (
                  <>
                    <span>SEND MESSAGE</span>
                    <Send size={15} />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
