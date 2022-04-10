import Results from '../components/Results.js'
import Layout from "../components/Layout.js"


export async function getServerSideProps(context) {

    var qry = "";
    if (context.query.text_query) qry = "?text_query=" + context.query.text_query;

    const res = await fetch(process.env.HOST_NAME + "/api/videos" + qry, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
        },
    });
    const data = await res.json();

    return {
        props: {
            videos: data.query_results
        },
    }
}


export default function Home({ videos }) {

    if (videos.length === 0) {
        return (
            <h1 className="absolute w-2/4 h-2/4 left-1/4 text-2xl text-slate-200 text-center pt-10">Sorry, we couldn't find any videos matching that search.</h1>
        )
    }
    return (
        <>  {/* Result is the json file of video data/ */}
            <Results result={videos} classes={'h-auto px-5 mt-4 text-white sm:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6'} />
        </>
    )
}

Home.layout = Layout