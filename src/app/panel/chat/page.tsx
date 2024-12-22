import BreadCrumb from "@/components/shared/Breadcrumb";
import Chatbot from "@/components/chat/chatbot";

export default async function Chat() {
      
    const elements = [{name: "Chat", href: "/"}];

    return(
        <div className="flex flex-col h-full"> 
            <BreadCrumb {...{elements}}/>

            <h1 className="text-3xl font-bold h-16">Chat</h1>

            <Chatbot />
        </div>
    )    
}
