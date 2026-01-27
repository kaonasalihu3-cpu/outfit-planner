// src/components/navbar.js
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { user, logout } = useAuth();

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="logo">
          glow<span>up</span>
        </Link>

        <nav className="nav-links">
          <NavLink to="/" end className="nav-link">
            Home
          </NavLink>
          <NavLink to="/products" className="nav-link">
            Products
          </NavLink>
          <NavLink to="/about" className="nav-link">
            About
          </NavLink>
          <NavLink to="/contact" className="nav-link">
            Contact
          </NavLink>

          {!user ? (
            <>
              <NavLink to="/login" className="nav-link">
                Login
              </NavLink>
              <NavLink to="/register" className="nav-link nav-cta">
                Register
              </NavLink>
            </>
          ) : (
            <>
              <span className="nav-link" style={{ opacity: 0.9 }}>
                Hi, {user.name?.split(" ")[0]}
              </span>
              {user.role === 'admin' && (
                <a
                  href="http://localhost/my-make-up-brand/backend/admin/dashbord.php"
                  className="nav-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Admin
                </a>
              )}
              <button
                type="button"
                className="nav-link"
                style={{
                  border: "1px solid rgba(255,255,255,0.08)",
                  background: "transparent",
                  cursor: "pointer",
                }}
                onClick={logout}
              >
                Logout
              </button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
