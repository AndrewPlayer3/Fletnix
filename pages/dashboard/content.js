import Sidebar from "../../components/common/Sidebar/Sidebar";
import Layout from "../../components/Layout.js"
import UploadForm from "../../components/UploadForm"
import Image from 'next/image';
import { useState } from "react"
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

    function fancyTimeFormat(duration) {
        // Hours, minutes and seconds
        var hrs = ~~(duration / 3600);
        var mins = ~~((duration % 3600) / 60);
        var secs = ~~duration % 60;

        // Output like "1:01" or "4:03:59" or "123:03:59"
        var ret = "";

        if (hrs > 0) {
            ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
        }

        ret += "" + mins + ":" + (secs < 10 ? "0" : "");
        ret += "" + secs;
        return ret;
    }

    // TODO: Add an "Are you sure?" prompt.
    const removeVideo = async (id) => {

        const res = await fetch(process.env.HOSTNAME + "/api/videos/" + id, {
            method: "DELETE",
        });

        if (res.status == 500) {
            alert('There was an error removing the video.');
            return;
        } else if (res.status == 403) {
            alert('Unauthorized: You must be a Content Editor to delete videos.');
            return;
        }

        if (res.status == 200) {
            alert('The video has been deleted.');
        }

        router.push('/dashboard/content');
    };

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
                                :
                                <> </>
                            }
                            {videos.length !== 0 ?
                                <div className="w-full bg-slate-200 my-16 overflow-x-auto shadow-md sm:rounded-lg">
                                    <table className="w-full divide-y divide-slate-700 text-sm text-left text-gray-500 dark:text-gray-400">
                                        <thead>
                                            <tr>
                                                <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                                    #
                                                </th>
                                                <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                                    Video
                                                </th>
                                                {session.user.role.content_manager ?
                                                    <>
                                                        <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                                            Views
                                                        </th>
                                                        <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left max-length-3">
                                                            Rating
                                                        </th>
                                                    </>
                                                    :
                                                    <></>
                                                }
                                                <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                                    Date
                                                </th>
                                                {session.user.role.content_editor ?
                                                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                                        Delete forever
                                                    </th>
                                                    :
                                                    <></>
                                                }
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-700">
                                            {videos.map((video, i) => (
                                                <tr key={video._id} >
                                                    <td className="text-sm text-gray-900 font-medium px-6 whitespace-nowrap">
                                                        {i + 1}
                                                    </td>
                                                    <td className="text-sm max-w-xs text-gray-900 font-light px-6 py-2 whitespace-nowrap">
                                                        <div className="flex justify-between items-start">
                                                            <div className="relative w-1/3">
                                                                <Image
                                                                    layouts='fill'
                                                                    src={process.env.GOOGLE_STORAGE + video.thumbnail}
                                                                    height='1080'
                                                                    width='1920'
                                                                    className="rounded-md"
                                                                />
                                                                <div className='absolute bottom-1 right-0'>
                                                                    <p className='w-full text-xs bg-black font-bold text-[#C8C8C8]'>{fancyTimeFormat(video.metadata.length)}</p>
                                                                </div>
                                                            </div>
                                                            <div className="w-2/3 ml-1 pl-2">
                                                                <h3 className="font-medium text-black overflow-hidden hover:overflow-visible text-ellipsis">{video.title}</h3>
                                                                <p className="text-ellipsis overflow-hidden">{video.description}</p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    {session.user.role.content_manager ?
                                                        <>
                                                            <td className="text-sm text-gray-900 font-light px-6 whitespace-nowrap">
                                                                {video.analytics.views}
                                                            </td>
                                                            <td className="text-sm text-gray-900 font-light px-6 whitespace-nowrap">
                                                                {video.analytics.total_rating / video.analytics.num_ratings}
                                                            </td>
                                                        </>
                                                        :
                                                        <></>
                                                    }
                                                    <td className="text-sm text-gray-900 font-light px-6 whitespace-nowrap ">
                                                        {video.created_at.substring(0, 10)}
                                                    </td>
                                                    {session.user.role.content_editor ?
                                                        <td className="text-sm text-gray-900 font-light px-6 whitespace-nowrap">
                                                            <a onClick={async () => removeVideo(video._id)} className="flex items-center text-red-600  hover:underline hover:cursor-pointer">
                                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}> <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /> </svg>
                                                                <span>Delete</span>
                                                            </a>
                                                        </td>
                                                        :
                                                        <></>
                                                    }
                                                </tr>
                                            ))}

                                        </tbody>
                                    </table>
                                </div>
                                : <h1 className="mt-12 text-2xl">No videos to display.</h1>}
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