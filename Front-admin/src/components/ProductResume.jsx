import React from "react";
import { Link } from "react-router-dom";
function ProductResume({ product }) {
  return (
    <article className="grid gap-y-1 text-2xl justify-items-center">
      <img src={product.photo} alt="" className="gx nu rw uq" />
      <figcaption className="un ys lx">
        <Link to={`/products/${product.id}/update`}>{product.title}</Link>
        <span className="awa axr">rp {product.id}</span>
      </figcaption>
    </article>
  );
}

export default ProductResume;
