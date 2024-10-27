import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
var bcrypt = require('bcryptjs');

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const cryptPass = async (unHashedPass: string) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(unHashedPass, salt);
}

export const comparePass = async (unHashedPass?: string, hashedPass?: string) => {
  return await bcrypt.compare(unHashedPass, hashedPass);
}
