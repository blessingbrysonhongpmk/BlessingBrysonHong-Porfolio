import React from 'react';
import './BrandIcons.css';

/**
 * Authentic Brand & Technology Logos with exact official colors.
 * Used consistently across Hero, Projects, Skills, Contact, Footer, and Modals.
 */

// ── 1. LinkedIn (Official Blue #0A66C2) ──
export function LinkedinIcon({ size = 18, className = '', ...props }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={`brand-icon brand-icon--linkedin ${className}`}
      aria-label="LinkedIn"
      {...props}
    >
      <path
        fill="#0A66C2"
        d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
      />
    </svg>
  );
}
export { LinkedinIcon as LinkedInIcon };

// ── 2. GitHub (Official #FFFFFF in Dark, #24292F in Light) ──
export function GithubIcon({ size = 18, className = '', ...props }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={`brand-icon brand-icon--github ${className}`}
      aria-label="GitHub"
      {...props}
    >
      <path
        fill="currentColor"
        d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"
      />
    </svg>
  );
}

// ── 3. Python (Official Two-Tone #3776AB & #FFD438) ──
export function PythonIcon({ size = 18, className = '', ...props }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={`brand-icon brand-icon--python ${className}`}
      aria-label="Python"
      {...props}
    >
      <path
        fill="#3776AB"
        d="M11.91 0c-3.14 0-5.18.35-5.18 1.92v2.85h5.27v.76H4.22C2.12 5.53.64 6.78.64 9.9c0 3.11 1.28 4.31 3.58 4.31h1.56v-2.18c0-2.48 2.08-4.49 4.61-4.49h5.22c.98 0 1.77-.8 1.77-1.78V1.92C17.38.35 15.05 0 11.91 0zm-2.88 1.54a1.05 1.05 0 110 2.1 1.05 1.05 0 010-2.1z"
      />
      <path
        fill="#FFD438"
        d="M12.09 24c3.14 0 5.18-.35 5.18-1.92v-2.85h-5.27v-.76h7.78c2.1 0 3.58-1.25 3.58-4.37 0-3.11-1.28-4.31-3.58-4.31h-1.56v2.18c0 2.48-2.08 4.49-4.61 4.49H8.39c-.98 0-1.77.8-1.77 1.78v3.84c0 1.57 2.33 1.92 5.47 1.92zm2.88-1.54a1.05 1.05 0 110-2.1 1.05 1.05 0 010 2.1z"
      />
    </svg>
  );
}

// ── 4. React (Official Cyan #61DAFB) ──
export function ReactIcon({ size = 18, className = '', ...props }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={`brand-icon brand-icon--react ${className}`}
      aria-label="React"
      {...props}
    >
      <circle cx="12" cy="12" r="2.1" fill="#61DAFB" />
      <g stroke="#61DAFB" strokeWidth="1.25" fill="none">
        <ellipse cx="12" cy="12" rx="10" ry="4" />
        <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)" />
        <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)" />
      </g>
    </svg>
  );
}

// ── 5. JavaScript (Official Yellow #F7DF1E with #000000) ──
export function JavaScriptIcon({ size = 18, className = '', ...props }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={`brand-icon brand-icon--javascript ${className}`}
      aria-label="JavaScript"
      {...props}
    >
      <rect width="24" height="24" rx="3" fill="#F7DF1E" />
      <path
        fill="#000000"
        d="M6.5 18.2c.7.4 1.6.7 2.5.7 1.4 0 2.3-.7 2.3-2.1v-7.2H9.2v7.1c0 .7-.4 1.1-1.1 1.1-.4 0-.8-.1-1.1-.3l-.5.7zm8.3.1c1.1.6 2.3.9 3.5.9 2.2 0 3.5-1.1 3.5-2.8 0-1.5-.9-2.3-2.5-3-1.1-.5-1.6-.9-1.6-1.5 0-.5.4-.9 1.2-.9.8 0 1.5.3 2 .6l.6-.9c-.6-.4-1.5-.7-2.6-.7-2 0-3.2 1.1-3.2 2.6 0 1.4.9 2.2 2.4 2.8 1.1.5 1.7.9 1.7 1.6 0 .6-.5 1-1.4 1-.9 0-1.8-.4-2.5-.9l-.5.9z"
      />
    </svg>
  );
}

