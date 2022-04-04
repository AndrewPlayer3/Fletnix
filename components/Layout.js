import NavBar from "./common/Navbar/Navbar"
import Footer from "../components/common/Footer"
import Header from "../components/common/Header"

export default function Layout({children, pageProps}){
    return(
        <div className='flex max-w-screen'> 
            <div className="fixed top-0 w-screen drop-shadow-lg z-40">
                <NavBar liveSearch = { true } />
            </div>
            <div className='mb-16 mt-14'>
                <main>{children}</main>
            </div>
            <div className="fixed bottom-0">
                <Footer />
            </div>
        </div>
    )
}