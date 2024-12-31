import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";
// import { getCookie } from "@/lib/cookies";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  // const cookie = await getCookie("assistantId");

  const { pathname } = req.nextUrl;
  
  // Permite acesso a /login e /register apenas quando o usuário não está autenticado
  if (!token && (pathname.startsWith("/login") || pathname.startsWith("/register"))) {
    return NextResponse.next();
  }

  // Redireciona para /initial se o usuário autenticado tentar acessar /login ou /register
  if (token && (pathname.startsWith("/login") || pathname.startsWith("/register"))) {
    const loginUrl = new URL("/panel/home", req.url);
    return NextResponse.redirect(loginUrl);
  }

  // if (!cookie && (pathname.startsWith("/panel"))) {
  //   const loginUrl = new URL("/initial", req.url);
  //   return NextResponse.redirect(loginUrl);
  // }

  // Redirecionar se não houver token (não autenticado)
  if (!token) {
    const loginUrl = new URL("/login", req.url);
    return NextResponse.redirect(loginUrl);
  }

  // Se a sessão existir, continuar para a página requisitada
  return NextResponse.next();
}

export const config = {
  // matcher: ["/home", "/login", "/register"], // Lista de rotas protegidas
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)']
};
