import Home, { loader as homeLoader } from "@/routes/home";
import ErrorPage from "@/routes/error-page";
import Login, { action as loginAction } from "@/routes/login";
import Logout, { loader as logoutLoader } from "@/routes/logout";
import Activate, { loader as activateLoader } from "@/routes/activate";
import Account, {
  loader as accountLoader,
  action as accountAction,
} from "@/routes/home/account";
import SendResetPasswordLink, {
  action as sendResetPasswordLinkAction,
} from "@/routes/reset-password/send-link";
import ResetPassword, {
  action as resetPasswordAction,
} from "@/routes/reset-password";
import Roles, { loader as rolesLoader } from "@/routes/home/roles";
import DeclareRole, {
  action as declareRoleAction,
} from "@/routes/home/roles/declare.jsx";

export default [
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
            path: "roles",
            element: <Roles />,
            loader: rolesLoader,
            children: [
              {
                path: "declare",
                element: <DeclareRole />,
                action: declareRoleAction,
              },
            ],
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
];
