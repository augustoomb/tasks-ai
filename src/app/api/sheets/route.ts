// import { google } from "googleapis";
// import { NextResponse } from "next/server";

// const clientEmail = process.env.CLIENT_EMAIL;
// const privateKey = process.env.PRIVATE_KEY || "";

// const googleAuth = new google.auth.JWT(
//     clientEmail,
//     undefined,
//     privateKey.replace(/\\n/g, '\n'),
//     'https://www.googleapis.com/auth/spreadsheets'
// );

// // PARA TESTAR OS FUNCTIONS
// export const testeGetGoogleSheetData = async ({initialCell, finalCell}: any) => {

//     const googleSheets = await google.sheets({ version: "v4", auth: googleAuth });
//     const response = await googleSheets.spreadsheets.values.get({
//         auth: googleAuth,
//         spreadsheetId: "1jDaG0n_kT8br1e4qs6-HfkwK1GloHX6AU9pHmKq2gMQ",
//         range: `sheet1!${initialCell}:${finalCell}`,
//     });
//     return response.data.values || 'No data found in the specified range.';
// }

// const getGoogleSheetData = async () => {

//     const googleSheets = await google.sheets({ version: "v4", auth: googleAuth });
//     const response = await googleSheets.spreadsheets.values.get({
//         auth: googleAuth,
//         spreadsheetId: "1jDaG0n_kT8br1e4qs6-HfkwK1GloHX6AU9pHmKq2gMQ",
//         range: "sheet1!A1:E27",
//     });
//     return response.data;
// }

// export async function GET(req: Request) {
//     try {

//         const dataTable = await getGoogleSheetData(); 
        
//         return NextResponse.json(dataTable, { status: 200 });
//     } catch (error) {
//         console.log(JSON.stringify(error));
        
//         return NextResponse.json({ error: JSON.stringify(error) }, { status: 500 });
//     }

// }
