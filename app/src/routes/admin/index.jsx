import { Outlet, Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

const Admin = () => {
  const { t } = useTranslation(null, { keyPrefix: "admin" });
  const { pathname } = useLocation();
  return (
    <Container sx={{ margin: "10px", width: "100%" }}>
      <Box sx={{ width: "fit-content", margin: "auto" }}>
        <Tabs value={pathname}>
          <Tab
            label={t("organisations")}
            component={Link}
            to="organisations"
            value="/admin/organisations"
          />
          <Tab
            label={t("superusers")}
            component={Link}
            to="superusers"
            value="/admin/superusers"
          />
        </Tabs>
      </Box>
      <Container sx={{ margin: "10px" }}>
        <Outlet />
      </Container>
    </Container>
  );
};

export default Admin;
