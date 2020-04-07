const router = require('express').Router();
const { Board } = require('./board.model');
const boardsService = require('./board.service');
const tasksService = require('../tasks/task.service');

router.route('/').get(async (req, res) => {
  const boards = await boardsService.getAll();
  res.json(boards.map(Board.toResponse));
});

router.route('/:id').get(async (req, res) => {
  const id = req.params.id;

  try {
    const boardById = await boardsService.getBoardById(id);
    res.json(Board.toResponse(boardById));
  } catch (error) {
    res.status(404).send(error.message);
  }
});

router.route('/').post(async (req, res) => {
  const board = new Board(req.body);

  try {
    await boardsService.addBoard(board);
    res.status(200).json(Board.toResponse(board));
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.route('/:id').put(async (req, res) => {
  const id = req.params.id;
  const body = req.body;

  try {
    await boardsService.updateBoardById(id, body);
    res.status(200).json();
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.route('/:id').delete(async (req, res) => {
  const id = req.params.id;

  try {
    await tasksService.deleteTasksByBoardId(id);
    await boardsService.deleteBoardById(id);
    res.status(200).json();
  } catch (error) {
    res.status(404).send(error.message);
  }
});

module.exports = router;
