import connectDB from '../../middleware/mongodb';
import User from '../../models/user';
import Video from '../../models/video';
import { getSession } from 'next-auth/react'

const handler = async (req, res) => {
    if (req.method === 'POST') {   // Set Video Information | TODO: Only CONTENT_EDITORs should be able to make these requests.

        const session = await getSession({ req });
        const { user } = session; 
        const { rating, id } = JSON.parse(req.body);

        try {
            const ratings = await User.findOne({email: user.email, ratings: {"$elemMatch": {video_id: id}}});
            if (!ratings) {
                const user_info = await User.findOneAndUpdate({email: user.email}, {"$push": {ratings: {video_id: id, rating: rating}}});
            } else {
                const like_video = await Video.findByIdAndUpdate(id, { $inc: { 'analytics.total_rating': -rating } });
                const inc_likes  = await Video.findByIdAndUpdate(id, { $inc: { 'analytics.num_ratings' : -1 } });
            }
            try {
                const like_video = await Video.findByIdAndUpdate(id, { $inc: { 'analytics.total_rating': rating } });
                const inc_likes  = await Video.findByIdAndUpdate(id, { $inc: { 'analytics.num_ratings' : 1 } });
                return res.status(200).send({"rated": "true"});
            } catch (error) {
                return res.status(500).send(error.message);
            }

        } catch (error) {
            return res.status(500).send(error.message);
        }
    }
};

export default connectDB(handler);
