import Image from 'next/image';
import Link from 'next/link';
import def from '../public/placeholder.jpeg'
import DisplayRating from './DisplayRating'


export default function Thumbnail({result}){

    const length = new Date(result['metadata'].length * 1000).toISOString().substr(11, 8);

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
                                <DisplayRating rating={result['analytics'].total_rating} />
                            </div>
                        </div>
                    </Link>
                </div>
                <div className='flex w-full h-auto items-start justify-start'>
                    <div className='flex w-full h-auto items-center justify-start'>
                        <p className='font-sans font-bold text-[#EFF1F3]'>{result['title']}</p>
                    </div>
                    {/* <div className='flex w-auto h-auto items-center justify-end'>
                        <p className='w-full font-sans font-bold text-[#C8C8C8]'>{length}</p>
                    </div> */}
                </div>
            </div> 
        </div>
    )
}