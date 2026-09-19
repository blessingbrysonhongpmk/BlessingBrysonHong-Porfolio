import { memo } from 'react';
import './AmbientBackground.css';

/**
 * AmbientBackground
 * Provides soft, organic "aurora" floating blobs and a faint tactile micro-grid texture.
 * Sits at z-index: 0 behind all content with zero pointer events and GPU-only transforms.
 */
function AmbientBackgroundComponent() {
  return (
    <div className="ambient-background" aria-hidden="true">
      {/* Aurora Floating Blobs */}
      <div className="ambient-blob ambient-blob--accent" />
      <div className="ambient-blob ambient-blob--indigo" />
      <div className="ambient-blob ambient-blob--amber" />

      {/* Tactile Texture / Faint Micro-Grid Overlay */}
      <div className="ambient-texture-overlay" />
    </div>
  );
}

export const AmbientBackground = memo(AmbientBackgroundComponent);
