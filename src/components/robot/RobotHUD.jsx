import { Volume2, VolumeX, Mic, Activity, Command } from 'lucide-react';
import { PORTFOLIO_INTENTS } from '../../hooks/useRobotRecognition';
import './RobotHUD.css';

/**
 * RobotHUD — Floating HUD Interface Controls for the AI Voice System.
 * Accessible HTML controls (Layer 5 z-index).
 */
export function RobotHUD({
  robotState,
  onInitialize,
  isSpeaking,
  isMuted,
  onToggleMute,
  currentCaption,
  isListening,
  onStartListening,
  recognitionSupported,
  onSelectIntent,
  transcript,
}) {
  const isActivated = robotState !== 'IDLE' && robotState !== 'AWARE';

  return (
    <div className="robot-hud" aria-label="AI System Voice HUD">
      
      {/* ── 1. Floating Main Activation Button ── */}
      <div className="robot-hud__activation">
        <button
          className={`robot-hud__btn ${isActivated ? 'robot-hud__btn--active' : ''}`}
          onClick={onInitialize}
          aria-label={isActivated ? 'System Active' : 'Initialize System Voice'}
        >
          <span className={`hud-dot ${isActivated ? 'hud-dot--active' : ''}`} />
          <span className="hud-label">
            {isActivated ? '● VOICE ACTIVE' : '[ TALK TO BBH ]'}
          </span>
          {isSpeaking && <Activity size={14} className="hud-speaking-icon" />}
        </button>

        {/* Audio Mute Control */}
        <button
          className={`robot-hud__mute-btn ${isMuted ? 'is-muted' : ''}`}
          onClick={onToggleMute}
          aria-label={isMuted ? 'Unmute Robot Voice' : 'Mute Robot Voice'}
          title={isMuted ? 'Unmute Robot Voice' : 'Mute Robot Voice'}
        >
          {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
        </button>
      </div>

      {/* ── 2. Voice Link Status Indicator ── */}
      {isSpeaking && (
        <div className="robot-hud__speaking-badge" aria-live="polite">
          <span className="speaking-pulse" />
          <span className="speaking-text">VOICE LINK ACTIVE</span>
        </div>
      )}

      {/* ── 3. Accessibility Speech Subtitle Caption Overlay ── */}
      {currentCaption && (
        <div className="robot-hud__caption-card" aria-live="polite">
          <span className="caption-prefix">SYSTEM //</span>
          <p className="caption-text">&ldquo;{currentCaption}&rdquo;</p>
        </div>
      )}

      {/* ── 4. Post-Greeting Conversational Controls ── */}
      {isActivated && !isSpeaking && (
        <div className="robot-hud__queries-panel">
          <div className="queries-header">
            <span className="queries-title">ASK ME SOMETHING</span>
            {recognitionSupported && (
              <button
                className={`mic-btn ${isListening ? 'mic-btn--listening' : ''}`}
                onClick={onStartListening}
                title="Voice Command"
                aria-label="Start Voice Command"
              >
                <Mic size={13} />
                <span>{isListening ? 'LISTENING...' : 'VOICE'}</span>
              </button>
            )}
          </div>

          {transcript && <div className="hud-transcript">{transcript}</div>}

          {/* Quick Query Chips */}
          <div className="queries-chips">
            {PORTFOLIO_INTENTS.map((intent) => (
              <button
                key={intent.id}
                className="chip-btn"
                onClick={() => onSelectIntent(intent)}
              >
                <Command size={11} className="chip-icon" />
                <span>{intent.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
