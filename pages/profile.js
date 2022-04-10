import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import Profile from '../components/Profile'
import Layout from '../components/Layout'
import loginStatus from '../helpers/login-status'

export default function ProfilePage() {

    const { data: session, status } = useSession();
    const router = useRouter();

    return (
        <>
            {loginStatus(status, router) ?
                <div className='absolute w-3/5 h-3/5 left-1/5 top-1/5'>
                    <Profile user={session.user} />
                </div>
                :
                <></>
            }
        </>
    )
}

ProfilePage.layout = Layout;