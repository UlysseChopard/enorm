import Home, { loader as homeLoader } from "@/routes/home";
import Subscriptions, {
  loader as subscriptionsLoader,
  action as subscriptionsAction,
} from "@/routes/home/subscriptions";
import Dashboard from "@/routes/home/dashboard";
import Groups, {
  loader as groupsLoader,
  action as groupsAction,
} from "@/routes/home/groups";
import Group, {
  loader as groupLoader,
  action as groupAction,
} from "@/routes/home/group";
import Profile, {
  loader as profileLoader,
  action as profileAction,
} from "@/routes/home/profile";
import Registrations, {
  loader as registrationsLoader,
} from "@/routes/home/registrations";
import Registration, {
  loader as registrationLoader,
  action as registrationAction,
} from "@/routes/home/registration";
import Establishments, {
  loader as establishmentsLoader,
  action as establishmentsAction,
} from "@/routes/home/administration/establishments";
import Users, {
  loader as usersLoader,
  action as usersAction,
} from "@/routes/home/administration/users";
import Organisation, {
  loader as organisationLoader,
  action as organisationAction,
} from "@/routes/home/administration/organisation";
import ErrorPage from "@/routes/error-page";
import Login, { action as loginAction } from "@/routes/login";
import Logout, { loader as logoutLoader } from "@/routes/logout";
import ResetPassword, {
  action as resetPasswordAction,
} from "@/routes/reset-password";
import AccessToken, {
  loader as accessTokenLoader,
} from "@/routes/access-token";

export default [
  {
    path: "/",
    element: <Home />,
    shouldRevalidate: () => false,
    errorElement: <ErrorPage />,
    loader: homeLoader,
    children: [
      {
        path: "/dashboard?",
        element: <Dashboard />,
        index: true,
      },
      {
        path: "profile",
        element: <Profile />,
        loader: profileLoader,
        action: profileAction,
      },
      {
        path: "subscriptions",
        element: <Subscriptions />,
        loader: subscriptionsLoader,
        action: subscriptionsAction,
      },
      {
        path: "groups",
        element: <Groups />,
        loader: groupsLoader,
        action: groupsAction,
      },
      {
        path: "groups/:id",
        element: <Group />,
        loader: groupLoader,
        action: groupAction,
      },
      {
        path: "registrations",
        element: <Registrations />,
        loader: registrationsLoader,
      },
      {
        path: "registrations/:id",
        element: <Registration />,
        loader: registrationLoader,
        action: registrationAction,
      },
      {
        path: "administration",
        children: [
          {
            path: "organisation",
            element: <Organisation />,
            loader: organisationLoader,
            action: organisationAction,
          },
          {
            path: "users",
            element: <Users />,
            loader: usersLoader,
            action: usersAction,
          },
          {
            path: "establishments",
            element: <Establishments />,
            loader: establishmentsLoader,
            action: establishmentsAction,
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
    path: "/logout",
    element: <Logout />,
    errorElement: <ErrorPage />,
    loader: logoutLoader,
  },
  {
    path: "/reset-password",
    element: <ResetPassword />,
    errorElement: <ErrorPage />,
    action: resetPasswordAction,
  },
  {
    path: "/access/:first/:second/:third",
    element: <AccessToken />,
    errorElement: <ErrorPage />,
    loader: accessTokenLoader,
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
