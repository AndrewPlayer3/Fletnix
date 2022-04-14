import Head from 'next/head'
import config from '../../../config/meta.json'

export default function Header() {
    return (
        <div>
            <Head>
                <title key="title">
                    {config.title}
                </title>
            </Head>
        </div>
    )
}