import { useState } from 'react';
import { Section } from '../layout/Section';
import { PORTFOLIO_DATA } from '../../data/portfolio';
import { GithubIcon, LinkedinIcon } from '../ui/SocialIcons';
import { Mail, Copy, Check, ArrowUpRight } from 'lucide-react';
import './Contact.css';

export function Contact() {
  const { profile, github, socials } = PORTFOLIO_DATA;
  const [copied, setCopied] = useState(false);

  const linkedinObj = socials.find(s => s.platform.toLowerCase() === 'linkedin');
  const linkedinUrl = linkedinObj ? linkedinObj.url : 'https://linkedin.com/in/blessingbrysonhongpmk';

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profile.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Section id="contact" title="Get in Touch" subtitle="FINAL SIGNAL">
      <div className="contact-container">
        
        {/* Main Contact Card */}
        <div className="contact-card">
          <div className="contact-header">
            <span className="contact-signal-dot" />
            <span className="contact-label">OPEN FOR OPPORTUNITIES</span>
          </div>

          <h3 className="contact-title">Let's build something that matters.</h3>

          <p className="contact-text">
            Whether you have a project in mind, an internship opportunity, or want to collaborate on something new — my inbox is open.
          </p>

          {/* Email Action Area */}
          <div className="contact-email-box">
            <div className="email-display">
              <Mail size={16} className="text-accent" />
              <span className="email-text">{profile.email}</span>
            </div>
            
            <button
              onClick={handleCopyEmail}
              className={`copy-button ${copied ? 'is-copied' : ''}`}
              aria-label="Copy email address"
            >
              {copied ? (
                <>
                  <Check size={14} /> Copied
                </>
              ) : (
                <>
                  <Copy size={14} /> Copy Email
                </>
              )}
            </button>
          </div>

          {/* Direct Channels */}
          <div className="contact-channels">
            <a
              href={`mailto:${profile.email}`}
              className="channel-link channel-link--primary"
            >
              Send Email Direct <ArrowUpRight size={14} />
            </a>

            <a
              href={github.profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="channel-link channel-link--outline"
            >
              <GithubIcon size={14} /> GitHub
            </a>

            <a
              href={linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="channel-link channel-link--outline"
            >
              <LinkedinIcon size={14} /> LinkedIn
            </a>
          </div>
        </div>

      </div>
    </Section>
  );
}
