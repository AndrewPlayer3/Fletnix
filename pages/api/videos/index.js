import connectDB from '../../../lib/mongodb'
import Video from '../../../models/video'

const handler = async (req, res) => {
    if (req.method === 'POST') {
        // Set Video Information | TODO: Only CONTENT_EDITORs should be able to make these requests.

        const user_res = await fetch(process.env.HOST_NAME + '/api/user', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                cookie: req.headers.cookie,
            },
        })
        const user_data = await user_res.json()

        if (!user_data.role.content_editor) {
            return res
                .status(403)
                .send({ error: 'Only Content Editors can Upload Videos.' })
        }

        const { title, length, resolution, description, tags } = JSON.parse(
            req.body
        )

        try {
            var video = new Video({
                title: title,
                description: description,
                tags: tags,
                metadata: {
                    length: length,
                    resolution: resolution,
                },
                analytics: {
                    total_rating: 0,
                    num_ratings: 0,
                    views: 0,
                },
            })

            var videocreated = await video.save()
            return res.status(200).send({ videocreated: videocreated })
        } catch (error) {
            return res
                .status(500)
                .send({ videocreated: {}, error: error.message })
        }
    } else if (req.method === 'GET') {
        // Retrieve Video Information | TODO: Restrict these requests to any logged-in user.

        var query_results = {}

        try {
            const { text_query, id } = req.query
            if (text_query) {
                query_results = await Video.find({
                    $or: [
                        { title: { $regex: text_query, $options: 'i' } },
                        { tags: text_query },
                    ],
                })
            } else if (id) {
                query_results = await Video.findById(id)
            } else {
                query_results = await Video.find({})
            }

            if (query_results)
                return res.status(200).send({ query_results: query_results })

            return res.status(404).send({ error: 'No Videos Found.' })
        } catch (error) {
            return res
                .status(500)
                .send({ query_results: [], error: error.message })
        }
    } else {
        return res.status(422).send({ error: 'Invalid Request.' })
    }
}

export default connectDB(handler)
