import BreadCrumb from "@/components/shared/Breadcrumb";
import { fetchResponse } from "@/lib/utils";


export default async function Modules({ params }: { params: { id_assistant: string } }) {
      
    const elements = [{name: "Modules", href: "/"}];

    return(
        <> 
            <BreadCrumb {...{elements}}/>

            <h1>Modules</h1>
        </>
    )
    
}
