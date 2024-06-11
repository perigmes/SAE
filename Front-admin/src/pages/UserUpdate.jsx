import React, { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { faRotateLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useParams } from "react-router-dom";
import { GlobalContext } from "../App";
import { observer } from "mobx-react";
import { useUserStore } from "../stores";

function UserUpdate() {
  const  userStore  = useUserStore();
  const navigate = useNavigate();
  let { id } = useParams();
  let [user, setUser] = useState(userStore.getUserById(id));
  let [error, setError] = useState(null);
  useEffect(
    () => setUser(userStore.getUserById(id)),
    [id, userStore.users]
  );

  let handleSubmit = async (event) => {
    event.preventDefault();
    let data = Object.fromEntries(new FormData(event.target));
    let { success, message } = await userStore.updateUser({
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
      {user ? (
        <main>
          <h1>Fiche personne {user.id}</h1>
          <form
            action="#"
            className="grid sm:grid-cols-2 gap-1 sm:gap-4 mx-auto mt-8 w-fit"
            onSubmit={handleSubmit}
          >
            <label htmlFor="name">Nom</label>

            <input
              type="text"
              name="name"
              id="name"
              required
              minLength={2}
              maxLength={25}
              title="Le nom doit comporter entre 2 et 25 caractères alphabétiques non accentués, espaces, tirets ou apostrophes"
              defaultValue={user.name}
            />
            <label htmlFor="role">Role</label>

            <select
              name="role"
              id="role"
              defaultValue={user.role}
              required
            >
              {userStore.roles.map((role) => (
                <option key={role} value={role}>
                  {role}
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
        <p>Personne inexistante</p>
      )}
    </>
  );
}
export default observer(UserUpdate);
