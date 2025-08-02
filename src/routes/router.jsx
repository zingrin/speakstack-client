import React from "react";
import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import JoinUs from "../pages/JoinUs";
import PrivateRoute from "../components/auth/PrivateRouter";
import PostDetails from "../pages/PostDetails";
import UserDashboardLayout from "../pages/dashboard/user/UserDashboardLayout";
import AddPost from "../pages/dashboard/user/AddPost";
import MyPosts from "../pages/dashboard/user/MyPosts";
import AdminDashboardLayout from "../pages/dashboard/admin/AdminDashboardLayout";
import Reports from "../pages/dashboard/admin/Reports";
import Announcement from "../pages/dashboard/admin/Announcement";
import DashboardLayout from "../layouts/DashboardLayout";
import AboutUs from "../components/AboutUs";
import ContactUs from "../components/ContactUs";
import Services from "../components/Services";
import Login from "../pages/authentication/Login";
import Register from "../pages/authentication/Register";
import AnnouncementsSection from "../components/ui/AnnouncementsSection";
import Notification from "../components/Notification";
import PostPages from "../components/posts/PostPages";
import AllPosts from "../components/AllPost";
import MyProfile from "../pages/dashboard/user/MyProfile";
import MembershipPage from "../pages/MembershipPage";
import Users from "../pages/dashboard/admin/Users";
import AdminProfile from "../pages/dashboard/admin/AdminProfile";
import CommentList from "../pages/CommentList";
import NotFound from "../pages/NotFound";
import DashboardRedirect from "../contexts/DashboardRedirect";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <NotFound></NotFound>,
    children: [
      { path: "/", element: <Home /> },
      { path: "/join", element: <JoinUs /> },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/membership",
        element: (
          <PrivateRoute>
            <MembershipPage />
          </PrivateRoute>
        ),
      },
      { path: "/allPost", element: <AllPosts></AllPosts> },

      { path: "/post/:id", element: <PostDetails /> },
      { path: "post-page", element: <PostPages></PostPages> },
      { path: "/about", element: <AboutUs></AboutUs> },
      { path: "/contact", element: <ContactUs></ContactUs> },
      { path: "/services", element: <Services></Services> },
      {
        path: "/announcements",
        element: <AnnouncementsSection></AnnouncementsSection>,
      },
      { path: "notification/:id", element: <Notification></Notification> },
      {
        path: "/comments/:postId",
        element: 
            <CommentList />
        
      },
    ],
  },
  {
    path: "dashboard",
    element: <DashboardLayout />,
    children: [
      {
        path: "user",
        element: <UserDashboardLayout />,
        children: [
          { index: true, element: <DashboardRedirect /> },
          { path: "profile", element: <MyProfile /> },
          { path: "add-post", element: <AddPost /> },
          { path: "my-posts", element: <MyPosts /> },
        ],
      },
      {
        path: "admin",
        element: <AdminDashboardLayout />,
        children: [
          { index: true, element: <DashboardRedirect /> },

          { path: "admin-profile", element: <AdminProfile></AdminProfile> },
          { path: "users", element: <Users /> },
          { path: "reports", element: <Reports /> },
          { path: "announcement", element: <Announcement /> },
        ],
      },
    ],
  },
]);

export default router;
