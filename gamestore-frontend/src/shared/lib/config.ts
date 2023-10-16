import { z } from "zod";

const envVariables = z.object({
  VITE_BASE_URL: z.string(),
});
envVariables.parse(import.meta.env);

declare global {
  interface ImportMetaEnv extends z.infer<typeof envVariables> {}
}

export const config = {
  BASE_URL: import.meta.env.VITE_BASE_URL,
} as const;