'use server'

import { google } from "googleapis";

const clientEmail = process.env.CLIENT_EMAIL;
const privateKey = process.env.PRIVATE_KEY || "";

const googleAuth = new google.auth.JWT(
    clientEmail,
    undefined,
    privateKey.replace(/\\n/g, '\n'),
    'https://www.googleapis.com/auth/spreadsheets'
);

export const testeGetGoogleSheetData = async (requestedCell: any) => {

    console.log("requestCell: ", requestedCell);

    const googleSheets = await google.sheets({ version: "v4", auth: googleAuth });
    const response = await googleSheets.spreadsheets.values.get({
        auth: googleAuth,
        spreadsheetId: "1jDaG0n_kT8br1e4qs6-HfkwK1GloHX6AU9pHmKq2gMQ",
        // range: `sheet1!${initialCell}:${finalCell}`,
        range: `sheet1!${requestedCell}`,
    });

    const flattenedData = response.data.values ? 
        response.data.values.map(row => Number(row[0])) : 
        [];

    console.log('Flattened data:', flattenedData.join(", "));
    
    // return flattenedData;
    return flattenedData.join(", ");

    // console.log(response.data.values);

    // return response.data.values || 'Sem dados para exibir';
}
