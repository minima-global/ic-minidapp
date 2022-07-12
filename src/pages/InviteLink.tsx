import React from "react";
import { RewardsContext } from "../App";
import { Button, Stack, Typography } from "@mui/material";
import CustomListItem from "../components/CustomListItem";

import { copy } from "../shared/index";

const InviteLink = () => {
  const [copyText, setCopyText] = React.useState("Copy");
  const [myRewards, setMyRewards] = React.useContext(RewardsContext);
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
      <CustomListItem
        title="Invite Link"
        value={
          myRewards.details?.inviteCode
            ? `https://incentive.minima.global/account/register?inviteCode=${myRewards.details?.inviteCode}`
            : "Unavailable"
        }
      />
      <Button
        disabled={
          myRewards.details?.inviteCode
            ? false
            : true || copyText == "Copy"
            ? false
            : true
        }
        onClick={() => {
          setCopyText("Copied");
          copy(
            `https://incentive.minima.global/account/register?inviteCode=${myRewards.details?.inviteCode}`
          );
          setTimeout(() => setCopyText("Copy"), 2500);
        }}
        variant="contained"
        disableElevation
      >
        {copyText}
      </Button>
    </Stack>
  );
};

export default InviteLink;
