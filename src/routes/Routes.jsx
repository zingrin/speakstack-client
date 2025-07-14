import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
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
import PostDetails from "../components/PostDetails";
import MyProfile from "../pages/Dashboard/MyProfile";
import AddPost from "../pages/Dashboard/AddPost";
import MyPosts from "../pages/Dashboard/MyPosts";
import Home from "../pages/Home/Home";
import ManageUsers from "../pages/Dashboard/Admin/ManageUsers";
import DashboardHome from "../components/DashboardHome";
import PostComments from "../pages/PostComments";
import ReportedComments from "../pages/ReportedComments";
import AboutUs from "../components/AboutUs";
import Blog from "../components/Blog";
import ContactUs from "../components/ContactUs";
import Services from "../components/Services";
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      { path: "/", element: <Home></Home> },

      { path: "/post/:id", element: <PostDetails /> },
      { path: "/allPets", element: <AllPets></AllPets> },
      { path: "/pet/:id", element: <PetDetails></PetDetails> },
      {
        path: "/announcements",
        element: <AnnouncementSection></AnnouncementSection>,
      },
      { path: "/join-us", element: <JoinUs></JoinUs> },
      { path: "/login", element: <Login></Login> },
      { path: "/register", element: <Register></Register> },
      {path:"about", element: <AboutUs></AboutUs>},
      {path:"blog", element: <Blog></Blog>},
      {path: "contact", element: <ContactUs></ContactUs>},
      {path: "services", element: <Services></Services>}
    ],
  },
 
       
  {
  path: "/dashboard",
  element: <DashboardLayout />,
  children: [
    {
      index: true,
      element: <DashboardHome />
    },
    // Admin-only routes
    {
      path: "admin-profile",
      element: <AdminRoute><AdminProfile /></AdminRoute>,
    },
    {
      path: "make-announcement",
      element: <AdminRoute><MakeAnnouncement /></AdminRoute>,
    },
    {
      path: "manage-user",
      element: <AdminRoute><ManageUsers /></AdminRoute>,
    },
    {
  path: "comments/:postId",
  element: <AdminRoute> <PostComments /></AdminRoute>,},
   {
      path: "reported-comments",
      element: (
        <AdminRoute>
          <ReportedComments />
        </AdminRoute>
      ),
    },

    // User routes
    { path: "my-profile", element: <MyProfile /> },
    { path: "add-post", element: <AddPost /> },
    { path: "my-posts", element: <MyPosts /> },
  ]
}


]);
export default router;
