// import { useState } from "react";
import { useLoginMutation } from "../store/api";
import { useAppDispatch, useAppSelector } from "../hooks";
import { Navigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import TextField from "@mui/material/TextField";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { setCredentials } from "../store/slices/authSlice";

type Credentials = {
  email: string;
  password: string;
};

const Login = () => {
  const [login, { isLoading }] = useLoginMutation();
  const user = useAppSelector((store) => store.auth.user);
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    // formState: { errors },
  } = useForm<Credentials>();

  const onSubmit: SubmitHandler<Credentials> = async (data) => {
    try {
      const { email, password } = data;
      const auth = await login({ email, password }).unwrap();
      if (auth.user) {
        //TODO
        dispatch(setCredentials({ user: auth.user }));
        // we got the user, save user to the store and navigate to dashboard page
      }
    } catch (error) {
      console.log(error);
    }
  };

  return user ? (
    <Navigate to="/" />
  ) : (
    <Grid
      container
      item
      direction="column"
      justifyContent="space-around"
      alignItems="center"
      sx={{
        paddingTop: "1rem",
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid
          container
          direction={"column"}
          justifyContent="center"
          alignItems="center"
          rowSpacing={2}
        >
          <Grid item>
            <AccountCircleRoundedIcon sx={{ fontSize: 50 }} color="secondary" />
          </Grid>
          <Grid item>
            <TextField
              id="email-input"
              label="Email"
              type="email"
              color="secondary"
              sx={{
                maxWidth: "50vw",
                minWidth: "25vw",
              }}
              {...register("email", { required: true })}
            />
          </Grid>
          <Grid item>
            <TextField
              id="password-input"
              label="Password"
              type="password"
              color="secondary"
              sx={{
                maxWidth: "50vw",
                minWidth: "25vw",
              }}
              {...register("password", { required: true })}
            />
          </Grid>
          <Grid item>
            {isLoading ? (
              <CircularProgress color="secondary" />
            ) : (
              <Button variant="contained" type="submit">
                Sign In
              </Button>
            )}
          </Grid>
        </Grid>
      </form>
    </Grid>
  );
};

export default Login;
