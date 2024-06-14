import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Groups from "./pages/Groups";
import Products from "./pages/Products";
import Page404 from "./pages/Page404";
import App from "./App";
import UserUpdate from "./pages/UserUpdate";
import UsersList from "./pages/UsersList";

export const router = createBrowserRouter([
    {
        element: <App />,
        errorElement: <Page404 />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "/profile",
                element: <UserUpdate />
            },
            {
                path: "/users",
                element: <UsersList />
            }, {
                path: "/groups",
                element: <Groups />
            }, {
                path: "/products/categories?/:categorie?",
                element: <ProductsList />
            },
            {
                path: "/products",
                element: <Products />
            },{
                path: "*",
                element: <Page404 />
            }
        ]
    }])