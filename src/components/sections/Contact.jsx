import { useState } from 'react';
import { Section } from '../layout/Section';
import { PORTFOLIO_DATA } from '../../data/portfolio';
import { Send, Mail, Loader2 } from 'lucide-react';
import { GithubIcon, LinkedinIcon, InstagramIcon, FacebookIcon, DiscordIcon } from '../ui/SocialIcons';
import './Contact.css';

const SOCIAL_ICONS = {
  github: GithubIcon,
  linkedin: LinkedinIcon,
  instagram: InstagramIcon,
  facebook: FacebookIcon,
  'message-circle': DiscordIcon,
};

export function Contact() {
  const { profile, socials } = PORTFOLIO_DATA;
  const [formState, setFormState] = useState('idle'); // idle | submitting | success | error
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setFormState('submitting');

    // Check for configured endpoint
    const endpoint = import.meta.env.VITE_CONTACT_FORM_ENDPOINT;

    if (!endpoint) {
      // Fallback: open mailto
      const subject = encodeURIComponent(`Portfolio Contact from ${formData.name}`);
      const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`);
      window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
      setFormState('success');
      return;
    }

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error('Failed');
      setFormState('success');
      setFormData({ name: '', email: '', message: '' });
    } catch {
      setFormState('error');
    }
  };

  const handleChange = (field) => (e) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <Section id="contact" title="Start a Conversation" subtitle="Connect">
      <div className="contact">
        {/* Left: info */}
        <div className="contact__info">
          <p className="contact__availability">{profile.availability}</p>

          <a href={`mailto:${profile.email}`} className="contact__email">
            <Mail size={18} />
            {profile.email}
          </a>

          <div className="contact__socials">
            {socials.map(({ platform, url, icon }) => {
              const IconComp = SOCIAL_ICONS[icon] || DiscordIcon;
              return (
                <a
                  key={platform}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact__social"
                  aria-label={platform}
                >
                  <IconComp size={18} />
                  <span>{platform}</span>
                </a>
              );
            })}
          </div>
        </div>

        {/* Right: form */}
        <form className="contact__form" onSubmit={handleSubmit} noValidate>
          {formState === 'success' ? (
            <div className="contact__success" role="status">
              <p className="contact__success-text">Message sent. I&rsquo;ll get back to you.</p>
              <button
                type="button"
                className="contact__reset-btn"
                onClick={() => setFormState('idle')}
              >
                Send another
              </button>
            </div>
          ) : (
            <>
              <div className={`contact__field ${errors.name ? 'contact__field--error' : ''}`}>
                <label htmlFor="contact-name" className="contact__label">Name</label>
                <input
                  id="contact-name"
                  type="text"
                  className="contact__input"
                  value={formData.name}
                  onChange={handleChange('name')}
                  placeholder="Your name"
                  disabled={formState === 'submitting'}
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? 'name-error' : undefined}
                />
                {errors.name && <span id="name-error" className="contact__error" role="alert">{errors.name}</span>}
              </div>

              <div className={`contact__field ${errors.email ? 'contact__field--error' : ''}`}>
                <label htmlFor="contact-email" className="contact__label">Email</label>
                <input
                  id="contact-email"
                  type="email"
                  className="contact__input"
                  value={formData.email}
                  onChange={handleChange('email')}
                  placeholder="your@email.com"
                  disabled={formState === 'submitting'}
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                />
                {errors.email && <span id="email-error" className="contact__error" role="alert">{errors.email}</span>}
              </div>

              <div className={`contact__field ${errors.message ? 'contact__field--error' : ''}`}>
                <label htmlFor="contact-message" className="contact__label">Message</label>
                <textarea
                  id="contact-message"
                  className="contact__textarea"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange('message')}
                  placeholder="What would you like to discuss?"
                  disabled={formState === 'submitting'}
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? 'message-error' : undefined}
                />
                {errors.message && <span id="message-error" className="contact__error" role="alert">{errors.message}</span>}
              </div>

              {formState === 'error' && (
                <p className="contact__form-error" role="alert">
                  Something went wrong. Please try again or email me directly.
                </p>
              )}

              <button
                type="submit"
                className="contact__submit"
                disabled={formState === 'submitting'}
              >
                {formState === 'submitting' ? (
                  <>
                    <Loader2 size={16} className="contact__spinner" />
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message
                    <Send size={14} />
                  </>
                )}
              </button>
            </>
          )}
        </form>
      </div>
    </Section>
  );
}
