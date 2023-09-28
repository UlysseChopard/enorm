import { useState } from "react";
import { Outlet } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

const Admin = () => {
  const [tab, setTab] = useState("organisations");
  const { t } = useTranslation(null, { keyPrefix: "admin" });
  return (
    <>
      <Box>
        <Tabs value={tab} onChange={(_e, value) => setTab(value)}>
          <Tab label={t("organisations")} value="organisations" />
          <Tab label={t("superusers")} value="superusers" />
        </Tabs>
      </Box>
      <Container>
        <Outlet />
      </Container>
    </>
  );
};

export default Admin;
