// App.js
import {  useProductStore } from "./stores/index";
import { Outlet } from "react-router-dom";
import Nav from "./components/Nav";
import { observer } from "mobx-react";

function App() {
  let productStore = useProductStore();
  return (
      <>
        <Nav />
        <main className="den">
        
          { productStore.loading ?  <p>En cours de chargement</p> : <Outlet />}
         
        </main>
       
      </>
  );
}

export default observer(App);