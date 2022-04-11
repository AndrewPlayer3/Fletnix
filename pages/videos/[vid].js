import { useSession } from "next-auth/react"
import ReactPlayer from 'react-player/file';
import Image from 'next/image'
import Rating from '../../components/Rating'
import DisplayRating from '../../components/DisplayRating'
import Navbar from '../../components/common/Navbar'
import { useRouter } from 'next/router'
import loginStatus from '../../helpers/login-status'
import LoginForm from '../../components/LoginForm'

const ReactPlayerFile = require('react-player/file');
const ReactPlayerYoutube = require('react-player/youtube');

export async function getServerSideProps(context) {

    const { vid } = context.query;

    const res = await fetch(process.env.HOST_NAME + '/api/videos/' + vid, {
        method: 'GET'
    }
    )
    const data = await res.json()

    await fetch(process.env.HOST_NAME + '/api/videos/' + vid, { // Increment the view counter.
        method: 'PUT',
    });

    return {
        props: {
            id: vid,
            title: data.video.title,
            location: process.env.GOOGLE_STORAGE + data.video.filename,
            thumbnail: process.env.GOOGLE_STORAGE + data.video.thumbnail,
            description: data.video.description,
            vid: vid
        },
    }
}

export default function Home({ title, location, thumbnail, description, vid }) {

    const { status } = useSession();
    const router = useRouter();

    return (
        <>
            {loginStatus(status, router) ?
                <div className="flex-col w-screen h-screen">
                    <div className='top-0 w-screen'>
                        <Navbar liveSearch={false} />
                    </div>
                    <div className="absolute flex-col min-w-min lg:w-3/5 lg:h-3/5 lg:left-1/5 pt-8 tablet:w-6/6 tablet:h-6/6">
                        <div className='relative player-box'>
                            <ReactPlayerFile width='100%' height='100%' controls url={location} />
                            <div className='mt-4 video_info_box'>
                                <div className='flex h-auto w-auto title-and-rating mt-4'>
                                    <div className='ml-4 mr-4 w-full items-start justify-start'>
                                        <h1 className='font-bold drop-shadow-2xl shadow-2xl text-stone-100'> {title} </h1>
                                    </div>
                                    <div className='flex mr-4 w-full items-start justify-end'>
                                        <Rating video_id={vid} />
                                    </div>
                                </div>
                                <div className="mb-8">
                                    <h1 className='text-stone-100 drop-shadow-2xl shadow-2xl font-light ml-4 mr-4 mt-4'>{description}</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                :
                <>
                    <div className="absolute flex justify-center w-screen top-14 -z-10">
                        <LoginForm />
                    </div>
                    <div className="flex-col w-screen h-screen">
                        <div className='top-0 w-screen z-40'>
                            <Navbar liveSearch={false} />
                        </div>
                        <div className="relative blur-xl min-w-min lg:w-3/5 lg:h-3/5 lg:left-1/5 pt-8 tablet:w-6/6 tablet:h-6/6 -z-30">
                            <Image layout='responsive' height={90} width={160} src={thumbnail} />
                            <div className='mt-4 video_info_box'>
                                <div className='flex h-auto w-auto title-and-rating mt-4'>
                                    <div className='ml-4 mr-4 w-full items-start justify-start'>
                                        <h1 className='font-bold text-white'>{title}</h1>
                                    </div>
                                    <div className='flex mr-4 w-full items-start justify-end'>
                                        <DisplayRating rating={5} />
                                    </div>
                                </div>
                                <div className="mb-8">
                                    <h1 className='text-stone-100 font-light ml-4 mr-4 mt-4'>{description}</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            }
        </>
    );
}