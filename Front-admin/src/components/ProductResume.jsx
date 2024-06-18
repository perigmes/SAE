import React from "react";
function ProductResume({ product }) {
  return (
    <article className="grid gap-y-1 text-2xl justify-items-center">
      <img src={product.image} alt="" className="gx nu rw uq" />
      <figcaption className="un ys lx">
        <h3>{product.titre}</h3>
        <span className="awa axr">rp {product.id}</span>
        <div className="jf lx acc ach">
          <span className="lx rd un awa axr zf asc py-5">Stock {product.disponibilite}</span>
          <span className="ia lx rd un awa axr zf asc">Vendu {product.vendu}</span>
        </div>
      </figcaption>
    </article>
  );
}

export default ProductResume;
