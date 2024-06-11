import React from "react";
import { Link } from "react-router-dom";
function ProductResume({ product }) {
  return (
    <article className="grid gap-y-1 text-2xl justify-items-center">
      <img src={product.photo} alt="" className="w-full max-w-[12rem] rounded-xl shadow-lg" />
      <figcaption>
        <Link to={`/products/${product.id}/update`}>{product.title}</Link>
      </figcaption>
    </article>
  );
}

export default ProductResume;
