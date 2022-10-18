import { CircularProgress, List, Stack, Typography } from "@mui/material";
import React from "react";
import { Link as LinkRouter } from "react-router-dom";

import { INodeIncentiveDetails, RewardsContext } from "../App";
import CustomListItem from "../components/CustomListItem";

import moment from "moment";
import { getIncentiveCashDetails, getNodeDetailsNoCache } from "../minima";

const UserDetails = () => {
  const [myRewards, setMyRewards] = React.useState<any>();
  const [spinner, setSpinner] = React.useState(true);

  React.useEffect(() => {
    // set context if exist
    getIncentiveCashDetails()
      .then((dt: INodeIncentiveDetails | string) => {
        if (typeof dt === "string") throw new Error(dt);
        
        // quick fix for varnish purging problem
        getNodeDetailsNoCache().then((details: INodeIncentiveDetails | string) => {
          if (typeof details === 'string') throw new Error(details)

          const userDetailsObject = {
            uid: dt.uid,
            inviteCode: details.inviteCode ? details.inviteCode : "",
            lastPing: details.lastPing ? details.lastPing : "",
            rewards: details.rewards ? details.rewards : {},
            wallet: details.wallet ? details.wallet : {}
          }

          setMyRewards(userDetailsObject);
          setSpinner(false);
          
        }).catch((err) => {

          throw new Error(err)
        });        
      })
      .catch((err) => {
        console.error(err);
        setSpinner(false);
        setMyRewards({uid: ""})
      });
  }, []);

  const calculateTotalRewards = (rs: number[]) => {
    return rs.reduce((x, y) => x + y);
  };
  return (
    <Stack spacing={2}>
      {/* <CustomListItem title="Total Daily Node Rewards" value={"Testing Component"} /> */}
      <Typography variant="h6">Rewards</Typography>
      {myRewards &&
      myRewards.uid &&
      myRewards.uid.length ? (
        <List sx={{ margin: "0!important" }}>
          <CustomListItem
            title="Total Rewards"
            value={calculateTotalRewards([
              myRewards.rewards.communityRewards,
              myRewards.rewards.dailyRewards,
              myRewards.rewards.inviterRewards,
              myRewards.rewards.previousRewards,
            ])}
          />
          <Typography variant="h5">Breakdown Of Rewards</Typography>
          <CustomListItem
            title="Total Daily Node Rewards"
            value={calculateTotalRewards([
              myRewards.rewards?.dailyRewards,
              myRewards.rewards?.previousRewards,
            ])}
          />
          <CustomListItem
            title="Total Invite Rewards"
            value={myRewards.rewards?.inviterRewards}
          />
          <CustomListItem
            title="Total Additional Rewards"
            value={myRewards.rewards?.communityRewards}
          />
          <Typography variant="h5">Last Ping</Typography>
          <CustomListItem
            title=""
            value={moment(myRewards.lastPing).format(
              "MMMM Do YYYY - hh:mm:ss a"
            )}
          />
          <Typography variant="h5">Wallet</Typography>
          <CustomListItem
            title="Address"
            value={
              myRewards.wallet?.nodeAddress
                ? myRewards.wallet?.nodeAddress
                : "Not set"
            }
          />
          <CustomListItem
            title="Public Key"
            value={
              myRewards.wallet?.publicKey
                ? myRewards.wallet?.publicKey
                : "Not set"
            }
          />
          {!myRewards.wallet?.publicKey ||
          !myRewards.wallet?.nodeAddress ? (
            <LinkRouter className="rewards-link" to="/submitaddress">
              Go to address submission.
            </LinkRouter>
          ) : null}
        </List>
      ) : (
        spinner ? 
          <CircularProgress size={24} color="inherit"/>
        :
      
        <Typography variant="body2">
          Please connect your Incentive ID to view your Rewards.
        </Typography>
      
      )}
    </Stack>
  );
};

export default UserDetails;
