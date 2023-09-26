import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import "./css/Button.css";

import reportWebVitals from "./reportWebVitals";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar.jsx";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "react-tooltip/dist/react-tooltip.css";
// import "primeflex/primeflex.css";
import Home from "./pages/Home";
import Flashcards from "./pages/Flashcards";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Sets from "./pages/Sets";
import NewSet from "./pages/NewSet";
import Search from "./pages/Search";
import Set from "./pages/Set";
import Dictate from "./pages/Dictate";
import Learn from "./pages/Learn";

import { gsap } from "gsap";
import { PixiPlugin } from "gsap/dist/PixiPlugin.js";
import { MotionPathPlugin } from "gsap/dist/MotionPathPlugin.js";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger.js";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./pages/helpers/ProtectedRoute";
import MySets from "./pages/MySets";

import "./theme.css";
import EditSet from "./pages/EditSet";

gsap.registerPlugin(PixiPlugin, MotionPathPlugin, ScrollTrigger);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navbar />,
    errorElement: <NotFound />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/dashboard",
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "/flashcards/:id",
        element: (
          <ProtectedRoute>
            <Flashcards />
          </ProtectedRoute>
        ),
      },
      {
        path: "/dictate/:id",
        element: (
          <ProtectedRoute>
            <Dictate />
          </ProtectedRoute>
        ),
      },
      {
        path: "/learn/:id",
        element: (
          <ProtectedRoute>
            <Learn />
          </ProtectedRoute>
        ),
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/sets",
        element: <Sets />,
      },
      {
        path: "/preview/:id",
        element: <Set />,
      },
      {
        path: "/new-set",
        element: (
          <ProtectedRoute>
            <NewSet />
          </ProtectedRoute>
        ),
      },
      {
        path: "/edit-set/:id",
        element: (
          <ProtectedRoute>
            <EditSet />
          </ProtectedRoute>
        ),
      },
      {
        path: "/search",
        element: <Search />,
      },
      {
        path: "/my-sets",
        element: (
          <ProtectedRoute>
            <MySets />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
