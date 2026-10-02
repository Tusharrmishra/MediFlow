import { useMemo, useState, type ReactNode } from "react";

type Role = "Administrator" | "Doctor" | "Patient" | "Receptionist" | "Lab Technician" | "Pharmacist" | "Billing Staff";
type Page = "dashboard" | "patients" | "appointments" | "consultation" | "laboratory" | "pharmacy" | "billing" | "beds" | "reports" | "activity" | "settings";

type IconName =
  | "activity" | "ai" | "appointments" | "beds" | "bell" | "billing" | "calendar" | "check" | "chevron"
  | "clock" | "dashboard" | "doctors" | "download" | "edit" | "eye" | "flask" | "heart" | "logout"
  | "menu" | "more" | "patients" | "pharmacy" | "plus" | "reports" | "search" | "settings" | "shield"
  | "sparkle" | "trash" | "trend" | "user" | "x";

const iconPaths: Record<IconName, ReactNode> = {
  activity: <><path d="M3 12h4l2.2-6 4.3 12 2.2-6H21" /></>,
  ai: <><path d="M12 3l1.4 4.1L17.5 8.5l-4.1 1.4L12 14l-1.4-4.1-4.1-1.4 4.1-1.4L12 3Z" /><path d="m19 15 .7 2.3L22 18l-2.3.7L19 21l-.7-2.3L16 18l2.3-.7L19 15Z" /></>,
  appointments: <><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M16 3v4M8 3v4M3 10h18M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01" /></>,
  beds: <><path d="M3 20v-7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v7M3 17h18M6 11V7a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v4" /></>,
  bell: <><path d="M18 8a6 6 0 1 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4" /></>,
  billing: <><path d="M6 2h12v20l-3-2-3 2-3-2-3 2V2Z" /><path d="M9 7h6M9 11h6M9 15h3" /></>,
  calendar: <><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M16 3v4M8 3v4M3 10h18" /></>,
  check: <path d="m5 12 4 4L19 6" />,
  chevron: <path d="m9 18 6-6-6-6" />,
  clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
  dashboard: <><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></>,
  doctors: <><circle cx="12" cy="8" r="4" /><path d="M5 21a7 7 0 0 1 14 0M18 8h4M20 6v4" /></>,
  download: <><path d="M12 3v12m0 0 4-4m-4 4-4-4M4 21h16" /></>,
  edit: <><path d="m14 4 6 6L8 22H2v-6L14 4Z" /><path d="m12 6 6 6" /></>,
  eye: <><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" /><circle cx="12" cy="12" r="3" /></>,
  flask: <><path d="M9 3h6M10 3v6l-5 9a2 2 0 0 0 2 3h10a2 2 0 0 0 2-3l-5-9V3M8 15h8" /></>,
  heart: <><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z" /><path d="M7 12h3l1-2 2 4 1-2h3" /></>,
  logout: <><path d="M10 17l5-5-5-5M15 12H3M21 19V5a2 2 0 0 0-2-2h-6" /></>,
  menu: <path d="M4 6h16M4 12h16M4 18h16" />,
  more: <><circle cx="5" cy="12" r="1" /><circle cx="12" cy="12" r="1" /><circle cx="19" cy="12" r="1" /></>,
  patients: <><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M19 8v6M22 11h-6" /></>,
  pharmacy: <><path d="m10.5 20.5-7-7a5 5 0 0 1 7-7l7 7a5 5 0 0 1-7 7Z" /><path d="m8 11 5-5M14 14l4 4" /></>,
  plus: <path d="M12 5v14M5 12h14" />,
  reports: <><path d="M4 20V10M10 20V4M16 20v-7M22 20H2" /></>,
  search: <><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></>,
  settings: <><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-2.8 2.8-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.6v.2h-4V21a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1L4.2 17l.1-.1a1.7 1.7 0 0 0 .3-1.9A1.7 1.7 0 0 0 3 14H2.8v-4H3a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.9L4.2 7 7 4.2l.1.1A1.7 1.7 0 0 0 9 4.6a1.7 1.7 0 0 0 1-1.6v-.2h4V3a1.7 1.7 0 0 0 1 1.6 1.7 1.7 0 0 0 1.9-.3l.1-.1L19.8 7l-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.6 1h.2v4H21a1.7 1.7 0 0 0-1.6 1Z" /></>,
  shield: <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" /><path d="m9 12 2 2 4-4" /></>,
  sparkle: <><path d="m12 3 1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3Z" /></>,
  trash: <><path d="M4 7h16M9 7V4h6v3M7 7l1 14h8l1-14M10 11v6M14 11v6" /></>,
  trend: <><path d="m3 17 6-6 4 4 8-9" /><path d="M15 6h6v6" /></>,
  user: <><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></>,
  x: <path d="m6 6 12 12M18 6 6 18" />,
};

