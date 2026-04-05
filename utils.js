// Utility functions
export const COLORS = ['#3b82f6','#10b981','#f59e0b','#8b5cf6','#ef4444','#0ea5e9','#ec4899','#14b8a6'];
export const initials = (name = '') => name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
export const avatarColor = (name = '') => COLORS[name.charCodeAt(0) % COLORS.length];
export const uid = () => Math.random().toString(36).slice(2, 9);

export const DEPTS = ['Engineering','Marketing','Sales','HR','Finance','Design','Operations','Support'];
export const ROLES = ['Manager','Senior Developer','Developer','Designer','Analyst','HR Specialist','Sales Executive','Support Engineer'];
export const STATUSES = ['Active','Inactive','On Leave'];

export const seedEmployees = () => {
  const saved = localStorage.getItem('ems_employees');
  if (saved) return JSON.parse(saved);
  const names = ['Alice Johnson','Bob Martinez','Carol White','David Lee','Emma Davis',
    'Frank Wilson','Grace Kim','Henry Brown','Iris Chen','James Taylor'];
  return names.map((name, i) => ({
    id: uid(), name,
    email: name.toLowerCase().replace(' ', '.') + `@company.com`,
    phone: `+1 (555) ${String(100 + i).padStart(3, '0')}-${String(1000 + i * 7).padStart(4, '0')}`,
    department: DEPTS[i % DEPTS.length],
    role: ROLES[i % ROLES.length],
    salary: (55000 + i * 8000),
    status: STATUSES[i % 3],
    joinDate: `202${Math.floor(i / 4) + 1}-0${(i % 9) + 1}-15`,
    location: ['New York','San Francisco','Austin','Chicago','Seattle'][i % 5],
    id_num: `EMP${String(1001 + i).padStart(4, '0')}`,
  }));
};

export const seedUser = () => {
  const saved = localStorage.getItem('ems_auth_user');
  if (saved) return JSON.parse(saved);
  return null;
};
