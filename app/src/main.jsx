import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "@/utils/i18n";

import * as ReactDOM from "react-dom/client";
import {StrictMode, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import mainTheme from "@/themes";
import CssBaseline from "@mui/material/CssBaseline";
import routes from "@/routes";
import SpinningLoader from "@/components/SpinningLoader";

const router = createBrowserRouter(routes);

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <CssBaseline />
    <ThemeProvider theme={mainTheme}>
      <Suspense fallback={<SpinningLoader />}>
        <RouterProvider router={router} />
      </Suspense>
    </ThemeProvider>
  </StrictMode>
);
