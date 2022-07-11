import { Stack, Typography, Link } from "@mui/material";
import styles from "../theme/cssmodules/Components.module.css";

import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const Help = () => {
  return (
    <Stack spacing={1}>
      <Typography variant="h6">Useful Links</Typography>
      <Link href="https://docs.minima.global/docs/minimaincentiveprogram">
        <ArrowForwardIosIcon className={styles["help-links-icon"]} />
        Incentive Program FAQ
      </Link>
      <Link href="https://docs.minima.global/docs/minimainviteprogram">
        <ArrowForwardIosIcon className={styles["help-links-icon"]} />
        Invite Program FAQ
      </Link>
    </Stack>
  );
};

export default Help;
