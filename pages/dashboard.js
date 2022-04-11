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
                                <UploadForm className='bg-slate-200 rounded-b-lg shadow-xl drop-shadow-xl border border-solid border-slate-900 ' />
                                <div className='pt-8 pb-8'>
                                    <ContentPanel videos={videos} role={session.user.role} className={'content_panel_editor'} />
                                </div>
                            </>
                            :
                            <div className='pb-8 justify-center'>
                                <ContentPanel videos={videos} role={session.user.role} className={'content_panel_manager'} />
                            </div>
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
