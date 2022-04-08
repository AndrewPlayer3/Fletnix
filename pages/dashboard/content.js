import Sidebar from "../../components/common/Sidebar/Sidebar";
import Layout from "../../components/Layout.js"
import UploadForm from "../../components/UploadForm"
import { useSession } from 'next-auth/react'
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

    return (
        <>
            {loginStatus(status, router) ?
                <div className="flex">
                    <div className="tablet:hidden">
                        <Sidebar />
                    </div>
                    <div className="absolute top-14 w-3/5 w-3/5 left-1/5 right-1/5 flex flex-col justify-center md:flex-row tablet:left-0 tablet:right-0 tablet:w-screen tablet:top-14">
                        <div className=" relative flex flex-col items-center justify-center h-auto">
                            {session.user.role.content_editor ?
                                <div>
                                    <UploadForm />
                                </div>
                                : <> </>
                            }
                            <ContentPanel videos={videos} role={session.user.role} />
                        </div>
                    </div>
                </div>
                :
                <></>
            }
        </>
    )
}

Content.layout = Layout