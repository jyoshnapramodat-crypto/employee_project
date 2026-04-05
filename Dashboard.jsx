import { useState } from 'react';
import { initials, avatarColor } from '../utils';
import OverviewTab     from './OverviewTab';
import EmployeesTab    from './EmployeesTab';
import DepartmentsTab  from './DepartmentsTab';
import ProfileTab      from './ProfileTab';

function Dashboard({ user, employees, onSaveEmployees, onLogout, showToast }) {
  const [activeTab, setActiveTab]     = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navItems = [
    { id: 'overview',     icon: '📊', label: 'Overview'    },
    { id: 'employees',    icon: '👥', label: 'Employees'   },
    { id: 'departments',  icon: '🏢', label: 'Departments' },
    { id: 'profile',      icon: '👤', label: 'My Profile'  },
  ];

  return (
    <div className="db-layout">
      <button className="sidebar-toggle" onClick={() => setSidebarOpen(!sidebarOpen)}>☰</button>

      {/* SIDEBAR */}
      <aside className={`sidebar${sidebarOpen ? ' open' : ''}`}>
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <div className="sidebar-logo-icon">👥</div>
            <span>EMS</span>
          </div>
        </div>
        <nav className="sidebar-nav">
          <div className="sidebar-section-label">Main Menu</div>
          {navItems.map(item => (
            <div
              key={item.id}
              className={`sidebar-item${activeTab === item.id ? ' active' : ''}`}
              onClick={() => { setActiveTab(item.id); setSidebarOpen(false); }}
            >
              <span className="sidebar-item-icon">{item.icon}</span>
              {item.label}
            </div>
          ))}
        </nav>
        <div className="sidebar-footer">
          <div className="sidebar-user">
            <div className="sidebar-user-av" style={{ background: avatarColor(user?.name || 'A') }}>
              {initials(user?.name || 'Admin')}
            </div>
            <div>
              <div className="sidebar-user-name">{user?.name || 'Admin'}</div>
              <div className="sidebar-user-role">{user?.role || 'Administrator'}</div>
            </div>
            <button className="sidebar-logout-btn" onClick={onLogout} title="Logout">⏏</button>
          </div>
        </div>
      </aside>

      {/* MAIN */}
      <main className="db-main">
        <div className="db-topbar">
          <div className="db-topbar-title">
            {navItems.find(n => n.id === activeTab)?.icon}{' '}
            {navItems.find(n => n.id === activeTab)?.label}
          </div>
          <div className="db-topbar-right">
            <div className="db-notif">🔔<div className="db-notif-dot" /></div>
            <div className="db-user-chip">
              <div className="db-user-chip-av" style={{ background: avatarColor(user?.name || 'A') }}>
                {initials(user?.name || 'A')}
              </div>
              <span className="db-user-chip-name">{(user?.name || 'Admin').split(' ')[0]}</span>
            </div>
          </div>
        </div>

        <div className="db-content">
          {activeTab === 'overview'    && <OverviewTab    employees={employees} />}
          {activeTab === 'employees'   && <EmployeesTab   employees={employees} onSave={onSaveEmployees} showToast={showToast} />}
          {activeTab === 'departments' && <DepartmentsTab employees={employees} />}
          {activeTab === 'profile'     && <ProfileTab     user={user} />}
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
