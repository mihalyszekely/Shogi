export default function setUpBoard() {
    const board = new Array(81).fill().map(obj => ({
      isEmpty: true,
      className: "item"
    }));
  
    for (let i = 18; i < 27; i++) {
      board[i] = createPiece("p", 2);
    }
  
    for (let i = 54; i < 63; i++) {
      board[i] = createPiece("p", 1);
    }
  
    board[0] = createPiece("l", 2);
    board[8] = createPiece("l", 2);
    board[1] = createPiece("n", 2);
    board[7] = createPiece("n", 2);
    board[2] = createPiece("s", 2);
    board[6] = createPiece("s", 2);
    board[3] = createPiece("g", 2);
    board[5] = createPiece("g", 2);
    board[4] = createPiece("k", 2);
    board[10] = createPiece("r", 2);
    board[16] = createPiece("b", 2);
  
    board[72] = createPiece("l", 1);
    board[80] = createPiece("l", 1);
    board[73] = createPiece("n", 1);
    board[79] = createPiece("n", 1);
    board[74] = createPiece("s", 1);
    board[78] = createPiece("s", 1);
    board[75] = createPiece("g", 1);
    board[77] = createPiece("g", 1);
    board[76] = createPiece("k", 1);
    board[70] = createPiece("r", 1);
    board[64] = createPiece("b", 1);
  
    return board;
  }
  
  function createPiece(type, player) {
    return {
      isEmpty: false,
      type: type,
      isPromoted: false,
      isPlayer1: player === 1 ? true : false,
      className: "item"
    }
  }