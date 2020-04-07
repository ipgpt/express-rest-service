let usersData = [];

const getAll = async () => {
  // TODO: mock implementation. should be replaced during task development
  return usersData;
};

const addUser = async user => {
  const users = await getAll();
  users.push(user);
};

const getUserById = async id => {
  const users = await getAll();
  const foundUser = users.find(user => user.id === id);
  return foundUser ? foundUser : { message: 'User not found' };
};

const updateUserById = async (id, body) => {
  const users = await getAll();
  const userById = await getUserById(id);

  if (!userById.message) {
    usersData = users.map(user => {
      if (user.id === id) {
        return { ...user, ...body };
      }
      return user;
    });
  } else {
    return userById;
  }
  return { message: 'User has been updated' };
};

const deleteUserById = async id => {
  const users = await getAll();
  const userById = await getUserById(id);

  if (!userById.message) {
    usersData = users.filter(user => user.id !== id);
  } else {
    return userById;
  }
  return { message: 'User has been deleted' };
};

module.exports = {
  getAll,
  addUser,
  getUserById,
  updateUserById,
  deleteUserById
};
