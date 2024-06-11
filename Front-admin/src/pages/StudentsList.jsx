import { useParams } from "react-router-dom";
import Nav from "../components/Nav";
import { useState, useEffect } from "react";
import { observer } from "mobx-react";
import StudentResume from "../components/StudentResume";
import SearchBar from "../components/SearchBar";
import { useStudentStore } from "../stores";

function StudentsList() {
  let studentStore = useStudentStore();

  let { group } = useParams();
  let [selectedGroup, setSelectedGroup] = useState(
    group ? studentStore.getStudentByGroup(group) : studentStore.students
  );
  let [search, setSearch] = useState("");

  let handleChange = (event) => {
    event.preventDefault();
    setSearch(event.target[0].value);
  };
  useEffect(() => {
    setSelectedGroup(
      group ? studentStore.getStudentByGroup(group) : studentStore.students
    );
  }, [group, studentStore.students]);

  return (
    <>
      <h1>
        Liste étudiants
        {group && ` ${group}`}
      </h1>
      <SearchBar nbCarMin={3} onChange={handleChange}></SearchBar>

      <ul className="p-4 grid sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 justify-content-center gap-x-4 gap-y-8">
        {!search
          ? selectedGroup.map((student) => {
              return (
                <li key={student.id}>
                  <StudentResume student={student}></StudentResume>
                </li>
              );
            })
          : selectedGroup
              .filter((student) =>
                student.fullName.toLowerCase().includes(search.toLowerCase())
              )
              .map((student) => {
                return (
                  <li key={student.id}>
                    <StudentResume student={student}></StudentResume>
                  </li>
                );
              })}
      </ul>
    </>
  );
}
export default observer(StudentsList);
