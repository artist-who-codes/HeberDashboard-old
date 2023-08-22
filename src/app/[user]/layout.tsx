import SideBar from "@/components/SideBar"


export default function DashboardLayout({ children, params }: { children: React.ReactNode, params: { user: string } }) {
    return <section className="flex">
        <SideBar />
        <div className="">
            {children}
        </div>

    </section>
}