import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Groups from "./pages/Groups";
import StudentsList from "./pages/StudentsList";
import StudentUpdate from "./pages/StudentUpdate";
import Page404 from "./pages/Page404";
import App from "./App";

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
                path: "/students/groups?/:group?",
                element: <StudentsList />
            }, {
                path: "/students/:id/update",
                element: <StudentUpdate />
            }, {
                path: "*",
                element: <Page404 />
            }
        ]
    }])