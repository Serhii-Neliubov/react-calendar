require('dotenv').config();

const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const mongoose= require('mongoose');
const jwt = require('jsonwebtoken');

const PORT = process.env.PORT || 3000;
const MONGO_ACCESS = process.env.MONGO_ACCESS || '';
const app = express();

app.use(bodyParser.json());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));


const start = async () => {
    try {
        await mongoose.connect(MONGO_ACCESS);

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

app.post('/api/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username });

        if (!user || user.password !== password) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ token });

        console.log('Token generated for user:', user.username);
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/api/add-event', async (req, res) => {
    try {
        const { userId, events } = req.body;

        if (!userId || !events || !Array.isArray(events)) {
            return res.status(400).json({ error: 'Invalid request data' });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        await Event.insertMany(events.map(event => ({ ...event, userId })));

        res.status(201).json({ message: 'Events added successfully' });
    } catch (error) {
        console.error('Error adding events:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


start();