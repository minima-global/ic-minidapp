import {
  AppBar,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";

import { Link, NavLink, useLocation } from "react-router-dom";

import Logo from "../assets/logo.png";
import StarsIcon from "@mui/icons-material/Stars";
import LanguageIcon from "@mui/icons-material/Language";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";

import { ReactComponent as LandscapeLogo } from "../assets/minima-landscape-logo.svg";

const DrawerContent = ({ handleDrawerClose }: any) => {
  return (
    <>
      <AppBar elevation={0}>
        <Toolbar sx={{ ml: 2 }}>
          <Stack direction="row" alignItems="center">
            <img className="logo" src={Logo} />
            <Typography sx={{ ml: 1 }} variant="h6">
              IncentiveCash
            </Typography>
          </Stack>
        </Toolbar>
      </AppBar>
      <Stack
        sx={{ height: "100vh", borderRight: "0.5px solid #EDEDED" }}
        justifyContent="space-between"
        direction="column"
      >
        <List sx={{ ml: 0.5, mr: 0.5 }}>
          <NavLink onClick={handleDrawerClose} className="nav-links" to="/uid">
            <ListItemButton>
              <ListItemIcon>
                <AppRegistrationIcon color="primary" />
              </ListItemIcon>
              <NavLink className="nav-links" to="/uid">
                Register Node
              </NavLink>
            </ListItemButton>
          </NavLink>
          <NavLink
            onClick={handleDrawerClose}
            className="nav-links"
            to="/details"
          >
            <ListItemButton>
              <ListItemIcon>
                <StarsIcon color="primary" />
              </ListItemIcon>
              <NavLink className="nav-links" to="/details">
                Rewards
              </NavLink>
            </ListItemButton>
          </NavLink>
          <NavLink
            onClick={handleDrawerClose}
            className="nav-links"
            to="/website"
          >
            <ListItemButton>
              <ListItemIcon>
                <LanguageIcon color="primary" />
              </ListItemIcon>
              <NavLink className="nav-links" to="/website">
                Website
              </NavLink>
            </ListItemButton>
          </NavLink>
        </List>

        <Stack sx={{ padding: "8px 16px" }} direction="row">
          <Typography
            color="inherit"
            variant="caption"
            sx={{ letterSpacing: 1, fontSize: "10px" }}
          >
            Powered by
          </Typography>
          <LandscapeLogo className="minima-landscape" />
        </Stack>
      </Stack>
    </>
  );
};

export default DrawerContent;
