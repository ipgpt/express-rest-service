let tasksData = [];

const getAll = async () => {
  // TODO: mock implementation. should be replaced during task development
  return tasksData;
};

const addTask = async (boardId, task) => {
  const tasks = await getAll();
  const newTask = { ...task, boardId };
  tasks.push(newTask);
  return newTask;
};

const getTasksByBoardId = async id => {
  const tasks = await getAll();
  const foundTasks = tasks.filter(task => task.boardId === id);
  return foundTasks ? foundTasks : { message: 'Tasks not found' };
};

const getTaskByBoardAndTaskId = async (id, boardId) => {
  const tasks = await getAll();
  const foundTask = tasks.find(
    task => task.boardId === boardId && task.id === id
  );
  return foundTask ? foundTask : { message: 'Task not found' };
};

const updateTaskById = async (id, boardId, body) => {
  const tasks = await getAll();
  const taskById = await getTaskByBoardAndTaskId(id, boardId);

  if (!taskById.message) {
    tasksData = tasks.map(task => {
      if (task.id === id) {
        return { ...task, ...body };
      }
      return task;
    });
  } else {
    return taskById;
  }
  return { message: 'Task has been updated' };
};

const deleteTaskById = async (id, boardId) => {
  const tasks = await getAll();
  const taskById = await getTaskByBoardAndTaskId(id, boardId);
  if (!taskById.message) {
    tasksData = tasks.filter(task => task.id !== id);
  } else {
    return taskById;
  }
  return { message: 'Task has been deleted' };
};

const deleteTasksByBoardId = async boardId => {
  const tasks = await getAll();
  const foundTasks = await getTasksByBoardId(boardId);
  if (!foundTasks.message) {
    tasksData = tasks.filter(task => task.boardId !== boardId);
  } else {
    return foundTasks;
  }
};

const deleteUserByIdFromTasks = async userId => {
  const tasks = await getAll();
  const tasksByUserId = await tasks.find(task => task.userId === userId);

  if (tasksByUserId) {
    tasksData = tasks.map(task => {
      if (task.userId === userId) {
        return { ...task, userId: null };
      }
      return task;
    });
  } else {
    return { message: 'User has not been assigned to the tasks' };
  }
  return { message: 'User has been deleted from the tasks' };
};

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
