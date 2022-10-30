import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
  RecoilState,
} from 'recoil';

class Shogi extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      squares: setUpBoard(),
      selectedPiece: null,
      isPlayer1: true
    }

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(i) {
    this.setState({ selectedPiece: i }, () => {
      console.log(this.state.selectedPiece);
    });
  }

  render() {
    return (
        <Board 
          onClick={(i) => this.handleClick(i)} 
          squares={this.state.squares}
        />
    );
  }
}

function Square(props) {
  return (
      <button 
        className='item'
        onClick={props.onClick}
      >
        {
          !props.square.isEmpty && setImage(props.square.type, props.square.isPlayer1)
        }
        
      </button>
  );
}

function setImage(type, isPlayer1) {
  return (
    <img
      src={require('../images/' + type + '.png')}
      alt={type}
      style={{transform: `rotate(${!isPlayer1 ? 180 : 0}deg)`}}
      >
    </img>
  )
}

class Board extends React.Component {
  constructor(props) {
    super(props);
  }
    
  renderSquare(i) {
    return (
      <Square
          i={i}
          key={i}
          onClick={() => this.props.onClick(i)}
          squares={this.props.squares}
          square={this.props.squares[i]} 
          />
    );
  }

  render() {
    return (
      <div className="grid-container">
        {
          this.props.squares.map((v, i) => this.renderSquare(i))
        }
      </div>
    );
  }
}

function setUpBoard() {
  const board = Array(81).fill({
    isEmpty: true,
    isSelected: false
  });

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
    isSelected: false
  }
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <RecoilRoot>
    <Shogi />
  </RecoilRoot>
);
  