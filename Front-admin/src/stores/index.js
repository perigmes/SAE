import { createContext } from "react";
import ProductsStore from "./ProductsStore"
import { useContext } from "react";


const GlobalContext = createContext();
const stores = {
    productStore: new ProductsStore()
}
export const StoreProvider = ({ children }) => (
    <GlobalContext.Provider value={stores}>
        {children}
    </GlobalContext.Provider>)

export const useStudentStore = () => {
    const context = useContext(GlobalContext);
    if (!context) {
        throw new Error("useProductStore must be within a StoreProvider");
    }
    return context.studentStore;
};


