import {
  AppBar,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Link,
  Stack,
  Toolbar,
  Typography,
  Divider,
} from "@mui/material";

import { NavLink, useLocation } from "react-router-dom";

import Logo from "../assets/logo.png";
import InfoIcon from "@mui/icons-material/Info";
import StarsIcon from "@mui/icons-material/Stars";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import ConnectWithoutContactIcon from "@mui/icons-material/ConnectWithoutContact";

import { ReactComponent as LandscapeLogo } from "../assets/minima-landscape-logo.svg";

const DrawerContent = ({ handleDrawerClose }: any) => {
  return (
    <>
      <AppBar elevation={0}>
        <Toolbar sx={{ ml: 2 }}>
          <Stack direction="row" alignItems="center">
            <img className="logo" src={Logo} />
            <Typography
              sx={{ ml: 1, fontSize: { xs: "1.0rem", sm: "1.2rem" } }}
              variant="h6"
            >
              Incentive Program
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
                Incentive ID
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
            to="/invitelink"
          >
            <ListItemButton>
              <ListItemIcon>
                <ConnectWithoutContactIcon color="primary" />
              </ListItemIcon>
              <NavLink className="nav-links" to="/invitelink">
                Invite Link
              </NavLink>
            </ListItemButton>
          </NavLink>
          <NavLink onClick={handleDrawerClose} className="nav-links" to="/help">
            <ListItemButton>
              <ListItemIcon>
                <InfoIcon color="primary" />
              </ListItemIcon>
              <NavLink className="nav-links" to="/help">
                Help
              </NavLink>
            </ListItemButton>
          </NavLink>

          <Divider />
          <Link
            onClick={handleDrawerClose}
            className="nav-links-website"
            target="_"
            href="https://incentive.minima.global"
          >
            <ListItemButton>
              <ListItemIcon>
                <ExitToAppIcon color="primary" />
              </ListItemIcon>
              Incentive Website
            </ListItemButton>
          </Link>
        </List>

        <Stack sx={{ padding: "8px 16px" }} direction="row">
          <LandscapeLogo className="minima-landscape" />
        </Stack>
      </Stack>
    </>
  );
};

export default DrawerContent;
