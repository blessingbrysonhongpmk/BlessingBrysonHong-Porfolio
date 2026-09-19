import { useState } from 'react';
import { usePortfolioContent } from '../../context/PortfolioContext';
import { Plus, Trash2 } from 'lucide-react';

export function AdminJourney() {
  const { draftContent, updateDraft } = usePortfolioContent();
  const journey = draftContent.journey || [];
  const experience = draftContent.experience || [];
  const education = draftContent.education || [];
  const achievements = draftContent.achievements || [];
  const milestonesSummary = draftContent.journeyMilestonesSummary || [];
  const achievementsSummary = draftContent.achievementsSummary || [];

  const [activeSubTab, setActiveSubTab] = useState('experience'); // 'experience' | 'milestones' | 'achievements' | 'education' | 'summaries'

  // Internships / Experience
  const handleUpdateExp = (index, field, val) => {
    const list = [...experience];
    list[index] = { ...list[index], [field]: val };
    updateDraft('experience', list);
  };

  // Full Milestones
  const handleUpdateJourney = (index, field, val) => {
    const list = [...journey];
    list[index] = { ...list[index], [field]: val };
    updateDraft('journey', list);
  };

  // Achievements
  const handleUpdateAch = (index, field, val) => {
    const list = [...achievements];
    list[index] = { ...list[index], [field]: val };
    updateDraft('achievements', list);
  };

  // Education
  const handleUpdateEdu = (index, field, val) => {
    const list = [...education];
    list[index] = { ...list[index], [field]: val };
    updateDraft('education', list);
  };

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h2 className="admin-page-header__title">Journey, Experience &amp; Honors</h2>
          <p className="admin-page-header__desc">
            Edit your verified experience (Nesus Park &amp; internships), university degree, chronological trajectory, and competitive achievements.
          </p>
        </div>
      </div>

      {/* Sub-tab strip */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', flexWrap: 'wrap' }}>
        <button
          type="button"
          className={`admin-btn ${activeSubTab === 'experience' ? 'admin-btn--primary' : 'admin-btn--ghost'}`}
          onClick={() => setActiveSubTab('experience')}
        >
          Verified Internships ({experience.length})
        </button>
        <button
          type="button"
          className={`admin-btn ${activeSubTab === 'milestones' ? 'admin-btn--primary' : 'admin-btn--ghost'}`}
          onClick={() => setActiveSubTab('milestones')}
        >
          Chronological Trajectory ({journey.length})
        </button>
        <button
          type="button"
          className={`admin-btn ${activeSubTab === 'achievements' ? 'admin-btn--primary' : 'admin-btn--ghost'}`}
          onClick={() => setActiveSubTab('achievements')}
        >
          Honors &amp; Achievements ({achievements.length})
        </button>
        <button
          type="button"
          className={`admin-btn ${activeSubTab === 'education' ? 'admin-btn--primary' : 'admin-btn--ghost'}`}
          onClick={() => setActiveSubTab('education')}
        >
          Academic Institution ({education.length})
        </button>
        <button
          type="button"
          className={`admin-btn ${activeSubTab === 'summaries' ? 'admin-btn--primary' : 'admin-btn--ghost'}`}
          onClick={() => setActiveSubTab('summaries')}
        >
          Homepage Summary Cards
        </button>
      </div>

      {/* SUB-TAB 1: Verified Internships */}
      {activeSubTab === 'experience' && (
        <div>
          {experience.map((exp, idx) => (
            <div key={exp.id || idx} className="admin-card">
              <div className="admin-card__header">
                <h3 className="admin-card__title">
                  {exp.company} — {exp.role}
                </h3>
              </div>

              <div className="admin-grid-3">
                <div className="admin-form-group">
                  <label className="admin-form-label">Company</label>
                  <input
                    type="text"
                    value={exp.company}
                    onChange={(e) => handleUpdateExp(idx, 'company', e.target.value)}
                    className="admin-input"
                  />
                </div>

                <div className="admin-form-group">
                  <label className="admin-form-label">Role</label>
                  <input
                    type="text"
                    value={exp.role}
                    onChange={(e) => handleUpdateExp(idx, 'role', e.target.value)}
                    className="admin-input"
                  />
                </div>

                <div className="admin-form-group">
                  <label className="admin-form-label">Period &amp; Location</label>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <input
                      type="text"
                      value={exp.period}
                      onChange={(e) => handleUpdateExp(idx, 'period', e.target.value)}
                      className="admin-input"
                      placeholder="2025"
                    />
                    <input
                      type="text"
                      value={exp.location}
                      onChange={(e) => handleUpdateExp(idx, 'location', e.target.value)}
                      className="admin-input"
                      placeholder="Location"
                    />
                  </div>
                </div>
              </div>

              <div className="admin-form-group">
                <label className="admin-form-label">Description</label>
                <textarea
                  rows={2}
                  value={exp.description}
                  onChange={(e) => handleUpdateExp(idx, 'description', e.target.value)}
                  className="admin-textarea"
                />
              </div>

              <div className="admin-form-group">
                <label className="admin-form-label">Key Highlights / Bullets</label>
                {(exp.highlights || []).map((h, hIdx) => (
                  <div key={hIdx} style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                    <input
                      type="text"
                      value={h}
                      onChange={(e) => {
                        const newH = [...exp.highlights];
                        newH[hIdx] = e.target.value;
                        handleUpdateExp(idx, 'highlights', newH);
                      }}
                      className="admin-input"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const newH = exp.highlights.filter((_, i) => i !== hIdx);
                        handleUpdateExp(idx, 'highlights', newH);
                      }}
                      style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => {
                    const newH = [...(exp.highlights || []), 'New internship achievement highlight'];
                    handleUpdateExp(idx, 'highlights', newH);
                  }}
                  className="admin-btn admin-btn--ghost"
                  style={{ fontSize: '0.78rem', marginTop: '6px' }}
                >
                  <Plus size={14} />
                  Add Bullet Point
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* SUB-TAB 2: Full Chronological Trajectory */}
      {activeSubTab === 'milestones' && (
        <div>
          {journey.map((item, idx) => (
            <div key={idx} className="admin-card">
              <div className="admin-card__header">
                <h3 className="admin-card__title">
                  {item.year}: {item.milestone}
                </h3>
              </div>

              <div className="admin-grid-3">
                <div className="admin-form-group">
                  <label className="admin-form-label">Year</label>
                  <input
                    type="text"
                    value={item.year}
                    onChange={(e) => handleUpdateJourney(idx, 'year', e.target.value)}
                    className="admin-input"
                  />
                </div>

                <div className="admin-form-group">
                  <label className="admin-form-label">Milestone Title</label>
                  <input
                    type="text"
                    value={item.milestone}
                    onChange={(e) => handleUpdateJourney(idx, 'milestone', e.target.value)}
                    className="admin-input"
                  />
                </div>

                <div className="admin-form-group">
                  <label className="admin-form-label">Category Tag</label>
                  <input
                    type="text"
                    value={item.tag}
                    onChange={(e) => handleUpdateJourney(idx, 'tag', e.target.value)}
                    className="admin-input"
                  />
                </div>
              </div>

              <div className="admin-form-group">
                <label className="admin-form-label">Summary</label>
                <input
                  type="text"
                  value={item.summary}
                  onChange={(e) => handleUpdateJourney(idx, 'summary', e.target.value)}
                  className="admin-input"
                />
              </div>

              <div className="admin-form-group">
                <label className="admin-form-label">In-Depth Details</label>
                <textarea
                  rows={2}
                  value={item.details}
                  onChange={(e) => handleUpdateJourney(idx, 'details', e.target.value)}
                  className="admin-textarea"
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* SUB-TAB 3: Honors & Achievements */}
      {activeSubTab === 'achievements' && (
        <div>
          {achievements.map((ach, idx) => (
            <div key={idx} className="admin-card">
              <div className="admin-card__header">
                <h3 className="admin-card__title">{ach.title}</h3>
              </div>

              <div className="admin-grid-3">
                <div className="admin-form-group">
                  <label className="admin-form-label">Title</label>
                  <input
                    type="text"
                    value={ach.title}
                    onChange={(e) => handleUpdateAch(idx, 'title', e.target.value)}
                    className="admin-input"
                  />
                </div>

                <div className="admin-form-group">
                  <label className="admin-form-label">Category</label>
                  <input
                    type="text"
                    value={ach.category}
                    onChange={(e) => handleUpdateAch(idx, 'category', e.target.value)}
                    className="admin-input"
                  />
                </div>

                <div className="admin-form-group">
                  <label className="admin-form-label">Result Status</label>
                  <input
                    type="text"
                    value={ach.result}
                    onChange={(e) => handleUpdateAch(idx, 'result', e.target.value)}
                    className="admin-input"
                  />
                </div>
              </div>

              <div className="admin-form-group">
                <label className="admin-form-label">Description</label>
                <textarea
                  rows={2}
                  value={ach.description}
                  onChange={(e) => handleUpdateAch(idx, 'description', e.target.value)}
                  className="admin-textarea"
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* SUB-TAB 4: Academic Institution */}
      {activeSubTab === 'education' && (
        <div>
          {education.map((edu, idx) => (
            <div key={idx} className="admin-card">
              <div className="admin-card__header">
                <h3 className="admin-card__title">{edu.degree}</h3>
              </div>

              <div className="admin-grid-2">
                <div className="admin-form-group">
                  <label className="admin-form-label">Degree</label>
                  <input
                    type="text"
                    value={edu.degree}
                    onChange={(e) => handleUpdateEdu(idx, 'degree', e.target.value)}
                    className="admin-input"
                  />
                </div>

                <div className="admin-form-group">
                  <label className="admin-form-label">Institution</label>
                  <input
                    type="text"
                    value={edu.institution}
                    onChange={(e) => handleUpdateEdu(idx, 'institution', e.target.value)}
                    className="admin-input"
                  />
                </div>
              </div>

              <div className="admin-grid-2">
                <div className="admin-form-group">
                  <label className="admin-form-label">Period</label>
                  <input
                    type="text"
                    value={edu.period}
                    onChange={(e) => handleUpdateEdu(idx, 'period', e.target.value)}
                    className="admin-input"
                  />
                </div>

                <div className="admin-form-group">
                  <label className="admin-form-label">Status</label>
                  <input
                    type="text"
                    value={edu.status}
                    onChange={(e) => handleUpdateEdu(idx, 'status', e.target.value)}
                    className="admin-input"
                  />
                </div>
              </div>

              <div className="admin-form-group">
                <label className="admin-form-label">Focus / Curriculum</label>
                <textarea
                  rows={2}
                  value={edu.focus}
                  onChange={(e) => handleUpdateEdu(idx, 'focus', e.target.value)}
                  className="admin-textarea"
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* SUB-TAB 5: Homepage Summary Cards */}
      {activeSubTab === 'summaries' && (
        <div>
          <div className="admin-card">
            <div className="admin-card__header">
              <h3 className="admin-card__title">Milestones Preview Stream (Column A)</h3>
            </div>

            {milestonesSummary.map((m, idx) => (
              <div key={idx} style={{ background: '#090b10', padding: '14px', borderRadius: '8px', marginBottom: '12px' }}>
                <div className="admin-grid-2">
                  <div className="admin-form-group" style={{ marginBottom: '8px' }}>
                    <label className="admin-form-label">Year</label>
                    <input
                      type="text"
                      value={m.year}
                      onChange={(e) => {
                        const list = [...milestonesSummary];
                        list[idx] = { ...list[idx], year: e.target.value };
                        updateDraft('journeyMilestonesSummary', list);
                      }}
                      className="admin-input"
                    />
                  </div>
                  <div className="admin-form-group" style={{ marginBottom: '8px' }}>
                    <label className="admin-form-label">Title</label>
                    <input
                      type="text"
                      value={m.title}
                      onChange={(e) => {
                        const list = [...milestonesSummary];
                        list[idx] = { ...list[idx], title: e.target.value };
                        updateDraft('journeyMilestonesSummary', list);
                      }}
                      className="admin-input"
                    />
                  </div>
                </div>
                <div className="admin-form-group" style={{ marginBottom: '0' }}>
                  <label className="admin-form-label">Description</label>
                  <input
                    type="text"
                    value={m.desc}
                    onChange={(e) => {
                      const list = [...milestonesSummary];
                      list[idx] = { ...list[idx], desc: e.target.value };
                      updateDraft('journeyMilestonesSummary', list);
                    }}
                    className="admin-input"
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="admin-card">
            <div className="admin-card__header">
              <h3 className="admin-card__title">Achievements Preview Stream (Column B)</h3>
            </div>

            {achievementsSummary.map((a, idx) => (
              <div key={idx} className="admin-grid-2" style={{ background: '#090b10', padding: '14px', borderRadius: '8px', marginBottom: '12px' }}>
                <div className="admin-form-group" style={{ marginBottom: '0' }}>
                  <label className="admin-form-label">Label</label>
                  <input
                    type="text"
                    value={a.label}
                    onChange={(e) => {
                      const list = [...achievementsSummary];
                      list[idx] = { ...list[idx], label: e.target.value };
                      updateDraft('achievementsSummary', list);
                    }}
                    className="admin-input"
                  />
                </div>
                <div className="admin-form-group" style={{ marginBottom: '0' }}>
                  <label className="admin-form-label">Detail</label>
                  <input
                    type="text"
                    value={a.detail}
                    onChange={(e) => {
                      const list = [...achievementsSummary];
                      list[idx] = { ...list[idx], detail: e.target.value };
                      updateDraft('achievementsSummary', list);
                    }}
                    className="admin-input"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
