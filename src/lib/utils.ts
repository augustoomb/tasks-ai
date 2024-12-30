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

export const fetchResponse = async (path: string, method: string, body?: any, options?: RequestInit ) => {
  
    const url = `${process.env.NEXT_PUBLIC_SERVER_URL}${path}`;

    const response: any = await fetch(url, {
      method: method,
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    return response;

}


