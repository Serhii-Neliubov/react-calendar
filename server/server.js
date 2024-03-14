require('dotenv').config();

const bodyParser = require('body-parser');
const express = require('express');
const mongoose= require('mongoose');

const PORT = process.env.PORT || 5000;
const app = express();

app.use(bodyParser.json());

const start = async () => {
    try {
        await mongoose.connect('mongodb+srv://user:user@cluster0.qr9a5g3.mongodb.net/');

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.log(error);
    }
}

const userSchema = new mongoose.Schema({
    username: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true}
});

const User = mongoose.model('User', userSchema);

app.post('/api/signup', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const newUser = new User({
            username,
            email,
            password
        });

        await newUser.save();

        res.json(newUser);

        console.log('User saved:', newUser);
    } catch (error) {
        console.error('Error saving user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

start();