import React from "react";
import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import JoinUs from "../pages/JoinUs";
import PrivateRoute from "../components/auth/PrivateRouter";
import Membership from "../pages/Membership";
import PostDetails from "../pages/PostDetails";
import UserDashboardLayout from "../pages/dashboard/user/UserDashboardLayout";
import Profile from "../pages/dashboard/user/Profile";
import AddPost from "../pages/dashboard/user/AddPost";
import MyPosts from "../pages/dashboard/user/MyPosts";
import AdminDashboardLayout from "../pages/dashboard/admin/AdminDashboardLayout";
import Users from "../pages/dashboard/admin/Users";
import Reports from "../pages/dashboard/admin/Reports";
import Announcement from "../pages/dashboard/admin/Announcement";
import DashboardLayout from "../layouts/DashboardLayout";
import AboutUs from "../components/AboutUs";
import ContactUs from "../components/ContactUs";
import Services from "../components/Services";
import Login from "../pages/authentication/Login";
import Register from "../pages/authentication/Register";
import CommentsPage from "../components/comments/CommentsPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
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
            <Membership />
          </PrivateRoute>
        ),
      },
      { path: "/post/:id", element: <PostDetails /> },
      { path: "/about", element: <AboutUs></AboutUs> },
      { path: "/contact", element: <ContactUs></ContactUs> },
      { path: "/services", element: <Services></Services> },
      {
        path: "/comments/:postId",
        element: (
          <PrivateRoute>
            <CommentsPage />
          </PrivateRoute>
        ),
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
          { path: "profile", element: <Profile /> },
          { path: "add-post", element: <AddPost /> },
          { path: "my-posts", element: <MyPosts /> },
        ],
      },
      {
        path: "admin",
        element: <AdminDashboardLayout />,
        children: [
          { path: "users", element: <Users /> },
          { path: "reports", element: <Reports /> },
          { path: "announcement", element: <Announcement /> },
        ],
      },
    ],
  },
]);

export default router;
