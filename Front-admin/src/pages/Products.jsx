
import { useState } from "react";
import ProductsList from "./ProductsList"
import ProductUpdate from "./ProductUpdate"
import ProductAdd from "./ProductAdd";
import { observer } from "mobx-react";
function Products() {
    const [productSelect,setProductSelect]= useState(null);
    const [isAdding,setIsAdding]= useState(false);

    return (
        <>
          <div className="dnc">
          <div className="ari arr cex ddc ddo">
            <ProductsList selectProduct={(value)=>{setProductSelect(value)}} setAddTrue={()=>setIsAdding(true)}/>
            </div>
            </div>
               <div className="z as de md sn adk afj afv ari ase cex ddc diq">
                <div className="ab pa adh ady afa afq afx bbe adl">
                {productSelect && <ProductUpdate productSelected={productSelect} validate={()=>setProductSelect(null)}/>}
                {isAdding &&<ProductAdd validate={()=>setProductSelect(null)} close={()=>setIsAdding(false)}/>}

                </div>
            </div>
        </>
    )
}
export default observer(Products);