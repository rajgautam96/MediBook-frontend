import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("medibookUser") || "null");

  function logout() {
    localStorage.removeItem("medibookUser");
    navigate("/");
    window.location.reload();
  }

  return (
    <header className="navbar">
      <div className="container nav-inner">
        <Link className="logo" to="/">
          Medi<span>Book.</span>
        </Link>

        <nav className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/doctors">Find Doctors</Link>

          {user && <Link to="/dashboard">Dashboard</Link>}

          {user?.role === "doctor" && (
            <Link to="/doctor-dashboard">Appointments</Link>
          )}

          {!user ? (
            <>
              <Link to="/login">Login</Link>
              <Link className="btn btn-primary" to="/register">
                Sign Up
              </Link>
            </>
          ) : (
            <>
              <span>Hello, {user.name.split(" ")[0]}</span>
              <button className="btn btn-outline" onClick={logout}>
                Logout
              </button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}