import {
  Chip,
  List,
  ListItem,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";

import { copy } from "../shared";
import { RewardsContext } from "../App";

const UserDetails = () => {
  const [copyText, setCopyText] = React.useState("Copy");
  const [myRewards, setmyRewards] = React.useContext(RewardsContext);
  console.log("myRewards", myRewards);
  return (
    <Stack>
      <Typography variant="h6">Your Reward Details</Typography>
      {myRewards &&
      myRewards.uid &&
      myRewards.uid.length &&
      myRewards.hasOwnProperty("details") &&
      myRewards.details !== null ? (
        <List>
          <ListItem>
            <ListItemText primary="UID" secondary={myRewards.uid} />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Last Ping"
              secondary={myRewards.details?.lastPing}
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Invite Code"
              secondary={myRewards.details?.inviteCode}
            />
            <Chip
              onClick={() => {
                copy(
                  myRewards.details?.inviteCode
                    ? myRewards.details.inviteCode
                    : ""
                );

                setCopyText("Copied");
                setTimeout(() => setCopyText("Copy"), 2000);
              }}
              label={copyText}
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Community Rewards"
              secondary={myRewards.details?.rewards?.communityRewards}
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Daily Rewards"
              secondary={myRewards.details?.rewards?.dailyRewards}
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Inviter Rewards"
              secondary={myRewards.details?.rewards?.inviterRewards}
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Previous Rewards"
              secondary={myRewards.details?.rewards?.previousRewards}
            />
          </ListItem>
        </List>
      ) : (
        <Typography variant="body2">Not registered yet</Typography>
      )}
    </Stack>
  );
};

export default UserDetails;
