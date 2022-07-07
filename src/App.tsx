import React from "react";
import "./App.css";

import { AppBar, Box, Grid, Stack, Toolbar, Typography } from "@mui/material";
import {
  Navigate,
  Route,
  Routes,
  NavLink,
  useLocation,
} from "react-router-dom";

import UID from "./pages/UID";
import UserDetails from "./pages/UserDetails";
import { setIncentiveCash } from "./minima";

import Logo from "./assets/logo.png";
import { IncentiveCashUserRewards } from "./minima/types/minima";
import Website from "./pages/Website";

import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

export const RewardsContext = React.createContext<any>({
  uid: "",
});

const Header = () => {
  const [openMenu, setOpenMenu] = React.useState(false);
  return (
    <AppBar elevation={0}>
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
              <img className="logo" src={Logo} />
              <Typography sx={{ ml: 1 }} variant="h6">
                IncentiveCash
              </Typography>
            </Stack>
            <Stack
              direction="row"
              spacing={3}
              sx={{ display: { sm: "flex", xs: "none" } }}
            >
              <NavLink className="nav-links" to="uid">
                UID
              </NavLink>
              <NavLink className="nav-links" to="details">
                Rewards
              </NavLink>
              <NavLink className="nav-links" to="website">
                Website
              </NavLink>
            </Stack>

            {!openMenu ? (
              <MenuIcon
                sx={{ display: { xs: "flex", sm: "none" } }}
                color="inherit"
                className="menu-icon"
                onClick={() => setOpenMenu(true)}
              />
            ) : (
              <CloseIcon
                sx={{ display: { xs: "flex", sm: "none" } }}
                color="inherit"
                className="menu-icon"
                onClick={() => setOpenMenu(false)}
              />
            )}
          </Grid>

          <Grid item xs={1} />
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

const Navigation = () => {
  const location = useLocation();
  const isFramed = location.pathname === "/website" ? true : false;

  return (
    <Grid container>
      <Grid item xs={isFramed ? 0 : 1} />

      <Grid item xs={isFramed ? 12 : 10} sm={isFramed ? 12 : 6}>
        <Box component="main" sx={{ mt: isFramed ? 0 : 2, mb: 2 }}>
          <Routes>
            <Route path="/" element={<Navigate replace to="/uid" />} />
            <Route path="/uid" element={<UID />} />
            <Route path="/details" element={<UserDetails />} />
            <Route path="/website" element={<Website />} />
            <Route path="*" element={<Navigate replace to="/uid" />} />
          </Routes>
        </Box>
      </Grid>

      <Grid item xs={isFramed ? 0 : 1} sm={isFramed ? 0 : 5} />
    </Grid>
  );
};

function App() {
  const [myRewards, setMyRewards] = React.useState({ uid: "" });
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
        <Header />
        <Navigation />
      </div>
    </RewardsContext.Provider>
  );
}

export default App;
