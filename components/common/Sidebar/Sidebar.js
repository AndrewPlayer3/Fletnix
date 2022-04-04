import React from 'react';
import {withRouter} from "next/router";
import Link from "next/link";

function NavLink({svg, label = "Label", href = "#", router}) {
    const {pathname} = router;

    return (
        <Link href={href}>
            <a className={"mt-4 flex items-center px-3 py-2 rounded hover:border hover:border-slate-200 hover:border-opactiy-50 focus:border focus:border-slate-200 focus:border-opacity-90" + (pathname === href ? "bg-blue-500" : "")}>
                {svg}
                <span> {label} </span>
            </a>
        </Link>
    );
}

const LinkAction = withRouter(NavLink);

function Sidebar() {
    return <nav
        className="flex flex-col text-slate-200 h-auto w-64 flex-shrink-0 py-4 px-1"
    >
        <LinkAction href="/dashboard"
                    svg={<svg className="fill-current text-slate-200 w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24">
                        <path className="heroicon-ui"
                              d="M13 20v-5h-2v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-7.59l-.3.3a1 1 0 11-1.4-1.42l9-9a1 1 0 011.4 0l9 9a1 1 0 01-1.4 1.42l-.3-.3V20a2 2 0 01-2 2h-3a2 2 0 01-2-2zm5 0v-9.59l-6-6-6 6V20h3v-5c0-1.1.9-2 2-2h2a2 2 0 012 2v5h3z"/>
                    </svg>} label="Profile"/>

        <LinkAction href="/dashboard/content"
                    svg={<svg className="fill-current text-slate-200 w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" 
                              viewBox="0 0 24 24">
                    <path className="heroicon-ui" 
                            d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>} label="Content"/>
                    

        {/* <LinkAction href="/dashboard/analytics"
                    svg={<svg className="fill-current text-slate-200 w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24">
                        <path className="heroicon-ui"
                              d="M20 22H4a2 2 0 01-2-2v-8c0-1.1.9-2 2-2h4V8c0-1.1.9-2 2-2h4V4c0-1.1.9-2 2-2h4a2 2 0 012 2v16a2 2 0 01-2 2zM14 8h-4v12h4V8zm-6 4H4v8h4v-8zm8-8v16h4V4h-4z"/>
                    </svg>} label="Analytics"/>

        <LinkAction href="/dashboard/settings"
                    svg={<svg className="fill-current text-slate-200 w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24">
                        <path className="heroicon-ui"
                              d="M9 4.58V4c0-1.1.9-2 2-2h2a2 2 0 012 2v.58a8 8 0 011.92 1.11l.5-.29a2 2 0 012.74.73l1 1.74a2 2 0 01-.73 2.73l-.5.29a8.06 8.06 0 010 2.22l.5.3a2 2 0 01.73 2.72l-1 1.74a2 2 0 01-2.73.73l-.5-.3A8 8 0 0115 19.43V20a2 2 0 01-2 2h-2a2 2 0 01-2-2v-.58a8 8 0 01-1.92-1.11l-.5.29a2 2 0 01-2.74-.73l-1-1.74a2 2 0 01.73-2.73l.5-.29a8.06 8.06 0 010-2.22l-.5-.3a2 2 0 01-.73-2.72l1-1.74a2 2 0 012.73-.73l.5.3A8 8 0 019 4.57zM7.88 7.64l-.54.51-1.77-1.02-1 1.74 1.76 1.01-.17.73a6.02 6.02 0 000 2.78l.17.73-1.76 1.01 1 1.74 1.77-1.02.54.51a6 6 0 002.4 1.4l.72.2V20h2v-2.04l.71-.2a6 6 0 002.41-1.4l.54-.51 1.77 1.02 1-1.74-1.76-1.01.17-.73a6.02 6.02 0 000-2.78l-.17-.73 1.76-1.01-1-1.74-1.77 1.02-.54-.51a6 6 0 00-2.4-1.4l-.72-.2V4h-2v2.04l-.71.2a6 6 0 00-2.41 1.4zM12 16a4 4 0 110-8 4 4 0 010 8zm0-2a2 2 0 100-4 2 2 0 000 4z"/>
                    </svg>} label="Settings"/>

        <LinkAction href="/dashboard/support"
                    svg={<svg className="fill-current text-slate-200 w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24">
                        <path className="heroicon-ui"
                              d="M12 22a10 10 0 110-20 10 10 0 010 20zm0-2a8 8 0 100-16 8 8 0 000 16zM10.59 8.59a1 1 0 11-1.42-1.42 4 4 0 115.66 5.66l-2.12 2.12a1 1 0 11-1.42-1.42l2.12-2.12A2 2 0 0010.6 8.6zM12 18a1 1 0 110-2 1 1 0 010 2z"/>
                    </svg>} label="Support"/> */}

    </nav>;
}

export default Sidebar;