import React, { useContext, useEffect } from "react";
import Nav from "../components/Nav";
import { GlobalContext } from "../App";
import { observer } from "mobx-react";
import { Link } from "react-router-dom";
import { useStudentStore } from "../stores";

function Groups() {
  let studentStore = useStudentStore();
  return (
    <>
      <h1>Les groupes de {studentStore.course}</h1>
      <div className="mt-8 text-2xl sm:text-3xl flex gap-x-20 justify-center flex-wrap">
        <div className="flex gap-x-4 justify-center font-bold">
          <span>{studentStore.groups.length}</span>
          <span>groupes</span>
        </div>
        <div className="flex gap-x-4 justify-center font-bold">
          <span>{studentStore.students.length}</span>
          <span>étudiants</span>
        </div>
      </div>
      {studentStore.groups.length > 0 && (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 w-max mx-auto gap-6 mt-8 text-2xl sm:text-3xl">
          {studentStore.groups.map((group) => (
            <div
              key={group}
              className="flex flex-col items-center bg-slate-400 p-4 rounded-2xl"
            >
              <p>{group}</p>
              <p>{studentStore.getStudentByGroup(group).length} étudiants</p>
              <Link to={`/students/groups/${group}`}>Voir les étudiants</Link>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
export default observer(Groups);
