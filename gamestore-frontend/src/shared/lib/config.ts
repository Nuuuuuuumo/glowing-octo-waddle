import { z } from "zod";

const envVariables = z.object({
  BASE_URL: z.string().url(),
});

envVariables.parse(import.meta.env);

declare global {
  interface ImportMetaEnv extends z.infer<typeof envVariables> {}
}

export const config = {
  BASE_URL: import.meta.env.VITE_BASE_URL,
};