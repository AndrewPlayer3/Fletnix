import { useState } from 'react'
import { useRouter } from 'next/router'

export default function SearchBar({ liveSearch }) {
    const router = useRouter()
    const [input, setInput] = useState('')

    function onKeyUp(e) {
        router.push(process.env.HOST_NAME + '/?text_query=' + input)
    }

    function onKeyDown(e) {
        if (e.key === 'Enter') {
            onSubmit(e)
        }
    }

    function onSubmit(e) {
        router.push(process.env.HOST_NAME + '/?text_query=' + input)
    }

    if (liveSearch) {
        return (
            <div className="ml-2 flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex w-full items-center justify-center">
                    <div className="input-group relative flex w-full items-center">
                        <input
                            type="search"
                            value={input}
                            onInput={(e) => setInput(e.target.value)}
                            onKeyUp={onKeyUp}
                            className="search_bar"
                            aria-label="Search"
                            aria-describedby="button-addon2"
                        ></input>
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex w-full items-center justify-center py-10">
                    <div className="input-group relative flex w-full items-center">
                        <input
                            type="search"
                            value={input}
                            onInput={(e) => setInput(e.target.value)}
                            onKeyUp={onKeyDown}
                            className="search_bar"
                            aria-label="Search"
                            aria-describedby="button-addon2"
                        ></input>
                        <button
                            type="submit"
                            onClick={onSubmit}
                            className="search_button"
                            id="button-addon2"
                        >
                            <svg
                                aria-hidden="true"
                                focusable="false"
                                data-prefix="fas"
                                data-icon="search"
                                className="w-4"
                                role="img"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 512 512"
                            >
                                <path
                                    fill="currentColor"
                                    d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"
                                ></path>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}
