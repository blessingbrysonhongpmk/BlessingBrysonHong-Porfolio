import { useState, useCallback } from 'react';
import { Lock, Mail, Eye, EyeOff, ShieldCheck, ArrowLeft, Sun, Moon, AlertCircle } from 'lucide-react';
import './AdminLogin.css';

const ADMIN_ID = 'blessing28022006@gmail.com';
const ADMIN_PASS = 'bless1324';

export function AdminLogin({ onSuccess, onCancel, theme, toggleTheme }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      setError('');
      setIsSubmitting(true);

      const trimmedEmail = email.trim().toLowerCase();
      const trimmedPass = password.trim();

      // Quick simulated verify
      setTimeout(() => {
        if (trimmedEmail === ADMIN_ID.toLowerCase() && trimmedPass === ADMIN_PASS) {
          setError('');
          onSuccess();
        } else {
          setError('Invalid Admin ID or Password. Please check your credentials.');
          setIsSubmitting(false);
        }
      }, 250);
    },
    [email, password, onSuccess]
  );

  return (
    <div className="admin-login-root" data-theme={theme}>
      <div className="admin-login-topbar">
        <button
          type="button"
          className="admin-login-back-btn"
          onClick={onCancel}
          title="Return to Public Portfolio"
        >
          <ArrowLeft size={16} />
          <span>Back to Portfolio</span>
        </button>

        {toggleTheme && (
          <button
            type="button"
            className="admin-login-theme-btn"
            onClick={toggleTheme}
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
          </button>
        )}
      </div>

      <div className="admin-login-stage">
        <div className="admin-login-card desk-card">
          <div className="admin-login-header">
            <div className="admin-login-shield-wrap">
              <ShieldCheck size={28} className="admin-login-shield-icon" />
            </div>
            <div className="admin-login-badge">
              <span>ADMIN ACCESS</span>
            </div>
            <h1 className="admin-login-title">Administrator Sign In</h1>
            <p className="admin-login-subtitle">
              Enter your authorized credentials to manage portfolio content, projects, and settings.
            </p>
          </div>

          {error && (
            <div className="admin-login-error" role="alert">
              <AlertCircle size={16} className="admin-login-error-icon" />
              <span>{error}</span>
            </div>
          )}

          <form className="admin-login-form" onSubmit={handleSubmit}>
            <div className="admin-login-field">
              <label htmlFor="admin-email" className="admin-login-label">
                Admin ID / Email
              </label>
              <div className="admin-login-input-wrap">
                <Mail size={16} className="admin-login-input-icon" aria-hidden="true" />
                <input
                  id="admin-email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError('');
                  }}
                  placeholder="blessing28022006@gmail.com"
                  autoComplete="username"
                  required
                  className={`admin-login-input ${error ? 'admin-login-input--error' : ''}`}
                />
              </div>
            </div>

            <div className="admin-login-field">
              <label htmlFor="admin-password" className="admin-login-label">
                Password
              </label>
              <div className="admin-login-input-wrap">
                <Lock size={16} className="admin-login-input-icon" aria-hidden="true" />
                <input
                  id="admin-password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (error) setError('');
                  }}
                  placeholder="Enter password"
                  autoComplete="current-password"
                  required
                  className={`admin-login-input ${error ? 'admin-login-input--error' : ''}`}
                />
                <button
                  type="button"
                  className="admin-login-pwd-toggle"
                  onClick={() => setShowPassword((prev) => !prev)}
                  title={showPassword ? 'Hide password' : 'Show password'}
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="admin-login-submit-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span>Authenticating...</span>
              ) : (
                <>
                  <Lock size={15} />
                  <span>Sign In to Admin</span>
                </>
              )}
            </button>
          </form>

          <div className="admin-login-footer">
            <span className="admin-login-lock-hint">
              Protected Administrator Area · BBH Portfolio
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
