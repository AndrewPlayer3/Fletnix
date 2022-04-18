import { createVideo, getAllVideos, getVideoById, getVideoBySearch } from '../../lib/redis'
import { connect } from '../../lib/redis'

export default async function handler(req, res) {
    
    await connect();

    if (req.method == 'POST') {
        const {
            title,
            description,
            tags,
            filename,
            thumbnail,
            created_at,
            total_watchtime,
            total_rating,
            num_ratings,
            views,
        } = req.body

        const video = {
            title: title,
            description: description,
            tags: tags,
            filename: filename,
            thumbnail: thumbnail,
            created_at: created_at,
            total_watchtime: total_watchtime,
            total_rating: total_rating,
            num_ratings: num_ratings,
            views: views,
        }

        const id = await createVideo(video)
        return res.status(200).json({ id })
    } else if (req.method == 'GET') {
        const { id, search } = req.query
        let videos;
        if (id) {
            videos = await getVideoById(id);
        } else if (search) {
            videos = await getVideoBySearch(search);
        } else {
            videos = await getAllVideos();
        }
        if (videos) {
            return res.status(200).send({ success: true, videos: videos })
        } else {
            return res.status(404).send({ success: false, videos: [], error: "No videos found." })
        }
    } else {
        return res.status(401).send({ success: false, error: 'bad request' })
    }
}
