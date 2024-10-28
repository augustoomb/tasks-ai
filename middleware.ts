import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  const { pathname } = req.nextUrl;
  
  if (!token && (pathname.startsWith("/login") || pathname.startsWith("/register"))) {
    return NextResponse.next();
  }

  if (token && (pathname.startsWith("/login") || pathname.startsWith("/register"))) {
    const loginUrl = new URL("/home", req.url);
    return NextResponse.redirect(loginUrl);
  }

  // Redirecionar se não houver token (não autenticado)
  if (!token) {
    const loginUrl = new URL("/login", req.url);
    return NextResponse.redirect(loginUrl);
  }

  // Se a sessão existir, continuar para a página requisitada
  // return NextResponse.next();
}

export const config = {
  // matcher: ["/home", "/login", "/register"], // Lista de rotas protegidas
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],  // está bloqueando as imagens da logo
};


// import { NextResponse } from "next/server";
// import { getToken } from "next-auth/jwt";
// import type { NextRequest } from "next/server";

// export async function middleware(req: NextRequest) {
//   const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

//   const { pathname } = req.nextUrl;

//   console.log("token: " + JSON.stringify(token));
//   console.log("pathname: " + pathname);

//   // Permitir o acesso à página de login e APIs sem sessão
//   // if (pathname.startsWith("/login") || pathname.startsWith("/api/auth")) {

//   // if (pathname.startsWith("/login") || pathname.startsWith("/register")) {
//   if (pathname.startsWith("/login") || pathname.startsWith("/register")) {
//     console.log("Entrou 1");
//     return NextResponse.next();
//   }

//   if (token && pathname.startsWith("/login")) {
//     console.log("Entrou 2");
//     const loginUrl = new URL("/home", req.url);
//     return NextResponse.redirect(loginUrl);
//   }

//   // Redirecionar se não houver token (não autenticado)
//   if (!token) {
//     console.log("Entrou 3");
//     const loginUrl = new URL("/login", req.url);
//     return NextResponse.redirect(loginUrl);
//   }

//   // Se a sessão existir, continuar para a página requisitada
//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/home"], // Lista de rotas protegidas
// };
