const router = require('express').Router();
const Task = require('./task.model');
const tasksService = require('./task.service');

router.route('/tasks').get(async (req, res) => {
  const tasks = await tasksService.getAll();
  res.json(Task.toResponse(tasks));
});

router.route('/:boardId/tasks').get(async (req, res) => {
  const boardId = req.params.boardId;

  try {
    const tasks = await tasksService.getTasksByBoardId(boardId);
    res.status(200).json(tasks.map(Task.toResponse));
  } catch (error) {
    res.status(404).send(error.message);
  }
});

router.route('/:boardId/tasks/:id').get(async (req, res) => {
  const id = req.params.id;
  const boardId = req.params.boardId;

  try {
    const taskByIds = await tasksService.getTaskByBoardAndTaskId(id, boardId);
    res.status(200).json(Task.toResponse(taskByIds));
  } catch (error) {
    res.status(404).send(error.message);
  }
});

router.route('/:boardId/tasks').post(async (req, res) => {
  const task = new Task(req.body);
  const boardId = req.params.boardId;

  try {
    const newTask = await tasksService.addTask(boardId, task);
    res.status(200).json(Task.toResponse(newTask));
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.route('/:boardId/tasks/:id').put(async (req, res) => {
  const boardId = req.params.boardId;
  const id = req.params.id;
  const body = req.body;

  try {
    await tasksService.updateTaskById(id, boardId, body);
    res.status(200).json();
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.route('/:boardId/tasks/:id').delete(async (req, res) => {
  const boardId = req.params.boardId;
  const id = req.params.id;

  try {
    await tasksService.deleteTaskById(id, boardId);
    res.status(204).json();
  } catch (error) {
    res.status(404).send(error.message);
  }
});

module.exports = router;
