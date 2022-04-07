import connectDB from '../../../middleware/mongodb';
import Video from '../../../models/video';

const handler = async (req, res) => {

    const { vid } = req.query;

    if (req.method === 'GET') {  // Retrieve Video Information | TODO: Restrict these requests to any logged-in user.

        try {
            const query_results = await Video.findById(vid);

            if (query_results) {
                return res.status(200).send({ success: true, video: query_results, id: vid });
            } else {
                return res.status(404).send({ success: false, video: {}, id: vid});
            }

        } catch (error) {
            return res.status(500).send({ success: false, video: {}, id: vid, error: error.message })
        }


    } else if (req.method == 'DELETE') {

        try {
            const user_res = await fetch(process.env.HOSTNAME + '/api/user', {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    cookie: req.headers.cookie,
                },
            });
            const user_data = await user_res.json();

            if (!user_data.role.content_editor) {
                return res.status(403).send({ removed: false, error: 'Only Content Editors can Remove Videos.' });
            }

            const video_removed = await Video.deleteOne({ _id: vid });

            return res.status(200).send({ removed: true, message: 'video removed successfully', output: video_removed });
        } catch (error) {
            return res.status(500).send({ removed: false, id: vid, message: error.message });
        }


    } else if (req.method == 'PUT') {

        try {
            await Video.findByIdAndUpdate(vid, { $inc: { 'analytics.views': 1 } });
            return res.status(200).send({ viewed: true })
        } catch (error) {
            return res.status(500).send({ viewed: false, error: 'Error putting view' });
        }


    } else if (req.method == 'PATCH') {

        const { filename, thumbnail } = JSON.parse(req.body);

        try {
            const add_filenames = await Video.findByIdAndUpdate(vid, { $set: { filename: filename, thumbnail: thumbnail } }, { new: true, upsert: true });
            return res.status(200).send({ success: true, video: add_filenames });
        } catch (error) {
            console.log("Video PATCH Error: ", error.message);
            return res.status(500).send({ success: false, video: { id: vid, filename: filename, thumbnail: thumbnail }, error: error.message })
        }


    } else {

        res.status(422).send('Invalid Request.');
    }
};

export default connectDB(handler);
