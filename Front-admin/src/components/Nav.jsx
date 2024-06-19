import React from "react";
import { useProductStore } from "../stores";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { Transition } from '@headlessui/react'
import { useEffect } from "react";

function Nav() {
  const userStore = useProductStore();
const [menuIsOpen,setMenuIsOpen] = useState(false);
useEffect(() => {
  // Fonction pour vérifier la largeur de la fenêtre
  const checkScreenSize = () => {
    if (window.innerWidth > 1024) {
      setMenuIsOpen(true);
    } else {
      setMenuIsOpen(false);
    }
  };

  // Vérifier la taille de l'écran au chargement initial
  checkScreenSize();

  // Ajouter un écouteur d'événement pour redimensionner
  window.addEventListener('resize', checkScreenSize);

  // Nettoyer l'écouteur d'événement lors du démontage du composant
  return () => window.removeEventListener('resize', checkScreenSize);
}, []);
  return (
    <>
      <div className="ac dn ej lx za aaj aln ari asc bbn cex cux">
    <button className="ft aqr axt cux" onClick={()=>setMenuIsOpen(!menuIsOpen)}>
    <span className="t">Ouvrir Menu vertical</span>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" className="oc sf"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"></path></svg>
    </button>
    <div className="un awa awg awp axv">Dashboard</div>
    <NavLink className={`lx za aah ark arz awa awg awp axv bid `} to={"/profile"}>
            <img className="og sk adt aip" src={userStore.image} alt="profil" />
            <span className="t">Ton profile</span>
            <span aria-hidden="true">Tom Cook</span>
          </NavLink>
  </div>
  <Transition show={menuIsOpen}
   enter="transition-opacity duration-300"
   enterFrom="opacity-0"
   enterTo="opacity-100"
   leave="transition-opacity duration-150"
   leaveFrom="opacity-100"
   leaveTo="opacity-0"
  >
    
  <div className={` cpy cqf crm cut cwo cyy `}>
        <div className="lx uu ys aau adk afl afv aln ark">
    <nav className="lx un ys">

      <ul className="lx un ys aaw">
        <li>
          <NavLink
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
        <li className="ge lp">
          <NavLink className="lx za aah ark arz awa awg awp axv bid" to={"/profile"}>
            <img className="og sk adt aip" src={userStore.image} alt="profil" />
            <span className="t">Ton profile</span>
            <span aria-hidden="true">Tom Cook</span>
          </NavLink>
        </li>
      </ul>
    </nav>
    </div>
    </div>
  </Transition>
  </>
  );
}

export default Nav;
