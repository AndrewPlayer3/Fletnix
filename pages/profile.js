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
                <div className="absolute left-1/5 top-24 h-3/5 w-3/5">
                    <Profile user={session.user} />
                </div>
            ) : (
                <>
                    <div className="absolute left-1/5 top-14 z-10 h-3/5 w-3/5">
                        <LoginForm />
                    </div>
                    <div className="absolute left-1/5 top-24 h-3/5 w-3/5 blur-xl">
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
