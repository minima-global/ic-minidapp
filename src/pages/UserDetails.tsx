import { List, Stack, Typography } from "@mui/material";
import React from "react";

import { RewardsContext } from "../App";
import CustomListItem from "../components/CustomListItem";

import moment from "moment";

const UserDetails = () => {
  const [myRewards, setmyRewards] = React.useContext(RewardsContext);
  // console.log("myRewards", myRewards);

  const calculateTotalRewards = (rs: number[]) => {
    return rs.reduce((x, y) => x + y);
  };
  return (
    <Stack spacing={2}>
      {/* <CustomListItem title="Total Daily Node Rewards" value={"Testing Component"} /> */}
      <Typography variant="h6">Rewards</Typography>
      {myRewards &&
      myRewards.uid &&
      myRewards.uid.length &&
      myRewards.hasOwnProperty("details") &&
      myRewards.details !== null ? (
        <List sx={{ margin: "0!important" }}>
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
            value={calculateTotalRewards([
              myRewards.details?.rewards?.dailyRewards,
              myRewards.details?.rewards?.previousRewards,
            ])}
          />
          <CustomListItem
            title="Total Invite Rewards"
            value={myRewards.details?.rewards?.inviterRewards}
          />
          <CustomListItem
            title="Total Additional Rewards"
            value={myRewards.details?.rewards?.communityRewards}
          />
          <Typography variant="h5">Last Ping</Typography>
          <CustomListItem
            title=""
            value={moment(myRewards.details?.lastPing).format(
              "MMMM Do YYYY - hh:mm:ss a"
            )}
          />
        </List>
      ) : (
        <Typography variant="body2">
          Please connect your Incentive ID to view your Rewards.
        </Typography>
      )}
    </Stack>
  );
};

export default UserDetails;
