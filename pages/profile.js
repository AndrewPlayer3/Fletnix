import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import Profile from '../components/Profile'
import Layout from '../components/Layout'
import loginStatus from '../helpers/login-status'
import LoginForm from '../components/LoginForm'

export default function ProfilePage() {
    const { data: session, status } = useSession()
    const router = useRouter()

    return (
        <>
            {loginStatus(status, router, false) ? (
                <div className="flex justify-center">
                    <Profile user={session.user} />
                </div>
            ) : (
                <>
                    <div className="flex justify-center">
                        <LoginForm />
                    </div>
                    <div className="fixed top-14 -z-30 flex w-screen justify-center blur-md">
                        <Profile
                            user={{
                                username: 'dummyuser',
                                email: 'dummyuser@email.com',
                                role: {
                                    viewer: true,
                                    content_editor: false,
                                    content_manager: false,
                                },
                            }}
                        />
                    </div>
                </>
            )}
        </>
    )
}

ProfilePage.layout = Layout
