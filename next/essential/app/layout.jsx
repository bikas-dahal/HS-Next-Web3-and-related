import '@/assets/styles/globals.css'
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AuthProvider from "@/components/AuthProvider";


export const metadata = {
    title: 'Next Tour',
    description: "Let's find some property",
    keywords: 'rental, nextapp, project'

}

const MainLayout = ({children}) => {
    return(
        <AuthProvider>
            <html lang='en'>
                <body>
                    <Navbar />
                    <main>
                        {children}
                    </main>
                 <Footer />
                </body>
            </html>
        </AuthProvider>
    )
}

export default MainLayout