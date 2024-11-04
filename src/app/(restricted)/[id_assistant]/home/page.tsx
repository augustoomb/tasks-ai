import BreadCrumb from "@/components/shared/Breadcrumb";


export default function Home({ params }: { params: { id_assistant: string } }) {

    const elements = [{name: "Home", href: "/"}]

    return(
        <> 
            <BreadCrumb {...{elements}}/>

            <h1>Home</h1>
        </>
    )
    
}