// ── 6. TypeScript (Official Blue #3178C6 with #FFFFFF) ──
export function TypeScriptIcon({ size = 18, className = '', ...props }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={`brand-icon brand-icon--typescript ${className}`}
      aria-label="TypeScript"
      {...props}
    >
      <rect width="24" height="24" rx="3" fill="#3178C6" />
      <path
        fill="#FFFFFF"
        d="M3.5 9.5h7.2v1.8H8.1v7.2H6.1v-7.2H3.5V9.5zm9.8 6.9c.9.5 1.9.8 2.9.8 1.8 0 2.8-.9 2.8-2.2 0-1.3-.8-1.9-2.2-2.5-1.1-.5-1.5-.8-1.5-1.4 0-.5.4-.9 1.2-.9.8 0 1.5.3 2 .6l.6-.9c-.6-.4-1.5-.7-2.6-.7-1.9 0-3.1 1-3.1 2.4 0 1.3.8 2 2.2 2.5 1.1.5 1.6.8 1.6 1.4 0 .6-.5 1-1.3 1-.8 0-1.7-.4-2.3-.9l-.6 1z"
      />
    </svg>
  );
}

// ── 7. HTML5 (Official Orange #E34F26) ──
export function HtmlIcon({ size = 18, className = '', ...props }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={`brand-icon brand-icon--html ${className}`}
      aria-label="HTML5"
      {...props}
    >
      <path fill="#E34F26" d="M2.5 1.5l1.7 19.3L12 23.5l7.8-2.7 1.7-19.3H2.5z" />
      <path fill="#EF652A" d="M12 3.1v18.4l6.3-2.2 1.4-16.2H12z" />
      <path
        fill="#FFFFFF"
        d="M12 8.1H8.1l.3 3.3H12v-3.3zm0 6.6l-3.3-.9-.2-2.4H6.3l.4 4.7 5.3 1.5v-2.9zm0-9.8H6l1.2 13.1 4.8 1.3v-2.9l-2.6-.7-.2-2.4h2.8V4.9z"
      />
      <path
        fill="#EBEBEB"
        d="M12 8.1h3.9l-.4 3.3H12v3.3h2.6l-.3 2.5-2.3.6v2.9l4.8-1.3.7-7.9.1-1.8H12V8.1zm0-3.2v3.3h5.7l.3-3.3H12z"
      />
    </svg>
  );
}

// ── 8. CSS3 (Official Blue #1572B6) ──
export function CssIcon({ size = 18, className = '', ...props }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={`brand-icon brand-icon--css ${className}`}
      aria-label="CSS3"
      {...props}
    >
      <path fill="#1572B6" d="M2.5 1.5l1.7 19.3L12 23.5l7.8-2.7 1.7-19.3H2.5z" />
      <path fill="#33A9DC" d="M12 3.1v18.4l6.3-2.2 1.4-16.2H12z" />
      <path
        fill="#FFFFFF"
        d="M12 8.1H8.1l.3 3.3H12v-3.3zm0 6.6l-3.3-.9-.2-2.4H6.3l.4 4.7 5.3 1.5v-2.9zm0-9.8H6l1.2 13.1 4.8 1.3v-2.9l-2.6-.7-.2-2.4h2.8V4.9z"
      />
      <path
        fill="#EBEBEB"
        d="M12 8.1h3.9l-.4 3.3H12v3.3h2.6l-.3 2.5-2.3.6v2.9l4.8-1.3.7-7.9.1-1.8H12V8.1zm0-3.2v3.3h5.7l.3-3.3H12z"
      />
    </svg>
  );
}

