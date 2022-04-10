import Image from 'next/image';
import { useRouter } from 'next/router'


export default function ContentPanel({ videos, role, className}) {
    
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

        const res = await fetch(process.env.HOST_NAME + "/api/videos/" + id, {
            method: "DELETE",
        });

        if (res.status == 500) {
            alert('There was an error removing the video from the database.');
            return;
        } else if (res.status == 403) {
            alert('Unauthorized: You must be a Content Editor to delete videos.');
            return;
        }

        if (res.status == 200) {
            
        try {
                const data = await res.json();

                const removedres = await fetch(process.env.HOST_NAME + '/api/videos/' + id + '/upload', {
                    method: 'DELETE',
                    body: JSON.stringify({
                        filename: data.filename,
                        thumbnail: data.thumbnail
                    })
                })
                const removed = await removedres.json();

                console.log(removed);

                alert('Video has been removed.');
            } catch (error) {
                alert('Error removing from cloud: ' + error.message);
            }
        }

        router.push('/dashboard/content');
    };

    const classes = className + 'table-auto' ?? "table-auto bg-slate-200 rounded-lg"
    
    return (
        <div>  
            {videos.length !== 0 ?
                <table className={classes}>
                    <thead>
                        <tr className='border-b border-solid border-slate-900 text-left text-sm font-bold text-slate-900 w-full'>
                            <th scope="col" className='pl-4 pr-2 pt-2 pb-1 xxs:pl-2'>
                                Video
                            </th>
                            <th scope="col" className='flex shrink pt-2 pb-1 w-1/5'>
                                Title
                            </th>
                            {role.content_manager ?
                                <>
                                    <th scope="col" className='pt-2 pb-1 px-2 xs:px-4'>
                                        Views
                                    </th>
                                    <th scope="col" className='pt-2 pb-1 px-2'>
                                        Rating
                                    </th>
                                </>
                                :
                                <></>
                            }
                            <th scope="col" className='pt-2 pb-1 px-2 xxs:hidden'>
                                Date
                            </th>
                            {role.content_editor ?
                                <th scope="col" className='pt-2 pb-1 px-2'>
                                    Delete 
                                </th>
                                :
                                <></>
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {videos.map((video) => (
                            <tr key={video._id} className='border-t border-t-solid border-t-slate-400 text-left'>
                                <th scope='row' className="pl-4 pr-2 pt-2 xxs:pl-2">
                                    <Image
                                        layout='fixed'
                                        height='45'
                                        width='80'
                                        src={process.env.GOOGLE_STORAGE + video.thumbnail}
                                        className="rounded-md"
                                    />
                                    {/* <div className='absolute bottom-1 right-0'>
                                        <p className='text-xs bg-opacity-50 rounded-sm rounded-br-md bg-slate-800 font-bold text-[#C8C8C8]'>{fancyTimeFormat(video.metadata.length)}</p>
                                    </div> */}
                                </th>
                                <td className="w-80">
                                    <div className='text-ellipsis whitespace-nowrap overflow-auto'>
                                        <p className="font-medium text-slate-900 w-32">{video.title}</p>
                                        <p className="text-slate-500 w-32">{video.description}</p>
                                    </div>
                                </td>
                                {role.content_manager ?
                                    <>
                                        <td className="text-sm text-gray-900 font-light px-2 xs:px-4">
                                            {video.analytics.views}
                                        </td>
                                        <td className="text-sm text-gray-900 font-light px-2">
                                            {video.analytics.total_rating / video.analytics.num_ratings}
                                        </td>
                                    </>
                                    :
                                    <></>
                                }
                                <td className="text-sm text-gray-900 font-light px-2 truncate xxs:hidden">
                                    {video.created_at.substring(0, 10)}
                                </td>
                                {role.content_editor ?
                                    <td className="text-sm text-gray-900 font-light px-2">
                                        <a onClick={async () => removeVideo(video._id)} className="flex flex-row text-red-600  hover:underline hover:cursor-pointer">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}> <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /> </svg>
                                            <span>Delete</span>
                                        </a>
                                    </td>
                                    :
                                    <></>
                                }
                                <p className='pr-4 xxs:pr-2'></p>
                            </tr>
                        ))}

                    </tbody>
                </table>
            : <h1 className="mt-12 text-2xl">No videos to display.</h1>
            }
        </div>
    )
}