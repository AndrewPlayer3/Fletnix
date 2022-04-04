import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const user = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    role: {
        viewer: {  // Everyone should be a viewer, so this isn't strictly necessary.
            type: Boolean,
            default: true
        },
        content_editor: Boolean,
        content_manager: Boolean
    },
    ratings: [{
        video_id: String,
        rating: Number
    }]
});

mongoose.models = {};

var User = mongoose.model('User', user);

export default User;
