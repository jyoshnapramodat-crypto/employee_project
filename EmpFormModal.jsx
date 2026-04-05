import { useState } from 'react';
import Field from './Field';
import { DEPTS, ROLES, STATUSES } from '../utils';

function EmpFormModal({ emp, onClose, onSave }) {
  const isEdit = !!emp;
  const blank = { name:'', email:'', phone:'', department:'Engineering', role:'Developer', salary:'', status:'Active', location:'', joinDate:'' };
  const [form, setForm] = useState(isEdit ? { ...emp } : blank);
  const [errors, setErrors] = useState({});

  const f = (k, v) => setForm(p => ({ ...p, [k]: v }));

  const validate = () => {
    const e = {};
    if (!form.name.trim())  e.name  = 'Name required';
    if (!form.email || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Valid email required';
    if (!form.phone)        e.phone = 'Phone required';
    if (!form.salary || isNaN(form.salary)) e.salary = 'Valid salary required';
    return e;
  };

  const handleSave = () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    onSave({ ...form, salary: Number(form.salary) });
  };

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal-box" style={{ maxWidth: 520 }}>
        <h2>{isEdit ? 'Edit Employee ✏️' : 'Add Employee ➕'}</h2>
        <p>{isEdit ? 'Update the employee details below' : 'Fill in the details to add a new employee'}</p>

        <div className="form-row">
          <Field label="Full Name" value={form.name} error={errors.name} onChange={v => f('name', v)} placeholder="John Smith" />
          <Field label="Email" type="email" value={form.email} error={errors.email} onChange={v => f('email', v)} placeholder="john@company.com" />
        </div>
        <div className="form-row">
          <Field label="Phone" value={form.phone} error={errors.phone} onChange={v => f('phone', v)} placeholder="+1 (555) 000-0000" />
          <Field label="Salary ($)" type="number" value={form.salary} error={errors.salary} onChange={v => f('salary', v)} placeholder="65000" />
        </div>
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Department</label>
            <select className="form-input" value={form.department} onChange={e => f('department', e.target.value)}>
              {DEPTS.map(d => <option key={d}>{d}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Role</label>
            <select className="form-input" value={form.role} onChange={e => f('role', e.target.value)}>
              {ROLES.map(r => <option key={r}>{r}</option>)}
            </select>
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Status</label>
            <select className="form-input" value={form.status} onChange={e => f('status', e.target.value)}>
              {STATUSES.map(s => <option key={s}>{s}</option>)}
            </select>
          </div>
          <Field label="Location" value={form.location} onChange={v => f('location', v)} placeholder="New York" />
        </div>
        <Field label="Join Date" type="date" value={form.joinDate} onChange={v => f('joinDate', v)} />

        <div style={{ display: 'flex', gap: 10, marginTop: 8 }}>
          <button className="btn btn-outline" style={{ flex: 1 }} onClick={onClose}>Cancel</button>
          <button className="btn btn-primary" style={{ flex: 1 }} onClick={handleSave}>
            {isEdit ? '💾 Save Changes' : '➕ Add Employee'}
          </button>
        </div>
        <button onClick={onClose} style={{ position: 'absolute', top: 16, right: 20, background: 'none', border: 'none', fontSize: 20, cursor: 'pointer', color: 'var(--gray-400)' }}>✕</button>
      </div>
    </div>
  );
}

export default EmpFormModal;
