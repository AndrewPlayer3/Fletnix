import connectDB from '../../middleware/mongodb';
import User from '../../models/user';
import Video from '../../models/video';
import { getSession } from 'next-auth/react'

const get_and_set_previous_rating = (ratings, video_id) => {
    let previous_rating = 0;
    ratings.ratings.forEach(( rating ) => {
        if (rating.video_id == video_id) {
            previous_rating = rating.rating;
        }
    });
    return Number(previous_rating);
}

const handler = async (req, res) => {
    if (req.method === 'POST') {   // Set Video Information | TODO: Only CONTENT_EDITORs should be able to make these requests.

        const session = await getSession({ req });
        const { user } = session; 
        const { rating, id } = JSON.parse(req.body);

        try {
            const ratings = await User.findOne({email: user.email, ratings: {"$elemMatch": {video_id: id}}}, 'ratings');
            const rating_num = Number(rating);
            if (!ratings) {
                const user_info = await User.findOneAndUpdate({email: user.email}, {"$push": {ratings: {video_id: id, rating: rating}}});
                const rate_video = await Video.findByIdAndUpdate(id, { $inc: { 'analytics.total_rating': rating_num, 'analytics.total_ratings': 1 } });
                return res.status(200).send({"rated": "true"});
            } else {
                const previous_rating = get_and_set_previous_rating(ratings, id);
                if (previous_rating !== rating_num) {
                    const user_rating = await User.findOneAndUpdate({email: user.email, ratings: {"$elemMatch": {video_id: id } } }, {"$set": { 'ratings.$.rating': rating_num } } );
                    const rate_video = await Video.findByIdAndUpdate(id, { $inc: { 'analytics.total_rating': rating_num - previous_rating } });
                }
                return res.status(200).send({"rated": "true"});
            }
        } catch (error) {
            return res.status(500).send({"rated": "false", error: error.message});
        }
    }
};

export default connectDB(handler);
