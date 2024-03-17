const Router = require('express').Router;
const userController = require('../controllers/user-controller');
const eventController = require('../controllers/event-controller');
const router = new Router();
const {body} = require('express-validator');

router.post('/registration',
    body('email').isEmail(),
    body('password').isLength({min: 3, max: 32}),
    userController.registration
);
router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.get('/refresh', userController.refresh);
router.post('/events', eventController.addEvent);
router.delete('/events/:eventId', eventController.deleteEvent);
router.put('/events/:eventId', eventController.updateEvent);

module.exports = router
