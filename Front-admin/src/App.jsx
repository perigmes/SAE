// App.js
import {  useProductStore } from "./stores/index";
import { Outlet } from "react-router-dom";
import Nav from "./components/Nav";
import { observer } from "mobx-react";

function App() {
  let productStore = useProductStore();
  return (
      <>
      <div className="md cpy cqf crm cut cwo cyy">
        <div className="lx uu ys aau adk afl afv aln ark">
        <Nav />
        </div>
        </div>
        <main className="den">
          <div className="dnc">
          <div className="ari arr cex ddc ddo">

          { productStore.loading ?  <p>En cours de chargement</p> : <Outlet />}</div>        </div>

        </main>
      </>
  );
}

export default observer(App);