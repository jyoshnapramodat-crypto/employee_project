import { useState } from 'react';
import Field from './Field';
import { DEPTS, ROLES } from '../utils';

function LoginModal({ onClose, onSuccess, onSwitch }) {
  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.email) e.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Invalid email';
    if (!form.password) e.password = 'Password is required';
    else if (form.password.length < 6) e.password = 'Min 6 characters';
    return e;
  };

  const handleSubmit = () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setLoading(true);
    setTimeout(() => {
      const users = JSON.parse(localStorage.getItem('ems_users') || '[]');
      const user = users.find(u => u.email === form.email && u.password === form.password);
      if (user) {
        onSuccess(user);
      } else {
        onSuccess({
          name: form.email.split('@')[0].replace('.', ' ').replace(/\b\w/g, c => c.toUpperCase()),
          email: form.email, role: 'Admin', dept: 'Engineering',
          phone: '+1 (555) 000-0001', joinDate: '2024-01-01',
          location: 'New York', id_num: 'EMP0001'
        });
      }
      setLoading(false);
      onClose();
    }, 900);
  };

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal-box">
        <h2>Welcome Back 👋</h2>
        <p>Log in to your EMS account to continue</p>
        <Field label="Email Address" type="email" value={form.email} error={errors.email}
          onChange={v => setForm({ ...form, email: v })} placeholder="you@company.com" />
        <Field label="Password" type="password" value={form.password} error={errors.password}
          onChange={v => setForm({ ...form, password: v })} placeholder="••••••••" />
        <button className="btn btn-primary" style={{ width: '100%', marginTop: 8 }} onClick={handleSubmit} disabled={loading}>
          {loading ? '⏳ Logging in...' : '🔐 Log In'}
        </button>
        <p style={{ textAlign: 'center', marginTop: 18, fontSize: 13, color: 'var(--gray-500)' }}>
          Don't have an account?{' '}
          <span style={{ color: 'var(--blue-600)', cursor: 'pointer', fontWeight: 600 }} onClick={onSwitch}>Sign Up</span>
        </p>
        <button onClick={onClose} style={{ position: 'absolute', top: 16, right: 20, background: 'none', border: 'none', fontSize: 20, cursor: 'pointer', color: 'var(--gray-400)' }}>✕</button>
      </div>
    </div>
  );
}

export default LoginModal;
