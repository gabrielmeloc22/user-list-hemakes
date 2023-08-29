import { z } from "zod";

export const userSchema = z.object({
  id: z.string(),
  name: z.string(),
  image: z.string(),
  company: z.enum(["hemakes", "wemake", "youmake"]),
  role: z.enum(["uidesigner", "hrmanager", "leader", "developer"]),
  status: z.enum(["banned", "active", "idle"]),
  verified: z.boolean(),
});

export type User = z.infer<typeof userSchema>;
