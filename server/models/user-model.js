const {Schema, model} = require('mongoose');

const UserSchema = new Schema({
    email: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    events: [{
        title: String,
        date: String,
        time: String,
        description: String
    }],
})

module.exports = model('User', UserSchema);
