import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import crypto from 'crypto';
var bcrypt = require('bcryptjs');


// CRYPTO - CREDENTIALS
const iv = crypto.randomBytes(16); // Vetor de Inicialização
const key = crypto.randomBytes(32);

// CRYPTO - CREDENTIALS
export const cryptCredentials = async (text: string) => {
  const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key), iv);
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return encrypted.toString('hex');
}

// CRYPTO - CREDENTIALS
// export const decryptKey = (encryptedText: string) => {
//   const [ivHex, encrypted] = encryptedText.split(':');
//   const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(secretKey, 'utf-8'), Buffer.from(ivHex, 'hex'));
//   let decrypted = decipher.update(encrypted, 'hex', 'utf-8');
//   decrypted += decipher.final('utf-8');
//   return decrypted;
// };


// SHADCN UI
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// BCRYPT - PASSWORDS
export const cryptPass = async (unHashedPass: string) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(unHashedPass, salt);
}

// BCRYPT - PASSWORDS
export const comparePass = async (unHashedPass?: string, hashedPass?: string) => {
  return await bcrypt.compare(unHashedPass, hashedPass);
}


// CONSUMIR API
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
