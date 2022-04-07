import Head from 'next/head'
import config from '../../../config/meta.json'

export default function Header() {
    return (
        <div>
            <Head>
                <title key="title">
                    {config.title}
                </title>
                <meta name="keywords" content="video streaming site" />
                <link rel="shortcut icon" href="/favicon.png" />
            </Head>
        </div>
    )
}