import { google } from "googleapis";
import { tool } from 'ai';
import { z } from 'zod';

const clientEmail = process.env.CLIENT_EMAIL;
const privateKey = process.env.PRIVATE_KEY || "";

const googleAuth = new google.auth.JWT(
    clientEmail,
    undefined,
    privateKey.replace(/\\n/g, '\n'),
    'https://www.googleapis.com/auth/spreadsheets'
);

export const getCellValueInGoogleSheet = async () => {

    const googleSheets = await google.sheets({ version: "v4", auth: googleAuth });
    const response = await googleSheets.spreadsheets.values.get({
        auth: googleAuth,
        spreadsheetId: "1jDaG0n_kT8br1e4qs6-HfkwK1GloHX6AU9pHmKq2gMQ",
        range: `sheet1`,
    });

    const rows = response.data.values;
    if (!rows || rows.length === 0) {
        console.log("Nenhum dado encontrado.");
        return;
    }

    // Extraindo cabeçalho
    const headers = rows[0];

    // Convertendo para array de objetos
    const result = rows.slice(1).map((row) => { // remover primeira linha, já que é o cabeçalho
        return headers.reduce((acc, header, index) => {
        acc[header] = row[index] || ""; // Evita `undefined`
        return acc;
        }, {});
    });

    return result;
}

export const getSpecificCellDataFromGoogleSheets = tool({
    description: 'analise os dados da planilha e forneça um relatório ao usuário',
    parameters: z.object({}),
    execute: async () => getCellValueInGoogleSheet()
})





// // 'use server'

// import { google } from "googleapis";
// import { tool } from 'ai';
// import { z } from 'zod';

// const clientEmail = process.env.CLIENT_EMAIL;
// const privateKey = process.env.PRIVATE_KEY || "";

// const googleAuth = new google.auth.JWT(
//     clientEmail,
//     undefined,
//     privateKey.replace(/\\n/g, '\n'),
//     'https://www.googleapis.com/auth/spreadsheets'
// );

// export const getCellValueInGoogleSheet = async (requestedCell: any) => {

//     const googleSheets = await google.sheets({ version: "v4", auth: googleAuth });
//     const response = await googleSheets.spreadsheets.values.get({
//         auth: googleAuth,
//         spreadsheetId: "1jDaG0n_kT8br1e4qs6-HfkwK1GloHX6AU9pHmKq2gMQ",
//         range: `sheet1!${requestedCell}`,
//     });

//     const flattenedData = response.data.values ? 
//         response.data.values.map(row => Number(row[0])) : 
//         [];
    
//     return flattenedData.join(", ");
// }

// getCellValueInGoogleSheet('A4');

// export const getSpecificCellDataFromGoogleSheets = tool({
//     description: 'o usuário informará uma célula de planilha (ex: A4) e você fornecerá o conteúdo dessa célula',
//     parameters: z.object({
//       requestedCell: z.string().describe('Celula inicial'),
//     }),
//     execute: async ({ requestedCell }) => getCellValueInGoogleSheet(requestedCell)
// })
