import Header from "@/components/Header"

type props = {
    children: React.ReactNode
}
const Dashboardlayout = ({ children }: props) => {
    return (
        <>
            <Header />
            <main className=" px-3 lg:px-14 " >
                {children}
            </main>
        </>
    )
}

export default Dashboardlayout
