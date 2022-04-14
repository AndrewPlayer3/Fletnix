import mongoose from 'mongoose'

var Schema = mongoose.Schema

var _metadata = new Schema({
    length: Number, // These are NOT currently pulled from the
    resolution: String, // metadata of the file.
})

var _analytics = new Schema({
    total_rating: {
        // Total sum of all ratings.
        type: Number,
        default: 0,
    },

    num_ratings: {
        // Total number of ratings.
        type: Number,
        default: 0,
    },

    views: {
        // Total number of views (video's page loaded).
        type: Number,
        default: 0,
    },

    /* Strech Analytics
    avg_watch_time: Number,
    regions: {"Country": num_views},
    ...
    */
})

var video = new Schema({
    title: {
        type: String,
        required: true,
    },

    filename: String, // videos/{_id}.{mimetype}
    thumbnail: String, // thumbnails/{_id}.{mimetype}

    created_at: {
        type: Date,
        default: Date.now,
        required: true,
        immutable: true,
    },

    description: String,

    tags: [String],

    metadata: _metadata,

    analytics: _analytics,
})

mongoose.models = {}

var Video = mongoose.model('Video', video)

export default Video
