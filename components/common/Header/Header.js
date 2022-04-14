import Head from 'next/head'
import config from '../../../config/meta.json'

export default function Header() {
  return (
    <div>
      <Head>
        <title key="title">{config.title}</title>
        <meta
          name="keywords"
          content="basic video streaming site in next.js for a project"
        />
        <meta
          name="description"
          content="Fletnix is a basic video streaming type site, which was built using Next.js, MongoDB, and Google Cloud Storage for a project."
        />
      </Head>
    </div>
  )
}
