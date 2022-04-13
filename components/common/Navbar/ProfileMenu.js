import { Fragment, useState } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { UserIcon } from '@heroicons/react/outline'
import { useSession, signOut } from 'next-auth/react'
import LoginForm from '../../LoginForm'
import queryVideos from '../../../pages/api/helpers/video_query'
import { useRouter } from 'next/router'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function ProfileMenu() {

    const { data: session, status } = useSession();
    const router = useRouter();
    const isLoggedIn = status === "authenticated";
    const [login, setLogin] = useState(false);
    const [videos, setVideos] = useState(false);
    const [path, setPath] = useState('');

    let MenuItem;

    const role = {
        content_editor: isLoggedIn ? (session.user.role.content_editor ?? false) : false,
        content_manager: isLoggedIn ? (session.user.role.content_manager ?? false) : false
    }

    if (router.pathname != path ) { 
        setPath(router.pathname);
        setLogin(false);
    }

    if (isLoggedIn) {
        MenuItem = <Menu.Items className="origin-top-right absolute right-0 w-24 py-1 user_menu">
            <Menu.Item>
                {({ active }) => (
                    <a
                        id='profile'
                        href='/profile'//{user.viewer ? "profile" : "dashboard"}
                        className={'profile ' + classNames(active ? 'user_menu_options' : '', 'user_menu_text')}
                    >
                        Profile
                    </a>
                )}
            </Menu.Item>
            {role.content_editor || role.content_manager ?
                <Menu.Item>
                    {({ active }) => (
                        <a
                            id='dashboard'
                            href='/dashboard'//{user.viewer ? "profile" : "dashboard"}
                            className={'dashboard ' + classNames(active ? 'user_menu_options' : '', 'user_menu_text')}
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
                        id='signout'
                        onClick={() => signOut()}
                        href="/"
                        className={'signout ' + classNames(active ? 'user_menu_options' : '', 'user_menu_text')}
                    >
                        Sign out
                    </a>
                )}
            </Menu.Item>
        </Menu.Items>
    }
    else {
        MenuItem = <Menu.Items className="origin-top-right absolute right-0 w-24 py-1 user_menu">
            <Menu.Item>
                {({ active }) => (
                    <a
                        id='signin'
                        className={'signin ' + classNames(active ? 'user_menu_options' : '', 'user_menu_text')}
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
                    <div className='absolute transition delay-50 top-14 m-auto -z-10'>
                        <LoginForm />
                    </div>
                    <div onClick={() => setLogin(false)} className='absolute top-14 w-screen h-screen theme_color opacity-70 -z-30'></div>
                </>
                :
                <></>
            }
            <Disclosure as="nav">
                {({ open }) => (
                    <>
                        <div className="relative inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                            <Menu as="div" className="relative">
                                <div id='menu'>
                                    <Menu.Button className="text-[#EFF1F3] flex text-sm rounded-full px-2 py-2 hover:scale-105">
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