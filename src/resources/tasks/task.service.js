const tasksRepository = require('./task.memory.repository');

const getAll = () => tasksRepository.getAll();
const addTask = (boardId, task) => tasksRepository.addTask(boardId, task);
const getTasksByBoardId = id => tasksRepository.getTasksByBoardId(id);
const getTaskByBoardAndTaskId = (id, boardId) =>
  tasksRepository.getTaskByBoardAndTaskId(id, boardId);
const updateTaskById = (id, boardId, body) =>
  tasksRepository.updateTaskById(id, boardId, body);
const deleteTaskById = (id, boardId) =>
  tasksRepository.deleteTaskById(id, boardId);
const deleteTasksByBoardId = boardId =>
  tasksRepository.deleteTasksByBoardId(boardId);
const deleteUserByIdFromTasks = userId =>
  tasksRepository.deleteUserByIdFromTasks(userId);

module.exports = {
  getAll,
  addTask,
  getTasksByBoardId,
  getTaskByBoardAndTaskId,
  updateTaskById,
  deleteTaskById,
  deleteTasksByBoardId,
  deleteUserByIdFromTasks
};
