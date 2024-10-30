import BreadCrumb from "@/components/shared/Breadcrumb"


export default function Home() {

    const elements = [{name: "Home", href: "/"}]

    return(
        <>
            <BreadCrumb {...{elements}}/>

            <h1>Home</h1>
        </>
    )
    
}