import { getSpecificCellDataFromGoogleSheets } from "./sheets";

export const runModules = (arrUserEnabledModuleIds: number[]) => {
  
    const toolMap: { [key: number]: any } = {
      2: {
        name: "getSpecificCellDataFromGoogleSheets",
        implementation: getSpecificCellDataFromGoogleSheets,
      },
    }
  
    const enabledTools = arrUserEnabledModuleIds
      .map((id: number) => toolMap[id])
      .filter(Boolean);  
  
    
    const tools = Object.fromEntries(
      enabledTools.map((tool: { name: any; implementation: any; }) => [tool.name, tool.implementation])
    );
  
    return tools;
  
}

// #####################################################################

// const enabledTools = arrUserEnabledModuleIds
//     .map((id: number) => toolMap[id])
//     .filter(Boolean);  // Remove valores undefined (caso o ID não exista)
//
// Saída de enabledTools (exemplo)
// [
//   {
//     name: "getSpecificCellDataFromGoogleSheets",
//     implementation: <função de implementação>,
//   },
// ]


// const tools = Object.fromEntries(
//   enabledTools.map((tool: { name: any; implementation: any; }) => [tool.name, tool.implementation])
// );
//
// Ao passar no map, transformará em um arr [chave, valor]. exemplo de saída:
// [
//   ["getSpecificCellDataFromGoogleSheets", func1],
//   ["anotherTool", func2]
// ]
//
//
// O método Object.fromEntries pega um array de pares [key, value] e converte-o em um objeto:
// {
//   getSpecificCellDataFromGoogleSheets: func1,
//   anotherTool: func2,
// }