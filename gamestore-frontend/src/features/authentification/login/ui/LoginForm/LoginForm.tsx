import {useForm} from "react-hook-form";

import {zodResolver} from "@hookform/resolvers/zod";

import {Button, FormControl, TextField} from "@mui/material";

import {toast} from "react-toastify";

import {useStyles} from "./loginForm.styles";

import {loginFormSchema, LoginFormSchema} from "@/features/authentification/login/model/loginFormSchema";
import {RequestLoginBody} from "@/entities/authentification/model/types";
import {useLoginMutation} from "@/entities/authentification/api/authApi";

export const LoginForm = () => {
  const {classes} = useStyles();
  const [loginMutation, {error, isLoading}] = useLoginMutation();

  const {
    formState: {errors},
    handleSubmit,
    register,
  } = useForm<LoginFormSchema>({
    resolver: zodResolver(loginFormSchema),
  });

  const onSubmitHandler = async (loginDto: RequestLoginBody) => {
    await loginMutation(loginDto)
      .unwrap()
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        if ("data" in error) {
          return toast.error(error.data.message);
        }
      });
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