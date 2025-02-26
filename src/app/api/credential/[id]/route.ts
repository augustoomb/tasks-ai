// import prisma from "@/lib/prisma";
// import { NextResponse } from "next/server";

// export async function GET(req: Request, { params }: { params: { id: string } }) {
//   try {
//     const { id } = params;

//     const credentials = await prisma.credential.findMany({
//         where: {
//             userId: parseInt(id),
//         },
//     });

//     if (!credentials) {
//         return NextResponse.json({ message: "Não foram encontradas credenciais para este usuário" }, { status: 404 });
//     }

//     return NextResponse.json({ credentials }, { status: 200 });

//   } catch (error) {
//     return NextResponse.json({ error: JSON.stringify(error) }, { status: 500 });
//   }

// }