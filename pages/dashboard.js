import { UserIcon, VideoCameraIcon, PresentationChartLineIcon } from '@heroicons/react/outline'
import { useRouter } from 'next/router'
import Sidebar from "../components/common/Sidebar/Sidebar";
import Layout from "../components/Layout.js"
import Profile from '../components/Profile'
import roleGuard from './api/helpers/role_check';

export async function getServerSideProps(context) {

    const user = await roleGuard(context);

    if (user.redirect_login) {
        return {
            redirect: {
                destination: '/login',
                permanent: false,
            },
        }
    }

    if (user.redirect_profile) {
        return {
            redirect: {
                destination: '/profile',
                permanent: false,
            },
        }
    }

    return {
        props: {
            user: user
        },
    }
}

export default function Dashboard({ children, user }) {
    return (
        <div className="flex flex-col items-center justify-center md:flex-row">
            <div className="relative">
                <Sidebar />
            </div>
            <div id="myTabContent" className="absolute w-2/4 h-2/4 left-1/4 top-1/5">
                <Profile user={user} />
            </div>
        </div>
    )
}

Dashboard.layout = Layout