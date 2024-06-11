// App.js
import { useStudentStore } from "./stores/index";
import { Outlet } from "react-router-dom";
import Nav from "./components/Nav";
import { observer } from "mobx-react";

function App() {
  let studentStore = useStudentStore();
  return (
      <>
        <Nav />
        <main className="max-w-[80rem] m-auto p-1">
          { studentStore.loading ?  <p>En cours de chargement</p> : <Outlet />}
        </main>
      </>
  );
}

export default observer(App);