import { useState } from 'react';
import Field from './Field';
import { DEPTS, ROLES } from '../utils';

function SignupModal({ onClose, onSuccess, onSwitch }) {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '', dept: 'Engineering', role: 'Manager' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.email) e.email = 'Email required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Invalid email';
    if (!form.password || form.password.length < 6) e.password = 'Min 6 characters';
    if (form.password !== form.confirm) e.confirm = 'Passwords do not match';
    return e;
  };

  const handleSubmit = () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setLoading(true);
    setTimeout(() => {
      const users = JSON.parse(localStorage.getItem('ems_users') || '[]');
      const newUser = {
        ...form,
        id_num: `EMP${String(1000 + users.length + 1).padStart(4, '0')}`,
        joinDate: new Date().toISOString().slice(0, 10),
        location: 'New York',
        phone: '+1 (555) 000-0000'
      };
      users.push(newUser);
      localStorage.setItem('ems_users', JSON.stringify(users));
      onSuccess(newUser);
      setLoading(false);
      onClose();
    }, 900);
  };

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal-box">
        <h2>Create Account 🎉</h2>
        <p>Join EMS and start managing your team today</p>
        <Field label="Full Name" value={form.name} error={errors.name}
          onChange={v => setForm({ ...form, name: v })} placeholder="John Smith" />
        <Field label="Email Address" type="email" value={form.email} error={errors.email}
          onChange={v => setForm({ ...form, email: v })} placeholder="you@company.com" />
        <div className="form-row">
          <Field label="Password" type="password" value={form.password} error={errors.password}
            onChange={v => setForm({ ...form, password: v })} placeholder="••••••••" />
          <Field label="Confirm Password" type="password" value={form.confirm} error={errors.confirm}
            onChange={v => setForm({ ...form, confirm: v })} placeholder="••••••••" />
        </div>
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Department</label>
            <select className="form-input filter-select" style={{ width: '100%', borderRadius: 'var(--radius-sm)' }}
              value={form.dept} onChange={e => setForm({ ...form, dept: e.target.value })}>
              {DEPTS.map(d => <option key={d}>{d}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Role</label>
            <select className="form-input filter-select" style={{ width: '100%', borderRadius: 'var(--radius-sm)' }}
              value={form.role} onChange={e => setForm({ ...form, role: e.target.value })}>
              {ROLES.map(r => <option key={r}>{r}</option>)}
            </select>
          </div>
        </div>
        <button className="btn btn-primary" style={{ width: '100%', marginTop: 8 }} onClick={handleSubmit} disabled={loading}>
          {loading ? '⏳ Creating account...' : '✨ Create Account'}
        </button>
        <p style={{ textAlign: 'center', marginTop: 18, fontSize: 13, color: 'var(--gray-500)' }}>
          Already have an account?{' '}
          <span style={{ color: 'var(--blue-600)', cursor: 'pointer', fontWeight: 600 }} onClick={onSwitch}>Log In</span>
        </p>
        <button onClick={onClose} style={{ position: 'absolute', top: 16, right: 20, background: 'none', border: 'none', fontSize: 20, cursor: 'pointer', color: 'var(--gray-400)' }}>✕</button>
      </div>
    </div>
  );
}

export default SignupModal;
