import Logo from "../images/Main-Logo.png";
import { IoSearch } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear user data and reset login flags
    localStorage.removeItem('userData');
    localStorage.removeItem('cart');
    localStorage.setItem("isLoggedIn", "false");
    localStorage.setItem("isAdminLoggedIn", "false");
    navigate("/");
  };

  // 👉 Always re-check localStorage on render
  const isLogedin = localStorage.getItem("isLoggedIn") === "true";
  const AdminisLogedin = localStorage.getItem("isAdminLoggedIn") === "true";

  // 👉 Decide where the Profile/Login button should go
  const whereHref = AdminisLogedin 
    ? "/AdminDashboard" 
    : isLogedin 
      ? "/profile" 
      : "/login";

  return (
    <nav className="navbar shadow-lg py-3" style={{ backgroundColor: "#0F172A" }}>
      <div className="container d-flex align-items-center">
        
        {/* Logo */}
        <a className="navbar-brand d-flex align-items-center fw-bold fs-4 me-1" href="/">
          <img src={Logo} width={200} alt="Main Logo" />
        </a>

        {/* Search box */}
        <div className="d-flex mx-1" style={{ flex: "1", maxWidth: "300px" }}>
          <div className="input-group">
            <span className="input-group-text border-dark" style={{ backgroundColor: "#1E2A47" }}>
              <IoSearch color="white" size={20} />
            </span>
            <input
              id="searchtext"
              type="text"
              className="form-control border-dark"
              placeholder="Search"
            />
          </div>
        </div>

        {/* Navigation links */}
        <div className="d-flex align-items-center" id="alllinks" style={{ fontWeight: "600" }}>
          <a className="text-white text-decoration-none me-4" href="/">Home</a>
          <a className="text-white text-decoration-none me-4" href="/products">Products</a>
          <a className="text-white text-decoration-none me-4" href="/stores">Stores</a>
          <a className="text-white text-decoration-none me-4" href="/about">About</a>
          <a className="text-white text-decoration-none me-4" href="/contact">Contact</a>

          {/* Profile/Login button */}
          <a
            className="btn px-3 no-underline"
            href={whereHref}
            style={{ backgroundColor: "#2563EB", color: "white", fontWeight: "600" }}
          >
            {isLogedin || AdminisLogedin ? "Profile" : "Login"}
          </a>

          {/* Logout button */}
          {isLogedin || AdminisLogedin ? (
            <button
              className="btn px-3 ms-2 btn-danger"
              onClick={handleLogout}
              style={{ color: "white", fontWeight: "600" }}
            >
              Logout
            </button>
          ) : null}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
