// import { useState } from "react";
import { useLoginMutation } from "../store/api";
import { useAppDispatch, useAppSelector } from "../hooks";
import { Navigate } from "react-router-dom";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { setCredentials } from "../store/slices/authSlice";
import { toast } from "react-toastify";

type Credentials = {
  email: string;
  password: string;
};

const Login = () => {
  const [login, { isLoading }] = useLoginMutation();
  const user = useAppSelector((store) => store.auth.user);
  const dispatch = useAppDispatch();

  const { control, handleSubmit } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<Credentials> = async (data) => {
    try {
      const { email, password } = data;
      const auth = await login({ email, password }).unwrap();
      if (auth.user) {
        dispatch(setCredentials({ user: auth.user }));
      }
    } catch (error) {
      if (error) {
        type LoginError = {
          data: {
            message: string;
          };
        };
        const loginError = error as LoginError;
        toast.error(loginError.data.message);
      }
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
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  id="email-input"
                  label="Email"
                  type="email"
                  color="secondary"
                  sx={{
                    maxWidth: "50vw",
                    minWidth: "25vw",
                  }}
                />
              )}
            />
          </Grid>
          <Grid item>
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  id="password-input"
                  label="Password"
                  type="password"
                  color="secondary"
                  sx={{
                    maxWidth: "50vw",
                    minWidth: "25vw",
                  }}
                />
              )}
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
