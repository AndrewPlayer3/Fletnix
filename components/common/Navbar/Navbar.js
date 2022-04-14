import Link from 'next/link'
import { useState } from 'react'
import SearchBar from './SearchBar'
import ProfileMenu from './ProfileMenu'
import Image from 'next/image'

export default function NavBar({ liveSearch }) {
    const [spin, setSpin] = useState(false);

    return (
        <div as="nav" className="z-40 navbar">
            <div className="max-w-7xl mx-auto ">
                <div className="flex h-14 items-center justify-center">
                    <div className="flex items-center justify-start sm:mr-6 sm:items-stretch sm:justify-start">
                        <div onMouseEnter={() => setSpin(true)} onMouseLeave={() => setSpin(false)} className="flex-shrink-0 flex items-center cursor-pointer hover:scale-105">
                            <Link href='/'>
                                <a className='flex h-auto w-auto'>
                                    <div className={'flex ml-1 items-center'+ (spin ? " animate-[spin_1s_ease-in-out_1]" : "")}>
                                        <Image
                                            layout='fixed'
                                            height='25px'
                                            width='25px'
                                            className={"bg-stone-100 rounded-md"}
                                            src={process.env.HOST_NAME + "/movie-film.png"}
                                            alt="Logo"
                                        />
                                    </div>
                                    <div className='flex items-end justify-center text-2xl text-stone-100 ml-1 mr-1 tablet:hidden'>
                                        <h1 className="font-sans font-bold">Fletnix</h1>
                                    </div>
                                </a>
                            </Link>
                        </div>
                    </div>
                    {/* Search Bar and Button */}
                    <SearchBar liveSearch={liveSearch} />
                    <ProfileMenu />
                </div>
            </div>
        </div>
    )
}