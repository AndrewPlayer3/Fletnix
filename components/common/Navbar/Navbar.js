import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import SearchBar from './SearchBar'
import ProfileMenu from './ProfileMenu'

export default function NavBar({ liveSearch }) {
    const router = useRouter();
    const [input, setInput] = useState('');
    const [spin, setSpin] = useState(false);

    function onKeyDown(e) {
        router.push(process.env.HOST_NAME + '/?title=' + input);
        if (e.key === 'Enter') {
            onSubmit(e);
        }
    }

    function onSubmit(e) {
        router.push(process.env.HOST_NAME + '/?title=' + input);
    }

    return (
        <div as="nav" className="navbar">
            <div className="max-w-7xl mx-auto ">
                <div className="flex h-14 items-center justify-center">
                    <div className="flex items-center justify-start sm:mr-6 sm:items-stretch sm:justify-start">
                        <div onMouseEnter={() => setSpin(true)} onMouseLeave={() => setSpin(false)} className="flex-shrink-0 flex items-center cursor-pointer hover:scale-105">
                            <Link href='/'>
                                <div className='flex h-auto w-auto'>
                                    <div className='flex ml-1 items-center'>
                                        <img
                                            className={"flex items-end justify-start bg-slate-200 rounded-md lg:block h-6 mx-1" + (spin ? " animate-[spin_1s_ease-in-out_1]" : "")}
                                            src={process.env.HOST_NAME + "/movie-film.png"}
                                            alt="Logo"
                                        />
                                    </div>
                                    <div className='flex items-end justify-center text-2xl text-[#EFF1F3] ml-1 mr-1 tablet:hidden'>
                                        <h1 className="font-sans font-bold">Fletnix</h1>
                                    </div>
                                </div>
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