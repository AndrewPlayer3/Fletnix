import { createVideo } from '../../lib/redis'

export default async function handler(req, res) {

        const {title, description, tags, filename, thumbnail, created_at, total_watchtime, total_rating, num_ratings, views} = req.body;

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
            views: views
        }
    
        const id = await createVideo(video);
        return res.status(200).json({ id })
}