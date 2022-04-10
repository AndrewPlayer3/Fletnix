import Sidebar from "../../components/common/Sidebar/Sidebar";
import Layout from "../../components/Layout.js"
import UploadForm from "../../components/UploadForm"
import ContentPanel from "../../components/ContentPanel";
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import videoQuery from '../api/helpers/video_query'
import loginStatus from '../../helpers/login-status'

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
        {loginStatus(status, router) ?
        <>
            <div className='fixed tablet:hidden'>
                <Sidebar />
            </div>
            <div className="flex flex-col items-center m-auto xs:w-screen">
                {session.user.role.content_editor ?
                    <>
                    <UploadForm className='bg-slate-200 rounded-b-lg shadow-xl' />
                    <div className='pt-8 pb-8'>
                        <ContentPanel videos={videos} role={session.user.role} className='shadow-xl rounded-xl bg-slate-200 text-sm text-gray-500 dark:text-gray-400' />
                    </div>
                    </>
                    :
                    <div className='pb-8'>
                        <ContentPanel videos={videos} role={session.user.role} className='rounded-b-xl bg-slate-200 text-sm text-gray-500 dark:text-gray-400' />
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