import { initials, avatarColor } from '../utils';

function ProfileTab({ user }) {
  if (!user) return (
    <div className="empty-state">
      <div className="empty-icon">👤</div>
      <h4>No profile data</h4>
    </div>
  );

  return (
    <div className="animate-fadeInUp" style={{ maxWidth: 700 }}>
      <div className="profile-card">
        <div className="profile-banner" />
        <div className="profile-body">
          <div className="profile-av-wrap">
            <div className="profile-av" style={{ background: avatarColor(user.name || 'A') }}>
              {initials(user.name || 'Admin')}
            </div>
          </div>
          <div className="profile-name">{user.name || 'Administrator'}</div>
          <div className="profile-role">{user.role || 'Admin'} · {user.dept || user.department || 'Management'}</div>
          <div className="profile-details">
            {[
              ['📧 Email',       user.email],
              ['📱 Phone',       user.phone || '—'],
              ['🏢 Department',  user.dept || user.department || '—'],
              ['💼 Role',        user.role || '—'],
              ['📅 Joined',      user.joinDate || '—'],
              ['📍 Location',    user.location || '—'],
              ['🆔 Employee ID', user.id_num || 'EMP0001'],
              ['🔒 Account Type','Administrator'],
            ].map(([l, v]) => (
              <div key={l} className="profile-detail-item">
                <label>{l}</label><p>{v || '—'}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ marginTop: 20, padding: 24, background: '#fff', borderRadius: 'var(--radius-md)', border: '1.5px solid var(--gray-100)', boxShadow: 'var(--shadow-sm)' }}>
        <h4 style={{ fontSize: 15, fontWeight: 700, color: 'var(--blue-900)', marginBottom: 16 }}>🔒 Account Security</h4>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <button className="btn btn-outline btn-sm">🔑 Change Password</button>
          <button className="btn btn-outline btn-sm">🛡️ Two-Factor Auth</button>
          <button className="btn btn-outline btn-sm">📋 Activity Log</button>
        </div>
      </div>
    </div>
  );
}

export default ProfileTab;
