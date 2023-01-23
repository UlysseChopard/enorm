import Home, { loader as homeLoader } from "@/routes/home";
import Dashboard, { loader as dashboardLoader } from "@/routes/home/dashboard";
import Groups, { loader as groupsLoader, action as groupsAction } from "@/routes/home/groups";
import Profile, { loader as profileLoader, action as profileAction } from "@/routes/home/profile";
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
        element: <Dashboard />,
        loader: dashboardLoader,
        index: true
      },
      {
        path: "profile/:property?",
        element: <Profile />,
        loader: profileLoader,
        action: profileAction
      },
      {
        path: "community"
      },
      {
        path: "groups",
        element: <Groups />,
        loader: groupsLoader,
        action: groupsAction
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
