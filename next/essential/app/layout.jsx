import '@/assets/styles/globals.css'
import Navbar from "@/components/Navbar";

export const metadata = {
    title: 'Next Tour',
    description: "Let's find some property",
    keywords: 'rental, nextapp, project'

}

const MainLayout = ({children}) => {
    return(
        <html lang='en'>
            <body>
                <Navbar />
                <main>
                    {children}
                </main>
            </body>
        </html>
    )
}

export default MainLayout