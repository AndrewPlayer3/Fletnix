import { useSession } from "next-auth/react"
import ReactPlayer from 'react-player/file';
import Rating from '../components/Rating'
import Navbar from '../components/common/Navbar'
import { useRouter } from 'next/router'
import loginStatus from '../helpers/login-status'

export async function getServerSideProps(context) {

    const id = context.query.id;

    const res = await fetch('https://fletnix.vercel.app/api/video?id='+id, {
            method: 'GET'
        }
    )
    const data = await res.json()

    const view = await fetch('https://fletnix.vercel.app/api/video', {
        method: 'PUT',
        body: JSON.stringify({
            id: context.query.id
        })
    });
    await view.json();

    const rating = Math.round(data.analytics.total_rating / data.analytics.num_ratings)

    return {
        props: {
            id: id,
            title: data.title,
            location: data.location,
            description: data.description,
            rating: rating
        },
    }
}

export default function Home({ title, location, description, id, rating }) {

    const { data: session, status } = useSession();
    const router = useRouter();

    return (
        <>
        { loginStatus(status, router) ?
            <div className="flex-col w-screen h-screen">
                <div className='top-0 w-screen'>
                    <Navbar liveSearch = { false } />
                </div>
                <div className="absolute flex-col min-w-min lg:w-3/5 lg:h-3/5 lg:left-1/5 pt-14 tablet:w-6/6 tablet:h-6/6">
                    <div className='relative player-box'>
                        <ReactPlayer width='100%' height='100%' controls url={ location } />
                        <div className='mt-4 rounded-lg shadow-2xl border border-opacity-10 border-[#EEF1F3]'>
                            <div className='flex h-auto w-auto title-and-rating mt-4'>
                                <div className='ml-4 mr-4 w-full items-start justify-start'>
                                    <h1 className='font-bold text-white'> { title } </h1>
                                </div>
                                <div className='flex mr-4 mr-4 w-full items-start justify-end'>
                                    <Rating video_id={ id } />
                                </div>
                            </div>
                            <div className="mb-8">
                                <h1 className='text-[#EFF1F3] ml-4 mr-4 mt-4'>{ description }</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            :
            <></>
        }
        </>
    );
}