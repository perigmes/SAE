import React from "react";
import { observer } from "mobx-react";
import { Link } from "react-router-dom";
import { useProductStore } from "../stores";

function Groups() {
  let productStore = useProductStore();
  return (
    <>
      <h1>Les catégories</h1>
      <div className="mt-8 text-2xl sm:text-3xl flex gap-x-20 justify-center flex-wrap">
        <div className="flex gap-x-4 justify-center font-bold">
          <span>{productStore.groups.length}</span>
          <span>catégories</span>
        </div>
        <div className="flex gap-x-4 justify-center font-bold">
          <span>{productStore.products.length}</span>
          <span>produits</span>
        </div>
      </div>
      {productStore.groups.length > 0 && (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 w-max mx-auto gap-6 mt-8 text-2xl sm:text-3xl">
          {productStore.groups.map((group) => (
            <div
              key={group}
              className="flex flex-col items-center bg-slate-400 p-4 rounded-2xl"
            >
              <p>{group}</p>
              <p>{productStore.getProductByGroup(group).length} produits</p>
              <Link to={`/products/groups/${group}`}>Voir les produits</Link>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
export default observer(Groups);
