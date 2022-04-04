export default async function queryVideos(context) {
    let url = "https://fletnix.vercel.app/api/video";

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

    return data;
}