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
                        <div className='rounded-md bg-gradient-to-tr from-transparent via-transparent to-indigo-800 p-0.5 -skew-x-3'>
                            <div className='rounded-md bg-gradient-to-tr from-transparent via-transparent to-[#13019A] p-0.5'>
                                <div className='relative flex h-auto w-auto rounded-md bg-gradient-to-tr from-transparent via-transparent to-[#13017A]  p-0.5 '>
                                    <Image
                                        layouts='fill'
                                        src={thumb_url}
                                        height='720px'
                                        width='1280px'
                                        className="rounded-md hover:opacity-90"
                                    />
                                    <div className='absolute bottom-0 right-0 opacity-70'>
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
// border-x-[#13013A] border-stone-900