import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Pagination";
import JoinUs from "../pages/JoinUs";
import Login from "../pages/Login";
import Register from "../pages/Register";
import AllPets from "../pages/AllPets";
import PetDetails from "../pages/PetDetails";
import AnnouncementSection from "../components/AnnouncementSection";
import DashboardLayout from "../layouts/DashboardLayout";
import AdminRoute from "../pages/Dashboard/Admin/AdminRoutes";
import MakeAnnouncement from "../pages/Dashboard/Admin/MakeAnnouncement";
import AdminProfile from "../pages/Dashboard/Admin/AdminProfile";
import DashboardHome from "../components/DashboardHome";
import PostDetails from "../components/PostDetails";
import MyProfile from "../pages/Dashboard/MyProfile";
import AddPost from "../pages/Dashboard/AddPost";
import PostList from "../components/PostList";
import MyPosts from "../pages/Dashboard/MyPosts";
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
            { path: "/", element: <Home></Home> },

       { path: "/postList", element: <PostList /> },              
      { path: "/post/:id", element: <PostDetails /> },  
      { path: "/allPets", element: <AllPets></AllPets> },
      { path: "/pet/:id", element: <PetDetails></PetDetails> },
      {path: "/announcements", element: <AnnouncementSection></AnnouncementSection>},
      { path: "/join-us", element: <JoinUs></JoinUs> },
      {path: "/login", element: <Login></Login>},
      {path: "/register", element: <Register></Register>}
     
    ],
  },
  {
  path: "/",
  element: <DashboardLayout />,
  children: [
    {
      path:"/dashboard",
      element: <DashboardHome />
    },
    {
      path: "make-announcement",
      element: (
        <AdminRoute>
          <MakeAnnouncement />
        </AdminRoute>
      ),
    },
     {
        path: "add-post",
        element: <AddPost />,
      },
      {path: "my-posts", element: <MyPosts></MyPosts>},
    {
      path: "admin-profile",
      element: <AdminProfile />
    },
    { path: "my-profile", element: <MyProfile /> },
  ],
}

  ],


);
export default router;
