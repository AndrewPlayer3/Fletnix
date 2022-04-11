import { Fragment, useState } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { UserIcon } from '@heroicons/react/outline'
import { useSession, signOut } from 'next-auth/react'
import LoginForm from '../../LoginForm'
import Results from '../../Results'
import queryVideos from '../../../pages/api/helpers/video_query'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function ProfileMenu() {

    const { data: session, status } = useSession();
    const isLoggedIn = status === "authenticated";
    const [login, setLogin] = useState(false);
    const [videos, setVideos] = useState(false);

    let MenuItem;

    const role = {
        content_editor: isLoggedIn ? (session.user.role.content_editor ?? false) : false,
        content_manager: isLoggedIn ? (session.user.role.content_manager ?? false) : false
    }

    if (isLoggedIn) {
        MenuItem = <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 backdrop-blur-2xl bg-slate-900 bg-opacity-70 border border-opacity-25 border-slate-200 ring-1 ring-black ring-opacity-5 z-50 focus:outline-none">
            <Menu.Item>
                {({ active }) => (
                    <a
                        href='/profile'//{user.viewer ? "profile" : "dashboard"}
                        className={classNames(active ? 'bg-slate-900 bg-opacity-50 border-2 border-opacity-0 border-slate-900' : '', 'block px-4 py-2 text-sm text-slate-200')}
                    >
                        Profile
                    </a>
                )}
            </Menu.Item>
            {role.content_editor || role.content_manager ?
                <Menu.Item>
                    {({ active }) => (
                        <a
                            href='/dashboard'//{user.viewer ? "profile" : "dashboard"}
                            className={classNames(active ? 'bg-slate-900 bg-opacity-50 border-2 border-opacity-0 border-slate-900' : '', 'block px-4 py-2 text-sm text-slate-200')}
                        >
                            Dashboard
                        </a>
                    )}
                </Menu.Item>
                :
                <></>
            }
            <Menu.Item>
                {({ active }) => (
                    <a
                        onClick={() => signOut()}
                        href="/"
                        className={classNames(active ? 'bg-slate-900 bg-opacity-50 border-2 border-opacity-0 border-slate-900' : '', 'block px-4 py-2 text-sm text-slate-200')}
                    >
                        Sign out
                    </a>
                )}
            </Menu.Item>
        </Menu.Items>
    }
    else {
        MenuItem = <Menu.Items className="origin-top-right absolute right-0 mt-4 w-48 rounded-md shadow-lg py-1 backdrop-blur-2xl bg-slate-900 bg-opacity-90 border border-opacity-25 border-slate-200 ring-1 ring-black ring-opacity-5 z-50 focus:outline-none">
            <Menu.Item>
                {({ active }) => (
                    <a
                        className={classNames(active ? 'bg-slate-900 bg-opacity-50 border border-opacity-50 border-slate-900' : '', 'block px-4 py-2 text-sm text-slate-200')}
                        onClick={async () => { setLogin(true); setVideos(await queryVideos()) }}
                    >
                        Sign in
                    </a>
                )}
            </Menu.Item>
        </Menu.Items>
    }

    return (
        <>
            {(videos && login && !isLoggedIn) ?
                <>
                    <div className='absolute transition delay-50 top-14 m-auto z-30'>
                        <LoginForm />
                    </div>
                    <div onClick={() => setLogin(false)} className='absolute top-14 w-screen h-screen bg-slate-900 bg-opacity-95'></div>
                </>
                :
                <></>
            }
            <Disclosure as="nav">
                {({ open }) => (
                    <>
                        <div className="relative inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                            <Menu as="div" className="relative">
                                <div>
                                    <Menu.Button className="text-[#EFF1F3] flex text-sm rounded-full px-2 py-2 hover:ring-1 hover:ring-slate-500">
                                        <span className="sr-only">Open user menu</span>
                                        <UserIcon className="h-6 w-6" aria-hidden="true" />
                                    </Menu.Button>
                                </div>
                                <Transition
                                    as={Fragment}
                                    enter="transition ease-out duration-100"
                                    enterFrom="transform opacity-0 scale-95"
                                    enterTo="transform opacity-100 scale-100"
                                    leave="transition ease-in duration-75"
                                    leaveFrom="transform opacity-100 scale-100"
                                    leaveTo="transform opacity-0 scale-95"
                                >
                                    {MenuItem}
                                </Transition>
                            </Menu>
                        </div>
                    </>
                )}
            </Disclosure>
        </>
    )
}