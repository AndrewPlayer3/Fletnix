import Results from '../components/Results.js'
import Layout   from "../components/Layout.js"

export async function getServerSideProps(context) {

    let url = "http://localhost:3000/api/video";
    
    if (context.query.text_query) {
        url += "?text_query=" + context.query.text_query;
    }

    const res = await fetch(url, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
        },
    });

    const data = await res.json();

    return {
        props: {
            videos: data
        },
    }
}


export default function Home({ videos }) {

    console.log("Videos: ", videos);

    if (videos.length === 0) {
        return (
            <h1 className="absolute w-2/4 h-2/4 left-1/4 text-2xl text-slate-200 text-center pt-10">Sorry, we couldn't find any videos matching that search.</h1>
        )
    }

    return (
        <>
            <Results result={ videos } classes={'h-auto px-5 mt-4 text-white sm:grid md:grid-cols-2 lg:grid-cols-6'}/>{/* Result is the json file of video data/ */}
        </>
    )
}

Home.layout = Layout