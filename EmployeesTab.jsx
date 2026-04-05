import { useState } from 'react';
import { DEPTS, STATUSES, initials, avatarColor, uid } from '../utils';
import ViewEmpModal from './ViewEmpModal';
import EmpFormModal from './EmpFormModal';

function EmployeesTab({ employees, onSave, showToast }) {
  const [search, setSearch]     = useState('');
  const [deptFilter, setDept]   = useState('');
  const [statusFilter, setStatus] = useState('');
  const [page, setPage]         = useState(1);
  const [modal, setModal]       = useState(null);
  const PER_PAGE = 6;

  const filtered = employees.filter(e => {
    const q = search.toLowerCase();
    const matchQ = !q || e.name.toLowerCase().includes(q) || e.email.toLowerCase().includes(q) || e.role.toLowerCase().includes(q);
    const matchD = !deptFilter || e.department === deptFilter;
    const matchS = !statusFilter || e.status === statusFilter;
    return matchQ && matchD && matchS;
  });

  const pages  = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const sliced = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const handleSave = (emp) => {
    if (emp.id) {
      onSave(employees.map(e => e.id === emp.id ? emp : e));
      showToast('Employee updated ✏️');
    } else {
      onSave([...employees, { ...emp, id: uid(), id_num: `EMP${String(1001 + employees.length).padStart(4, '0')}` }]);
      showToast('Employee added 🎉');
    }
    setModal(null);
  };

  const handleDelete = (id) => {
    if (!window.confirm('Delete this employee?')) return;
    onSave(employees.filter(e => e.id !== id));
    showToast('Employee deleted 🗑️', 'error');
  };

  return (
    <div className="animate-fadeInUp">
      <div className="panel">
        <div className="panel-header">
          <span className="panel-title">👥 All Employees ({filtered.length})</span>
          <button className="btn btn-primary btn-sm" onClick={() => setModal({ type: 'add' })}>
            ＋ Add Employee
          </button>
        </div>
        <div className="search-bar">
          <div className="search-input-wrap">
            <span className="search-icon">🔍</span>
            <input className="search-input" placeholder="Search by name, email, role…"
              value={search} onChange={e => { setSearch(e.target.value); setPage(1); }} />
          </div>
          <select className="filter-select" value={deptFilter}
            onChange={e => { setDept(e.target.value); setPage(1); }}>
            <option value="">All Departments</option>
            {DEPTS.map(d => <option key={d}>{d}</option>)}
          </select>
          <select className="filter-select" value={statusFilter}
            onChange={e => { setStatus(e.target.value); setPage(1); }}>
            <option value="">All Statuses</option>
            {STATUSES.map(s => <option key={s}>{s}</option>)}
          </select>
        </div>

        {sliced.length === 0
          ? <div className="empty-state">
              <div className="empty-icon">🔍</div>
              <h4>No employees found</h4>
              <p>Try adjusting your search or filters.</p>
            </div>
          : <div className="table-wrap">
              <table className="emp-table">
                <thead><tr>
                  <th>Employee</th><th>Dept</th><th>Role</th><th>Salary</th><th>Status</th><th>Actions</th>
                </tr></thead>
                <tbody>
                  {sliced.map(e => (
                    <tr key={e.id}>
                      <td><div className="emp-av-cell">
                        <div className="emp-av" style={{ background: avatarColor(e.name) }}>{initials(e.name)}</div>
                        <div><div className="emp-name">{e.name}</div><div className="emp-email">{e.email}</div></div>
                      </div></td>
                      <td style={{ fontSize: 12 }}>{e.department}</td>
                      <td style={{ fontSize: 12 }}>{e.role}</td>
                      <td style={{ fontWeight: 700, color: 'var(--blue-600)', fontSize: 13 }}>${e.salary?.toLocaleString()}</td>
                      <td><span className={`status-badge status-${e.status.toLowerCase().replace(' ', '-')}`}>{e.status}</span></td>
                      <td>
                        <div className="action-btns">
                          <button className="action-btn action-btn-view" title="View" onClick={() => setModal({ type: 'view', emp: e })}>👁</button>
                          <button className="action-btn action-btn-edit" title="Edit" onClick={() => setModal({ type: 'edit', emp: e })}>✏️</button>
                          <button className="action-btn action-btn-delete" title="Delete" onClick={() => handleDelete(e.id)}>🗑</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
        }

        <div className="pagination">
          <div className="page-info">
            Showing {Math.min((page - 1) * PER_PAGE + 1, filtered.length)}–{Math.min(page * PER_PAGE, filtered.length)} of {filtered.length}
          </div>
          <div className="page-btns">
            <button className="page-btn" onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}>‹</button>
            {Array.from({ length: pages }, (_, i) => i + 1).map(p => (
              <button key={p} className={`page-btn${p === page ? ' active' : ''}`} onClick={() => setPage(p)}>{p}</button>
            ))}
            <button className="page-btn" onClick={() => setPage(p => Math.min(pages, p + 1))} disabled={page === pages}>›</button>
          </div>
        </div>
      </div>

      {modal?.type === 'view' && <ViewEmpModal emp={modal.emp} onClose={() => setModal(null)} />}
      {(modal?.type === 'add' || modal?.type === 'edit') &&
        <EmpFormModal emp={modal.emp} onClose={() => setModal(null)} onSave={handleSave} />}
    </div>
  );
}

export default EmployeesTab;
