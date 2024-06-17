const express = require('express');
const router = express.Router();
const calendarController = require('../controllers/calendarController');

router.post('/add', calendarController.addEvent);
router.get('/events', calendarController.getEvents);
router.delete('/:id', calendarController.deleteEvent);

module.exports = router;
