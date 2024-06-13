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
    group ? productStore.getProductByGroup(group) : productStore.products
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

      <ul className="mb yh zs cao cmo cyo">
        {!search
          ? selectedGroup.map((product) => {
              return (
                <li key={product.id} className="eq lx ys acd ach adu aln avl bbi">
                  <ProductResume product={product}></ProductResume>
                </li>
              );
            })
          : selectedGroup
              .filter((product) =>
                product.title.toLowerCase().includes(search.toLowerCase())
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
