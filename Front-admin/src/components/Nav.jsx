import React from "react";
import { useProductStore } from "../stores";
import { useLocation, NavLink } from "react-router-dom";
function Nav() {
  const userStore = useProductStore();

  return (
    <nav className="lx un ys">

      <ul className="lx un ys aaw">
        <li><NavLink
          className={({ isActive }) => [
            isActive ? "active" : "text-neutral-950",
          ]}
          to={"/"}
        >
          Dashboard
        </NavLink>
        </li>
        <li>
        <NavLink
          className={({ isActive }) => [
            isActive ? "active" : "text-neutral-950",
          ]}
          to={"/profile"}
        >
         { userStore.name}
        </NavLink>
        <span>{userStore.role}</span>
        </li>
       
        <li>
        <NavLink
          className={({ isActive }) => [
            isActive ? "active" : "text-neutral-950",
          ]}
          to={"/products"}
        >
          Voir les produits
        </NavLink>
        </li>
        <li>
        <NavLink
          className={({ isActive }) => [
            isActive ? "active" : "text-neutral-950",
          ]}
          to={"/users"}
        >
          Gestion des admins
        </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
