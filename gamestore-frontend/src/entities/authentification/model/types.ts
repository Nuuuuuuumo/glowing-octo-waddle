import {LoginResponseData} from "@/features/authentification/login/model/types";

export type UserSliceState = {
  data?: null | LoginResponseData
  profileData?: null
  status: statusTypes
  errorMessage?: string | null
}