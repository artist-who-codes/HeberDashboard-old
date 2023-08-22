
export default function DashboardLayout({ children }: { children: React.ReactNode, }) {
    return <section className="p-14">
        <div>
            {children}
        </div>

    </section>
}