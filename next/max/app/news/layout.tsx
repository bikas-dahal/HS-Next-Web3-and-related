import MainHeader from "@/components/main-header";

export const metadata = {
    title: 'News ',
    description: 'Demo news app'
}

export default function NewsLayout({ children }: { children: JSX.Element }) {
    return(
        <html lang="en">
            <body>
                <MainHeader />
                { children }
            </body>
        </html>
    )
}