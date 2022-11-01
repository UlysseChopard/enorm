import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home, { loader as homeLoader } from "./routes/home";
import ErrorPage from "./routes/error-page";
import Login, { action as loginAction } from "./routes/login";
import Signup, { action as signupAction } from "./routes/signup";
import Logout, { loader as logoutLoader } from "./routes/logout";
import Activate, { loader as activateLoader } from "./routes/activate";
import Account, {
  loader as accountLoader,
  action as accountAction,
} from "./routes/home/account";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
    loader: homeLoader,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          {
            path: "account",
            element: <Account />,
            loader: accountLoader,
            action: accountAction,
          },
        ],
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <ErrorPage />,
    action: loginAction,
  },
  {
    path: "/signup",
    element: <Signup />,
    errorElement: <ErrorPage />,
    action: signupAction,
  },
  {
    path: "/logout",
    element: <Logout />,
    errorElement: <ErrorPage />,
    loader: logoutLoader,
  },
  {
    path: "/activate",
    element: <Activate />,
    loader: activateLoader,
    children: [
      {
        path: ":uuid",
        element: <Activate />,
        loader: activateLoader,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
