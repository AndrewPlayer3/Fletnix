import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import Sidebar from "../components/common/Sidebar/Sidebar";
import Layout from "../components/Layout.js"
import Profile from '../components/Profile'
import loginStatus from '../helpers/login-status'

export default function Dashboard() {

    const { data: session, status } = useSession();
    const router = useRouter();

    return (
        <>
            {loginStatus(status, router) ?
                <div className="flex flex-col items-center justify-center md:flex-row">
                    <div className="relative">
                        <Sidebar />
                    </div>
                    <div id="myTabContent" className="absolute w-2/4 h-2/4 left-1/4 top-1/5">
                        <Profile user={session.user} />
                    </div>
                </div>
                :
                <></>
            }
        </>
    )
}

Dashboard.layout = Layout