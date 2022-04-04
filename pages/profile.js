import { getSession } from 'next-auth/react'
import Profile from '../components/Profile'
import Layout from '../components/Layout'

export async function getServerSideProps(context) {

    const session = await getSession(context);

    const res = await fetch('https://fletnix.vercel.app/api/user', {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            cookie: context.req.headers.cookie,
        },
    });

    const data = await res.json();

    const user = {
        username: data.username,
        email: data.email,
        role: data.role
    }

    return {
        props: {
            user: user
        },
    }
}

export default function ProfilePage( { user } ) {
    return (
        <div className='absolute w-2/4 h-2/4 left-1/4 top-1/4'>
            <Profile user = { user } />
        </div>
    )
}

ProfilePage.layout = Layout;