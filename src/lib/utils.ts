import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import * as crypto from 'crypto';
var bcrypt = require('bcryptjs');


// CRYPTO - CREDENTIALS
const SECRET_KEY = process.env.CRYPTO_SECRET_KEY || 'sua-chave-secreta-de-32-caracteres-aqui';
const SECRET_IV = process.env.CRYPTO_SECRET_IV || 'seu-iv-de-16-car';

// Função para converter string em buffer de tamanho fixo
const getKeyBuffer = (key: string, length: number): Buffer => {
  return Buffer.from(key.padEnd(length, '0').slice(0, length));
};

// CRYPTO - CREDENCIAIS
export const encryptCredentials = (text: string): string => {
  try {
    const key = getKeyBuffer(SECRET_KEY, 32);
    const iv = getKeyBuffer(SECRET_IV, 16);
    
    const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
  } catch (error) {
    console.error('Erro na criptografia:', error);
    throw new Error('Falha ao criptografar dados');
  }
};

// CRYPTO - CREDENCIAIS
export const decryptCredentials = (encryptedText: string): string => {
  try {
    const key = getKeyBuffer(SECRET_KEY, 32);
    const iv = getKeyBuffer(SECRET_IV, 16);
    
    const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
    let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  } catch (error) {
    console.error('Erro na descriptografia:', error);
    throw new Error('Falha ao descriptografar dados');
  }
};


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
