import React from "react";
import ReactDOM from "react-dom/client";
import "regenerator-runtime/runtime.js";

import "./index.css";
import "./css/Button.css";

import reportWebVitals from "./reportWebVitals.js";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar.jsx";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "react-tooltip/dist/react-tooltip.css";
// import "primeflex/primeflex.css";
import Home from "./pages/Home.jsx";
import Flashcards from "./pages/Flashcards.jsx";
import Signup from "./pages/Signup.jsx";
import Login from "./pages/Login.jsx";
import NotFound from "./pages/NotFound.jsx";
import Sets from "./pages/Sets.jsx";
import NewSet from "./pages/NewSet.jsx";
import Search from "./pages/Search.jsx";
import Set from "./pages/Set.jsx";
import Dictate from "./pages/Dictate.jsx";
import Learn from "./pages/Learn.jsx";

import { gsap, CSSPlugin } from "gsap";
import { PixiPlugin } from "gsap/dist/PixiPlugin.js";
import { MotionPathPlugin } from "gsap/dist/MotionPathPlugin.js";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger.js";
import Dashboard from "./pages/Dashboard.jsx";
import ProtectedRoute from "./pages/helpers/ProtectedRoute.jsx";
import MySets from "./pages/MySets.jsx";

import "./theme.css";
import EditSet from "./pages/EditSet.jsx";
import TextPlugin from "gsap/dist/TextPlugin.js";
import SpinnerAnim from "./components/SpinnerAnim/SpinnerAnim.jsx";
import Settings from "./pages/Settings.jsx";
import Stats from "./pages/Stats.jsx";
import AddCards from "./pages/AddCards.jsx";
import EditCards from "./pages/EditCards.jsx";

gsap.registerPlugin(PixiPlugin, MotionPathPlugin, ScrollTrigger, TextPlugin);

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
        path: "/edit/:id",
        element: (
          <ProtectedRoute>
            <EditCards />
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
        path: "/test",
        element: <SpinnerAnim />,
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
        path: "/preview/:id",
        element: (
          <ProtectedRoute>
            <Set />
          </ProtectedRoute>
        ),
      },
      {
        path: "/add-cards/:id",
        element: (
          <ProtectedRoute>
            <AddCards />
          </ProtectedRoute>
        ),
      },
      {
        path: "/settings",
        element: (
          <ProtectedRoute>
            <Settings />
          </ProtectedRoute>
        ),
      },
      {
        path: "/stats",
        element: (
          <ProtectedRoute>
            <Stats />
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
      {
        path: "/new-set",
        element: (
          <ProtectedRoute>
            <NewSet />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <RouterProvider router={router} />
  </>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
