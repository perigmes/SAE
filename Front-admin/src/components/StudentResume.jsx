import React from "react";
import { Link } from "react-router-dom";
function StudentResume({ student }) {
  return (
    <article className="grid gap-y-1 text-2xl justify-items-center">
      <img src={student.photo} alt="" className="w-full max-w-[12rem] rounded-xl shadow-lg" />
      <figcaption>
        <Link to={`/students/${student.id}/update`}>{student.fullName}</Link>
      </figcaption>
    </article>
  );
}

export default StudentResume;
