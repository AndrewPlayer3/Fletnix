export default async function queryVideos(context) {

    let url = process.env.HOSTNAME + "/api/videos";

    if (context.query.title) {
        url += "?text_query=" + context.query.title;
    }

    const res = await fetch(url, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
        },
    });
    const data = await res.json();

    return data.query_results;
}