// ── 9. Django (Official Dark Green #092E20 / #44B78B) ──
export function DjangoIcon({ size = 18, className = '', ...props }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={`brand-icon brand-icon--django ${className}`}
      aria-label="Django"
      {...props}
    >
      <rect width="24" height="24" rx="3" fill="#092E20" />
      <path
        fill="#44B78B"
        d="M9.8 4.2h2.2v9.3c-.4.1-1 .2-1.6.2-2.4 0-3.8-1.3-3.8-3.5 0-2.3 1.6-3.8 3.2-3.8V4.2zm0 4.2c-1 0-1.8.8-1.8 2 0 1.2.7 1.9 1.8 1.9V8.4zm4.8 3.5c0-.9.1-1.7.3-2.3l2-.5v10.2h-2.3v-7.4zM16.9 4.2h-2.3v2.2h2.3V4.2z"
      />
    </svg>
  );
}

// ── 10. Git (Official Git Orange #F05032) ──
export function GitIcon({ size = 18, className = '', ...props }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={`brand-icon brand-icon--git ${className}`}
      aria-label="Git"
      {...props}
    >
      <path
        fill="#F05032"
        d="M23.546 10.93L13.067.452a1.5 1.5 0 00-2.124 0L8.83 2.564l2.673 2.673a1.782 1.782 0 012.247 2.248l2.569 2.569a1.782 1.782 0 11-1.077 1.056l-2.404-2.404v5.474a1.782 1.782 0 11-1.5 0V8.528a1.782 1.782 0 01-.96-2.333L7.734 3.662.454 10.94a1.5 1.5 0 000 2.124l10.48 10.48a1.5 1.5 0 002.124 0l10.488-10.49a1.5 1.5 0 000-2.124z"
      />
    </svg>
  );
}

// ── 11. VS Code (Official Blue #007ACC) ──
export function VsCodeIcon({ size = 18, className = '', ...props }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={`brand-icon brand-icon--vscode ${className}`}
      aria-label="VS Code"
      {...props}
    >
      <path
        fill="#007ACC"
        d="M17.5 1.6l-8.6 8-4.7-3.6L2 7.2v9.6l2.2 1.2 4.7-3.6 8.6 8 4.5-2.2V3.8L17.5 1.6zm0 4.8v11.2l-6.2-5.6 6.2-5.6z"
      />
    </svg>
  );
}

// ── 12. Vite (Official Purple #646CFF & Gold #FFD62E) ──
export function ViteIcon({ size = 18, className = '', ...props }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={`brand-icon brand-icon--vite ${className}`}
      aria-label="Vite"
      {...props}
    >
      <path
        fill="#646CFF"
        d="M21.5 3.5l-8.9 18.2a.9.9 0 01-1.6 0L2.5 3.5a.9.9 0 01.9-1.3l8.6 1.8 8.6-1.8a.9.9 0 01.9 1.3z"
      />
      <path
        fill="#FFD62E"
        d="M12.9 2.5l-6.2 8.4h4.1l-1.8 5.6 6.2-8.4h-4.1l1.8-5.6z"
      />
    </svg>
  );
}

// ── 13. Streamlit (Official Red/Coral #FF4B4B) ──
export function StreamlitIcon({ size = 18, className = '', ...props }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={`brand-icon brand-icon--streamlit ${className}`}
      aria-label="Streamlit"
      {...props}
    >
      <path
        fill="#FF4B4B"
        d="M17.7 7.3L12 1.5 6.3 7.3l2.8 2.8 2.9-2.9 2.9 2.9 2.8-2.8zM2.5 11.2L12 20.7l9.5-9.5-2.8-2.8-6.7 6.7-6.7-6.7-2.8 2.8z"
      />
    </svg>
  );
}

// ── 14. Pandas / Data Science (Navy #150458 / Yellow / Blue) ──
export function PandasIcon({ size = 18, className = '', ...props }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={`brand-icon brand-icon--pandas ${className}`}
      aria-label="Pandas"
      {...props}
    >
      <rect x="3" y="11" width="4" height="10" rx="1" fill="#150458" />
      <rect x="10" y="3" width="4" height="18" rx="1" fill="#FFD43B" />
      <rect x="17" y="7" width="4" height="14" rx="1" fill="#3776AB" />
    </svg>
  );
}

