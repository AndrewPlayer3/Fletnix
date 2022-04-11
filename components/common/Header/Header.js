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
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
                <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;300&display=swap" rel="stylesheet" />
                <link rel="preconnect" href="https://fonts.googleapis.com"/>
                <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
                <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;900&display=swap" rel="stylesheet"/>  
            </Head>
        </div>
    )
}