const router = require('express').Router();
const Task = require('./task.model');
const tasksService = require('./task.service');

router.route('/').get(async (req, res) => {
  const users = await tasksService.getAll();
  // map task fields
  res.json(users.map(Task.toResponse));
});

module.exports = router;
