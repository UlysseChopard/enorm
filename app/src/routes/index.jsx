import { Navigate } from "react-router-dom";
import Home, { loader as homeLoader } from "@/routes/home";
import Subscriptions, {
  loader as subscriptionsLoader,
  action as subscriptionsAction,
} from "@/routes/home/subscriptions";
import Subscription, {
  loader as subscriptionLoader,
  action as subscriptionAction,
} from "@/routes/home/subscription";
// import Dashboard from "@/routes/home/dashboard";
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
  action as registrationsAction,
} from "@/routes/home/registrations";
import Registration, {
  loader as registrationLoader,
  action as registrationAction,
} from "@/routes/home/registration";
import Establishments, {
  loader as establishmentsLoader,
  action as establishmentsAction,
} from "@/routes/home/organisation/establishments";
import Members, {
  loader as membersLoader,
  action as membersAction,
} from "@/routes/home/organisation/members";
import Organisation, {
  loader as organisationLoader,
  action as organisationAction,
} from "@/routes/home/organisation/organisation";
import ErrorPage from "@/routes/error-page";
import Login, { action as loginAction } from "@/routes/login";
import Logout, { loader as logoutLoader } from "@/routes/logout";
import ResetPassword, {
  action as resetPasswordAction,
} from "@/routes/reset-password";
import AccessToken, {
  loader as accessTokenLoader,
} from "@/routes/access-token";
import Admin from "@/routes/admin";
import Superusers, {
  action as superusersAction,
  loader as superusersLoader,
} from "@/routes/admin/superusers";
import Organisations, {
  action as organisationsAction,
  loader as organisationsLoader,
} from "@/routes/admin/organisations";

export default [
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
    loader: homeLoader,
    children: [
      // {
      //   path: "/dashboard?",
      //   element: <Dashboard />,
      //   index: true,
      // },
      {
        path: "profile",
        element: <Profile />,
        loader: profileLoader,
        action: profileAction,
      },
      {
        element: <Subscriptions />,
        loader: subscriptionsLoader,
        action: subscriptionsAction,
        index: true,
      },
      {
        path: "subscriptions",
        element: <Subscriptions />,
        loader: subscriptionsLoader,
        action: subscriptionsAction,
      },
      {
        path: "subscriptions/:id",
        element: <Subscription />,
        loader: subscriptionLoader,
        action: subscriptionAction,
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
        action: registrationsAction,
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
            path: "members",
            element: <Members />,
            loader: membersLoader,
            action: membersAction,
          },
          {
            path: "establishments",
            element: <Establishments />,
            loader: establishmentsLoader,
            action: establishmentsAction,
          },
        ],
      },
      {
        path: "*",
        element: <Navigate to="/subscriptions" />,
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
    path: "/admin",
    element: <Admin />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "organisations",
        element: <Organisations />,
        loader: organisationsLoader,
        action: organisationsAction,
      },
      {
        path: "superusers",
        element: <Superusers />,
        loader: superusersLoader,
        action: superusersAction,
      },
    ],
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
