import mongoose from 'mongoose'

const Schema = mongoose.Schema

const user = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },

    password: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
        unique: true,
    },

    /*
     * Viewer          | Can watch videos, browse videos, and rate videos.
     * Content Editor  | Can upload videos and remove videos + Viewer
     * Content Manager | Can view analytics + Viewer
     */
    role: {
        viewer: {
            type: Boolean,
            default: true,
        },
        content_editor: Boolean,
        content_manager: Boolean,
    },

    /*
     * Each time a user rates a video, we log the video and value to avoid
     * user's rating things more than once.
     */
    ratings: [
        {
            video_id: String,
            rating: Number,
        },
    ],
})

mongoose.models = {}

var User = mongoose.model('User', user)

export default User
