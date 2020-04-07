let boardsData = [];

const getAll = async () => {
  // TODO: mock implementation. should be replaced during task development
  return boardsData;
};

const addBoard = async board => {
  const boards = await getAll();
  boards.push(board);
};

const getBoardById = async id => {
  const boards = await getAll();
  const foundBoard = boards.find(board => board.id === id);
  return foundBoard ? foundBoard : { message: 'Board not found' };
};

const updateBoardById = async (id, body) => {
  const boards = await getAll();
  const boardById = await getBoardById(id);

  if (!boardById.message) {
    boardsData = boards.map(board => {
      if (board.id === id) {
        return { ...board, ...body };
      }
      return board;
    });
  } else {
    return boardById;
  }
  return { message: 'Board has been updated' };
};

const deleteBoardById = async id => {
  const boards = await getAll();
  const boardById = await getBoardById(id);

  if (!boardById.message) {
    boardsData = boards.filter(board => board.id !== id);
  } else {
    return boardById;
  }
  return { message: 'Board has been deleted' };
};

module.exports = {
  getAll,
  addBoard,
  getBoardById,
  updateBoardById,
  deleteBoardById
};
