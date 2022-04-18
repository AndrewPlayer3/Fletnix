import { useSession } from 'next-auth/react'
import Image from 'next/image'
import Rating from '../../components/Rating'
import DisplayRating from '../../components/DisplayRating'
import Navbar from '../../components/common/Navbar'
import { useRouter } from 'next/router'
import loginStatus from '../../helpers/login-status'
import LoginForm from '../../components/LoginForm'

const ReactPlayerFile = require('react-player/file')

export async function getServerSideProps(context) {
    const { vid } = context.query

    const res = await fetch(
        process.env.HOST_NAME + '/api/video_redis?id=' + vid,
        {
            method: 'GET',
        }
    )
    const data = await res.json()

    // await fetch(process.env.HOST_NAME + '/api/video_redis?id=' + vid, {
    //     // Increment the view counter.
    //     method: 'PUT',
    // })

    return {
        props: {
            id: vid,
            title: data.videos.title,
            location: process.env.GOOGLE_STORAGE + data.videos.filename,
            thumbnail: process.env.GOOGLE_STORAGE + data.videos.thumbnail,
            description: data.videos.description,
            vid: vid,
        },
    }
}

export default function Home({ title, location, thumbnail, description, vid }) {
    const { status } = useSession()
    const router = useRouter()

    return (
        <>
            {loginStatus(status, router) ? (
                <div className="h-screen w-screen flex-col">
                    <div className="top-0 w-screen">
                        <Navbar liveSearch={false} />
                    </div>
                    <div className="tablet:w-6/6 tablet:h-6/6 absolute min-w-min flex-col pt-8 lg:left-1/5 lg:h-3/5 lg:w-3/5">
                        <div className="player-box relative">
                            <div className="video_glow">
                                <ReactPlayerFile
                                    width="100%"
                                    height="100%"
                                    controls
                                    url={location}
                                />
                            </div>
                            <div className="video_info_box mt-4">
                                <div className="title-and-rating mt-4 flex h-auto w-auto">
                                    <div className="ml-4 mr-4 w-full items-start justify-start">
                                        <h1 className="font-bold text-stone-100 shadow-2xl drop-shadow-2xl">
                                            {' '}
                                            {title}{' '}
                                        </h1>
                                    </div>
                                    <div className="mr-4 flex w-full items-start justify-end">
                                        <Rating video_id={vid} />
                                    </div>
                                </div>
                                <div className="mb-8">
                                    <h1 className="ml-4 mr-4 mt-4 font-light text-stone-100 shadow-2xl drop-shadow-2xl">
                                        {description}
                                    </h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <>
                    <div className="absolute top-14 z-0 flex w-screen justify-center">
                        <LoginForm />
                    </div>
                    <div className="flex h-screen w-screen flex-col">
                        <div className="top-0 z-50 w-screen">
                            <Navbar liveSearch={false} />
                        </div>
                        <div className="tablet:w-6/6 tablet:h-6/6 relative -z-30 min-w-min pt-8 blur-xl lg:left-1/5 lg:h-3/5 lg:w-3/5">
                            <Image
                                layout="responsive"
                                alt={'Thumbnail for ' + title}
                                height={90}
                                width={160}
                                src={thumbnail}
                            />
                            <div className="video_info_box mt-4">
                                <div className="title-and-rating mt-4 flex h-auto w-auto">
                                    <div className="ml-4 mr-4 w-full items-start justify-start">
                                        <h1 className="font-bold text-white">
                                            {title}
                                        </h1>
                                    </div>
                                    <div className="mr-4 flex w-full items-start justify-end">
                                        <DisplayRating rating={5} />
                                    </div>
                                </div>
                                <div className="mb-8">
                                    <h1 className="ml-4 mr-4 mt-4 font-light text-stone-100">
                                        {description}
                                    </h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    )
}
