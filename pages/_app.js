import { SessionProvider } from "next-auth/react"
import Header from "../components/common/Header"
import '../styles/globals.css'

export default function MyApp({
    Component,
    pageProps: { session, ...pageProps },
}) {
    const Layout = (Component.layout) || (({ children }) => <>{children}</>);
    return (
        <>
            <SessionProvider session={session}>
                <Header />
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </SessionProvider>
        </>
    )
}