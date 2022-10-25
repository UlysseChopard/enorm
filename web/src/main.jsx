import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";
import Root, { loader as rootLoader } from "./routes/root.jsx";
import ErrorPage from "./error-page.jsx";
import Login, { action as loginAction } from "./routes/login.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    action: loginAction,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
