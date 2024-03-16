const userService = require('../service/user-service');
const {validationResult} = require('express-validator');
const ApiError = require('../exceptions/api-error');
const User = require('../models/user-model');
class UserController {
    async registration(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest('Validation Error', errors.array()))
            }
            const {email, password} = req.body;
            const userData = await userService.registration(email, password);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.json(userData);
        } catch (e) {
            next(e);
        }
    }

    async login(req, res, next) {
        try {
            const {email, password} = req.body;
            const userData = await userService.login(email, password);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.json(userData);
        } catch (e) {
            next(e);
        }
    }

    async logout(req, res, next) {
        try {
            const {refreshToken} = req.cookies;
            const token = await userService.logout(refreshToken);
            res.clearCookie('refreshToken');
            return res.json(token);
        } catch (e) {
            next(e);
        }
    }

    async refresh(req, res, next) {
        try {
            const {refreshToken} = req.cookies;
            const userData = await userService.refresh(refreshToken);
            console.log(userData);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.json(userData);
        } catch (e) {
            next(e);
        }
    }

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
            const userId = req.params.userId;
            const eventId = req.params.eventId;

            console.log(req.params)

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
}


module.exports = new UserController();
