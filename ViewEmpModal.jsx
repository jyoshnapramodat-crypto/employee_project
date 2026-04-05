import { initials, avatarColor } from '../utils';

function ViewEmpModal({ emp, onClose }) {
  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal-box" style={{ maxWidth: 500 }}>
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <div className="emp-av" style={{ background: avatarColor(emp.name), width: 64, height: 64, fontSize: 22, margin: '0 auto 12px' }}>
            {initials(emp.name)}
          </div>
          <h2 style={{ fontSize: 20, marginBottom: 4 }}>{emp.name}</h2>
          <p style={{ marginBottom: 0 }}>{emp.role} · {emp.department}</p>
          <span className={`status-badge status-${emp.status.toLowerCase().replace(' ', '-')}`} style={{ marginTop: 10, display: 'inline-flex' }}>
            {emp.status}
          </span>
        </div>
        <div className="profile-details">
          {[
            ['📧 Email', emp.email],
            ['📱 Phone', emp.phone],
            ['🏢 Department', emp.department],
            ['💼 Role', emp.role],
            ['💰 Salary', `$${emp.salary?.toLocaleString()}`],
            ['📅 Joined', emp.joinDate],
            ['📍 Location', emp.location],
            ['🆔 ID', emp.id_num]
          ].map(([l, v]) => (
            <div key={l} className="profile-detail-item">
              <label>{l}</label><p>{v || '—'}</p>
            </div>
          ))}
        </div>
        <button className="btn btn-outline" style={{ width: '100%', marginTop: 24 }} onClick={onClose}>Close</button>
        <button onClick={onClose} style={{ position: 'absolute', top: 16, right: 20, background: 'none', border: 'none', fontSize: 20, cursor: 'pointer', color: 'var(--gray-400)' }}>✕</button>
      </div>
    </div>
  );
}

export default ViewEmpModal;
