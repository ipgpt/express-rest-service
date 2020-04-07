const boardsRepository = require('./board.memory.repository');

const getAll = () => boardsRepository.getAll();
const addBoard = user => boardsRepository.addBoard(user);
const getBoardById = id => boardsRepository.getBoardById(id);
const updateBoardById = (id, body) =>
  boardsRepository.updateBoardById(id, body);
const deleteBoardById = id => boardsRepository.deleteBoardById(id);

module.exports = {
  getAll,
  addBoard,
  getBoardById,
  updateBoardById,
  deleteBoardById
};
