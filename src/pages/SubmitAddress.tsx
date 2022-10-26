import React from "react";
import { useFormik } from "formik";

import { Typography, Stack, FormGroup, TextField, Button, CircularProgress } from "@mui/material";
import { getAddress } from "../minima";
import { login } from "../api/login/login";

import * as Yup from "yup";
import styles from "../theme/cssmodules/Components.module.css";

const SubmitAddress = () => {
  const [myWallet, setMyWallet] = React.useState({
    nodeAddress: "",
    publicKey: "",
  });

  const [spinner, setSpinner] = React.useState(false);

  const [formMessage, setFormMessage] = React.useState("")

  React.useEffect(() => {
    getAddress()
      .then((wallet: any) => {
        setMyWallet(wallet);
      })
      .catch((err) => {
        
        console.error(err);
      });
  }, []);

  const formik = useFormik({
    initialValues: { email: "", pwd: "" },
    onSubmit: (dt) => {
      // console.log(dt);
      setSpinner(true);
      login(dt.email, dt.pwd, myWallet.nodeAddress, myWallet.publicKey)
        .then((res) => {
          // console.log('loginResponse', res)
          if (res.status == "UPDATED") {


            formik.resetForm();
            setFormMessage("Wallet successfully updated, navigate to your rewards page to view the changes.")

          }

          // if (res.status == "STALE") {

          //   formik.resetForm();
          //   setFormMessage('Your wallet has already been set.  Navigate to your rewards page to view those changes.');

          // }

          // they've logged in - it worked
        })
        .catch((err) => {
          if (err.status === "PENDING") {
            // tell user to accept pending
            formik.resetForm();
            setFormMessage("Action is pending, please navigate to your apk/cli to accept the pending action.")
          }

          if (err.status === "FAILED") {
            // tell user that it failed
            setFormMessage("Login failed.");
            console.error(err.message ? err.message : "An error has occured");
          }
        }).finally(() => {

          formik.setSubmitting(false);
          setTimeout(() => setSpinner(false) , 1000);

        })
    },
    validationSchema: validation,
  });

  return (
    <Stack spacing={2}>
      <Typography variant="h6">Wallet</Typography>
      <form onSubmit={formik.handleSubmit}>
        <Stack spacing={2}>
          <Typography variant="body2">
          Login to your Incentive Program account below to submit your node's Wallet address. 
          </Typography>
          <Typography variant="caption">
          This address will be used for the transfer of your Incentive Rewards at mainnet launch.
          </Typography>
          <TextField
            id="email"
            name="email"
            type="email"
            value={formik.values.email}
            placeholder="Email"
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            FormHelperTextProps={{ className: styles["form-helper-text"] }}
            InputProps={{
              style:
                formik.touched.email && Boolean(formik.errors.email)
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
          <TextField
            id="pwd"
            name="pwd"
            type="password"
            placeholder="Password"
            value={formik.values.pwd}
            onChange={formik.handleChange}
            error={formik.touched.pwd && Boolean(formik.errors.pwd)}
            helperText={formik.touched.pwd && formik.errors.pwd}
            FormHelperTextProps={{ className: styles["form-helper-text"] }}
            InputProps={{
              style:
                formik.touched.pwd && Boolean(formik.errors.pwd)
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
            disabled={!(formik.isValid && formik.dirty) || formik.isSubmitting}
            type="submit"
            variant="contained"
            disableElevation
          >
           {!spinner && !formik.isSubmitting ?  "Submit Address & Public Key" : formik.isSubmitting && spinner ? <CircularProgress color="inherit" size={24}/> : null}
          </Button>
          {formMessage.length > 0 ? 
            <Typography variant="caption">
              {formMessage}
            </Typography>
          : null}
        </Stack>
      </form>
    </Stack>
  );
};

export default SubmitAddress;

const validation = Yup.object().shape({
  email: Yup.string().trim().required("Field is required"),
  pwd: Yup.string().required("Field is required"),
});
