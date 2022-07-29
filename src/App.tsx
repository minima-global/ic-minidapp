import React from "react";
import "./App.css";

import {
  AppBar,
  Box,
  Drawer,
  Grid,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";

import DrawerContent from "./components/DrawerContent";
import UID from "./pages/UID";
import Help from "./pages/Help";
import InviteLink from "./pages/InviteLink";
import UserDetails from "./pages/UserDetails";
import { setIncentiveCash } from "./minima";

import MenuIcon from "@mui/icons-material/Menu";

export const RewardsContext = React.createContext<any>({
  uid: "",
});

const Header = ({ setOpenDrawer }: any) => {
  const location = useLocation();
  const [openMenu, setOpenMenu] = React.useState(false);
  const routerDrawer = [
    {
      pathname: "/about",
      name: "About",
    },
    {
      pathname: "/uid",
      name: "",
    },
    {
      pathname: "/details",
      name: "",
    },
    {
      pathname: "/invitelink",
      name: "",
    },
    {
      pathname: "/website",
      name: "Website",
    },
  ];

  return (
    <AppBar elevation={0} sx={appwidth}>
      <Toolbar variant="dense">
        <Grid container>
          <Grid item xs={1} />

          <Grid
            item
            xs={10}
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Stack direction="row" alignItems="center">
              <Typography variant="body1">
                {routerDrawer.map((r) => {
                  return r.pathname === location.pathname ? r.name : null;
                })}
              </Typography>
            </Stack>

            {!openMenu ? (
              <MenuIcon
                sx={{ display: { xs: "flex", sm: "none" } }}
                color="inherit"
                className="menu-icon"
                onClick={() => setOpenDrawer(true)}
              />
            ) : null}
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

const Navigation = () => {
  return (
    <Box component="main" sx={[{ mt: 2, mb: 2 }, appwidth]}>
      <Grid container>
        <Grid item xs={1} />

        <Grid item xs={10} sm={9} lg={6}>
          <Routes>
            <Route path="/" element={<Navigate replace to="/uid" />} />
            <Route path="/uid" element={<UID />} />
            <Route path="/details" element={<UserDetails />} />
            <Route path="/help" element={<Help />} />
            <Route path="/invitelink" element={<InviteLink />} />
            <Route path="*" element={<Navigate replace to="/uid" />} />
          </Routes>
        </Grid>
        <Grid item lg={2} xs={0} />
      </Grid>
    </Box>
  );
};

function App() {
  const [myRewards, setMyRewards] = React.useState({ uid: "" });
  const [openDrawer, setOpenDrawer] = React.useState(false);
  const handleDrawerClose = () => {
    return openDrawer ? setOpenDrawer(false) : null;
  };
  React.useEffect(() => {
    // set context if exist
    setIncentiveCash("")
      .then((res: any) => {
        // console.log(res);
        if (res.status) {
          if (
            res.response.uid &&
            res.response.uid.length &&
            res.response.hasOwnProperty("details")
          ) {
            setMyRewards(res.response);
          }
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <RewardsContext.Provider value={[myRewards, setMyRewards]}>
      <div className="App">
        <Header
          setOpenDrawer={setOpenDrawer}
          handleDrawerClose={handleDrawerClose}
        />
        <Navigation />
        <Drawer
          onClose={handleDrawerClose}
          variant="temporary"
          open={openDrawer}
          sx={drawerdisplay}
        >
          <DrawerContent handleDrawerClose={handleDrawerClose} />
        </Drawer>
        <Drawer variant="permanent" sx={drawerdisplaydesktop}>
          <DrawerContent />
        </Drawer>
      </div>
    </RewardsContext.Provider>
  );
}

export default App;

const DRAWERWIDTH = 240;
const drawerdisplay = {
  display: { xs: "block", sm: "none" },
  "& .MuiDrawer-paper": { boxSizing: "border-box", width: DRAWERWIDTH },
};
const drawerdisplaydesktop = {
  display: { xs: "none", sm: "block" },
  "& .MuiDrawer-paper": { width: DRAWERWIDTH },
};
const appwidth = {
  width: { sm: `calc(100% - ${DRAWERWIDTH}px)` },
  ml: { sm: `${DRAWERWIDTH}px` },
};
