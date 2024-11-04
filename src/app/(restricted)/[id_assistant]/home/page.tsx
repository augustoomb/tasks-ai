import BreadCrumb from "@/components/shared/Breadcrumb"


export default function Home({ params }: { params: { id_assistant: string } }) {

    const elements = [{name: "Home", href: "/"}]

    console.log("Estou na home... "+params.id_assistant)

    return(
        <>
            <BreadCrumb {...{elements}}/>

            <h1>Home</h1>
        </>
    )
    
}