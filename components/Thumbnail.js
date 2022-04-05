import Image from 'next/image';
import Link from 'next/link';
import DisplayRating from './DisplayRating'


export default function Thumbnail({result}){
    
    const rating = result['analytics'].num_ratings == 0 ? 0 : result['analytics'].total_rating / result['analytics'].num_ratings;

    return(
        <div className=''>
            <div className='block m-2 cursor-pointer'>
                {/* Each Video Thumbnail display/ Display default thumbnail if there is none in db */}
                <div>
                    <Link href={{pathname: '/video', query: {"id": result['_id']}}}>
                        <div className='relative flex h-auto w-auto rounded-md drop-shadow-2xl hover:border-2 hover:border-opacity-0 hover:border-slate-900'>
                            <Image 
                                layouts='fill'
                                src={result['thumbnail']}
                                height='720px'
                                width='1280px'
                                className="rounded-md"
                            />
                            <div className='absolute bottom-0 right-0 opacity-70'>
                                <DisplayRating rating={ rating } />
                            </div>
                        </div>
                    </Link>
                </div>
                <div className='flex w-full h-auto items-start justify-start'>
                    <div className='flex w-full h-auto items-center justify-start'>
                        <p className='font-sans font-bold text-[#EFF1F3]'>{result['title']}</p>
                    </div>
                </div>
            </div> 
        </div>
    )
}