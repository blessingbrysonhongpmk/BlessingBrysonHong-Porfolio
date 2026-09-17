import { useState, useEffect, useRef } from 'react';
import { PORTFOLIO_DATA } from '../../data/portfolio';
import { GithubIcon, LinkedinIcon } from '../ui/SocialIcons';
import { Mail, Copy, Check, Send, ArrowUpRight } from 'lucide-react';
import { gsap } from '../../utils/scrollOrchestrator';
import './Contact.css';

export function Contact() {
  const { profile, socials } = PORTFOLIO_DATA;
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formStatus, setFormStatus] = useState(null); // null, 'sending', 'sent', 'error'

  const contactSectionRef = useRef(null);
  const titleBlockRef = useRef(null);
  const directColRef = useRef(null);
  const formColRef = useRef(null);

  useEffect(() => {
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    const prefersReduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (isMobile || prefersReduced) return;

    const ctx = gsap.context(() => {
      // 1. Headline Entrance
      gsap.fromTo(
        titleBlockRef.current,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: contactSectionRef.current,
            start: 'top 80%',
            once: true,
          },
        }
      );

      // 2. Direct Channels & Form Dual-Card Stagger
      gsap.fromTo(
        [directColRef.current, formColRef.current],
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.12,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: contactSectionRef.current,
            start: 'top 70%',
            once: true,
          },
        }
      );
    }, contactSectionRef);

    return () => ctx.revert();
  }, []);

  const linkedinObj = socials.find((s) => s.platform.toLowerCase() === 'linkedin');
  const githubObj = socials.find((s) => s.platform.toLowerCase() === 'github');

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profile.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2400);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setFormStatus({ type: 'error', text: 'Please fill in all required fields.' });
      return;
    }

    setFormStatus({ type: 'sending', text: 'Preparing mail link...' });

    setTimeout(() => {
      const subject = encodeURIComponent(`Portfolio Inquiry from ${formData.name}`);
      const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`);
      window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
      
      setFormStatus({
        type: 'sent',
        text: 'Opening your default mail client with your pre-filled inquiry.',
      });
    }, 500);
  };

  return (
    <section id="contact" className="contact-section" ref={contactSectionRef} aria-label="Contact and Collaboration">
      <div className="container contact-container">
        
        {/* Section Marker */}
        <div className="contact-header-meta">
          <span className="section-index-num">06</span>
          <span className="section-index-title">ENGAGEMENT &amp; INQUIRY</span>
          <div className="section-index-line" />
        </div>

        {/* Monumental Headline */}
        <div className="contact-monumental-header" ref={titleBlockRef}>
          <span className="contact-eyebrow">START A CONVERSATION</span>
          <h2 className="contact-giant-title">
            LET&rsquo;S BUILD <span className="text-gradient-crimson">SOMETHING</span> INTELLIGENT.
          </h2>
          <p className="contact-lead-text">
            Currently open to internships, technical collaborations, freelance engineering, and AI / full-stack product building. Reach out directly.
          </p>
        </div>

        <div className="contact-editorial-grid">
          
          {/* ── Left Column: Direct Communication Channels ── */}
          <div className="contact-direct-col" ref={directColRef}>
            <div className="direct-card">
              
              <div className="direct-card-top">
                <div className="availability-indicator">
                  <span className="avail-pulse-dot" />
                  <span className="avail-text">READY FOR 2026 INITIATIVES</span>
                </div>
                <span className="direct-channel-tag">DIRECT INBOX</span>
              </div>

              <h3 className="direct-heading">Direct Email</h3>
              <p className="direct-subheading">Responses typically sent within 24 hours.</p>

              {/* Copyable Email Capsule */}
              <div className="copyable-email-capsule">
                <div className="email-label-group">
                  <Mail size={16} className="text-primary" />
                  <span className="email-string">{profile.email}</span>
                </div>

                <button
                  onClick={handleCopyEmail}
                  className={`copy-trigger-btn ${copied ? 'is-copied' : ''}`}
                  aria-label="Copy email address to clipboard"
                >
                  {copied ? (
                    <>
                      <Check size={13} />
                      <span>COPIED</span>
                    </>
                  ) : (
                    <>
                      <Copy size={13} />
                      <span>COPY</span>
                    </>
                  )}
                </button>
              </div>

              {/* Primary Direct Action Buttons */}
              <div className="direct-actions-row">
                <a
                  href={`mailto:${profile.email}`}
                  className="direct-action-btn direct-action-btn--primary"
                >
                  <span>COMPOSE EMAIL</span>
                  <ArrowUpRight size={14} />
                </a>

                {linkedinObj && (
                  <a
                    href={linkedinObj.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="direct-action-btn direct-action-btn--outline"
                  >
                    <LinkedinIcon size={14} />
                    <span>LINKEDIN</span>
                  </a>
                )}

                {githubObj && (
                  <a
                    href={githubObj.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="direct-action-btn direct-action-btn--outline"
                  >
                    <GithubIcon size={14} />
                    <span>GITHUB</span>
                  </a>
                )}
              </div>

              {/* Verification Specs */}
              <div className="direct-specs-footer">
                <span className="spec-tag">BASE: INDIA</span>
                <span className="spec-tag">RESPONSE: &lt; 24H</span>
                <span className="spec-tag">STATUS: III YEAR B.TECH AI &amp; DS</span>
              </div>

            </div>
          </div>

          {/* ── Right Column: Minimalist Clean Form ── */}
          <div className="contact-form-col" ref={formColRef}>
            <div className="form-card">
              
              <div className="form-card-header">
                <h3 className="form-card-title">Send a Message</h3>
                <span className="form-card-note">* All fields required</span>
              </div>

              <form onSubmit={handleSubmit} className="minimal-contact-form">
                
                <div className="form-field-group">
                  <label htmlFor="contact-name" className="field-label">NAME</label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    placeholder="Alex Morgan"
                    className="field-input"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div className="form-field-group">
                  <label htmlFor="contact-email" className="field-label">EMAIL ADDRESS</label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    placeholder="alex@organization.com"
                    className="field-input"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>

                <div className="form-field-group">
                  <label htmlFor="contact-message" className="field-label">PROJECT / OPPORTUNITY DETAILS</label>
                  <textarea
                    id="contact-message"
                    required
                    rows={4}
                    placeholder="Outline your project scope, engineering role, or technical collaboration..."
                    className="field-textarea"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                </div>

                {formStatus && (
                  <div className={`form-feedback-pill feedback--${formStatus.type}`}>
                    {formStatus.text}
                  </div>
                )}

                <button type="submit" className="form-submit-trigger">
                  <span>DISPATCH MESSAGE</span>
                  <Send size={14} />
                </button>

              </form>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