function Icon({ name, size = "md" }: { name: IconName; size?: "sm" | "md" | "lg" }) {
  return <svg className={`icon icon-${size}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{iconPaths[name]}</svg>;
}

function Button({ children, variant = "primary", icon, onClick, type = "button", className = "", disabled = false }: { children?: ReactNode; variant?: "primary" | "secondary" | "ghost" | "danger"; icon?: IconName; onClick?: () => void; type?: "button" | "submit"; className?: string; disabled?: boolean }) {
  return <button type={type} className={`btn btn-${variant} ${className}`} onClick={onClick} disabled={disabled}>{icon && <Icon name={icon} size="sm" />}{children}</button>;
}

function Field({ label, value, onChange, type = "text", placeholder, required, error }: { label: string; value: string; onChange: (value: string) => void; type?: string; placeholder?: string; required?: boolean; error?: string }) {
  return <label className="field"><span>{label}{required && <b> *</b>}</span><input type={type} value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} />{error && <small>{error}</small>}</label>;
}

function SelectField({ label, value, onChange, options }: { label: string; value: string; onChange: (value: string) => void; options: string[] }) {
  return <label className="field"><span>{label}</span><select value={value} onChange={(e) => onChange(e.target.value)}>{options.map((item) => <option key={item}>{item}</option>)}</select></label>;
}

function Status({ value }: { value: string }) {
  const tone = ["Completed", "Paid", "Active", "Available", "Report Ready", "Confirmed"].includes(value) ? "success" : ["Pending", "Waiting", "Low stock", "Partially Paid"].includes(value) ? "warning" : ["Cancelled", "Out of stock", "Critical"].includes(value) ? "danger" : "info";
  return <span className={`status status-${tone}`}><i />{value}</span>;
}

function Logo({ compact = false }: { compact?: boolean }) {
  return <div className="logo"><span className="logo-mark"><Icon name="heart" /></span>{!compact && <span><strong>MediFlow</strong><small>Hospital Workflow</small></span>}</div>;
}

const patientsSeed = [
  { id: "PT-1048", name: "Sophia Bennett", age: 34, gender: "Female", phone: "+1 555 0142", email: "sophia.b@example.test", date: "May 18, 2025", status: "Active", blood: "A+" },
  { id: "PT-1047", name: "Ethan Carter", age: 52, gender: "Male", phone: "+1 555 0188", email: "ethan.c@example.test", date: "May 18, 2025", status: "Active", blood: "O+" },
  { id: "PT-1046", name: "Maya Thompson", age: 27, gender: "Female", phone: "+1 555 0176", email: "maya.t@example.test", date: "May 17, 2025", status: "Inactive", blood: "B+" },
  { id: "PT-1045", name: "Noah Wilson", age: 61, gender: "Male", phone: "+1 555 0119", email: "noah.w@example.test", date: "May 16, 2025", status: "Active", blood: "AB-" },
  { id: "PT-1044", name: "Ava Rodriguez", age: 43, gender: "Female", phone: "+1 555 0191", email: "ava.r@example.test", date: "May 15, 2025", status: "Active", blood: "O-" },
];

const appointmentsSeed = [
  { id: "AP-2084", patient: "Sophia Bennett", doctor: "Dr. Maya Chen", department: "Cardiology", date: "Today", time: "09:30 AM", type: "Follow-up", status: "Confirmed" },
  { id: "AP-2085", patient: "Ethan Carter", doctor: "Dr. Oliver Grant", department: "Orthopedics", date: "Today", time: "10:15 AM", type: "Consultation", status: "Waiting" },
  { id: "AP-2086", patient: "Noah Wilson", doctor: "Dr. Maya Chen", department: "Cardiology", date: "Today", time: "11:00 AM", type: "Consultation", status: "In progress" },
  { id: "AP-2087", patient: "Ava Rodriguez", doctor: "Dr. Sarah Ahmed", department: "Neurology", date: "May 20, 2025", time: "02:00 PM", type: "Follow-up", status: "Confirmed" },
  { id: "AP-2088", patient: "Maya Thompson", doctor: "Dr. Liam Brooks", department: "General Medicine", date: "May 21, 2025", time: "09:00 AM", type: "Consultation", status: "Pending" },
];

const roleNav: Record<Role, { label: string; page: Page; icon: IconName }[]> = {
  Administrator: [
    { label: "Overview", page: "dashboard", icon: "dashboard" }, { label: "Patients", page: "patients", icon: "patients" },
    { label: "Appointments", page: "appointments", icon: "appointments" }, { label: "Laboratory", page: "laboratory", icon: "flask" },
    { label: "Pharmacy", page: "pharmacy", icon: "pharmacy" }, { label: "Billing", page: "billing", icon: "billing" },
    { label: "Beds & inpatient", page: "beds", icon: "beds" }, { label: "Reports", page: "reports", icon: "reports" },
    { label: "System activity", page: "activity", icon: "activity" }, { label: "Settings", page: "settings", icon: "settings" },
  ],
  Doctor: [
    { label: "Overview", page: "dashboard", icon: "dashboard" }, { label: "My appointments", page: "appointments", icon: "appointments" },
    { label: "Patient records", page: "patients", icon: "patients" }, { label: "Consultation", page: "consultation", icon: "doctors" },
    { label: "AI clinical assist", page: "consultation", icon: "ai" }, { label: "Laboratory results", page: "laboratory", icon: "flask" },
  ],
  Patient: [
    { label: "Overview", page: "dashboard", icon: "dashboard" }, { label: "Book appointment", page: "appointments", icon: "appointments" },
    { label: "Medical history", page: "patients", icon: "patients" }, { label: "Prescriptions", page: "pharmacy", icon: "pharmacy" },
    { label: "Lab reports", page: "laboratory", icon: "flask" }, { label: "Billing & payments", page: "billing", icon: "billing" },
  ],
  Receptionist: [
    { label: "Overview", page: "dashboard", icon: "dashboard" }, { label: "Patient registration", page: "patients", icon: "patients" },
    { label: "Appointments", page: "appointments", icon: "appointments" }, { label: "Waiting list", page: "activity", icon: "clock" },
    { label: "Beds & inpatient", page: "beds", icon: "beds" },
  ],
  "Lab Technician": [
    { label: "Overview", page: "dashboard", icon: "dashboard" }, { label: "Lab requests", page: "laboratory", icon: "flask" },
    { label: "Completed tests", page: "activity", icon: "check" },
  ],
  Pharmacist: [
    { label: "Overview", page: "dashboard", icon: "dashboard" }, { label: "Prescriptions", page: "pharmacy", icon: "pharmacy" },
    { label: "Stock reports", page: "reports", icon: "reports" },
  ],
  "Billing Staff": [
    { label: "Overview", page: "dashboard", icon: "dashboard" }, { label: "Patient billing", page: "billing", icon: "billing" },
    { label: "Payment reports", page: "reports", icon: "reports" },
  ],
};

function Login({ onLogin }: { onLogin: (role: Role) => void }) {
  const [role, setRole] = useState<Role>("Administrator");
  const [email, setEmail] = useState("admin@mediflow.demo");
  const [password, setPassword] = useState("mediflow");
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return setError("Enter your email and password to continue.");
    setError("");
    onLogin(role);
  };
  const roles: { role: Role; icon: IconName }[] = [
    { role: "Administrator", icon: "shield" }, { role: "Doctor", icon: "doctors" }, { role: "Patient", icon: "user" },
    { role: "Receptionist", icon: "appointments" }, { role: "Lab Technician", icon: "flask" }, { role: "Pharmacist", icon: "pharmacy" },
    { role: "Billing Staff", icon: "billing" },
  ];
  return <main className="login-shell">
    <section className="login-story">
      <Logo />
      <div className="story-copy">
        <span className="eyebrow"><Icon name="sparkle" size="sm" /> Connected care, simplified</span>
        <h1>One workflow.<br /><em>Better care.</em></h1>
        <p>Bring every team, patient touchpoint, and operational decision into one secure hospital workspace.</p>
        <div className="story-stats">
          <div><strong>32%</strong><span>faster patient flow</span></div>
          <div><strong>99.9%</strong><span>record availability</span></div>
          <div><strong>24/7</strong><span>operational insight</span></div>
        </div>
      </div>
      <div className="story-card">
        <div className="pulse-ring"><Icon name="activity" size="lg" /></div>
        <div><span>Hospital operations</span><strong>All systems running smoothly</strong></div>
        <Status value="Active" />
      </div>
    </section>
    <section className="login-panel">
      <form className="login-form" onSubmit={submit}>
        <div className="mobile-logo"><Logo /></div>
        <span className="eyebrow">MediFlow secure access</span>
        <h2>Welcome back</h2>
        <p>Sign in to continue to your personalized workspace.</p>
        <Field label="Email or username" value={email} onChange={setEmail} placeholder="name@hospital.com" required />
        <label className="field"><span>Password <b>*</b></span><div className="password-wrap"><input type={show ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} /><button type="button" onClick={() => setShow(!show)} aria-label="Toggle password"><Icon name="eye" size="sm" /></button></div></label>
        <div className="form-row"><label className="check-label"><input type="checkbox" defaultChecked /> Remember me</label><button className="text-button" type="button">Forgot password?</button></div>
        <div className="role-label"><span>Continue as</span><small>Demo access</small></div>
        <div className="role-grid">{roles.map((item) => <button type="button" key={item.role} className={role === item.role ? "role-card selected" : "role-card"} onClick={() => setRole(item.role)}><Icon name={item.icon} /><span>{item.role}</span>{role === item.role && <i><Icon name="check" size="sm" /></i>}</button>)}</div>
        {error && <div className="form-error">{error}</div>}
        <Button type="submit" className="login-button">Enter MediFlow <Icon name="chevron" size="sm" /></Button>
        <small className="prototype-note"><Icon name="shield" size="sm" /> Prototype environment · Mock data only · JWT-ready architecture</small>
      </form>
    </section>
  </main>;
}

function Header({ title, role, onMenu, onNotifications }: { title: string; role: Role; onMenu: () => void; onNotifications: () => void }) {
  return <header className="topbar">
    <div className="topbar-title"><button className="menu-button" onClick={onMenu}><Icon name="menu" /></button><div><span>Workspace</span><h2>{title}</h2></div></div>
    <div className="topbar-tools">
      <label className="global-search"><Icon name="search" size="sm" /><input placeholder="Search patients, appointments..." /><kbd>⌘ K</kbd></label>
      <button className="icon-button" onClick={onNotifications} aria-label="Notifications"><Icon name="bell" /><i>4</i></button>
      <div className="profile"><span className="avatar">MC</span><div><strong>{role === "Doctor" ? "Dr. Maya Chen" : role === "Patient" ? "Sophia Bennett" : "Morgan Cooper"}</strong><small>{role}</small></div><Icon name="chevron" size="sm" /></div>
    </div>
  </header>;
}

function Sidebar({ role, page, open, collapsed, onToggle, onNavigate, onLogout }: { role: Role; page: Page; open: boolean; collapsed: boolean; onToggle: () => void; onNavigate: (page: Page) => void; onLogout: () => void }) {
  return <aside className={`sidebar ${open ? "open" : ""} ${collapsed ? "collapsed" : ""}`}>
    <div className="sidebar-head"><Logo compact={collapsed} /><button className="collapse-button" onClick={onToggle}><Icon name="chevron" size="sm" /></button></div>
    <nav><span className="nav-heading">{collapsed ? "—" : "MAIN MENU"}</span>{roleNav[role].map((item) => <button key={`${item.label}-${item.page}`} className={page === item.page ? "nav-item active" : "nav-item"} onClick={() => onNavigate(item.page)}><Icon name={item.icon} /><span>{item.label}</span>{item.label === "Lab requests" && <b>12</b>}</button>)}</nav>
    <div className="sidebar-foot">
      {!collapsed && <div className="help-card"><span><Icon name="sparkle" size="sm" /></span><strong>Need help?</strong><p>Visit the MediFlow support center.</p><button>Open support</button></div>}
      <button className="nav-item logout" onClick={onLogout}><Icon name="logout" /><span>Sign out</span></button>
      {!collapsed && <small>MEDIFLOW v1.0 · PROTOTYPE</small>}
    </div>
  </aside>;
}

function PageHeader({ eyebrow, title, description, children }: { eyebrow?: string; title: string; description: string; children?: ReactNode }) {
  return <div className="page-header"><div>{eyebrow && <span className="eyebrow">{eyebrow}</span>}<h1>{title}</h1><p>{description}</p></div>{children && <div className="page-actions">{children}</div>}</div>;
}

function Metric({ icon, label, value, change, tone = "blue" }: { icon: IconName; label: string; value: string; change: string; tone?: string }) {
  return <div className="metric-card"><div className={`metric-icon tone-${tone}`}><Icon name={icon} /></div><div className="metric-copy"><span>{label}</span><strong>{value}</strong><small><b><Icon name="trend" size="sm" /> {change}</b> vs last month</small></div><button><Icon name="more" size="sm" /></button></div>;
}

function Dashboard({ role, navigate }: { role: Role; navigate: (page: Page) => void }) {
  const isDoctor = role === "Doctor";
  const isPatient = role === "Patient";
  const firstName = isDoctor ? "Maya" : isPatient ? "Sophia" : "Morgan";
  return <>
    <PageHeader eyebrow="MONDAY, MAY 19" title={`Good morning, ${firstName}`} description={isPatient ? "Here is the latest on your care journey." : "Here’s what’s happening across your hospital today."}>
      <Button variant="secondary" icon="download">Export report</Button><Button icon="plus" onClick={() => navigate(isPatient ? "appointments" : "patients")}>{isPatient ? "Book appointment" : "Register patient"}</Button>
    </PageHeader>
    <div className="metric-grid">
      <Metric icon="patients" label={isPatient ? "Care providers" : isDoctor ? "My patients" : "Total patients"} value={isPatient ? "4" : isDoctor ? "184" : "12,842"} change="+8.4%" tone="blue" />
      <Metric icon="appointments" label={isPatient ? "Upcoming visits" : "Today’s appointments"} value={isPatient ? "2" : "148"} change="+12.2%" tone="teal" />
      <Metric icon="beds" label={isPatient ? "Active prescriptions" : "Available beds"} value={isPatient ? "3" : "38"} change="+4.1%" tone="green" />
      <Metric icon="billing" label={isPatient ? "Pending balance" : "Monthly revenue"} value={isPatient ? "$240" : "$284.6K"} change="+16.8%" tone="violet" />
    </div>
    <div className="dashboard-grid">
      <section className="card chart-card">
        <div className="card-head"><div><h3>{isPatient ? "Health activity" : "Patient activity"}</h3><p>{isPatient ? "Your care interactions over 6 months" : "Admissions and discharges over 7 days"}</p></div><select><option>Last 7 days</option><option>Last 30 days</option></select></div>
        <div className="chart-legend"><span><i className="legend-blue" /> Admissions</span><span><i className="legend-teal" /> Discharges</span></div>
        <div className="line-chart">
          <div className="y-axis"><span>160</span><span>120</span><span>80</span><span>40</span><span>0</span></div>
          <div className="chart-area"><div className="grid-lines"><i /><i /><i /><i /><i /></div><svg viewBox="0 0 700 190" preserveAspectRatio="none"><defs><linearGradient id="area" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="currentColor" stopOpacity=".22" /><stop offset="1" stopColor="currentColor" stopOpacity="0" /></linearGradient></defs><path className="chart-fill" d="M0 155 C70 140 75 85 150 112 S240 145 300 72 S390 105 450 58 S535 92 610 35 S670 52 700 25 L700 190 L0 190Z" /><path className="chart-line" d="M0 155 C70 140 75 85 150 112 S240 145 300 72 S390 105 450 58 S535 92 610 35 S670 52 700 25" /><path className="chart-line alt" d="M0 170 C60 125 95 145 150 135 S230 90 300 118 S370 85 450 104 S530 55 610 79 S670 45 700 58" /></svg><div className="x-axis"><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span></div></div>
        </div>
      </section>
      <section className="card schedule-card">
        <div className="card-head"><div><h3>{isPatient ? "Upcoming care" : "Today’s schedule"}</h3><p>{isPatient ? "Your next appointments" : "148 appointments total"}</p></div><Button variant="ghost" onClick={() => navigate("appointments")}>View all</Button></div>
        <div className="schedule-list">
          {appointmentsSeed.slice(0, 4).map((a, i) => <div className="schedule-item" key={a.id}><div className="time"><strong>{a.time.split(" ")[0]}</strong><small>{a.time.split(" ")[1]}</small></div><i className={`schedule-line line-${i}`} /><div><strong>{isPatient ? a.department : a.patient}</strong><span>{a.department} · {a.type}</span></div><Status value={a.status} /></div>)}
        </div>
      </section>
      <section className="card department-card">
        <div className="card-head"><div><h3>Department activity</h3><p>Appointments by department</p></div><button><Icon name="more" /></button></div>
        <div className="donut-wrap"><div className="donut"><div><strong>148</strong><span>Total today</span></div></div><div className="donut-legend">{[["Cardiology", "34", "blue"], ["General medicine", "42", "teal"], ["Orthopedics", "28", "green"], ["Other departments", "44", "purple"]].map(([name, n, c]) => <div key={name}><i className={`dot-${c}`} /><span>{name}</span><strong>{n}</strong></div>)}</div></div>
      </section>
      <section className="card alerts-card">
        <div className="card-head"><div><h3>Needs attention</h3><p>Operational alerts</p></div><span className="alert-count">6 open</span></div>
        {[["pharmacy", "12 medicines low in stock", "Pharmacy · 10 min ago", "warning"], ["flask", "8 lab reports await review", "Laboratory · 24 min ago", "blue"], ["beds", "ICU at 86% capacity", "Inpatient · 1 hr ago", "danger"]].map(([icon, title, sub, tone]) => <button className="alert-row" key={title} onClick={() => navigate(icon === "pharmacy" ? "pharmacy" : icon === "flask" ? "laboratory" : "beds")}><span className={`alert-icon alert-${tone}`}><Icon name={icon as IconName} /></span><div><strong>{title}</strong><small>{sub}</small></div><Icon name="chevron" size="sm" /></button>)}
      </section>
    </div>
    <section className="card recent-card"><div className="card-head"><div><h3>Recent patient registrations</h3><p>Latest additions to MediFlow</p></div><Button variant="ghost" onClick={() => navigate("patients")}>View all patients <Icon name="chevron" size="sm" /></Button></div><PatientTable patients={patientsSeed.slice(0, 4)} onView={() => navigate("patients")} compact /></section>
  </>;
}

function PatientTable({ patients, onView, compact = false }: { patients: typeof patientsSeed; onView: (patient: typeof patientsSeed[number]) => void; compact?: boolean }) {
  return <div className="table-wrap"><table><thead><tr><th>Patient</th><th>Patient ID</th>{!compact && <><th>Age / Gender</th><th>Contact</th></>}<th>Registered</th><th>Status</th><th /></tr></thead><tbody>{patients.map((p, i) => <tr key={p.id}><td><div className="person-cell"><span className={`avatar avatar-${i}`}>{p.name.split(" ").map((n) => n[0]).join("")}</span><div><strong>{p.name}</strong>{compact && <small>{p.gender}, {p.age} years</small>}</div></div></td><td><code>{p.id}</code></td>{!compact && <><td>{p.age} · {p.gender}</td><td><strong className="regular">{p.phone}</strong><small>{p.email}</small></td></>}<td>{p.date}</td><td><Status value={p.status} /></td><td><button className="row-action" onClick={() => onView(p)}><Icon name="eye" size="sm" /></button></td></tr>)}</tbody></table></div>;
}

function PatientsPage({ onToast }: { onToast: (text: string) => void }) {
  const [patients, setPatients] = useState(patientsSeed);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All statuses");
  const [modal, setModal] = useState<"add" | "view" | null>(null);
  const [selected, setSelected] = useState(patients[0]);
  const [tab, setTab] = useState("Overview");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const filtered = patients.filter((p) => (p.name.toLowerCase().includes(search.toLowerCase()) || p.id.toLowerCase().includes(search.toLowerCase())) && (status === "All statuses" || p.status === status));
  const addPatient = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;
    const next = { id: `PT-${1049 + patients.length}`, name, age: 29, gender: "Female", phone, email: "new.patient@example.test", date: "May 19, 2025", status: "Active", blood: "O+" };
    setPatients([next, ...patients]); setModal(null); setName(""); setPhone(""); onToast(`${name} was registered successfully.`);
  };
  const openPatient = (p: typeof patientsSeed[number]) => { setSelected(p); setModal("view"); };
  return <>
    <PageHeader eyebrow="PATIENT MANAGEMENT" title="Patients" description="Manage patient records, care history, and registration details."><Button variant="secondary" icon="download">Export</Button><Button icon="plus" onClick={() => setModal("add")}>Register patient</Button></PageHeader>
    <section className="card data-card">
      <div className="toolbar"><label className="search-box"><Icon name="search" size="sm" /><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by patient name or ID..." /></label><SelectField label="" value={status} onChange={setStatus} options={["All statuses", "Active", "Inactive"]} /><span className="result-count">{filtered.length} patients</span></div>
      <PatientTable patients={filtered} onView={openPatient} />
      <div className="pagination"><span>Showing 1–{filtered.length} of {filtered.length}</span><div><Button variant="secondary" disabled>Previous</Button><button className="page-number">1</button><Button variant="secondary">Next</Button></div></div>
    </section>
    {modal === "add" && <Modal title="Register a new patient" description="Create a secure patient record. Fields marked * are required." onClose={() => setModal(null)}>
      <form onSubmit={addPatient}><div className="form-grid"><Field label="Full name" value={name} onChange={setName} required error={!name ? undefined : ""} /><Field label="Date of birth" value="1996-08-14" onChange={() => {}} type="date" /><SelectField label="Gender" value="Female" onChange={() => {}} options={["Female", "Male", "Non-binary", "Prefer not to say"]} /><Field label="Contact number" value={phone} onChange={setPhone} required /><Field label="Email address" value="" onChange={() => {}} type="email" /><SelectField label="Blood group" value="O+" onChange={() => {}} options={["O+", "O-", "A+", "A-", "B+", "B-", "AB+", "AB-"]} /><Field label="Address" value="" onChange={() => {}} /><Field label="Emergency contact" value="" onChange={() => {}} /></div><label className="field"><span>Known allergies & relevant history</span><textarea placeholder="Add allergies, chronic conditions, or relevant medical history..." /></label><div className="modal-actions"><Button variant="secondary" onClick={() => setModal(null)}>Cancel</Button><Button type="submit">Register patient</Button></div></form>
    </Modal>}
    {modal === "view" && <Modal title={selected.name} description={`${selected.id} · ${selected.age} years · Blood group ${selected.blood}`} onClose={() => setModal(null)} wide>
      <div className="profile-banner"><span className="avatar large">{selected.name.split(" ").map((n) => n[0]).join("")}</span><div><Status value={selected.status} /><p>{selected.phone} · {selected.email}</p></div><Button variant="secondary" icon="edit">Edit profile</Button></div>
      <div className="tabs">{["Overview", "Medical History", "Appointments", "Prescriptions", "Lab Reports", "Billing"].map((item) => <button key={item} className={tab === item ? "active" : ""} onClick={() => setTab(item)}>{item}</button>)}</div>
      {tab === "Overview" ? <div className="profile-grid"><div className="info-panel"><h4>Clinical summary</h4><dl><div><dt>Known allergies</dt><dd>Penicillin, shellfish</dd></div><div><dt>Chronic conditions</dt><dd>Hypertension</dd></div><div><dt>Last visit</dt><dd>May 02, 2025</dd></div><div><dt>Primary physician</dt><dd>Dr. Maya Chen</dd></div></dl></div><div className="info-panel"><h4>Latest vitals</h4><div className="vitals"><div><strong>120/78</strong><span>Blood pressure</span></div><div><strong>72 bpm</strong><span>Heart rate</span></div><div><strong>98%</strong><span>Oxygen</span></div><div><strong>36.7°C</strong><span>Temperature</span></div></div></div></div> : <div className="empty-state"><span><Icon name={tab === "Lab Reports" ? "flask" : tab === "Billing" ? "billing" : "activity"} size="lg" /></span><h4>{tab}</h4><p>Authorized {tab.toLowerCase()} records for this patient appear here.</p><Button variant="secondary">View available records</Button></div>}
    </Modal>}
  </>;
}

function AppointmentsPage({ onToast }: { onToast: (text: string) => void }) {
  const [appointments, setAppointments] = useState(appointmentsSeed);
  const [search, setSearch] = useState("");
  const [view, setView] = useState<"list" | "calendar">("list");
  const [booking, setBooking] = useState(false);
  const [patient, setPatient] = useState("Sophia Bennett");
  const [department, setDepartment] = useState("Cardiology");
  const [doctor, setDoctor] = useState("Dr. Maya Chen");
  const [slot, setSlot] = useState("03:30 PM");
  const filtered = appointments.filter((a) => `${a.patient} ${a.doctor} ${a.id}`.toLowerCase().includes(search.toLowerCase()));
  const book = (e: React.FormEvent) => {
    e.preventDefault();
    if (appointments.some((a) => a.doctor === doctor && a.time === slot && a.date === "May 22, 2025")) return onToast("That time slot is no longer available.");
    setAppointments([...appointments, { id: `AP-${2084 + appointments.length}`, patient, doctor, department, date: "May 22, 2025", time: slot, type: "Consultation", status: "Confirmed" }]);
    setBooking(false); onToast("Appointment booked and confirmation sent.");
  };
  return <>
    <PageHeader eyebrow="SCHEDULING" title="Appointments" description="Coordinate schedules, availability, waiting lists, and patient visits."><div className="segmented"><button className={view === "list" ? "active" : ""} onClick={() => setView("list")}>List</button><button className={view === "calendar" ? "active" : ""} onClick={() => setView("calendar")}>Calendar</button></div><Button icon="plus" onClick={() => setBooking(true)}>Book appointment</Button></PageHeader>
    {view === "list" ? <section className="card data-card"><div className="toolbar"><label className="search-box"><Icon name="search" size="sm" /><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search appointments..." /></label><SelectField label="" value="All departments" onChange={() => {}} options={["All departments", "Cardiology", "Neurology", "Orthopedics"]} /><SelectField label="" value="All statuses" onChange={() => {}} options={["All statuses", "Confirmed", "Waiting", "Completed"]} /></div><div className="table-wrap"><table><thead><tr><th>Appointment</th><th>Patient</th><th>Doctor / Department</th><th>Date & time</th><th>Type</th><th>Status</th><th /></tr></thead><tbody>{filtered.map((a, i) => <tr key={a.id}><td><code>{a.id}</code></td><td><div className="person-cell"><span className={`avatar avatar-${i}`}>{a.patient.split(" ").map((n) => n[0]).join("")}</span><strong>{a.patient}</strong></div></td><td><strong>{a.doctor}</strong><small>{a.department}</small></td><td><strong>{a.date}</strong><small>{a.time}</small></td><td>{a.type}</td><td><Status value={a.status} /></td><td><button className="row-action"><Icon name="more" size="sm" /></button></td></tr>)}</tbody></table></div></section> : <Calendar appointments={appointments} />}
    {booking && <Modal title="Book an appointment" description="Available times update based on doctor and department." onClose={() => setBooking(false)}>
      <form onSubmit={book}><div className="form-grid"><SelectField label="Patient" value={patient} onChange={setPatient} options={patientsSeed.map((p) => p.name)} /><SelectField label="Department" value={department} onChange={setDepartment} options={["Cardiology", "General Medicine", "Neurology", "Orthopedics"]} /><SelectField label="Doctor" value={doctor} onChange={setDoctor} options={["Dr. Maya Chen", "Dr. Oliver Grant", "Dr. Sarah Ahmed", "Dr. Liam Brooks"]} /><Field label="Appointment date" value="2025-05-22" onChange={() => {}} type="date" /></div><label className="field"><span>Available time</span><div className="slot-grid">{["09:00 AM", "10:30 AM", "11:15 AM", "02:00 PM", "03:30 PM", "04:15 PM"].map((s) => <button type="button" disabled={s === "10:30 AM"} className={slot === s ? "slot selected" : "slot"} onClick={() => setSlot(s)} key={s}>{s}{s === "10:30 AM" && <small>Booked</small>}</button>)}</div></label><label className="field"><span>Reason for visit</span><textarea placeholder="Briefly describe the reason for this appointment..." /></label><div className="modal-actions"><Button variant="secondary" onClick={() => setBooking(false)}>Cancel</Button><Button type="submit">Confirm appointment</Button></div></form>
    </Modal>}
  </>;
}

function Calendar({ appointments }: { appointments: typeof appointmentsSeed }) {
  const days = Array.from({ length: 35 }, (_, i) => i - 3);
  return <section className="card calendar-card"><div className="calendar-head"><Button variant="secondary">Previous</Button><h3>May 2025</h3><Button variant="secondary">Next</Button></div><div className="week-labels">{["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"].map((d) => <span key={d}>{d}</span>)}</div><div className="calendar-grid">{days.map((day, i) => <div key={i} className={day < 1 || day > 31 ? "muted" : day === 19 ? "today" : ""}><span>{day < 1 ? 30 + day : day > 31 ? day - 31 : day}</span>{day === 19 && appointments.slice(0, 3).map((a, n) => <small className={`event event-${n}`} key={a.id}>{a.time} {a.patient}</small>)}{day === 20 && <small className="event event-1">2:00 PM Ava R.</small>}</div>)}</div></section>;
}

function ConsultationPage({ onToast }: { onToast: (text: string) => void }) {
  const [aiState, setAiState] = useState<"review" | "accepted" | "modified" | "rejected">("review");
  const [section, setSection] = useState("Clinical notes");
  const [symptoms, setSymptoms] = useState("Intermittent chest discomfort, mild fatigue, shortness of breath during activity.");
  return <>
    <PageHeader eyebrow="DOCTOR WORKSPACE" title="Consultation" description="Record clinical findings and review decision-support information."><Button variant="secondary" icon="clock">Save draft</Button><Button icon="check" onClick={() => onToast("Consultation completed and patient record updated.")}>Complete consultation</Button></PageHeader>
    <div className="patient-context"><div className="person-cell"><span className="avatar large">SB</span><div><strong>Sophia Bennett</strong><span>PT-1048 · 34 years · Female · A+</span></div></div><div><span>Allergies</span><strong className="danger-text">Penicillin, shellfish</strong></div><div><span>Chronic conditions</span><strong>Hypertension</strong></div><div><span>Last visit</span><strong>May 02, 2025</strong></div><Button variant="secondary" icon="eye">Full record</Button></div>
    <div className="consult-grid">
      <section className="card consult-main">
        <div className="tabs">{["Clinical notes", "Diagnosis", "Prescription", "Lab request"].map((item) => <button className={section === item ? "active" : ""} onClick={() => setSection(item)} key={item}>{item}</button>)}</div>
        {section === "Clinical notes" && <div className="clinical-form"><label className="field"><span>Presenting symptoms</span><textarea value={symptoms} onChange={(e) => setSymptoms(e.target.value)} rows={5} /></label><label className="field"><span>Clinical observations</span><textarea placeholder="Record examination findings and observations..." rows={5} /></label><div className="form-grid"><Field label="Blood pressure" value="128/82 mmHg" onChange={() => {}} /><Field label="Heart rate" value="78 bpm" onChange={() => {}} /><Field label="Temperature" value="36.8 °C" onChange={() => {}} /><Field label="Oxygen saturation" value="98%" onChange={() => {}} /></div></div>}
        {section === "Diagnosis" && <div className="clinical-form"><Field label="Primary diagnosis" value="Suspected stable angina" onChange={() => {}} /><label className="field"><span>Assessment & treatment notes</span><textarea rows={7} defaultValue="Symptoms warrant further cardiac assessment. Recommend ECG and lipid panel. Discuss lifestyle changes and monitor blood pressure." /></label><SelectField label="Follow-up" value="In 2 weeks" onChange={() => {}} options={["In 1 week", "In 2 weeks", "In 1 month", "As needed"]} /></div>}
        {section === "Prescription" && <div className="clinical-form"><div className="medicine-row"><Field label="Medicine" value="Aspirin" onChange={() => {}} /><Field label="Dosage" value="75 mg" onChange={() => {}} /><Field label="Frequency" value="Once daily" onChange={() => {}} /><Button variant="danger" icon="trash" /></div><Button variant="secondary" icon="plus">Add medicine</Button><label className="field"><span>Instructions</span><textarea defaultValue="Take after food. Stop and seek advice if unusual bleeding occurs." /></label></div>}
        {section === "Lab request" && <div className="clinical-form"><div className="check-grid">{["Complete blood count", "Lipid panel", "ECG", "Troponin", "Liver function", "Blood glucose"].map((test, i) => <label className="check-card" key={test}><input type="checkbox" defaultChecked={i === 1 || i === 2} /><span><strong>{test}</strong><small>{i === 2 ? "Cardiology" : "Pathology"}</small></span></label>)}</div><SelectField label="Priority" value="Routine" onChange={() => {}} options={["Routine", "Urgent", "Critical"]} /></div>}
      </section>
      <aside className="ai-panel">
        <div className="ai-head"><span><Icon name="ai" /></span><div><small>MEDIFLOW ASSIST</small><h3>Clinical support</h3></div><Status value="Active" /></div>
        <div className="ai-notice"><Icon name="shield" size="sm" /><p>Simulated AI assistance only. This is not a diagnosis or validated clinical service. The doctor must review and make the final decision.</p></div>
        <div className="ai-section"><div className="ai-section-head"><h4>Information considered</h4><span>6 sources</span></div><div className="evidence-chips"><span>Current symptoms</span><span>Medical history</span><span>Allergies</span><span>Lab results</span><span>Previous Rx</span></div></div>
        <div className="recommendation">
          <div className="rec-head"><span><Icon name="sparkle" size="sm" /> Sample recommendation</span><small>Confidence not assessed</small></div>
          <h4>Consider low-dose antiplatelet therapy</h4><p>Based on the recorded symptoms and cardiovascular history, review whether low-dose aspirin may be appropriate while awaiting further assessment.</p>
          <div className="rx-suggestion"><Icon name="pharmacy" /><div><strong>Aspirin 75 mg</strong><span>Once daily · After food</span></div></div>
          <div className="warning-item warning"><Icon name="activity" size="sm" /><div><strong>Interaction review needed</strong><p>Confirm no concurrent anticoagulant medication or bleeding risk.</p></div></div>
          <div className="warning-item success"><Icon name="check" size="sm" /><div><strong>No listed allergy conflict</strong><p>No known aspirin allergy in the current record.</p></div></div>
        </div>
        {aiState === "review" ? <div className="ai-actions"><Button onClick={() => { setAiState("accepted"); onToast("Suggestion accepted for final doctor review."); }}>Accept suggestion</Button><Button variant="secondary" onClick={() => setAiState("modified")}>Modify</Button><Button variant="ghost" onClick={() => setAiState("rejected")}>Reject</Button></div> : <div className={`decision-state ${aiState}`}><Icon name={aiState === "rejected" ? "x" : "check"} /><div><strong>Suggestion {aiState}</strong><span>Final prescription still requires confirmation.</span></div><button onClick={() => setAiState("review")}>Undo</button></div>}
        <label className="field"><span>Doctor’s notes</span><textarea placeholder="Add your clinical reasoning..." /></label>
        <Button className="full-button" icon="shield" onClick={() => onToast("Final prescription confirmed by doctor.")}>Confirm final prescription</Button>
      </aside>
    </div>
  </>;
}

const labRows = [
  ["LAB-3108", "Sophia Bennett", "Dr. Maya Chen", "Lipid panel", "Urgent", "Pending"],
  ["LAB-3107", "Ethan Carter", "Dr. Oliver Grant", "Complete blood count", "Routine", "In progress"],
  ["LAB-3106", "Noah Wilson", "Dr. Maya Chen", "Troponin I", "Critical", "Report Ready"],
  ["LAB-3105", "Ava Rodriguez", "Dr. Sarah Ahmed", "Thyroid profile", "Routine", "Completed"],
];
const medicinesSeed = [
  { id: "MED-201", name: "Amoxicillin 500mg", category: "Antibiotic", stock: 84, unit: "Capsules", expiry: "Aug 2026", status: "Available" },
  { id: "MED-202", name: "Aspirin 75mg", category: "Antiplatelet", stock: 18, unit: "Tablets", expiry: "Jan 2026", status: "Low stock" },
  { id: "MED-203", name: "Atorvastatin 20mg", category: "Statin", stock: 126, unit: "Tablets", expiry: "Mar 2027", status: "Available" },
  { id: "MED-204", name: "Insulin Glargine", category: "Antidiabetic", stock: 0, unit: "Pens", expiry: "Sep 2025", status: "Out of stock" },
];

function LaboratoryPage({ onToast }: { onToast: (text: string) => void }) {
  const [rows, setRows] = useState(labRows);
  const [selected, setSelected] = useState<number | null>(null);
  const complete = () => { if (selected === null) return; setRows(rows.map((r, i) => i === selected ? [...r.slice(0, 5), "Report Ready"] : r)); setSelected(null); onToast("Lab result saved and shared with authorized records."); };
  return <><PageHeader eyebrow="DIAGNOSTICS" title="Laboratory" description="Track requests, enter results, and publish verified reports."><Button variant="secondary" icon="download">Export</Button><Button icon="plus">New request</Button></PageHeader><div className="mini-metrics">{[["Total requests", "248", "flask"], ["Pending", "42", "clock"], ["In progress", "18", "activity"], ["Completed today", "64", "check"]].map(([l, v, i]) => <div className="mini-metric" key={l}><span><Icon name={i as IconName} /></span><div><strong>{v}</strong><small>{l}</small></div></div>)}</div><section className="card data-card"><div className="toolbar"><label className="search-box"><Icon name="search" size="sm" /><input placeholder="Search requests, patients, tests..." /></label><SelectField label="" value="All statuses" onChange={() => {}} options={["All statuses", "Pending", "In progress", "Completed"]} /></div><div className="table-wrap"><table><thead><tr><th>Request ID</th><th>Patient</th><th>Requested by</th><th>Test</th><th>Priority</th><th>Status</th><th /></tr></thead><tbody>{rows.map((r, i) => <tr key={r[0]}><td><code>{r[0]}</code></td><td><strong>{r[1]}</strong><small>{patientsSeed[i]?.id}</small></td><td>{r[2]}</td><td><strong>{r[3]}</strong><small>May {18 - i}, 2025</small></td><td><Status value={r[4]} /></td><td><Status value={r[5]} /></td><td><Button variant="secondary" onClick={() => setSelected(i)}>{r[5] === "Pending" ? "Enter result" : "View"}</Button></td></tr>)}</tbody></table></div></section>{selected !== null && <Modal title={`${rows[selected][3]} result`} description={`${rows[selected][0]} · ${rows[selected][1]}`} onClose={() => setSelected(null)}><div className="result-summary"><div><span>Result</span><strong>Within expected range</strong></div><div><span>Priority</span><Status value={rows[selected][4]} /></div></div><label className="field"><span>Test findings</span><textarea rows={6} defaultValue="Sample result entered for prototype demonstration. Values reviewed against the laboratory reference interval." /></label><label className="upload-zone"><Icon name="download" /><strong>Attach laboratory report</strong><span>PDF, JPG or PNG · Prototype file picker</span><input type="file" /></label><div className="modal-actions"><Button variant="secondary" onClick={() => setSelected(null)}>Save draft</Button><Button onClick={complete}>Mark complete & publish</Button></div></Modal>}</>;
}

function PharmacyPage({ onToast }: { onToast: (text: string) => void }) {
  const [medicines, setMedicines] = useState(medicinesSeed);
  const [search, setSearch] = useState("");
  const [dispense, setDispense] = useState<number | null>(null);
  const filtered = medicines.filter((m) => m.name.toLowerCase().includes(search.toLowerCase()));
  const confirm = () => { if (dispense === null) return; setMedicines(medicines.map((m, i) => i === dispense ? { ...m, stock: Math.max(0, m.stock - 10), status: m.stock - 10 <= 20 ? "Low stock" : m.status } : m)); setDispense(null); onToast("Medicine dispensed and inventory updated."); };
  return <><PageHeader eyebrow="PHARMACY OPERATIONS" title="Pharmacy" description="Verify prescriptions, dispense safely, and manage medicine stock."><Button variant="secondary" icon="reports">Stock report</Button><Button icon="plus">Add medicine</Button></PageHeader><div className="mini-metrics">{[["Total medicines", "1,284", "pharmacy"], ["Available stock", "1,196", "check"], ["Low stock", "26", "activity"], ["Pending Rx", "38", "clock"]].map(([l, v, i]) => <div className="mini-metric" key={l}><span><Icon name={i as IconName} /></span><div><strong>{v}</strong><small>{l}</small></div></div>)}</div><section className="card data-card"><div className="toolbar"><label className="search-box"><Icon name="search" size="sm" /><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search medicine or category..." /></label><SelectField label="" value="All stock levels" onChange={() => {}} options={["All stock levels", "Available", "Low stock", "Out of stock"]} /></div><div className="table-wrap"><table><thead><tr><th>Medicine</th><th>Category</th><th>Available</th><th>Expiry date</th><th>Stock status</th><th /></tr></thead><tbody>{filtered.map((m, i) => <tr key={m.id}><td><div className="medicine-cell"><span><Icon name="pharmacy" /></span><div><strong>{m.name}</strong><small>{m.id}</small></div></div></td><td>{m.category}</td><td><strong>{m.stock}</strong> {m.unit}</td><td>{m.expiry}</td><td><Status value={m.status} /></td><td><Button variant="secondary" disabled={m.stock === 0} onClick={() => setDispense(i)}>Dispense</Button></td></tr>)}</tbody></table></div></section>{dispense !== null && <Modal title="Confirm dispensing" description="Review prescription and inventory change before continuing." onClose={() => setDispense(null)}><div className="dispense-card"><span><Icon name="pharmacy" /></span><div><h4>{medicines[dispense].name}</h4><p>Sophia Bennett · RX-8891 · Dr. Maya Chen</p></div></div><div className="quantity-row"><span>Quantity to dispense</span><div><Button variant="secondary">−</Button><strong>10</strong><Button variant="secondary">+</Button></div></div><div className="stock-change"><div><span>Current stock</span><strong>{medicines[dispense].stock}</strong></div><Icon name="chevron" /><div><span>Stock after</span><strong>{Math.max(0, medicines[dispense].stock - 10)}</strong></div></div><div className="modal-actions"><Button variant="secondary" onClick={() => setDispense(null)}>Cancel</Button><Button onClick={confirm}>Confirm & dispense</Button></div></Modal>}</>;
}

function BillingPage({ onToast }: { onToast: (text: string) => void }) {
  const [paid, setPaid] = useState(false);
  const [discount, setDiscount] = useState(0);
  const items = [{ label: "Cardiology consultation", value: 180 }, { label: "ECG diagnostic test", value: 95 }, { label: "Laboratory — Lipid panel", value: 65 }, { label: "Pharmacy", value: 28 }];
  const subtotal = items.reduce((n, i) => n + i.value, 0);
  const total = subtotal - discount;
  return <><PageHeader eyebrow="REVENUE CYCLE" title="Billing & payments" description="Generate patient bills, collect payments, and monitor outstanding balances."><Button variant="secondary" icon="download">Export</Button><Button icon="plus">Generate bill</Button></PageHeader><div className="mini-metrics">{[["Total billed", "$284,620", "billing"], ["Paid", "$218,440", "check"], ["Pending", "$52,180", "clock"], ["Outstanding", "$14,000", "activity"]].map(([l, v, i]) => <div className="mini-metric" key={l}><span><Icon name={i as IconName} /></span><div><strong>{v}</strong><small>{l}</small></div></div>)}</div><div className="billing-grid"><section className="card invoice"><div className="invoice-head"><div><span>INVOICE</span><h3>INV-2025-0841</h3></div><Status value={paid ? "Paid" : "Pending"} /></div><div className="invoice-parties"><div><span>Billed to</span><strong>Sophia Bennett</strong><p>PT-1048 · sophia.b@example.test</p></div><div><span>Issue date</span><strong>May 19, 2025</strong><p>Due May 26, 2025</p></div></div><div className="invoice-items">{items.map((item) => <div key={item.label}><span>{item.label}</span><strong>${item.value.toFixed(2)}</strong></div>)}<button><Icon name="plus" size="sm" /> Add service charge</button></div><div className="invoice-total"><div><span>Subtotal</span><strong>${subtotal.toFixed(2)}</strong></div><div><span>Authorized discount</span><label>$ <input type="number" min="0" max={subtotal} value={discount} onChange={(e) => setDiscount(Number(e.target.value))} /></label></div><div className="grand-total"><span>Total due</span><strong>${total.toFixed(2)}</strong></div></div></section><aside className="card payment-card"><span className="payment-icon"><Icon name="billing" size="lg" /></span><h3>Record payment</h3><p>Payments recorded here update billing summaries immediately.</p><SelectField label="Payment method" value="Credit / debit card" onChange={() => {}} options={["Credit / debit card", "Cash", "Bank transfer", "Insurance"]} /><Field label="Amount received" value={total.toString()} onChange={() => {}} /><Field label="Reference" value="PAY-948218" onChange={() => {}} /><Button className="full-button" disabled={paid} onClick={() => { setPaid(true); onToast("Payment recorded and invoice marked as paid."); }}>{paid ? "Payment recorded" : "Confirm payment"}</Button><Button variant="secondary" className="full-button" icon="download">Print invoice</Button></aside></div></>;
}

function BedsPage({ onToast }: { onToast: (text: string) => void }) {
  const [beds, setBeds] = useState(Array.from({ length: 16 }, (_, i) => ({ id: `A-${String(i + 1).padStart(2, "0")}`, status: i % 5 === 0 ? "Maintenance" : i % 3 === 0 ? "Occupied" : "Available", patient: i % 3 === 0 ? ["Ethan Carter", "Noah Wilson", "Ava Rodriguez"][i % 3] : "" })));
  const [selected, setSelected] = useState<number | null>(null);
  const allocate = () => { if (selected === null || beds[selected].status !== "Available") return; setBeds(beds.map((b, i) => i === selected ? { ...b, status: "Occupied", patient: "Sophia Bennett" } : b)); setSelected(null); onToast("Bed allocated and inpatient record updated."); };
  return <><PageHeader eyebrow="INPATIENT MANAGEMENT" title="Beds & inpatient" description="Monitor occupancy, allocate beds, and coordinate admissions."><Button variant="secondary">Admissions</Button><Button icon="plus">Admit patient</Button></PageHeader><div className="mini-metrics">{[["Total beds", "240", "beds"], ["Available", "38", "check"], ["Occupied", "194", "patients"], ["Maintenance", "8", "settings"]].map(([l, v, i]) => <div className="mini-metric" key={l}><span><Icon name={i as IconName} /></span><div><strong>{v}</strong><small>{l}</small></div></div>)}</div><section className="card bed-card"><div className="card-head"><div><h3>General ward · Floor 2</h3><p>Select an available bed to begin allocation</p></div><div className="bed-legend"><span><i className="bed-dot available" />Available</span><span><i className="bed-dot occupied" />Occupied</span><span><i className="bed-dot maintenance" />Maintenance</span></div></div><div className="bed-grid">{beds.map((bed, i) => <button key={bed.id} className={`bed ${bed.status.toLowerCase()} ${selected === i ? "selected" : ""}`} onClick={() => setSelected(i)}><Icon name="beds" /><strong>{bed.id}</strong><span>{bed.status}</span>{bed.patient && <small>{bed.patient}</small>}</button>)}</div></section>{selected !== null && <Modal title={`Bed ${beds[selected].id}`} description={`General ward · Floor 2 · ${beds[selected].status}`} onClose={() => setSelected(null)}>{beds[selected].status === "Available" ? <><SelectField label="Patient to admit" value="Sophia Bennett · PT-1048" onChange={() => {}} options={["Sophia Bennett · PT-1048", "Maya Thompson · PT-1046"]} /><Field label="Admission date" value="2025-05-19" onChange={() => {}} type="date" /><label className="field"><span>Admission notes</span><textarea placeholder="Reason for admission..." /></label><div className="modal-actions"><Button variant="secondary" onClick={() => setSelected(null)}>Cancel</Button><Button onClick={allocate}>Allocate bed</Button></div></> : <div className="empty-state"><span><Icon name={beds[selected].status === "Occupied" ? "patients" : "settings"} size="lg" /></span><h4>{beds[selected].status === "Occupied" ? beds[selected].patient : "Unavailable for allocation"}</h4><p>{beds[selected].status === "Occupied" ? "This bed is currently assigned to an inpatient." : "This bed is undergoing scheduled maintenance."}</p></div>}</Modal>}</>;
}

function ReportsPage() {
  const [period, setPeriod] = useState("Last 30 days");
  const values = period === "Last 7 days" ? [42, 58, 64, 49, 76, 54, 69] : [58, 72, 64, 82, 75, 91, 86];
  return <><PageHeader eyebrow="REPORTS & ANALYTICS" title="Hospital performance" description="Explore operational trends and turn workflow data into action."><SelectField label="" value={period} onChange={setPeriod} options={["Last 7 days", "Last 30 days", "This quarter", "This year"]} /><Button variant="secondary" icon="download">Export report</Button></PageHeader><div className="metric-grid"><Metric icon="trend" label="Patient growth" value="+12.8%" change="+3.2%" tone="blue" /><Metric icon="appointments" label="Appointment completion" value="89.4%" change="+5.1%" tone="teal" /><Metric icon="clock" label="Avg. wait time" value="18 min" change="-8.2%" tone="green" /><Metric icon="billing" label="Collection rate" value="94.2%" change="+2.4%" tone="violet" /></div><div className="reports-grid"><section className="card bars-card"><div className="card-head"><div><h3>Patient registrations</h3><p>New registrations by week</p></div><Status value="Active" /></div><div className="bar-chart">{values.map((v, i) => <div key={i}><span style={{ height: `${v}%` }} /><small>W{i + 1}</small></div>)}</div></section><section className="card workflow-card"><div className="card-head"><div><h3>Workflow efficiency</h3><p>Average completion rate</p></div></div>{[["Appointment scheduling", 94], ["Laboratory turnaround", 86], ["Prescription dispensing", 91], ["Billing completion", 78]].map(([label, n]) => <div className="progress-row" key={label as string}><div><span>{label}</span><strong>{n}%</strong></div><i><b style={{ width: `${n}%` }} /></i></div>)}</section><section className="card department-table"><div className="card-head"><div><h3>Department performance</h3><p>Current period summary</p></div><Button variant="ghost">View details</Button></div><div className="table-wrap"><table><thead><tr><th>Department</th><th>Patients</th><th>Avg. wait</th><th>Completion</th><th>Trend</th></tr></thead><tbody>{[["Cardiology", "1,284", "16 min", "92%", "+8.2%"], ["General Medicine", "1,948", "22 min", "88%", "+5.4%"], ["Orthopedics", "986", "18 min", "91%", "+3.8%"], ["Neurology", "764", "14 min", "94%", "+7.1%"]].map((r) => <tr key={r[0]}>{r.map((v, i) => <td key={v} className={i === 4 ? "positive" : ""}>{i === 0 ? <strong>{v}</strong> : v}</td>)}</tr>)}</tbody></table></div></section></div></>;
}

function ActivityPage() {
  const activities = [["Dr. Maya Chen", "Doctor", "Completed consultation for PT-1048", "Consultation", "2 min ago", "Completed"], ["Jordan Lee", "Lab Technician", "Published report LAB-3106", "Laboratory", "18 min ago", "Completed"], ["Morgan Cooper", "Administrator", "Updated role permissions", "Security", "42 min ago", "Completed"], ["Amelia Stone", "Receptionist", "Rescheduled AP-2087", "Appointments", "1 hr ago", "Active"], ["Daniel Park", "Pharmacist", "Dispensed prescription RX-8891", "Pharmacy", "2 hrs ago", "Completed"]];
  return <><PageHeader eyebrow="AUDIT & OPERATIONS" title="System activity" description="Review authorized actions and events across MediFlow."><Button variant="secondary" icon="download">Export log</Button></PageHeader><section className="card data-card"><div className="toolbar"><label className="search-box"><Icon name="search" size="sm" /><input placeholder="Search activity..." /></label><SelectField label="" value="All modules" onChange={() => {}} options={["All modules", "Laboratory", "Appointments", "Pharmacy"]} /></div><div className="table-wrap"><table><thead><tr><th>User</th><th>Role</th><th>Activity</th><th>Module</th><th>Date & time</th><th>Status</th></tr></thead><tbody>{activities.map((r) => <tr key={r[2]}><td><strong>{r[0]}</strong></td><td>{r[1]}</td><td>{r[2]}</td><td><code>{r[3]}</code></td><td>{r[4]}</td><td><Status value={r[5]} /></td></tr>)}</tbody></table></div></section></>;
}

function SettingsPage() {
  const [saved, setSaved] = useState(false);
  return <><PageHeader eyebrow="CONFIGURATION" title="Settings" description="Manage hospital profile, notifications, security, and integrations." /><div className="settings-grid"><aside className="card settings-nav">{["Hospital profile", "Notifications", "Security & access", "Departments", "API & integrations"].map((s, i) => <button className={i === 0 ? "active" : ""} key={s}><Icon name={i === 0 ? "heart" : i === 1 ? "bell" : i === 2 ? "shield" : i === 3 ? "doctors" : "settings"} />{s}<Icon name="chevron" size="sm" /></button>)}</aside><section className="card settings-form"><h3>Hospital profile</h3><p>Basic information displayed across your MediFlow workspace.</p><div className="form-grid"><Field label="Hospital name" value="MediFlow Central Hospital" onChange={() => {}} /><Field label="Organization ID" value="MFH-10082" onChange={() => {}} /><Field label="Contact email" value="care@mediflow.demo" onChange={() => {}} /><Field label="Contact number" value="+1 555 0100" onChange={() => {}} /></div><label className="field"><span>Address</span><textarea defaultValue="100 Health Avenue, North District, NY 10001" /></label><div className="settings-save"><span>{saved && <><Icon name="check" size="sm" /> Changes saved</>}</span><Button onClick={() => setSaved(true)}>Save changes</Button></div></section></div></>;
}

function Modal({ title, description, children, onClose, wide = false }: { title: string; description: string; children: ReactNode; onClose: () => void; wide?: boolean }) {
  return <div className="modal-backdrop" onMouseDown={(e) => e.target === e.currentTarget && onClose()}><section className={`modal ${wide ? "modal-wide" : ""}`}><div className="modal-head"><div><h3>{title}</h3><p>{description}</p></div><button onClick={onClose}><Icon name="x" /></button></div><div className="modal-body">{children}</div></section></div>;
}

function Notifications({ onClose }: { onClose: () => void }) {
  return <div className="notification-panel"><div className="notification-head"><div><h3>Notifications</h3><span>4 unread</span></div><button onClick={onClose}><Icon name="x" /></button></div>{[["appointments", "Appointment confirmed", "Sophia Bennett · Today at 9:30 AM", "2 min"], ["flask", "New lab report available", "Troponin I report is ready for review", "18 min"], ["pharmacy", "Low stock alert", "Aspirin 75mg is below threshold", "42 min"], ["beds", "Bed status updated", "Bed ICU-04 is now available", "1 hr"]].map(([icon, title, sub, time], i) => <button className={`notification ${i < 2 ? "unread" : ""}`} key={title}><span><Icon name={icon as IconName} /></span><div><strong>{title}</strong><p>{sub}</p><small>{time} ago</small></div></button>)}<Button variant="ghost" className="full-button">View notification center</Button></div>;
}

export default function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [role, setRole] = useState<Role>("Administrator");
  const [page, setPage] = useState<Page>("dashboard");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [notifications, setNotifications] = useState(false);
  const [toast, setToast] = useState("");
  const pageTitle = useMemo(() => roleNav[role].find((n) => n.page === page)?.label || ({ consultation: "Consultation", laboratory: "Laboratory", pharmacy: "Pharmacy", billing: "Billing", beds: "Beds & inpatient", reports: "Reports", activity: "System activity", settings: "Settings", patients: "Patients", appointments: "Appointments", dashboard: "Overview" } as Record<Page, string>)[page], [page, role]);
  const showToast = (text: string) => { setToast(text); window.setTimeout(() => setToast(""), 3200); };
  const navigate = (p: Page) => { setPage(p); setMobileOpen(false); };
  if (!authenticated) return <Login onLogin={(nextRole) => { setRole(nextRole); setAuthenticated(true); setPage("dashboard"); }} />;
  const pages: Record<Page, ReactNode> = {
    dashboard: <Dashboard role={role} navigate={navigate} />,
    patients: <PatientsPage onToast={showToast} />,
    appointments: <AppointmentsPage onToast={showToast} />,
    consultation: <ConsultationPage onToast={showToast} />,
    laboratory: <LaboratoryPage onToast={showToast} />,
    pharmacy: <PharmacyPage onToast={showToast} />,
    billing: <BillingPage onToast={showToast} />,
    beds: <BedsPage onToast={showToast} />,
    reports: <ReportsPage />,
    activity: <ActivityPage />,
    settings: <SettingsPage />,
  };
  return <div className={`app-shell ${collapsed ? "sidebar-collapsed" : ""}`}>
    <Sidebar role={role} page={page} open={mobileOpen} collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} onNavigate={navigate} onLogout={() => setAuthenticated(false)} />
    {mobileOpen && <button className="mobile-overlay" onClick={() => setMobileOpen(false)} aria-label="Close navigation" />}
    <Header title={pageTitle} role={role} onMenu={() => setMobileOpen(true)} onNotifications={() => setNotifications(!notifications)} />
    <main className="content">{pages[page]}</main>
    {notifications && <Notifications onClose={() => setNotifications(false)} />}
    {toast && <div className="toast"><span><Icon name="check" /></span><div><strong>Success</strong><p>{toast}</p></div><button onClick={() => setToast("")}><Icon name="x" size="sm" /></button></div>}
  </div>;
}
