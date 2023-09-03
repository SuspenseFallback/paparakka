import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import "./css/Button.css";

import reportWebVitals from "./reportWebVitals";

import { createBrowserRouter, createHashRouter, RouterProvider } from "react-router-dom";

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
import Decks from "./pages/Decks";
import NewDeck from "./pages/NewDeck";
import Search from "./pages/Search";
import Deck from "./pages/Deck";
import Dictate from "./pages/Dictate";
import Learn from "./pages/Learn";

import { gsap } from "gsap";
import { PixiPlugin } from "gsap/dist/PixiPlugin.js";
import { MotionPathPlugin } from "gsap/dist/MotionPathPlugin.js";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger.js";

gsap.registerPlugin(PixiPlugin, MotionPathPlugin, ScrollTrigger);

const router = createHashRouter([
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
        path: "/flashcards/:id",
        element: <Flashcards />,
      },
      {
        path: "/dictate/:id",
        element: <Dictate />,
      },
      {
        path: "/learn/:id",
        element: <Learn />,
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
        path: "/decks",
        element: <Decks />,
      },
      {
        path: "/preview/:id",
        element: <Deck />,
      },
      {
        path: "/new-deck",
        element: <NewDeck />,
      },
      {
        path: "/search",
        element: <Search />,
      },
    ],
  },
], {
  basename: '/flashcard-app'
});

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
