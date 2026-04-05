import { DEPTS, initials, avatarColor } from '../utils';

function OverviewTab({ employees }) {
  const active   = employees.filter(e => e.status === 'Active').length;
  const onLeave  = employees.filter(e => e.status === 'On Leave').length;
  const depts    = [...new Set(employees.map(e => e.department))].length;
  const recent   = [...employees].slice(0, 5);

  return (
    <div className="animate-fadeInUp">
      <div className="stats-row">
        {[
          { label:'Total Employees', value: employees.length, icon:'👥', bg:'#dbeafe', chg:'↑ 12% this month', up: true },
          { label:'Active',          value: active,           icon:'✅', bg:'#d1fae5', chg:'↑ 8% this month',  up: true },
          { label:'On Leave',        value: onLeave,          icon:'🏖️', bg:'#fef3c7', chg:'→ No change',      up: false },
          { label:'Departments',     value: depts,            icon:'🏢', bg:'#ede9fe', chg:'↑ 1 new dept',     up: true },
        ].map(s => (
          <div key={s.label} className="stat-card">
            <div className="stat-icon" style={{ background: s.bg }}>{s.icon}</div>
            <div className="stat-info">
              <div className="stat-value">{s.value}</div>
              <div className="stat-label">{s.label}</div>
              <div className={`stat-change ${s.up ? 'up' : 'down'}`}>{s.chg}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="panel">
        <div className="panel-header">
          <span className="panel-title">🏢 Department Breakdown</span>
        </div>
        <div className="panel-body" style={{ paddingTop: 20 }}>
          {DEPTS.map(dept => {
            const count = employees.filter(e => e.department === dept).length;
            const pct   = employees.length ? Math.round(count / employees.length * 100) : 0;
            return (
              <div key={dept} style={{ marginBottom: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, fontSize: 13 }}>
                  <span style={{ fontWeight: 600, color: 'var(--gray-700)' }}>{dept}</span>
                  <span style={{ color: 'var(--gray-500)' }}>{count} employees · {pct}%</span>
                </div>
                <div style={{ height: 8, borderRadius: 8, background: 'var(--gray-100)', overflow: 'hidden' }}>
                  <div style={{
                    height: '100%', width: `${pct}%`, borderRadius: 8,
                    background: 'linear-gradient(90deg,var(--blue-500),var(--accent))',
                    transition: 'width 0.8s ease'
                  }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div style={{ marginTop: 24 }} className="panel">
        <div className="panel-header">
          <span className="panel-title">🕒 Recent Employees</span>
        </div>
        <div className="table-wrap">
          <table className="emp-table">
            <thead><tr>
              <th>Employee</th><th>Department</th><th>Role</th><th>Status</th>
            </tr></thead>
            <tbody>
              {recent.map(e => (
                <tr key={e.id}>
                  <td><div className="emp-av-cell">
                    <div className="emp-av" style={{ background: avatarColor(e.name) }}>{initials(e.name)}</div>
                    <div><div className="emp-name">{e.name}</div><div className="emp-email">{e.email}</div></div>
                  </div></td>
                  <td>{e.department}</td>
                  <td>{e.role}</td>
                  <td><span className={`status-badge status-${e.status.toLowerCase().replace(' ', '-')}`}>{e.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default OverviewTab;
