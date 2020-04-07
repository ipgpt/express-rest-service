const uuid = require('uuid');

class Board {
  constructor({ id = uuid(), title = 'Board', columns = [] } = {}) {
    this.id = id;
    this.title = title;
    this.columns = columns.map(column => new Column(column));
  }

  static toResponse(board) {
    const { id, title, columns } = board;
    const responseColumns = columns.map(Column.toResponse);
    return { id, title, columns: responseColumns };
  }
}

class Column {
  constructor({ id = uuid(), title = 'Column', order = 0 } = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
  }

  static toResponse(column) {
    const { id, title, order } = column;
    return { id, title, order };
  }
}

module.exports = { Board, Column };
