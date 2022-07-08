import React from "react";
import { Button, Stack, TextField, Typography } from "@mui/material";
import { Link } from "react-router-dom";

import { useFormik } from "formik";
import * as Yup from "yup";

import { RewardsContext } from "../App";
import { setIncentiveCash } from "../minima";

const UID = () => {
  const [myRewards, setMyRewards] = React.useContext(RewardsContext);
  console.log("UID myrewards context", myRewards);
  return (
    <Stack spacing={1}>
      <Typography variant="h6">Setting up your UID</Typography>
      <Typography variant="body2">
        If you do not have your UID, please login to the{" "}
        <Link to="/website">Incentive's</Link> website to obtain it.
      </Typography>
      <Typography variant="caption">
        Example: (0XXXXXb-5XXc-4XX7-aXXc-70XX8XX7cXX1)
      </Typography>
      <UIDForm
        set={
          myRewards &&
          myRewards.hasOwnProperty("details") &&
          myRewards.details !== null
            ? true
            : false
        }
        setRewardsContext={setMyRewards}
      />
    </Stack>
  );
};

export default UID;

const validation = Yup.object().shape({
  uid: Yup.string().required("Field Required"),
});

const UIDForm = ({ set, setRewardsContext }: any) => {
  const [formMessage, setFormMessage] = React.useState("");
  const formik = useFormik({
    initialValues: { uid: "" },
    onSubmit: ({ uid }: { uid: string }) => {
      if (formMessage.length) setFormMessage("");

      setIncentiveCash(uid)
        .then((res: any) => {
          console.log("UID", uid);
          console.log(res);
          if (res.status) {
            if (
              !res.response.hasOwnProperty("details") ||
              (res.response.hasOwnProperty("details") &&
                res.response.details === null)
            ) {
              console.error(
                `You tried to register ${res.params.uid} and it failed, please use a valid uid`
              );
              setFormMessage(
                `You tried to register uid:${res.params.uid} and it failed, please use a valid uid.`
              );
            } else {
              console.log("Setting new rewards context...");
              setRewardsContext(res.response);
              setFormMessage(`You have successfully registered your node.`);
            }
          }
        })
        .catch((err) => {
          console.error(err);
        });

      setTimeout(() => formik.resetForm(), 2000);
    },
    validateOnChange: true,
    validationSchema: validation,
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Stack spacing={2}>
        <TextField
          disabled={formik.isSubmitting || set}
          id="uid"
          name="uid"
          placeholder="UID"
          value={formik.values.uid}
          onChange={formik.handleChange}
          error={formik.touched.uid && Boolean(formik.errors.uid)}
          helperText={formik.touched.uid && formik.errors.uid}
          FormHelperTextProps={{ style: styles.helperText }}
          InputProps={{
            style:
              formik.touched.uid && Boolean(formik.errors.uid)
                ? {
                    borderBottomLeftRadius: 0,
                    borderBottomRightRadius: 0,
                  }
                : {
                    borderBottomLeftRadius: 8,
                    borderBottomRightRadius: 8,
                  },
          }}
        />
        <Button
          disabled={
            (formik.isSubmitting && formik.dirty && formik.isValid) || set
          }
          type="submit"
          variant="contained"
          disableElevation
        >
          Set
        </Button>
        {formMessage.length ? (
          <Typography variant="caption">{formMessage}</Typography>
        ) : null}
        {formMessage.length &&
        formMessage === "You have successfully registered your node." ? (
          <Link className="rewards-link" to="/details">
            Go to my incentive rewards
          </Link>
        ) : set ? (
          <Link className="rewards-link" to="/details">
            Go to my incentive rewards
          </Link>
        ) : null}
      </Stack>
    </form>
  );
};

const styles = {
  helperText: {
    borderBottomRightRadius: 8,
    borderBottomLeftRadius: 8,
    color: "#D63110",
    fontWeight: "700",
    paddingLeft: 8,
  },
};
