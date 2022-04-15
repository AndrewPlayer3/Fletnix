import Link from 'next/link'
import { useState } from 'react'
import SearchBar from './SearchBar'
import ProfileMenu from './ProfileMenu'
import Image from 'next/image'

export default function NavBar({ liveSearch }) {
    const [spin, setSpin] = useState(false)

    return (
        <div as="nav" className="navbar z-40">
            <div className="mx-auto max-w-7xl ">
                <div className="flex h-14 items-center justify-center">
                    <div className="flex items-center justify-start sm:mr-6 sm:items-stretch sm:justify-start">
                        <div
                            onMouseEnter={() => setSpin(true)}
                            onMouseLeave={() => setSpin(false)}
                            className="flex flex-shrink-0 cursor-pointer items-center hover:scale-105"
                        >
                            <Link href="/">
                                <a className="flex h-auto w-auto pl-1 tablet:pl-2 xs:pl-1 xs:pr-2">
                                    <div
                                        className={
                                            'ml-1 flex items-center' +
                                            (spin
                                                ? ' animate-[spin_1s_ease-in-out_1]'
                                                : '')
                                        }
                                    >
                                        <Image
                                            layout="fixed"
                                            height="25px"
                                            width="25px"
                                            className={
                                                'rounded-md bg-stone-100'
                                            }
                                            src={
                                                process.env.HOST_NAME +
                                                '/movie-film.png'
                                            }
                                            alt="Logo"
                                        />
                                    </div>
                                    {/* <div className="ml-1 mr-1 flex items-end justify-center text-2xl text-stone-100 tablet:hidden"> */}
                                    <h1 className="font-sans ml-1 text-2xl font-bold text-stone-100 tablet:hidden">
                                        Fletnix
                                    </h1>
                                    {/* </div> */}
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
