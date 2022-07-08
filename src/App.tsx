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
import {
  Navigate,
  Route,
  Routes,
  NavLink,
  useLocation,
} from "react-router-dom";

import DrawerContent from "./components/DrawerContent";
import UID from "./pages/UID";
import UserDetails from "./pages/UserDetails";
import { setIncentiveCash } from "./minima";

import Logo from "./assets/logo.png";
import Website from "./pages/Website";

import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

export const RewardsContext = React.createContext<any>({
  uid: "",
});

const Header = ({ setOpenDrawer }: any) => {
  const location = useLocation();
  const [openMenu, setOpenMenu] = React.useState(false);
  const routerDrawer = [
    {
      pathname: "/uid",
      name: "Setting Up Your UID",
    },
    {
      pathname: "/details",
      name: "Your Rewards",
    },
    {
      pathname: "/website",
      name: "Website",
    },
  ];

  const getPageName = (routes: any[]) => {
    routes.forEach((r) => {
      if (r.pathname === location.pathname) {
        return r.name;
      }
    });
  };
  return (
    <AppBar elevation={0} sx={appwidth}>
      <Toolbar>
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
  const location = useLocation();
  const isFramed = location.pathname === "/website" ? true : false;

  return (
    <Box component="main" sx={[{ mt: isFramed ? 0 : 2, mb: 2 }, appwidth]}>
      <Grid container>
        <Grid item xs={isFramed ? 0 : 1} />

        <Grid
          item
          xs={isFramed ? 12 : 9}
          sm={isFramed ? 12 : 9}
          sx={{ height: isFramed ? "100vh" : 0 }}
          lg={isFramed ? 12 : 6}
        >
          <Routes>
            <Route path="/" element={<Navigate replace to="/uid" />} />
            <Route path="/uid" element={<UID />} />
            <Route path="/details" element={<UserDetails />} />
            <Route path="/website" element={<Website />} />
            <Route path="*" element={<Navigate replace to="/uid" />} />
          </Routes>
        </Grid>
        <Grid item lg={isFramed ? 0 : 4} />
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
    setIncentiveCash(null)
      .then((res: any) => {
        console.log(res);
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
