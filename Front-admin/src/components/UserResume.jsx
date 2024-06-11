import React from "react";
import { Link } from "react-router-dom";
function UserResume({ user }) {
  return (
    <article className="grid gap-y-1 text-2xl justify-items-center">
      <img src={user.pp} alt="" className="w-full max-w-[12rem] rounded-xl shadow-lg" />
      <figcaption>
        <Link to={`/users/${user.id}/update`}>{user.nom}</Link>
      </figcaption>
    </article>
  );
}

export default UserResume;
