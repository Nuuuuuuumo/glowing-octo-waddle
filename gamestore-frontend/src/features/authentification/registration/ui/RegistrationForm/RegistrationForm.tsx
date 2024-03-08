import {useForm} from "react-hook-form";

import {Button, FormControl, TextField} from "@mui/material";

import {yupResolver} from "@hookform/resolvers/yup";

import {enqueueSnackbar} from "notistack";

import {useNavigate} from "react-router-dom";

import {useStyles} from "./registrationForm.styles";

import {RequestRegisterBody} from "@/entities/authentification/model/types";
import {useRegistrationMutation} from "@/entities/authentification/api/authApi";
import {Loader} from "@/shared/ui/loader/Loader";
import {RegistrationFormSchema, registrationFormSchema} from "@/features/authentification/registration/model/registrationFormSchema";

export const RegistrationForm = () => {
  const {classes} = useStyles();
  const navigate = useNavigate();
  const [registrationMutation, {error, isLoading}] = useRegistrationMutation();

  const {
    formState: {errors},
    handleSubmit,
    register,
  } = useForm<RegistrationFormSchema>({
    resolver: yupResolver(registrationFormSchema),
  });


  const onSubmitHandler = async (registrationDto: RequestRegisterBody) => {
    const {avatarURL, ...rest} = registrationDto;
    const formData = new FormData();
    formData.append("data", JSON.stringify(rest));
    formData.append("avatarURL", avatarURL[0]);
    await registrationMutation(formData)
      .unwrap()
      .then((payload) => {
        enqueueSnackbar(`Welcome ${payload.firstName}`, {variant: "success"});
        navigate("/");
      })
      .catch(() => enqueueSnackbar("An error occurred.", {variant: "error"}));
  };
  return (
    <>
      <form className={classes.registrationForm} onSubmit={handleSubmit(onSubmitHandler)}>
        <FormControl fullWidth sx={{m: 2}}>
          <input {...register("avatarURL")} type="file"/>
        </FormControl>
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
            {...register("firstName")}
            label="First name*"
            variant="outlined"
            fullWidth
            error={!!errors.firstName || !!error}
            helperText={errors.firstName?.message}
          />
        </FormControl>
        <FormControl>
          <TextField
            {...register("lastName")}
            label="Last Name*"
            variant="outlined"
            fullWidth
            error={!!errors.lastName || !!error}
            helperText={errors.lastName?.message}
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
          {isLoading ? <Loader/> : "Sign Up"}
        </Button>
      </form>
    </>
  );
};