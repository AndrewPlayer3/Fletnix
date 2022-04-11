import Image from 'next/image';
import Link from 'next/link';
import DisplayRating from './DisplayRating'


export default function Thumbnail({ result }) {

    const rating = result['analytics'].num_ratings == 0 ? 0 : result['analytics'].total_rating / result['analytics'].num_ratings;
    const thumb_url = process.env.GOOGLE_STORAGE + result['thumbnail']

    return (
        <div className=''>
            <div className='block my-3 cursor-pointer transition ease-in-out hover:scale-95 focus:animate-ping'>
                {/* Each Video Thumbnail display/ Display default thumbnail if there is none in db */}
                <div>
                    <Link href={{ pathname: '/videos/' + result['_id'] }}>
                        <div className='rounded-md bg-gradient-to-tr from-transparent via-transparent to-purple-900 p-0.5 -skew-x-2 hover:bg-purple-900'>
                            <div className='rounded-md bg-gradient-to-tr from-transparent via-transparent to-purple-800 p-0.5 hover:bg-purple-800'>
                                <div className='relative flex h-auto w-auto rounded-md bg-gradient-to-tr from-transparent via-transparent to-purple-700  p-0.5 hover:bg-purple-700'>
                                    <Image
                                        layouts='fill'
                                        src={thumb_url}
                                        height='720px'
                                        width='1280px'
                                        className="rounded-md hover:opacity-90"
                                    />
                                    <div className='absolute bottom-0 right-1 -skew-x-3 rounded-md opacity-100'>
                                        <DisplayRating rating={rating} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>
                <a href={'/videos/' + result['_id']} className='pl-1 font-sans font-medium shadow-inset-xl text-[#EFF1F3]'>{result['title']}</a>
            </div>
        </div>
    )
}
// border-x-[#13013A] border-stone-900 to-[#13014A]