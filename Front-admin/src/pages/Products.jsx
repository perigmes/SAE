
import { useState } from "react";
import ProductsList from "./ProductsList"
import ProductUpdate from "./ProductUpdate"
import { observer } from "mobx-react";
function Products() {
    const [productSelect,setProductSelect]= useState(null);
    return (
        <>
          <div className="dnc">
          <div className="ari arr cex ddc adl ddo">
            <ProductsList selectProduct={(value)=>{setProductSelect(value)}}/>
            </div>
            </div>
            {productSelect &&    <div className="z as de md sn adk afj afv ari ase cex ddc diq">
                <div className="ab pa adh ady afa afq afx bbe">
                    <ProductUpdate productSelected={productSelect} validate={()=>setProductSelect(null)}/>
                </div>
            </div>}
         
        </>
    )
}
export default observer(Products);