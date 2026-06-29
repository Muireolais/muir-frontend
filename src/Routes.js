// routes.js
import React, { useMemo } from "react";
import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

// Импорт компонентов страниц
import HomePage from "./pages/Home";
// import NewsPage from "./pages/NewsPage";
// import ContactsPage from "./pages/ContactsPage";
import NotFoundPage from "./pages/NotFound";
import CaptainAdd from "./pages/MasterAdd";
import CoursesPage from "./pages/Courses";

// Импорт Login page from "./pages/Login";
import Login from "./pages/Login/Login";
import LoginLayout from "./layouts/LoginLayout";
import Crew from "./pages/Login/Crew";
import Company from "./pages/Login/Company";
import MasterMain from "./pages/MasterMain";

// Импорт layout (если есть)
import RootLayout from "./layouts/RootLayout";
import CaptainLayout from "./layouts/CaptainLayout";

import ProfileMain from "./pages/ProfileMain";
import ProfileLayout from "./layouts/ProfileLayout";

import CourseLayout from "./layouts/CourseLayout";
import CourseHeader from "./pages/CourseHeader";
import CourseSidebar from "./pages/CourseSidebar";
import Course from "./pages/Course";

import CompanyPageVessels from "./pages/CompanyPageVessels";
import CompanyDashboard from "./pages/CompanyDashboard";
import CompanyPageSubscription from "./pages/CompanyPageSubscription";
import CompanyLayout from "./layouts/CompanyLayout";
import CompanyAddVessel from "./pages/CompanyAddVessel";

const links = {
  landing: "/",
  master: "/master",
  statistic: "./statistic", //for captain page
  add: "./add", //for captain page
  profile: "/profile",
  courses: "/courses",
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout links={links} />, // общий layout с header/footer
    children: [
      { index: true, element: <HomePage /> },
      //   { path: "courses", element: <CoursesPage /> },
      //   { path: "news", element: <NewsPage /> },
      //   { path: "contacts", element: <ContactsPage /> },
    ],
  },

  {
    path: "master",
    element: (
      /*<ProtectedRoute redirect={"/login"} allowedRoles={["master"]}>*/
      <CaptainLayout links={links} />
      /*</ProtectedRoute>*/
    ),
    children: [
      { index: true, element: <MasterMain links={links} /> },
      { path: "add", element: <CaptainAdd links={links} /> },
    ],
  },

  {
    path: "login",
    element: <LoginLayout />,
    children: [
      { index: true, element: <Login /> },
      { path: "company", element: <Company /> },
      { path: "crew", element: <Crew /> },
    ],
  },
  
  {
  path: "profile",
  element: (
    // <ProtectedRoute redirect={"/login"} allowedRoles={["crew"]}>
    <ProfileLayout links={links} />
    // </ProtectedRoute>
  ),
  children: [
    { index: true, element: <ProfileMain /> },
    { path: "crew-management", element: <MasterMain links={links}/> },    
    { path: "crew-management/add", element: <CaptainAdd /> },
    { path: "courses", element: <CoursesPage /> },
    { path: "courses/:courseSlug", element: <Course /> },
    ],
  },

  {
    path: "company",
    element: <CompanyLayout />,
    children: [
      { index: true, element: "" },
      { path: "vessels", element: <CompanyPageVessels /> },
      { path: "vessels/add", element: <CompanyAddVessel /> },
      { path: "dashboard", element: <CompanyDashboard /> },
      { path: "subscription", element: <CompanyPageSubscription /> },
    ],
  },

  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

export default router;
