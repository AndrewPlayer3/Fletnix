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
                <link rel="preconnect" href="https://fonts.googleapis.com"/>
                <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
                <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,500;0,900;1,100&display=swap" rel="stylesheet"/> 
            </Head>
        </div>
    )
}