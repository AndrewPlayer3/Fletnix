import connectDB from '../../../../middleware/mongodb'
import User from '../../../../models/user'
import Video from '../../../../models/video'
import { getSession } from 'next-auth/react'

const handler = async (req, res) => {
    const { vid } = req.query

    if (req.method === 'POST') {
        // Set Video Information | TODO: Only CONTENT_EDITORs should be able to make these requests.

        const session = await getSession({ req })
        const { user } = session
        const { rating } = JSON.parse(req.body)

        try {
            const ratings = await User.findOne(
                {
                    email: user.email,
                    ratings: { $elemMatch: { video_id: vid } },
                },
                'ratings.$'
            )
            const rating_num = Number(rating)

            if (!ratings) {
                await User.findOneAndUpdate(
                    { email: user.email },
                    { $push: { ratings: { video_id: vid, rating: rating } } }
                )
                const rate_video = await Video.findByIdAndUpdate(vid, {
                    $inc: {
                        'analytics.total_rating': rating_num,
                        'analytics.num_ratings': 1,
                    },
                })

                return res
                    .status(200)
                    .send({ rated: 'true', info: rate_video, vid: vid })
            } else {
                const previous_rating = Number(ratings.ratings[0].rating)

                if (previous_rating !== rating_num) {
                    await User.findOneAndUpdate(
                        {
                            email: user.email,
                            ratings: { $elemMatch: { video_id: vid } },
                        },
                        { $set: { 'ratings.$.rating': rating_num } }
                    )
                    await Video.findByIdAndUpdate(vid, {
                        $inc: {
                            'analytics.total_rating':
                                rating_num - previous_rating,
                        },
                    })
                }
                return res.status(200).send({ rated: 'true', vid: vid })
            }
        } catch (error) {
            return res
                .status(500)
                .send({ rated: 'false', vid: vid, error: error.message })
        }
    }
}

export default connectDB(handler)
