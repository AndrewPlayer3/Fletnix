import Image from 'next/image';
import Link from 'next/link';
import DisplayRating from './DisplayRating'


export default function Thumbnail({ result }) {

    const rating = result['analytics'].num_ratings == 0 ? 0 : result['analytics'].total_rating / result['analytics'].num_ratings;
    const thumb_url = process.env.GOOGLE_STORAGE + result['thumbnail']

    return (
        <div className=''>
            <div className='block m-2 cursor-pointer'>
                {/* Each Video Thumbnail display/ Display default thumbnail if there is none in db */}
                <div>
                    <Link href={{ pathname: '/videos/' + result['_id'] }}>
                        <div className='relative flex h-auto w-auto rounded-md drop-shadow-2xl transition ease-in-out delay-50 hover:scale-105 hover:rotate-1'>
                            <Image
                                layouts='fill'
                                src={thumb_url}
                                height='720px'
                                width='1280px'
                                className="rounded-md"
                            />
                            <div className='absolute bottom-0 right-0 opacity-70'>
                                <DisplayRating rating={rating} />
                            </div>
                        </div>
                    </Link>
                </div>
                <p className='pt-1 font-sans font-bold text-[#EFF1F3]'>{result['title']}</p>
            </div>
        </div>
    )
}