import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { observer } from "mobx-react";
import ProductResume from "../components/ProductResume";
import SearchBar from "../components/SearchBar";
import { useProductStore } from "../stores";
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function ProductsList({selectProduct}) {
  const productContext = useProductStore();
  let { categorie } = useParams();
  const { categories }= productContext;
  let [selectedGroup, setSelectedGroup] = useState(
    categorie ? productContext.getProductByGroup(categorie) : productContext.products
  );
  
  let [search, setSearch] = useState("");

  let handleChange = (event) => {
    event.preventDefault();
    setSearch(event.target[0].value);
  };
  useEffect(() => {
    setSelectedGroup(
      categorie ? productContext.getProductByGroup(categorie) : productContext.products
    );
  }, [categorie, productContext, productContext.products]);

  return (
    <>
      <h1>
        Liste Produits
      </h1>
      <SearchBar nbCarMin={3} onChange={handleChange}></SearchBar>
      <div>
      {
        categories.map(categorie => (
          <div className="p-4 sm:p-8 bg-slate-300 rounded-xl grid justify-items-center gap-y-2" key={categorie}>
            <span><Link to={`/products/categories/${categorie}`}>{categorie}</Link></span>
          </div>
          ))
      }
      </div>

      <ul className="mb yh zs cao cmo cyo">
        {!search
          ? selectedGroup.map((product) => {
              return (
                <li key={product.id} className="eq lx ys acd ach adu aln avl bbi" onClick={()=>selectProduct(product.id)}>
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
                  <li key={product.id} className="eq lx ys acd ach adu aln avl bbi" onClick={()=>{
                  selectProduct(product.id)}}>
                    <ProductResume product={product}></ProductResume>
                  </li>
                );
              })}
      </ul>
    </>
  );
}
ProductsList.propTypes ={
  selectProduct:PropTypes.func,
}

export default observer(ProductsList);

