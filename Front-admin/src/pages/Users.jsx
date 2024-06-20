import { useState } from "react";
import UsersList from "./UsersList"
import UserUpdate from "./UserUpdate"
import UserAdd from "./UserAdd";
import { observer } from "mobx-react";
function Users() {
    const [userSelect,setUserSelect]= useState(null);
    const [isAdding,setIsAdding]= useState(false);

    return (
        <>
          <div className="dnc">
          <div className="ari arr cex ddc ddo">
            <UsersList selectUser={(value)=>{setUserSelect(value)}} setAddTrue={()=>{setIsAdding(true); setUserSelect(null)}}/>
            </div>
            </div>
               <div className="z as de md sn adk afj afv ari ase cex ddc diq">
                <div className="ab pa adh ady afa afq afx bbe adl">
                {userSelect ?(<UserUpdate userSelected={userSelect} validate={()=>setUserSelect(null)}/>):(isAdding && <UserAdd validate={()=>setUserSelect(null)} close={()=>setIsAdding(false)}/>)}
                </div>
            </div>
        </>
    )
}
export default observer(Users);