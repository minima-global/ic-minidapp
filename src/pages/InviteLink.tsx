import React from "react";
import { INodeIncentiveDetails, RewardsContext } from "../App";
import { Button, CircularProgress, Stack, Typography } from "@mui/material";
import CustomListItem from "../components/CustomListItem";

import { copy } from "../shared/index";
import { getIncentiveCashDetails, getNodeDetailsNoCache } from "../minima";

const InviteLink = () => {
  const [copyText, setCopyText] = React.useState("Copy");
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
        setMyRewards({})
        setSpinner(false);
      });


  }, []);

  return (
    <Stack spacing={2}>
      <Typography variant="h6">Invite Link</Typography>
      <Typography variant="body2">
        Your Invite Link enables you to earn additional Rewards for inviting
        others to run a node and join the Incentive Program.
      </Typography>
      <Typography variant="body2">
        Simply share your Invite Link with a friend & your Invite Code will be
        included when they register.
      </Typography>
      <Typography variant="body2">
        Once the Minima network reaches one million nodes, Invite Codes will no
        longer be active.
      </Typography>
        {spinner ?
        <CircularProgress size={28} color="inherit"/>
        :
      <>
      
      <CustomListItem
        title="Invite Link"
        value={

          myRewards && myRewards.hasOwnProperty("inviteCode")
          
            ? `https://incentive.minima.global/account/register?inviteCode=${myRewards.inviteCode}`
            : "Unavailable"
        }
      />
      <Button
        disabled={
          myRewards && 
          myRewards.hasOwnProperty("inviteCode")
            ? false
            : true || copyText == "Copy"
            ? false
            : true
        }
        onClick={() => {
          if (myRewards && myRewards.hasOwnProperty("inviteCode")) {
            setCopyText("Copied");
            copy(
              `https://incentive.minima.global/account/register?inviteCode=${myRewards.inviteCode}`
            );
          } else {
            
            setCopyText("Unavailable");
            
          }
          setTimeout(() => setCopyText("Copy"), 2500);
        }}
        variant="contained"
        disableElevation
      >
        {copyText}
      </Button>
      </>
      
      }
    </Stack>
  );
};

export default InviteLink;
