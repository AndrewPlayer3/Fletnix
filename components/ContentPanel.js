import Image from 'next/image'
import { useRouter } from 'next/router'
import { useState } from 'react'

export default function ContentPanel({ videos, role, className }) {
    const router = useRouter()
    const [deleting, setDeleting] = useState(false)
    const [currentVideo, setCurrentVideo] = useState('')

    function fancyTimeFormat(duration) {
        // Hours, minutes and seconds
        var hrs = ~~(duration / 3600)
        var mins = ~~((duration % 3600) / 60)
        var secs = ~~duration % 60

        // Output like "1:01" or "4:03:59" or "123:03:59"
        var ret = ''

        if (hrs > 0) {
            ret += '' + hrs + ':' + (mins < 10 ? '0' : '')
        }

        ret += '' + mins + ':' + (secs < 10 ? '0' : '')
        ret += '' + secs
        return ret
    }

    // TODO: Add an "Are you sure?" prompt.
    const removeVideo = async (id) => {
        const res = await fetch(process.env.HOST_NAME + '/api/videos/' + id, {
            method: 'DELETE',
        })

        if (res.status == 500) {
            alert('There was an error removing the video from the database.')
            setDeleting(false)
            return
        } else if (res.status == 403) {
            setDeleting(false)
            alert(
                'Unauthorized: You must be a Content Editor to delete videos.'
            )
            return
        }

        if (res.status == 200) {
            try {
                const data = await res.json()

                const removedres = await fetch(
                    process.env.HOST_NAME + '/api/videos/' + id + '/upload',
                    {
                        method: 'DELETE',
                        body: JSON.stringify({
                            filename: data.filename,
                            thumbnail: data.thumbnail,
                        }),
                    }
                )
                const removed = await removedres.json()

                console.log(removed)

                alert('Video has been removed.')
            } catch (error) {
                alert('Error removing from cloud: ' + error.message)
            }
        }

        setDeleting(false)

        router.push('/dashboard')
    }

    return (
        <div className={className}>
            {videos.length !== 0 ? (
                <table className="table-auto">
                    <thead>
                        <tr className="w-full border-b border-solid border-stone-900">
                            <th
                                scope="col"
                                className="content_panel_header_text pl-4 pr-2 pt-2 pb-1 xxs:pl-2"
                                id="video_col"
                            >
                                Video
                            </th>
                            <th
                                scope="col"
                                className="content_panel_header_text flex w-1/5 shrink pt-2 pb-1"
                                id="title_col"
                            >
                                Title
                            </th>
                            {role.content_manager ? (
                                <>
                                    <th
                                        scope="col"
                                        className="content_panel_header_text px-2 pt-2 pb-1 xs:px-2"
                                        id="views_col"
                                    >
                                        Views
                                    </th>
                                    <th
                                        scope="col"
                                        className="content_panel_header_text px-2 pt-2 pb-1"
                                        id="rating_col"
                                    >
                                        Rating
                                    </th>
                                </>
                            ) : (
                                <></>
                            )}
                            <th
                                scope="col"
                                className="content_panel_header_text px-2 pt-2 pb-1 xs:hidden"
                                id="data_col"
                            >
                                Date
                            </th>
                            {role.content_editor ? (
                                <th
                                    scope="col"
                                    className="content_panel_header_text px-2 pt-2 pb-1"
                                    id="delete_col"
                                >
                                    Delete
                                </th>
                            ) : (
                                <></>
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {videos.map((video) => (
                            <tr
                                key={video._id}
                                className="content_panel_body_text border-t-solid border-t border-t-stone-300"
                            >
                                <th
                                    scope="row"
                                    className="pl-4 pr-2 pt-2 xxs:pl-2"
                                >
                                    <Image
                                        layout="fixed"
                                        height="45"
                                        width="80"
                                        src={
                                            process.env.GOOGLE_STORAGE +
                                            video.thumbnail
                                        }
                                        style="box-shadow: 10px 10px 10px"
                                        className="rounded-sm"
                                        alt={'Thumbnail for ' + video.title}
                                    />
                                </th>
                                <td className="w-80">
                                    <div className="overflow-auto text-ellipsis whitespace-nowrap">
                                        <p className="content_panel_body_text w-16">
                                            {video.title}
                                        </p>
                                        <p className="w-16 italic">
                                            {video.description}
                                        </p>
                                    </div>
                                </td>
                                {role.content_manager ? (
                                    <>
                                        <td className="px-2 xs:px-2">
                                            {video.analytics.views}
                                        </td>
                                        <td className="px-2 xs:px-0">
                                            {video.analytics.total_rating /
                                                video.analytics.num_ratings}
                                        </td>
                                    </>
                                ) : (
                                    <></>
                                )}
                                <td className="truncate px-2 xs:hidden">
                                    {video.created_at.substring(0, 10)}
                                </td>
                                {role.content_editor ? (
                                    <td className="px-2">
                                        <a
                                            onClick={async () => {
                                                removeVideo(video._id)
                                                setDeleting(true)
                                                setCurrentVideo(video._id)
                                            }}
                                            className="flex flex-row text-red-600  hover:cursor-pointer hover:underline"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className={
                                                    'h-5 w-5' +
                                                    (deleting &&
                                                    video._id == currentVideo
                                                        ? ' animate-[spin_1s_ease-in-out_infinite]'
                                                        : '')
                                                }
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                                strokeWidth={2}
                                            >
                                                {' '}
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                                />{' '}
                                            </svg>
                                            <span>
                                                {deleting &&
                                                video._id == currentVideo ? (
                                                    <>Deleting</>
                                                ) : (
                                                    <>Delete</>
                                                )}
                                            </span>
                                        </a>
                                    </td>
                                ) : (
                                    <></>
                                )}
                                <p className="pr-4 xs:pr-2"></p>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <h1 className="mt-12 text-2xl">No videos to display.</h1>
            )}
        </div>
    )
}
