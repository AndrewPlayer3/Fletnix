import Layout from "../components/Layout.js"
import UploadForm from "../components/UploadForm"
import ContentPanel from "../components/ContentPanel";
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import videoQuery from './api/helpers/video_query'
import loginStatus from '../helpers/login-status'

export async function getServerSideProps(context) {

    const data = await videoQuery(context);

    return {
        props: {
            videos: data
        },
    }
}

export default function Content({ videos }) {

    const { data: session, status } = useSession();
    const router = useRouter();

    return (
        <>
            {loginStatus(status, router, true) ?
                <>
                    <div className="flex flex-col items-center w-screen m-auto">
                        {session.user.role.content_editor ?
                            <>
                                <UploadForm />
                                <div className='pt-8 pb-8'>
                                    <ContentPanel videos={videos} role={session.user.role} className={'content_panel_editor'} />
                                </div>
                            </>
                            :
                            <>
                            { session.user.role.content_manager ?
                                <div className='pb-8 justify-center'>
                                    <ContentPanel videos={videos} role={session.user.role} className={'content_panel_manager'} />
                                </div>
                                :
                                (router.push('/'), null)
                            }
                            </>
                        }
                    </div>
                </>
                :
                <></>
            }
        </>
    )
}

Content.layout = Layout
