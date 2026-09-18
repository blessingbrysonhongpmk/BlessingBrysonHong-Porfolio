import { ArrowUpRight, Mail } from 'lucide-react';
import { PORTFOLIO_DATA } from '../../data/portfolio';
import { GithubIcon, LinkedinIcon } from '../ui/SocialIcons';
import './Contact.css';

export function Contact({ onOpenContact }) {
  const { profile, socials } = PORTFOLIO_DATA;

  const linkedinObj = socials.find((s) => s.platform.toLowerCase() === 'linkedin');
  const githubObj = socials.find((s) => s.platform.toLowerCase() === 'github');

  return (
    <section id="contact" className="contact-preview-section" aria-label="Contact Preview">
      <div className="container contact-preview-container">
        
        {/* Section Kicker */}
        <div className="section-kicker">
          <span className="section-kicker__num">05</span>
          <span className="section-kicker__label">CONTACT</span>
          <div className="section-kicker__line" />
        </div>

        {/* Minimalist Direct Callout */}
        <div className="contact-preview-card">
          <div className="contact-preview-content">
            <span className="contact-preview-eyebrow">START A CONVERSATION</span>
            <h2 className="contact-preview-title">
              LET&rsquo;S BUILD <span className="text-gradient-crimson">SOMETHING</span>.
            </h2>
            <p className="contact-preview-subtitle">
              Open to technical engineering roles, machine learning initiatives, and full-stack collaborations for 2026.
            </p>

            {/* Direct Channel Links */}
            <div className="contact-preview-channels">
              <a
                href={`mailto:${profile.email}`}
                className="contact-channel-pill"
                aria-label="Direct Email"
              >
                <Mail size={13} className="text-primary" />
                <span>{profile.email}</span>
              </a>

              {linkedinObj && (
                <a
                  href={linkedinObj.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-channel-pill"
                  aria-label="LinkedIn Profile"
                >
                  <LinkedinIcon size={13} />
                  <span>LinkedIn</span>
                  <ArrowUpRight size={11} className="channel-pill-arrow" />
                </a>
              )}

              {githubObj && (
                <a
                  href={githubObj.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-channel-pill"
                  aria-label="GitHub Profile"
                >
                  <GithubIcon size={13} />
                  <span>GitHub</span>
                  <ArrowUpRight size={11} className="channel-pill-arrow" />
                </a>
              )}
            </div>
          </div>

          {/* Deep Action Trigger */}
          <div className="contact-preview-action">
            <button
              type="button"
              className="contact-primary-trigger"
              onClick={onOpenContact}
              id="contact-open-modal-btn"
              aria-label="Open detailed communication and message dispatch drawer"
            >
              <span>CONTACT ME</span>
              <ArrowUpRight size={15} />
            </button>
            <span className="contact-action-note">Quick Dispatch Form · Response &lt; 24h</span>
          </div>
        </div>

      </div>
    </section>
  );
}
