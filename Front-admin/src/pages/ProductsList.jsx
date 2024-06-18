import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { observer } from "mobx-react";
import { Radio, RadioGroup } from '@headlessui/react'
import ProductResume from "../components/ProductResume";
import SearchBar from "../components/SearchBar";
import { useProductStore } from "../stores";
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Button } from "@headlessui/react";

function ProductsList({selectProduct,setAddTrue}) {
  const productContext = useProductStore();
  let { categorie } = useParams();
  const { categories }= productContext;
  let [selectedGroup, setSelectedGroup] = useState(
    categorie ? productContext.getProductByGroup(categorie) : productContext.products
  );
  const options = [
    { name: 'Canard' },
    { name: 'Souris' },
    { name: 'Rat' },
  ]
  
  let [search, setSearch] = useState("");
  const [selected, setSelected] = useState(options[0])

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
      <SearchBar nbCarMin={2} onChange={handleChange}></SearchBar>
      <Button onClick={()=>setAddTrue()}>Ajouter un produit</Button>

      <div className="bigBox">
        <div className="gx a ask boxLessBig">
          <RadioGroup by="name" value={selected} onChange={setSelected} aria-label="Server size" className="lb zq ysr lx">
            {options.map((plan) => (
              <Link to={`/products/categories/${plan.name}`}>
                <Radio
                  key={plan.name}
                  value={plan}
                  className="group ab lx a acs ash transition menuButton"
                >

                    {({checked}) => (
                      <div className={`lx option arj arv adu ${checked?"changeColor":""}`}>
                        <div className="avl boxLittle">
                        <span key={categorie}>{plan.name}</span>
                        </div>
                      </div>
                    )}
                </Radio>
              </Link>
            ))}
          </RadioGroup>
        </div>
      </div>

      <ul className="mb yh zs cao cmo cyo">
        {!search
          ? selectedGroup.map((product) => {
              return (
                <li key={product.id} className="eq lx ys acd xr ach adu aln avl bbi" onClick={()=>selectProduct(product.id)}>
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

