import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Search,
  Workflow,
  FileText,
} from "lucide-react";

const Sidebar = () => {
  const menu = [
    {
      title: "Dashboard",
      path: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "New Research",
      path: "/research-intake",
      icon: Search,
    },
    {
      title: "Workflow",
      path: "/workflow",
      icon: Workflow,
    },
    {
      title: "Reports",
      path: "/report",
      icon: FileText,
    },
  ];

  return (
    <aside className="sidebar">
      <div>
        <h1 className="logo">ResearchPilot AI</h1>

        <nav className="menu">
          {menu.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  isActive ? "menu-item active" : "menu-item"
                }
              >
                <Icon size={20} />
                <span>{item.title}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>

      <div className="sidebar-footer">
        <small>Version 1.0</small>
      </div>
    </aside>
  );
};

export default Sidebar;