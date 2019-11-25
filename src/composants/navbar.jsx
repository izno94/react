import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <ul className="nav justify-content-end">
      <li className="nav-item">
        <Link className="nav-link" to="/">
          Accueil
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/commentaires">
          Commentaires
        </Link>
      </li>
    </ul>
  );
};

export default NavBar;
