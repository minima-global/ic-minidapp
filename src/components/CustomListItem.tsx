import { ListItem, ListItemText, Typography } from "@mui/material";

import styles from "../theme/cssmodules/Components.module.css";

const CustomListItem = ({ title, value, relevant }: any) => {
  return (
    <ListItem className={styles["list-item"]}>
      <Typography className={styles["list-item-title"]} variant="body1">
        {title}
      </Typography>
      <ListItemText
        className={styles["text-field-wrapper"]}
        disableTypography
        secondary={
          <Typography variant="subtitle1" className={styles["text-field"]}>
            {value}
          </Typography>
        }
      />
    </ListItem>
  );
};

export default CustomListItem;
