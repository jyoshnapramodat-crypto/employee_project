import { DEPTS } from '../utils';

function DepartmentsTab({ employees }) {
  const deptData = DEPTS.map((name, i) => {
    const emps   = employees.filter(e => e.department === name);
    const active = emps.filter(e => e.status === 'Active').length;
    const icons  = ['⚙️','📢','💼','👤','💰','🎨','🏭','🎧'];
    return {
      name,
      count: emps.length,
      active,
      icon: icons[i],
      pct: employees.length ? Math.round(emps.length / employees.length * 100) : 0
    };
  });

  return (
    <div className="animate-fadeInUp">
      <div style={{ marginBottom: 24 }}>
        <h3 style={{ fontSize: 18, fontWeight: 700, color: 'var(--blue-900)', marginBottom: 6 }}>All Departments</h3>
        <p style={{ fontSize: 14, color: 'var(--gray-500)' }}>
          Overview of all {DEPTS.length} departments and their workforce
        </p>
      </div>

      <div className="dept-grid">
        {deptData.map(dept => (
          <div key={dept.name} className="dept-card">
            <div className="dept-icon">{dept.icon}</div>
            <div className="dept-name">{dept.name}</div>
            <div className="dept-count">{dept.count} employees · {dept.active} active</div>
            <div className="dept-bar">
              <div className="dept-bar-fill" style={{ width: `${dept.pct}%` }} />
            </div>
            <div style={{ marginTop: 10, fontSize: 12, color: 'var(--gray-400)' }}>
              {dept.pct}% of total workforce
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 28 }} className="panel">
        <div className="panel-header">
          <span className="panel-title">📊 Department Size Comparison</span>
        </div>
        <div className="panel-body" style={{ paddingTop: 20 }}>
          {[...deptData].sort((a, b) => b.count - a.count).map(dept => (
            <div key={dept.name} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
              <div style={{ width: 24, textAlign: 'center' }}>{dept.icon}</div>
              <div style={{ width: 110, fontSize: 13, fontWeight: 600, color: 'var(--gray-700)', flexShrink: 0 }}>{dept.name}</div>
              <div style={{ flex: 1, height: 10, borderRadius: 10, background: 'var(--gray-100)', overflow: 'hidden' }}>
                <div style={{
                  height: '100%', width: `${dept.pct}%`, borderRadius: 10,
                  background: 'linear-gradient(90deg,var(--blue-500),var(--accent))',
                  transition: 'width 0.8s'
                }} />
              </div>
              <div style={{ width: 30, fontSize: 13, fontWeight: 700, color: 'var(--blue-600)' }}>{dept.count}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DepartmentsTab;
