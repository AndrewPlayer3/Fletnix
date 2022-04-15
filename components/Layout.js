import NavBar from './common/Navbar/Navbar'
import Footer from '../components/common/Footer'

export default function Layout({ children }) {
    return (
        <div className="flex flex-col">
            <div className="z-40">
                <NavBar liveSearch={true} />
            </div>
            <div className="mb-14 flex-grow">{children}</div>
            <div className="fixed bottom-0">
                <Footer />
            </div>
        </div>
    )
}
