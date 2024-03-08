import {Box} from "@mui/material";

import {useStyles} from "@/pages/registration/ui/registrationPage.styles";
import {RegistrationForm} from "@/features/authentification/registration";


export const RegistrationPage = () => {
  const {classes} = useStyles();

  return (
    <Box className={classes.rootWrapper}>
      <RegistrationForm/>
    </Box>
  );
};