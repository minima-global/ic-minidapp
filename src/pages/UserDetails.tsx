import { List, Stack, Typography } from "@mui/material";
import React from "react";

import { RewardsContext } from "../App";
import CustomListItem from "../components/CustomListItem";

const UserDetails = () => {
  const [myRewards, setmyRewards] = React.useContext(RewardsContext);
  console.log("myRewards", myRewards);

  const calculateTotalRewards = (rs: number[]) => {
    return rs.reduce((x, y) => x + y);
  };
  return (
    <Stack spacing={1}>
      {/* <CustomListItem title="Total Daily Node Rewards" value={"Testing Component"} /> */}
      <Typography variant="h6">Rewards</Typography>
      {myRewards &&
      myRewards.uid &&
      myRewards.uid.length &&
      myRewards.hasOwnProperty("details") &&
      myRewards.details !== null ? (
        <List sx={{ margin: "0!important" }}>
          {/* <ListItem>
            <Typography variant="body1">Name</Typography>
            <ListItemText
              disableTypography
              secondary={
                <Typography
                  variant="subtitle1"
                  // className={styles["text-field"]}
                >
                  {myRewards.details?.lastPing}
                </Typography>
              }
              // secondary={myRewards.details?.lastPing}
            />
          </ListItem> */}
          {/* <ListItem>
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
          </ListItem> */}
          <CustomListItem
            title="Last Ping"
            value={myRewards.details?.lastPing}
          />
          <CustomListItem
            title="Total Rewards"
            value={calculateTotalRewards([
              myRewards.details.rewards.communityRewards,
              myRewards.details.rewards.dailyRewards,
              myRewards.details.rewards.inviterRewards,
              myRewards.details.rewards.previousRewards,
            ])}
          />
          <Typography variant="h5">Breakdown Of Rewards</Typography>
          <CustomListItem
            title="Total Daily Node Rewards"
            value={myRewards.details?.rewards?.dailyRewards}
          />
          <CustomListItem
            title="Total Invite Rewards"
            value={myRewards.details?.rewards?.inviterRewards}
          />
          <CustomListItem
            title="Total Additional Rewards"
            value={calculateTotalRewards([
              myRewards.details?.rewards?.communityRewards,
              myRewards.details?.rewards?.previousRewards,
            ])}
          />

          {/* <ListItem>
            <ListItemText
              primary="Previous Rewards"
              secondary={myRewards.details?.rewards?.previousRewards}
            />
          </ListItem> */}
        </List>
      ) : (
        <Typography variant="body2">Not registered yet</Typography>
      )}
    </Stack>
  );
};

export default UserDetails;
