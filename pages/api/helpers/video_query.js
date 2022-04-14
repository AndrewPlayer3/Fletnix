export default async function queryVideos(context) {
    let url = process.env.HOST_NAME + '/api/videos'

    let c = context ?? { query: { title: '' } }

    if (c.query.title) {
        url += '?text_query=' + c.query.title
    }

    const res = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    const data = await res.json()

    return data.query_results
}
