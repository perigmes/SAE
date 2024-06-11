import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Groups from "./pages/Groups";
import ProductsList from "./pages/ProductsList";
import Page404 from "./pages/Page404";
import App from "./App";
import ProductUpdate from "./pages/ProductUpdate";

export const router = createBrowserRouter([
    {
        element: <App />,
        errorElement: <Page404 />,
        children: [
            {
                path: "/",
                element: <Home />
            }, {
                path: "/groups",
                element: <Groups />
            }, {
                path: "/products/groups?/:group?",
                element: <ProductsList />
            }, {
                path: "/students/:id/update",
                element: <ProductUpdate />
            }, {
                path: "*",
                element: <Page404 />
            }
        ]
    }])