// ── 15. Scikit-learn (Official Orange #F7931E & Blue #3499CD) ──
export function ScikitLearnIcon({ size = 18, className = '', ...props }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={`brand-icon brand-icon--scikit ${className}`}
      aria-label="Scikit-learn"
      {...props}
    >
      <circle cx="8.5" cy="12" r="5" fill="#F7931E" />
      <circle cx="15.5" cy="12" r="5" fill="#3499CD" opacity="0.9" />
    </svg>
  );
}

// ── 16. Node.js (Official Green #5FA04E) ──
export function NodeIcon({ size = 18, className = '', ...props }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={`brand-icon brand-icon--node ${className}`}
      aria-label="Node.js"
      {...props}
    >
      <path
        fill="#5FA04E"
        d="M12 2l9 5.2v10.4L12 22.8 3 17.6V7.2L12 2zm0 2.3L5 8.3v7.4l7 4 7-4V8.3l-7-4z"
      />
    </svg>
  );
}

// ── 17. Docker (Official Blue #2496ED) ──
export function DockerIcon({ size = 18, className = '', ...props }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={`brand-icon brand-icon--docker ${className}`}
      aria-label="Docker"
      {...props}
    >
      <path
        fill="#2496ED"
        d="M13.9 8.2h-2.1V6.1h2.1v2.1zm-2.8 0H9V6.1h2.1v2.1zm-2.8 0H6.2V6.1h2.1v2.1zm8.4 2.8h-2.1V8.9h2.1V11zm-2.8 0h-2.1V8.9h2.1V11zm-2.8 0H9V8.9h2.1V11zm-2.8 0H6.2V8.9h2.1V11zm-2.8 0H3.4V8.9h2.1V11zm19.2 1.4c-.5-.4-1.6-.4-2.4-.2-.3-1.6-1.5-2.7-3-2.7-.2 0-.4 0-.6.1-.8-1.5-2.4-2.4-4.2-2.4H1.3c-.6 0-1.1.5-1.1 1.1v6.2c0 4.1 3.4 7.5 7.5 7.5h7.8c4.6 0 8.3-3.7 8.3-8.3 0-.5-.1-.9-.3-1.3z"
      />
    </svg>
  );
}

// ── 18. Figma (Official Multi-Color) ──
export function FigmaIcon({ size = 18, className = '', ...props }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={`brand-icon brand-icon--figma ${className}`}
      aria-label="Figma"
      {...props}
    >
      <path fill="#F24E1E" d="M8 2h4v5H8a2.5 2.5 0 010-5z" />
      <path fill="#FF7262" d="M12 2h4a2.5 2.5 0 010 5h-4V2z" />
      <path fill="#A259FF" d="M8 7h4v5H8a2.5 2.5 0 010-5z" />
      <path fill="#1ABCFE" d="M12 7h4a2.5 2.5 0 010 5h-4V7z" />
      <path fill="#0ACF83" d="M8 12h4v5a2.5 2.5 0 01-4 0v-5z" />
    </svg>
  );
}

// ── 19. Firebase (Official Amber/Orange #FFCA28 / #FFA000) ──
export function FirebaseIcon({ size = 18, className = '', ...props }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={`brand-icon brand-icon--firebase ${className}`}
      aria-label="Firebase"
      {...props}
    >
      <path fill="#FFA000" d="M3.8 18.2L8.5 2.9a.8.8 0 011.5 0l2.5 8.1-8.7 7.2z" />
      <path fill="#F57C00" d="M14.2 8.7L12.5 3.5a.8.8 0 00-1.5 0l-1.5 4.6 4.7.6z" />
      <path fill="#FFCA28" d="M20.2 18.2l-6-9.5-4.7 9.5h10.7z" />
      <path fill="#FFA000" d="M3.8 18.2l8.2 4.6a.8.8 0 00.8 0l8.2-4.6-8.6-1.5-8.6 1.5z" />
    </svg>
  );
}

