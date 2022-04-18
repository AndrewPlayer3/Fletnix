import Image from 'next/image'
import Link from 'next/link'
import DisplayRating from './DisplayRating'

export default function Thumbnail({ result }) {
    const rating =
        result['num_ratings'] == 0
            ? 0
            : result['total_rating'] / result['num_ratings']
    const thumb_url = process.env.GOOGLE_STORAGE + result['thumbnail']

    return (
        <div className="">
            <div className="my-3 mx-0.5 block cursor-pointer transition ease-in-out hover:scale-95 focus:animate-ping">
                {/* Each Video Thumbnail display/ Display default thumbnail if there is none in db */}
                <div>
                    <Link
                        href={{ pathname: '/videos/' + result['_id'] }}
                        passHref
                    >
                        <div className="-skew-x-2 rounded-md bg-gradient-to-tr from-transparent via-transparent to-[#4A019F] p-0.5 hover:bg-[#4A019F]">
                            <div className="rounded-md bg-gradient-to-tr from-transparent via-transparent to-[#4A017F] p-0.5 hover:bg-[#4A017F]">
                                <div className="relative flex h-auto w-auto rounded-md bg-gradient-to-tr from-transparent via-transparent to-[#4A015F] p-0.5 shadow-sm shadow-[#4A017F] hover:bg-[#4A015F] hover:shadow-2xl">
                                    <Image
                                        layouts="fill"
                                        src={thumb_url}
                                        height="720px"
                                        width="1280px"
                                        className="rounded-md hover:opacity-90"
                                        alt={'Thumbnail for ' + result['title']}
                                    />
                                    <div className="absolute bottom-0 right-1 -skew-x-3 rounded-md opacity-100">
                                        <DisplayRating rating={rating} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>
                <Link href={'/videos/' + result['entityId']} passHref>
                    <a className="font-sans shadow-inset-xl pl-1 font-medium text-[#EFF1F3]">
                        {result['title']}
                    </a>
                </Link>
            </div>
        </div>
    )
}
// border-x-[#13013A] border-stone-900 to-[#13014A]
