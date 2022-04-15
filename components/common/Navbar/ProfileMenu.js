import { Fragment, useState } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { UserIcon } from '@heroicons/react/outline'
import { useSession, signOut } from 'next-auth/react'
import LoginForm from '../../LoginForm'
import queryVideos from '../../../pages/api/helpers/video_query'
import { useRouter } from 'next/router'
import Link from 'next/link'

export default function ProfileMenu() {
    const { data: session, status } = useSession()
    const router = useRouter()
    const isLoggedIn = status === 'authenticated'
    const [login, setLogin] = useState(false)
    const [path, setPath] = useState('')

    let MenuItem

    const role = {
        content_editor: isLoggedIn
            ? session.user.role.content_editor ?? false
            : false,
        content_manager: isLoggedIn
            ? session.user.role.content_manager ?? false
            : false,
    }

    if (router.pathname != path) {
        setPath(router.pathname)
        setLogin(false)
    }

    if (isLoggedIn) {
        MenuItem = (
            <Menu.Items className="user_menu absolute right-0 w-24 origin-top-right py-1">
                <Menu.Item>
                    {({ active }) => (
                        <Link
                            id="profile"
                            href="/profile"
                            className={active ? 'user_menu_options' : ''}
                            passHref
                        >
                            <a className={'profile user_menu_text'}>Profile</a>
                        </Link>
                    )}
                </Menu.Item>
                {role.content_editor || role.content_manager ? (
                    <Menu.Item>
                        {({ active }) => (
                            <Link
                                id="dashboard"
                                href="/dashboard"
                                className={active ? 'user_menu_options' : ''}
                                passHref
                            >
                                <a className={'dashboard user_menu_text'}>
                                    Dashboard
                                </a>
                            </Link>
                        )}
                    </Menu.Item>
                ) : (
                    <></>
                )}
                <Menu.Item>
                    {({ active }) => (
                        <a
                            id="signout"
                            onClick={() => signOut()}
                            className={
                                'signout ' +
                                (active ? 'user_menu_options' : '') +
                                ' user_menu_text'
                            }
                        >
                            Sign out
                        </a>
                    )}
                </Menu.Item>
            </Menu.Items>
        )
    } else {
        MenuItem = (
            <Menu.Items className="user_menu absolute right-0 w-24 origin-top-right py-1">
                <Menu.Item>
                    {({ active }) => (
                        <a
                            id="signin"
                            className={
                                'signin ' +
                                (active ? 'user_menu_options' : '') +
                                ' user_menu_text'
                            }
                            onClick={() => {
                                setLogin(true)
                            }}
                        >
                            Sign in
                        </a>
                    )}
                </Menu.Item>
            </Menu.Items>
        )
    }

    return (
        <>
            {login && !isLoggedIn ? (
                <>
                    <div className="delay-50 absolute top-14 -z-10 m-auto transition">
                        <LoginForm />
                    </div>
                    <div
                        onClick={() => setLogin(false)}
                        className="theme_color absolute top-14 -z-30 h-screen w-screen opacity-70"
                    ></div>
                </>
            ) : (
                <></>
            )}
            <Disclosure as="nav">
                {({ open }) => (
                    <>
                        <div className="relative inset-y-0 right-0 flex items-center sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                            <Menu as="div" className="relative">
                                <div id="menu">
                                    <Menu.Button className="rounded-full py-2 pr-2 text-sm text-[#EFF1F3] hover:scale-105">
                                        <span className="sr-only">
                                            Open user menu
                                        </span>
                                        <UserIcon
                                            className="h-6 w-6"
                                            aria-hidden="true"
                                        />
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
