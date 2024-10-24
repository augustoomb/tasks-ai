import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  const { pathname } = req.nextUrl;

  // Permitir o acesso à página de login e APIs sem sessão
  if (pathname.startsWith("/login") || pathname.startsWith("/api/auth")) {
    return NextResponse.next();
  }

  // Redirecionar se não houver token (não autenticado)
  if (!token) {
    const loginUrl = new URL("/login", req.url);
    return NextResponse.redirect(loginUrl);
  }

  // Se a sessão existir, continuar para a página requisitada
  return NextResponse.next();
}

export const config = {
  matcher: ["/home"], // Lista de rotas protegidas
};
