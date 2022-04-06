import mongoose from 'mongoose';
var Schema = mongoose.Schema;

var _metadata = new Schema({
    length: Number,     // Length of video displayed like on YouTube?
    resolution: String  // Native Resolution
});

var _analytics = new Schema({  // NOTE: These all have race conditions.
    total_rating: { // Total sum of 0->5 ratings.
        type: Number,
        default: 0
    },
    num_ratings: {  // Total number of ratings.
        type: Number,
        default: 0
    },
    views: {        // Total number of views (video clicked on AND playback begins).
        type: Number,
        default: 0
    }
    /* Strech Analytics
    avg_watch_time: Number,
    regions: {"Country": num_views},
    ...
    */
});

var video = new Schema({
    title: {
        type: String,
        required: true
    },
    filename: String,
    thumbnail: String,
    created_at: {
        type: Date,
        default: Date.now,
        required: true,
        immutable: true
    },
    description: String,
    tags: [String],
    metadata: _metadata,
    analytics: _analytics
});

mongoose.models = {};

var Video = mongoose.model('Video', video);

export default Video;
