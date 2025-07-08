import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Pagination";
import JoinUs from "../pages/JoinUs";
import Login from "../pages/Login";
import Register from "../pages/Register";
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      { path: "/", element: <Home></Home> },

      { path: "/join-us", element: <JoinUs></JoinUs> },
      {path: "/login", element: <Login></Login>},
      {path: "/register", element: <Register></Register>}
     
    ],
  },
]);
export default router;