// ── 20. MongoDB (Official Green #47A248) ──
export function MongoDbIcon({ size = 18, className = '', ...props }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={`brand-icon brand-icon--mongodb ${className}`}
      aria-label="MongoDB"
      {...props}
    >
      <path
        fill="#47A248"
        d="M12 1.5c-.2 0-.3.1-.4.2C10.4 3 6 8.9 6 14.5c0 4.1 3 7.5 6 8 3-0.5 6-3.9 6-8 0-5.6-4.4-11.5-5.6-12.8-.1-.1-.2-.2-.4-.2zm-.3 18.7c-2.3-.5-4.4-2.8-4.4-5.7 0-3.9 2.9-8.4 4.4-10.4v16.1zm.6 0V4.1c1.5 2 4.4 6.5 4.4 10.4 0 2.9-2.1 5.2-4.4 5.7z"
      />
    </svg>
  );
}

// ── 21. Social Brands: Instagram, Discord, Facebook ──
export function InstagramIcon({ size = 18, className = '', ...props }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={`brand-icon brand-icon--instagram ${className}`}
      aria-label="Instagram"
      {...props}
    >
      <path
        fill="#E4405F"
        d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"
      />
    </svg>
  );
}

export function DiscordIcon({ size = 18, className = '', ...props }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={`brand-icon brand-icon--discord ${className}`}
      aria-label="Discord"
      {...props}
    >
      <path
        fill="#5865F2"
        d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189z"
      />
    </svg>
  );
}

export function FacebookIcon({ size = 18, className = '', ...props }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={`brand-icon brand-icon--facebook ${className}`}
      aria-label="Facebook"
      {...props}
    >
      <path
        fill="#1877F2"
        d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
      />
    </svg>
  );
}

// ── Dynamic Technology Logo Resolver ──
export function TechLogo({ name, size = 15, className = '' }) {
  if (!name) return null;
  const key = name.toLowerCase().trim();

  if (key === 'python') return <PythonIcon size={size} className={className} />;
  if (key === 'react') return <ReactIcon size={size} className={className} />;
  if (key === 'javascript' || key === 'js') return <JavaScriptIcon size={size} className={className} />;
  if (key === 'typescript' || key === 'ts') return <TypeScriptIcon size={size} className={className} />;
  if (key === 'html' || key === 'html5') return <HtmlIcon size={size} className={className} />;
  if (key === 'css' || key === 'css3' || key === 'css grid' || key === 'css modules') return <CssIcon size={size} className={className} />;
  if (key === 'html & css' || key === 'html/css') {
    return (
      <span className="tech-logo-pair">
        <HtmlIcon size={size} className={className} />
        <CssIcon size={size} className={className} />
      </span>
    );
  }
  if (key === 'django') return <DjangoIcon size={size} className={className} />;
  if (key === 'git') return <GitIcon size={size} className={className} />;
  if (key === 'github') return <GithubIcon size={size} className={className} />;
  if (key === 'git & github') {
    return (
      <span className="tech-logo-pair">
        <GitIcon size={size} className={className} />
        <GithubIcon size={size} className={className} />
      </span>
    );
  }
  if (key === 'vs code' || key === 'vscode') return <VsCodeIcon size={size} className={className} />;
  if (key === 'vite') return <ViteIcon size={size} className={className} />;
  if (key === 'streamlit') return <StreamlitIcon size={size} className={className} />;
  if (key === 'pandas') return <PandasIcon size={size} className={className} />;
  if (key === 'pandas & numpy') {
    return (
      <span className="tech-logo-pair">
        <PandasIcon size={size} className={className} />
        <PandasIcon size={size} className={className} />
      </span>
    );
  }
  if (key === 'scikit-learn' || key === 'sklearn') return <ScikitLearnIcon size={size} className={className} />;
  if (key === 'node' || key === 'node.js') return <NodeIcon size={size} className={className} />;
  if (key === 'docker') return <DockerIcon size={size} className={className} />;
  if (key === 'figma') return <FigmaIcon size={size} className={className} />;
  if (key === 'firebase') return <FirebaseIcon size={size} className={className} />;
  if (key === 'mongodb') return <MongoDbIcon size={size} className={className} />;
  if (key === 'linkedin') return <LinkedinIcon size={size} className={className} />;

  return null;
}
