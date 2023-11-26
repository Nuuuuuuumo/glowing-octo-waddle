import {useForm} from "react-hook-form";

import {Button, FormControl, TextField} from "@mui/material";

import {yupResolver} from "@hookform/resolvers/yup";

import {enqueueSnackbar} from "notistack";

import {useNavigate} from "react-router-dom";

import {useStyles} from "./loginForm.styles";

import {loginFormSchema, LoginFormSchema} from "@/features/authentification/login/model/loginFormSchema";
import {RequestLoginBody} from "@/entities/authentification/model/types";
import {useLoginMutation} from "@/entities/authentification/api/authApi";

export const LoginForm = () => {
  const {classes} = useStyles();
  const navigate = useNavigate();
  const [loginMutation, {error, isLoading}] = useLoginMutation();

  const {
    formState: {errors},
    handleSubmit,
    register,
  } = useForm<LoginFormSchema>({
    resolver: yupResolver(loginFormSchema),
  });


  const onSubmitHandler = async (loginDto: RequestLoginBody) => {
    await loginMutation(loginDto)
      .unwrap()
      .then((payload) => {
        enqueueSnackbar(`Welcome ${payload.firstName}`, {variant: "success"});
        navigate("/");
      })
      .catch(() => enqueueSnackbar("An error occurred.", {variant: "error"}));
  };
  return (
    <>
      <form className={classes.loginForm} onSubmit={handleSubmit(onSubmitHandler)}>
        <FormControl>
          <TextField
            {...register("email")}
            label="Email*"
            variant="outlined"
            fullWidth
            error={!!errors.email || !!error}
            helperText={errors.email?.message}
          />
        </FormControl>
        <FormControl>
          <TextField
            {...register("password")}
            label="Password*"
            type="password"
            variant="outlined"
            fullWidth
            error={!!errors.password || !!error}
            helperText={errors.password?.message}
          />
        </FormControl>
        <Button type="submit" variant="contained" color="primary">
          {isLoading ? "Logging in..." : "Login"}
        </Button>
      </form>
    </>
  );
};