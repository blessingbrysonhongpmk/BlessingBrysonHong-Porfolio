import { useState } from 'react';
import { AdminProfile } from './AdminProfile';
import { AdminSocials } from './AdminSocials';
import { AdminBackup } from './AdminBackup';
import { User, Share2, Database } from 'lucide-react';

export function AdminSettings() {
  const [subTab, setSubTab] = useState('profile'); // 'profile' | 'socials' | 'backup'

  return (
    <div className="admin-settings-wrap">
      <div className="admin-subtabs" style={{ display: 'flex', gap: '8px', marginBottom: '24px', borderBottom: '1px solid var(--color-border)', paddingBottom: '12px' }}>
        <button
          type="button"
          className={`admin-btn ${subTab === 'profile' ? 'admin-btn--primary' : 'admin-btn--ghost'}`}
          onClick={() => setSubTab('profile')}
          style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
        >
          <User size={15} />
          <span>Profile Info</span>
        </button>

        <button
          type="button"
          className={`admin-btn ${subTab === 'socials' ? 'admin-btn--primary' : 'admin-btn--ghost'}`}
          onClick={() => setSubTab('socials')}
          style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
        >
          <Share2 size={15} />
          <span>Social Channels</span>
        </button>

        <button
          type="button"
          className={`admin-btn ${subTab === 'backup' ? 'admin-btn--primary' : 'admin-btn--ghost'}`}
          onClick={() => setSubTab('backup')}
          style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
        >
          <Database size={15} />
          <span>Backup &amp; Export</span>
        </button>
      </div>

      <div className="admin-subtab-content">
        {subTab === 'profile' && <AdminProfile />}
        {subTab === 'socials' && <AdminSocials />}
        {subTab === 'backup' && <AdminBackup />}
      </div>
    </div>
  );
}
