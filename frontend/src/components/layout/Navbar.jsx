import { Bell, UserCircle } from "lucide-react";

const Navbar = () => {
  return (
    <header className="navbar">
      <h2>AI Market Research Platform</h2>

      <div className="nav-right">
        <Bell size={22} />

        <div className="user">
          <UserCircle size={28} />
          <span>Admin</span>
        </div>
      </div>
    </header>
  );
};

export default Navbar;