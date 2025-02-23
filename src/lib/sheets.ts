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

    const { values } = param //values é uma matriz (desconstruida do objeto param)
    // console.log(values);
    const googleSheets = await google.sheets({ version: "v4", auth: googleAuth });
    const response = await googleSheets.spreadsheets.values.update({
        auth: googleAuth,
        spreadsheetId: "1jDaG0n_kT8br1e4qs6-HfkwK1GloHX6AU9pHmKq2gMQ",
        range: `sheet1!A2`,
        valueInputOption: "RAW", // Insere os valores sem formatação especial
        requestBody: {
            values: values, // Aqui passo o array com as linhas e dados
        },
    });

    return response;
}

export const setDataInGoogleSheets = tool({
    description: 'insere os dados fornecidos na planilha',
        parameters: z.object({
            values: z.any()
        }),
    execute: async (values) => setValuesInGoogleSheet(values)
})


export const getCellValueInGoogleSheet = async () => {
    try {
        console.log("Entrou no getCellValueInGoogleSheet");
        const googleSheets = await google.sheets({ version: "v4", auth: googleAuth });
        const response = await googleSheets.spreadsheets.values.get({
            auth: googleAuth,
            spreadsheetId: "1y95m64Mulm9X5B8fdv_SLVDKebfEzAQu2lKHRVBDvc4",
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
    } catch (error) {
        console.log(error);
        return { error: "erro ao buscar dados na planilha!" };
    }
}

export const getSpecificCellDataFromGoogleSheets = tool({
    description: 'analise os dados da planilha e forneça um relatório ao usuário',
    parameters: z.object({}),
    execute: async () => getCellValueInGoogleSheet()
})
