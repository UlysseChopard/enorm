import "./index.css";
import "./utils/i18n";
import * as ReactDOM from "react-dom/client";
import React, { Suspense } from "react";
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
import SendResetPasswordLink, {
  action as sendResetPasswordLinkAction,
} from "./routes/reset-password/send-link";
import ResetPassword, {
  action as resetPasswordAction,
} from "./routes/reset-password";
import Experts, {
  action as expertsAction,
  loader as expertsLoader,
} from "./routes/experts";

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
          {
            path: "experts",
            element: <Experts />,
            loader: expertsLoader,
            action: expertsAction,
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
    path: "/reset-password",
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <SendResetPasswordLink />,
        action: sendResetPasswordLinkAction,
      },
      {
        path: ":uuid",
        action: resetPasswordAction,
        element: <ResetPassword />,
      },
    ],
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
    <Suspense fallback={<p>Loading...</p>}>
      <RouterProvider router={router} />
    </Suspense>
  </React.StrictMode>
);
