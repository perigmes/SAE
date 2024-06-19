import { createContext } from "react";
import ProductsStore from "./ProductsStore"
import { useContext } from "react";
import UserStore from "./UserStore"

const GlobalContext = createContext();
const stores = {
    productStore: new ProductsStore(),
    userStore : new UserStore()

}

export const StoreProvider = ({ children }) => (
    <GlobalContext.Provider value={stores}>
        {children}
    </GlobalContext.Provider>)

export const useProductStore = () => {
    const context = useContext(GlobalContext);
    if (!context) {
        throw new Error("useProductStore must be within a StoreProvider");
    }
    return context.productStore;
};
export const useUserStore = () => {
    const context = useContext(GlobalContext);
    if (!context) {
        throw new Error("useUserStore must be within a StoreProvider");
    }
    return context.userStore;
};


