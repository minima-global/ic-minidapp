import React from "react";
import { Button, CircularProgress, Link, Stack, TextField, Typography } from "@mui/material";
import { Link as LinkRouter } from "react-router-dom";

import { useFormik } from "formik";
import * as Yup from "yup";

import { getIncentiveCashID, setIncentiveCash } from "../minima";


const UID = () => {
  // const [myRewards, setMyRewards] = React.useContext(RewardsContext);

  return (
    <Stack spacing={2}>
      <Typography variant="h6">Incentive ID</Typography>
      <Typography variant="body2">
        If you do not have your Incentive ID, please go to the{" "}
        <Link href="https://incentive.minima.global/home/pages/incentiveid">
          Incentive Website
        </Link>{" "}
        & copy it from the Incentive ID page.
      </Typography>
      <Typography variant="caption">
        Example: (0XXXXXb-5XXc-4XX7-aXXc-70XX8XX7cXX1)
      </Typography>
      <UIDForm />
    </Stack>
  );
};

export default UID;

const validation = Yup.object().shape({
  uid: Yup.string().required("Field Required"),
});

const UIDForm = ({ set }: any) => {
  const [formMessage, setFormMessage] = React.useState("");
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    
    getIncentiveCashID().then((id) => {

      formik.setFieldValue("uid", id);

    }).catch((err) => {

      console.error(err);

    }).finally(() => {
      
      setTimeout(() => setLoading(false), 1000)
    })

  }, []);

  const formik = useFormik({
    initialValues: {
      uid: "",
    },
    onSubmit: ({ uid }: { uid: string }) => {
      if (formMessage.length) setFormMessage("");

      setIncentiveCash(uid).then(() => {

        setFormMessage("You have successfully registered your node.");

        formik.resetForm();
        
        formik.setFieldValue("uid", uid);
        setLoading(false);

      }).catch(err => {
        
        console.error(err);
        setFormMessage(err)

        
        formik.resetForm();
        setLoading(false);

      });

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
          placeholder={loading ? "Please wait..." : "Incentive ID"}
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
          disabled={loading || formik.isSubmitting && formik.dirty && formik.isValid}
          type="submit"
          variant="contained"
          disableElevation
        >
          {formik.isSubmitting ? <CircularProgress size={24} color="inherit" /> : !formik.isSubmitting && formik.values.uid && formik.values.uid.length > 0 ? "Update" : "Enter"}
          
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
