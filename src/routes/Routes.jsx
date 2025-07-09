import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Pagination";
import JoinUs from "../pages/JoinUs";
import Login from "../pages/Login";
import Register from "../pages/Register";
import AllPets from "../pages/AllPets";
import PetDetails from "../pages/PetDetails";
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      { path: "/", element: <Home></Home> },
      { path: "/allPets", element: <AllPets></AllPets> },
      { path: "/pet/:id", element: <PetDetails></PetDetails> },

      { path: "/join-us", element: <JoinUs></JoinUs> },
      {path: "/login", element: <Login></Login>},
      {path: "/register", element: <Register></Register>}
     
    ],
  },
]);
export default router;
