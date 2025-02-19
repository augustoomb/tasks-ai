import { google } from "googleapis";
import { tool } from 'ai';
import { set, z } from 'zod';

const clientEmail = process.env.CLIENT_EMAIL;
const privateKey = process.env.PRIVATE_KEY || "";

const googleAuth = new google.auth.JWT(
    clientEmail,
    undefined,
    privateKey.replace(/\\n/g, '\n'),
    'https://www.googleapis.com/auth/spreadsheets'
);

export const setValuesInGoogleSheet = async (param: any) => {
    console.log("Entrou no setValuesInGoogleSheet. Dados:");

    const { values } = param
    console.log(values);
    const googleSheets = await google.sheets({ version: "v4", auth: googleAuth });
    const response = await googleSheets.spreadsheets.values.update({
        auth: googleAuth,
        spreadsheetId: "1jDaG0n_kT8br1e4qs6-HfkwK1GloHX6AU9pHmKq2gMQ",
        range: `sheet1!A1`, // O intervalo de células onde você quer começar a inserir os dados
        valueInputOption: "RAW", // Insere os valores sem formatação especial
        requestBody: {
            values: values, // Aqui você passa o array com as linhas e dados
        },
    });

    return response;
}

export const setDataInGoogleSheets = tool({
    description: 'insere os dados fornecidos na planilha',
    parameters: z.object({
        values: z.array(z.array(z.string()))
    }),
    execute: async (values) => setValuesInGoogleSheet(values)
})


export const getCellValueInGoogleSheet = async () => {
    console.log("Entrou no getCellValueInGoogleSheet");
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
