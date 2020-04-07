const router = require('express').Router();
const { Board } = require('./board.model');
const boardsService = require('./board.service');

router.route('/').get(async (req, res) => {
  const boards = await boardsService.getAll();
  res.json(boards.map(Board.toResponse));
});

router.route('/:id').get(async (req, res) => {
  const id = req.params.id;
  const boardById = await boardsService.getBoardById(id);

  if (!boardById.message) {
    res.status(200).json(...[boardById].map(Board.toResponse));
  } else {
    res.status(404).json(boardById);
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
  const updatedBoard = await boardsService.updateBoardById(id, body);

  if (updatedBoard.message !== 'Board not found') {
    res.status(200).json(updatedBoard);
  } else {
    res.status(404).json(updatedBoard);
  }
});

router.route('/:id').delete(async (req, res) => {
  const id = req.params.id;
  const deletedBoard = await boardsService.deleteBoardById(id);

  if (deletedBoard.message !== 'Board not found') {
    res.status(200).json(deletedBoard);
  } else {
    res.status(404).json(deletedBoard);
  }
});

module.exports = router;
