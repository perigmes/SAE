import { useParams } from "react-router-dom";
import Nav from "../components/Nav";
import { useState, useEffect } from "react";
import { observer } from "mobx-react";
import UserResume from "../components/UserResume";
import SearchBar from "../components/SearchBar";
import { useProductStore, useUserStore } from "../stores";

function UsersList() {
  let userStore = useProductStore();

  let { role } = useParams();
  let [selectedRole, setSelectedRole] = useState(
    role ? userStore.getUserByRole(role) : userStore.users
  );
  let [search, setSearch] = useState("");

  let handleChange = (event) => {
    event.preventDefault();
    setSearch(event.target[0].value);
  };
  useEffect(() => {
    setSelectedRole(
      role ? userStore.getUserByRole(role) : userStore.users
    );
  }, [role, userStore.users]);

  return (
    <>
      <h1>
        Liste des utilisateurs
        {role && ` ${role}`}
      </h1>
      <SearchBar nbCarMin={3} onChange={handleChange}></SearchBar>

      <ul className="p-4 grid sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 justify-content-center gap-x-4 gap-y-8">
        {!search
          ? selectedRole.map((user) => {
              return (
                <li key={user.id}>
                  <UserResume user={user}></UserResume>
                </li>
              );
            })
          : selectedRole
              .filter((user) =>
                user.name.toLowerCase().includes(search.toLowerCase())
              )
              .map((user) => {
                return (
                  <li key={user.id}>
                    <UserResume user={user}></UserResume>
                  </li>
                );
              })}
      </ul>
    </>
  );
}
export default observer(UsersList);
