import Home, { loader as homeLoader } from "@/routes/home";
import Registrations, { loader as registrationsLoader } from "@/routes/home/registrations";
import Profile, { loader as profileLoader } from "@/routes/home/profile";
import ErrorPage from "@/routes/error-page";
import Login, { action as loginAction } from "@/routes/login";
import Logout, { loader as logoutLoader } from "@/routes/logout";

export default [
  {
    path: "/",
    element: <Home />,
    shouldRevalidate: () => false,
    errorElement: <ErrorPage />,
    loader: homeLoader,
    children: [
      {
        path: "profile",
        element: <Profile />,
        loader: profileLoader
      },
      {
        path: "registrations",
        element: <Registrations />,
        loader: registrationsLoader
      },
      {
        path: "community"
      },
      {
        path: "settings"
      }
    ],
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <ErrorPage />,
    action: loginAction,
  },
  {
    path: "/logout",
    element: <Logout />,
    errorElement: <ErrorPage />,
    loader: logoutLoader,
  },
];

/*
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
*/
