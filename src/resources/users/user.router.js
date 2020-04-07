const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');

router.route('/').get(async (req, res) => {
  const users = await usersService.getAll();
  res.json(users.map(User.toResponse));
});

router.route('/:id').get(async (req, res) => {
  const id = req.params.id;
  const userById = await usersService.getUserById(id);

  if (!userById.message) {
    res.status(200).json(...[userById].map(User.toResponse));
  } else {
    res.status(404).json(userById);
  }
});

router.route('/').post(async (req, res) => {
  const user = new User(req.body);

  try {
    await usersService.addUser(user);
    res.status(200).json(User.toResponse(user));
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.route('/:id').put(async (req, res) => {
  const id = req.params.id;
  const body = req.body;
  const updatedUser = await usersService.updateUserById(id, body);

  if (updatedUser.message !== 'User not found') {
    res.status(200).json(updatedUser);
  } else {
    res.status(404).json(updatedUser);
  }
});

router.route('/:id').delete(async (req, res) => {
  const id = req.params.id;
  const deletedUser = await usersService.deleteUserById(id);

  if (deletedUser.message !== 'User not found') {
    // TODO: delete from the task
    res.status(200).json(deletedUser);
  } else {
    res.status(404).json(deletedUser);
  }
});

module.exports = router;
