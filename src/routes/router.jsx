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
import AnnouncementsSection from "../components/ui/AnnouncementsSection";
import Notification from "../components/Notification";
import PostPages from "../components/posts/PostPages";
import AllCourses from "../pages/AllCourses";
import PopularCourses from "../components/PopularCourses";

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
      {path:"all-course", element:<AllCourses></AllCourses> },
      {
        path: "/membership",
        element: (
          <PrivateRoute>
            <Membership />
          </PrivateRoute>
        ),
      },
      { path: "/post/:id", element: <PostDetails /> },
      {path:"post-page", element: <PostPages></PostPages>},
      { path: "/about", element: <AboutUs></AboutUs> },
      { path: "/contact", element: <ContactUs></ContactUs> },
      { path: "/services", element: <Services></Services> },
      {path: "/announcements", element: <AnnouncementsSection></AnnouncementsSection>},
      {path:"notification/:id", element: <Notification></Notification>},
      {path: "popular", element:<PopularCourses></PopularCourses>},
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
