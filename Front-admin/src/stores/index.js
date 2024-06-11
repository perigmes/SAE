import { createContext } from "react";
import StudentStore from "./StudentStore"
import { useContext } from "react";


const GlobalContext = createContext();
const stores = {
    studentStore: new StudentStore()
}
export const StoreProvider = ({ children }) => (
    <GlobalContext.Provider value={stores}>
        {children}
    </GlobalContext.Provider>)

export const useStudentStore = () => {
    const context = useContext(GlobalContext);
    if (!context) {
        throw new Error("useStudentStore must be within a StoreProvider");
    }
    return context.studentStore;
};


