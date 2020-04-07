const usersRepo = require('./user.memory.repository');

const getAll = () => usersRepo.getAll();
const addUser = user => usersRepo.addUser(user);
const getUserById = id => usersRepo.getUserById(id);
const updateUserById = (id, body) => usersRepo.updateUserById(id, body);
const deleteUserById = id => usersRepo.deleteUserById(id);

module.exports = {
  getAll,
  addUser,
  getUserById,
  updateUserById,
  deleteUserById
};
