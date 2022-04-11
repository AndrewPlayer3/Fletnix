import NavBar from "./common/Navbar/Navbar"
import Footer from "../components/common/Footer"
import { useRouter } from 'next/router'

export default function Layout({ children }) {
    return (
        <div className='flex flex-col min-h-screen'>
            <div className="drop-shadow-lg z-40">
                <NavBar liveSearch={true} />
            </div>
            <main className='flex-grow mb-14'>
                {children}
            </main>
            <div className="fixed bottom-0">
                <Footer />
            </div>
        </div>
    )
}