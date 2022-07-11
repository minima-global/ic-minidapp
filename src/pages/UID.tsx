import React from "react";
import { Button, Link, Stack, TextField, Typography } from "@mui/material";
import { Link as LinkRouter } from "react-router-dom";

import { useFormik } from "formik";
import * as Yup from "yup";

import { RewardsContext } from "../App";
import { setIncentiveCash } from "../minima";

const UID = () => {
  const [myRewards, setMyRewards] = React.useContext(RewardsContext);
  console.log("UID myrewards context", myRewards);
  return (
    <Stack spacing={1}>
      <Typography variant="h6">Incentive ID</Typography>
      <Typography variant="body2">
        If you do not have your Incentive ID, please go to the{" "}
        <Link href="https://incentive.minima.global">Incentive Website</Link> &
        copy it from the Incentive ID page.
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
        myRewards={myRewards}
      />
    </Stack>
  );
};

export default UID;

const validation = Yup.object().shape({
  uid: Yup.string().required("Field Required"),
});

const UIDForm = ({ set, setRewardsContext, myRewards }: any) => {
  const [formMessage, setFormMessage] = React.useState("");

  React.useEffect(() => {
    formik.setFieldValue(
      "uid",
      myRewards && myRewards.uid.length ? myRewards.uid : ""
    );
  }, [myRewards]);

  const formik = useFormik({
    initialValues: {
      uid: "",
    },
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
                `You tried to register ${res.params.uid} and it failed, please use a valid uid!`
              );
              setFormMessage(
                `You have entered an invalid Incentive ID, please go to the Incentive Website & copy it from the Incentive ID page.`
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
          disabled={formik.isSubmitting}
          id="uid"
          name="uid"
          placeholder={"Incentive ID"}
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
          disabled={formik.isSubmitting && formik.dirty && formik.isValid}
          type="submit"
          variant="contained"
          disableElevation
        >
          Enter
        </Button>
        {formMessage.length ? (
          <Typography
            variant="caption"
            className={
              formMessage === "You have successfully registered your node."
                ? ""
                : "error"
            }
          >
            {formMessage}
          </Typography>
        ) : null}
        {formMessage.length &&
        formMessage === "You have successfully registered your node." ? (
          <LinkRouter className="rewards-link" to="/details">
            Go to my Incentive Rewards.
          </LinkRouter>
        ) : set ? (
          <LinkRouter className="rewards-link" to="/details">
            Go to my Incentive Rewards.
          </LinkRouter>
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
