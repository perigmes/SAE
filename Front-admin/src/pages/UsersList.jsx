import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { observer } from "mobx-react";
import UserResume from "../components/UserResume";
import SearchBar from "../components/SearchBar";
import { useUserStore } from "../stores";
import PropTypes from 'prop-types';
import { Button } from "@headlessui/react";

function UsersList({ selectUser, setAddTrue }) {
  const userContext = useUserStore();
  console.log(userContext._users);
  let { role } = useParams();
  let [selectedRole, setSelectedRole] = useState(
    role ? userContext.getUserByRole(role) : userContext.users
  );
  
  let [search, setSearch] = useState("");

  let handleChange = (event) => {
    event.preventDefault();
    setSearch(event.target[0].value);
  };
  useEffect(() => {
    setSelectedRole(
      role ? userContext.getUserByRole(role) : userContext.users
    );
  }, [role, userContext, userContext.users]);

  return (
    <>
      <h1>
        Liste Utilisateurs
      </h1>
      <SearchBar nbCarMin={2} onChange={handleChange}></SearchBar>
      <Button onClick={()=>setAddTrue()}>Ajouter un administrateur</Button>

      <ul>
        {!search
          ? userContext.users.map((user) => {
              return (
                <li key={user.id} onClick={()=>selectUser(user.id)}>
                  <UserResume user={user}></UserResume>
                </li>
              );
            })
          : userContext.users
              .filter((user) =>
                user.title.toLowerCase().includes(search.toLowerCase())
              )
              .map((user) => {
                return (
                  <li key={user.id} onClick={()=>selectUser(user.id)}>
                    <UserResume user={user}></UserResume>
                  </li>
                );
              })}
      </ul>
    </>
  );
}

UsersList.propTypes = {
  selectUser: PropTypes.func,
  setAddTrue: PropTypes.func,
};

UsersList.defaultProps = {
  selectUser: () => {},
  setAddTrue: () => {},
};

export default observer(UsersList);
