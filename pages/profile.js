import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import Profile from '../components/Profile'
import Layout from '../components/Layout'
import loginStatus from '../helpers/login-status'

export default function ProfilePage( { user } ) {
    const { data: session, status } = useSession();
    const router = useRouter();
    return (
        <>
        { loginStatus(status, router) ?
            <div className='absolute w-2/4 h-2/4 left-1/4 top-1/4'>
                <Profile user = { session.user } />
            </div>
            :
            <></>
        }
        </>
    )
}

ProfilePage.layout = Layout;