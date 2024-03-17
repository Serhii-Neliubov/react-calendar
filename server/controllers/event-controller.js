const User = require('../models/user-model');
const tokenService = require('../service/token-service');

class EventController {
    async addEvent(req, res) {
        const { title, date, time, description } = req.body.eventData;
        try {
            console.log(req.body);
            const user = await User.findById(req.body.userId);
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            user.events.push({ title, date, time, description });
            await user.save();
            res.status(201).json({ message: "Event added successfully" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal server error" });
        }
    }

    async deleteEvent(req, res) {

        try {
            const sessionUser = tokenService.validateAccessToken((req.headers.authorization).replace('Bearer ', ''));
            const userId = sessionUser.id;

            const eventId = req.params.eventId;

            const user = await User.findById(userId);
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            const eventIndex = user.events.findIndex(event => event._id.toString() === eventId);
            if (eventIndex === -1) {
                return res.status(404).json({ message: "Event not found" });
            }

            user.events.splice(eventIndex, 1);

            await user.save();

            return res.status(200).json({ message: "Event deleted successfully", events: user.events });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }

    async updateEvent(req, res) {
        try {
            const { title, date, time, description } = req.body.eventData;
            const eventId = req.params.eventId;

            const sessionUser = tokenService.validateAccessToken((req.headers.authorization).replace('Bearer ', ''));
            const userId = sessionUser.id;

            const user = await User.findById(userId);
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            const event = user.events.find(event => event._id.toString() === eventId);
            if (!event) {
                return res.status(404).json({ message: "Event not found" });
            }

            event.title = title;
            event.date = date;
            event.time = time;
            event.description = description;

            await user.save();

            return res.status(200).json({ message: "Event updated successfully", event });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }

}


module.exports = new EventController();
