import React, { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { faRotateLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useParams } from "react-router-dom";
import { GlobalContext } from "../App";
import { observer } from "mobx-react";
import { useStudentStore } from "../stores";

function StudentUpdate() {
  const  studentStore  = useStudentStore();
  const navigate = useNavigate();
  let { id } = useParams();
  let [student, setStudent] = useState(studentStore.getStudentById(id));
  let [error, setError] = useState(null);
  useEffect(
    () => setStudent(studentStore.getStudentById(id)),
    [id, studentStore.students]
  );

  let handleSubmit = async (event) => {
    event.preventDefault();
    let data = Object.fromEntries(new FormData(event.target));
    let { success, message } = await studentStore.updateStudent({
      id,
      ...data,
    });
    if (success) {
      navigate(-1);
    } else {
      setError(message);
    }
  };

  return (
    <>
      {student ? (
        <main>
          <h1>Fiche étudiant {student.id}</h1>
          <form
            action="#"
            className="grid sm:grid-cols-2 gap-1 sm:gap-4 mx-auto mt-8 w-fit"
            onSubmit={handleSubmit}
          >
            <label htmlFor="fistName">Nom</label>

            <input
              type="text"
              name="firstName"
              id="firstName"
              required
              minLength={2}
              maxLength={25}
              title="Le nom doit comporter entre 2 et 25 caractères alphabétiques non accentués, espaces, tirets ou apostrophes"
              defaultValue={student.firstName}
            />
            <label htmlFor="lastName">Prénom</label>

            <input
              type="text"
              name="lastName"
              id="lastName"
              required
              minLength={2}
              maxLength={25}
              title="Le prénom doit comporter entre 2 et 25 caractères alphabétiques non accentués, espaces, tirets ou apostrophes"
              defaultValue={student.lastName}
            />
            <label htmlFor="group">Groupe</label>

            <select
              name="group"
              id="group"
              defaultValue={student.group}
              required
            >
              {studentStore.groups.map((group) => (
                <option key={group} value={group}>
                  {group}
                </option>
              ))}
            </select>
            <div className="col-start-2 flex gap-4">
              <button
                className="btn"
                type="button"
                onClick={() => navigate(-1)}
              >
                Annuler <FontAwesomeIcon icon={faRotateLeft} />
              </button>
              <button className="btn" type="submit">
                Enregistrer <FontAwesomeIcon icon={faPaperPlane} />
              </button>
            </div>
            {error && (
              <p className="text-red-600 bg-red-100 text-center col-span-2">
                {error}
              </p>
            )}
          </form>
        </main>
      ) : (
        <p>Etudiant inexistant</p>
      )}
    </>
  );
}
export default observer(StudentUpdate);
