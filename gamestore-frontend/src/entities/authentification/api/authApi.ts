import axios from "axios";

import {config} from "@/shared/lib/config";

export const authApi = axios.create({
  baseURL: `${config.BASE_URL}/auth}`,
  timeout: 1000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});