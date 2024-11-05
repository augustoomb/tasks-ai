import BreadCrumb from "@/components/shared/Breadcrumb";
import { fetchResponse } from "@/lib/utils";


export default async function Home({ params }: { params: { id_assistant: string } }) {
  
    // if (params.id_assistant) {}
    

    // const response = await fetchResponse(`/sheets`, "GET");

    // const data = await response.json();

    // console.log(data.values);
    // // retorno:
    // [
    //     [ 'partida_id', 'rodata', 'clube', 'atleta', 'minuto' ],
    //     [ '4607', '1', 'Fluminense', 'Nirley da Silva Fonseca', '59' ],
    //     [ '4607', '1', 'Fluminense', 'Fred', '45' ],
    //     [ '4607', '1', 'Fluminense', 'Rafael Sóbis', '31' ],
    //     [ '4608', '1', 'Internacional', 'Charles Aránguiz', '6' ],
    //     [ '4612', '1', 'Cruzeiro', 'Nílton Ferreira Júnior', '63' ],
    //     [ '4612', '1', 'Cruzeiro', 'Marcelo Moreno', '90' ],
    //     [ '4612', '1', 'Bahia', 'Anderson Talisca', '80' ]
    // ]


    
    const elements = [{name: "Home", href: "/"}];

    return(
        <> 
            <BreadCrumb {...{elements}}/>

            <h1>Home</h1>
        </>
    )
    
}
