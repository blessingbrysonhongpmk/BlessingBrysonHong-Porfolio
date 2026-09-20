import { useState } from 'react';
import { usePortfolioContent } from '../../context/PortfolioContext';
import { Plus, Trash2, ArrowUp, ArrowDown, Eye, EyeOff, ExternalLink } from 'lucide-react';

export function AdminJourney() {
  const { draftContent, updateDraft } = usePortfolioContent();
  const companyExperiences = draftContent.companyExperiences || [];
  const journey = draftContent.journey || [];
  const experience = draftContent.experience || [];
  const education = draftContent.education || [];
  const achievements = draftContent.achievements || [];
  const milestonesSummary = draftContent.journeyMilestonesSummary || [];
  const achievementsSummary = draftContent.achievementsSummary || [];

  const [activeSubTab, setActiveSubTab] = useState('companies'); // 'companies' | 'experience' | 'milestones' | 'achievements' | 'education' | 'summaries'

  // Company Website Previews (3-Column Showcase)
  const handleUpdateCompanyExp = (index, field, val) => {
    const list = [...companyExperiences];
    list[index] = { ...list[index], [field]: val };
    updateDraft('companyExperiences', list);
  };

  const handleAddCompanyExp = () => {
    const newComp = {
      id: `company-${Date.now()}`,
      company: 'New Company',
      websiteUrl: 'https://example.com/',
      displayUrl: 'example.com',
      logo: '/companies/nexxspark-logo.svg',
      previewImage: '/companies/nexxspark-preview.png',
      mobilePreviewImage: '/companies/nexxspark-mobile.png',
      role: 'Intern',
      period: 'CURRENT',
      status: 'Software Engineering',
      description: 'Working on real-world projects.',
      technologies: ['Python'],
      accentColor: '#6366F1',
      accentGlow: 'rgba(99, 102, 241, 0.28)',
      themeClass: 'company-card--custom',
      browserTitle: 'Company — Website Preview',
      hidden: false,
    };
    updateDraft('companyExperiences', [...companyExperiences, newComp]);
  };

  const handleDeleteCompanyExp = (index) => {
    if (window.confirm(`Delete "${companyExperiences[index]?.company || 'this company'}" preview?`)) {
      const list = companyExperiences.filter((_, i) => i !== index);
      updateDraft('companyExperiences', list);
    }
  };

  const handleMoveCompanyExp = (index, direction) => {
    const list = [...companyExperiences];
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= list.length) return;
    const temp = list[index];
    list[index] = list[targetIdx];
    list[targetIdx] = temp;
    updateDraft('companyExperiences', list);
  };

  const handleToggleHideCompanyExp = (index) => {
    const list = [...companyExperiences];
    list[index] = { ...list[index], hidden: !list[index].hidden };
    updateDraft('companyExperiences', list);
  };

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
            Edit your verified experience (Nex-X Spark &amp; internships), university degree, chronological trajectory, and competitive achievements.
          </p>
        </div>
      </div>

      {/* Sub-tab strip */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', flexWrap: 'wrap' }}>
        <button
          type="button"
          className={`admin-btn ${activeSubTab === 'companies' ? 'admin-btn--primary' : 'admin-btn--ghost'}`}
          onClick={() => setActiveSubTab('companies')}
        >
          Company Website Previews ({companyExperiences.length})
        </button>
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

      {/* SUB-TAB 0: Company Website Previews */}
      {activeSubTab === 'companies' && (
        <div>
          <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <p style={{ margin: 0, fontSize: '0.86rem', color: 'var(--color-text-secondary)' }}>
              These 3 interactive browser cards appear in the <strong>INTERNSHIPS &amp; EXPERIENCE</strong> showcase on the home page.
            </p>
            <button
              type="button"
              className="admin-btn admin-btn--primary"
              onClick={handleAddCompanyExp}
              style={{ fontSize: '0.8rem' }}
            >
              <Plus size={14} /> Add Company Card
            </button>
          </div>

          {companyExperiences.map((comp, idx) => (
            <div
              key={comp.id || idx}
              className="admin-card"
              style={{
                opacity: comp.hidden ? 0.6 : 1,
                borderLeft: `4px solid ${comp.accentColor || 'var(--color-primary)'}`,
                marginBottom: '20px',
              }}
            >
              <div className="admin-card__header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  {comp.logo && (
                    <div style={{ width: '28px', height: '28px', background: '#FFF', borderRadius: '4px', padding: '2px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <img src={comp.logo} alt="" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
                    </div>
                  )}
                  <h3 className="admin-card__title" style={{ margin: 0 }}>
                    #{idx + 1} {comp.company} — <span style={{ color: comp.accentColor }}>{comp.role}</span> ({comp.period})
                    {comp.hidden && <span style={{ marginLeft: '8px', fontSize: '0.72rem', color: '#f59e0b' }}>[HIDDEN]</span>}
                  </h3>
                </div>

                <div style={{ display: 'flex', gap: '6px' }}>
                  <button
                    type="button"
                    className="admin-btn admin-btn--ghost"
                    onClick={() => handleMoveCompanyExp(idx, 'up')}
                    disabled={idx === 0}
                    title="Move Up"
                    style={{ padding: '6px 8px' }}
                  >
                    <ArrowUp size={14} />
                  </button>
                  <button
                    type="button"
                    className="admin-btn admin-btn--ghost"
                    onClick={() => handleMoveCompanyExp(idx, 'down')}
                    disabled={idx === companyExperiences.length - 1}
                    title="Move Down"
                    style={{ padding: '6px 8px' }}
                  >
                    <ArrowDown size={14} />
                  </button>
                  <button
                    type="button"
                    className="admin-btn admin-btn--ghost"
                    onClick={() => handleToggleHideCompanyExp(idx)}
                    title={comp.hidden ? 'Show on Public Site' : 'Hide from Public Site'}
                    style={{ padding: '6px 8px' }}
                  >
                    {comp.hidden ? <EyeOff size={14} /> : <Eye size={14} />}
                  </button>
                  <button
                    type="button"
                    className="admin-btn admin-btn--danger"
                    onClick={() => handleDeleteCompanyExp(idx)}
                    title="Delete Company"
                    style={{ padding: '6px 8px' }}
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>

              {/* Form Grid */}
              <div className="admin-grid-3">
                <div className="admin-form-group">
                  <label className="admin-form-label">Company Name</label>
                  <input
                    type="text"
                    value={comp.company}
                    onChange={(e) => handleUpdateCompanyExp(idx, 'company', e.target.value)}
                    className="admin-input"
                  />
                </div>
                <div className="admin-form-group">
                  <label className="admin-form-label">Role</label>
                  <input
                    type="text"
                    value={comp.role}
                    onChange={(e) => handleUpdateCompanyExp(idx, 'role', e.target.value)}
                    className="admin-input"
                    placeholder="Intern or Internship"
                  />
                </div>
                <div className="admin-form-group">
                  <label className="admin-form-label">Period / Status</label>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <input
                      type="text"
                      value={comp.period}
                      onChange={(e) => handleUpdateCompanyExp(idx, 'period', e.target.value)}
                      className="admin-input"
                      placeholder="CURRENT or 2026"
                    />
                    <input
                      type="text"
                      value={comp.status}
                      onChange={(e) => handleUpdateCompanyExp(idx, 'status', e.target.value)}
                      className="admin-input"
                      placeholder="Focus Area"
                    />
                  </div>
                </div>
              </div>

              <div className="admin-grid-3">
                <div className="admin-form-group">
                  <label className="admin-form-label">Official Website URL</label>
                  <input
                    type="text"
                    value={comp.websiteUrl}
                    onChange={(e) => handleUpdateCompanyExp(idx, 'websiteUrl', e.target.value)}
                    className="admin-input"
                    placeholder="https://example.com/"
                  />
                </div>
                <div className="admin-form-group">
                  <label className="admin-form-label">Display Domain</label>
                  <input
                    type="text"
                    value={comp.displayUrl}
                    onChange={(e) => handleUpdateCompanyExp(idx, 'displayUrl', e.target.value)}
                    className="admin-input"
                    placeholder="example.com"
                  />
                </div>
                <div className="admin-form-group">
                  <label className="admin-form-label">Official Logo URL</label>
                  <input
                    type="text"
                    value={comp.logo}
                    onChange={(e) => handleUpdateCompanyExp(idx, 'logo', e.target.value)}
                    className="admin-input"
                    placeholder="/companies/logo.png"
                  />
                </div>
              </div>

              <div className="admin-grid-3">
                <div className="admin-form-group">
                  <label className="admin-form-label">Desktop Preview Image</label>
                  <input
                    type="text"
                    value={comp.previewImage}
                    onChange={(e) => handleUpdateCompanyExp(idx, 'previewImage', e.target.value)}
                    className="admin-input"
                    placeholder="/companies/preview.png"
                  />
                </div>
                <div className="admin-form-group">
                  <label className="admin-form-label">Mobile Preview Image</label>
                  <input
                    type="text"
                    value={comp.mobilePreviewImage}
                    onChange={(e) => handleUpdateCompanyExp(idx, 'mobilePreviewImage', e.target.value)}
                    className="admin-input"
                    placeholder="/companies/mobile.png"
                  />
                </div>
                <div className="admin-form-group">
                  <label className="admin-form-label">Accent Color &amp; Glow</label>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <input
                      type="color"
                      value={comp.accentColor?.startsWith('#') ? comp.accentColor : '#6366F1'}
                      onChange={(e) => {
                        const col = e.target.value;
                        handleUpdateCompanyExp(idx, 'accentColor', col);
                      }}
                      style={{ width: '40px', height: '36px', padding: '2px', border: '1px solid var(--color-border)', borderRadius: '6px', background: 'transparent', cursor: 'pointer' }}
                    />
                    <input
                      type="text"
                      value={comp.accentColor}
                      onChange={(e) => handleUpdateCompanyExp(idx, 'accentColor', e.target.value)}
                      className="admin-input"
                      placeholder="#6366F1"
                    />
                  </div>
                </div>
              </div>

              <div className="admin-form-group">
                <label className="admin-form-label">Verified Experience Description</label>
                <textarea
                  rows={2}
                  value={comp.description}
                  onChange={(e) => handleUpdateCompanyExp(idx, 'description', e.target.value)}
                  className="admin-textarea"
                />
              </div>

              <div className="admin-grid-2">
                <div className="admin-form-group">
                  <label className="admin-form-label">Technologies (comma separated)</label>
                  <input
                    type="text"
                    value={(comp.technologies || []).join(', ')}
                    onChange={(e) => {
                      const tags = e.target.value.split(',').map((s) => s.trim()).filter(Boolean);
                      handleUpdateCompanyExp(idx, 'technologies', tags);
                    }}
                    className="admin-input"
                    placeholder="Python, Django"
                  />
                </div>
                <div className="admin-form-group">
                  <label className="admin-form-label">Browser Mockup Window Title</label>
                  <input
                    type="text"
                    value={comp.browserTitle || ''}
                    onChange={(e) => handleUpdateCompanyExp(idx, 'browserTitle', e.target.value)}
                    className="admin-input"
                    placeholder="Company — Website Preview"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

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
