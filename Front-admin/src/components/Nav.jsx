import React from "react";
import { useLocation, NavLink } from "react-router-dom";
function Nav() {
  return (
    <nav className="flex   text-2xl md:text-3xl lg:text-4xl">
      <ul className="flex  flex-col sm:flex-row gap-x-4">
        <NavLink
          className={({ isActive }) => [
            isActive ? "active" : "text-neutral-950",
          ]}
          to={"/"}
        >
          Acceuil
        </NavLink>
        <NavLink
          className={({ isActive }) => [
            isActive ? "active" : "text-neutral-950",
          ]}
          to={"/groups"}
        >
          Groupes
        </NavLink>
        <NavLink
          className={({ isActive }) => [
            isActive ? "active" : "text-neutral-950",
          ]}
          to={"/products"}
        >
          Produits
        </NavLink>
      </ul>
    </nav>
  );
}

export default Nav;
