import { userSchema } from "@/schemas";

export const loginFormSchema = userSchema.pick({ email: true, password: true });
