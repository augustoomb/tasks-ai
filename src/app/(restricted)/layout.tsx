import { AppSidebar } from "@/components/sidebar/AppSidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex h-screen">
            <aside className="">
                <AppSidebar />
            </aside>
            <main className="flex-grow p-6">
                {children}
            </main>
        </div>
    )   
}