const usersRepository = require('./user.memory.repository');

const getAll = () => usersRepository.getAll();
const addUser = user => usersRepository.addUser(user);
const getUserById = id => usersRepository.getUserById(id);
const updateUserById = (id, body) => usersRepository.updateUserById(id, body);
const deleteUserById = id => usersRepository.deleteUserById(id);

module.exports = {
  getAll,
  addUser,
  getUserById,
  updateUserById,
  deleteUserById
};
