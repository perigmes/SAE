import React from "react";

function UserResume({ user }) {
  return (
    <article className="lx yx jx asc afg tColorGrey300">
      <img src={user.pp} alt="" className="wh-10 adt" />
      <div>
        <h3 className="awb awg">{user.pseudo}</h3>
        <span className="awa tColorGrey500">{user.email}</span>
      </div>
    </article>
  );
}

export default UserResume;
