import axios from "axios";

import {config} from "@/shared/lib/config";

export const baseApi = axios.create({
  baseURL: config.BASE_URL,
  timeout: 1000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});