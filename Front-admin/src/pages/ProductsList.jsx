import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { observer } from "mobx-react";
import ProductResume from "../components/ProductResume";
import SearchBar from "../components/SearchBar";
import { useProductStore } from "../stores";

function ProductsList() {
  let productStore = useProductStore();

  let { group } = useParams();
  let [selectedGroup, setSelectedGroup] = useState(
    group ? productStore.getProductByGroup(group) : productStore.students
  );
  let [search, setSearch] = useState("");

  let handleChange = (event) => {
    event.preventDefault();
    setSearch(event.target[0].value);
  };
  useEffect(() => {
    setSelectedGroup(
      group ? productStore.getProductByGroup(group) : productStore.products
    );
  }, [group, productStore, productStore.products]);

  return (
    <>
      <h1>
        Liste Produits
        {group && ` ${group}`}
      </h1>
      <SearchBar nbCarMin={3} onChange={handleChange}></SearchBar>

      <ul className="p-4 grid sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 justify-content-center gap-x-4 gap-y-8">
        {!search
          ? selectedGroup.map((product) => {
              return (
                <li key={product.id}>
                  <ProductResume product={product}></ProductResume>
                </li>
              );
            })
          : selectedGroup
              .filter((product) =>
                product.name.toLowerCase().includes(search.toLowerCase())
              )
              .map((product) => {
                return (
                  <li key={product.id}>
                    <ProductResume product={product}></ProductResume>
                  </li>
                );
              })}
      </ul>
    </>
  );
}
export default observer(ProductsList);
