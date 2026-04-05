import { useState } from 'react';
import { seedEmployees, seedUser } from './utils';
import Toast        from './components/Toast';
import LandingPage  from './components/LandingPage';
import Dashboard    from './components/Dashboard';

function App() {
  const [page, setPage]         = useState('landing');
  const [authUser, setAuthUser] = useState(seedUser);
  const [employees, setEmployees] = useState(seedEmployees);
  const [toast, setToast]       = useState(null);

  const saveEmployees = (emps) => {
    setEmployees(emps);
    localStorage.setItem('ems_employees', JSON.stringify(emps));
  };

  const showToast = (msg, type = 'success') => setToast({ msg, type });

  const handleLogin = (user) => {
    setAuthUser(user);
    localStorage.setItem('ems_auth_user', JSON.stringify(user));
    setPage('dashboard');
    showToast(`Welcome back, ${user.name}! 👋`);
  };

  const handleLogout = () => {
    setAuthUser(null);
    localStorage.removeItem('ems_auth_user');
    setPage('landing');
    showToast('Logged out successfully', 'success');
  };

  return (
    <>
      {page === 'landing'
        ? <LandingPage onEnter={handleLogin} />
        : <Dashboard
            user={authUser}
            employees={employees}
            onSaveEmployees={saveEmployees}
            onLogout={handleLogout}
            showToast={showToast}
          />
      }
      {toast && <Toast msg={toast.msg} type={toast.type} onClose={() => setToast(null)} />}
    </>
  );
}

export default App;
