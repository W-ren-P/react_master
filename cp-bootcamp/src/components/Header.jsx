import bundImg from "./assets/bundesliga_logo.jpg";
import { NavLink } from "react-router";

function Header() {
  return (
    <>
      <nav aria-label="Primary">
        <img src={bundImg} alt="Logo" className="nav-image" />
        <p className="nav-title">Bundesliga 2022-23</p>
        <div className="nav-links-container">
          <li>
            <NavLink to="/" end className="nav-link">
              Home
            </NavLink>
          </li>
          {/* <li>
            <NavLink to="/teams" end className="nav-link">
              Teams
            </NavLink>
          </li> */}
          <li>
            <NavLink to="/players" end className="nav-link">
              Players
            </NavLink>
          </li>
          <li>
            <NavLink to="/matches" end className="nav-link">
              Matches
            </NavLink>
          </li>
        </div>
      </nav>
    </>
  );
}

export default Header;
