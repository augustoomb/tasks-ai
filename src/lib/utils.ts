import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
const bcrypt = require('bcrypt');

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

 export const cryptPass = async (unHashedPass: string) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(unHashedPass, salt);
}