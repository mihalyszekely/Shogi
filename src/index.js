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
    this.setMoveOptions = this.setMoveOptions.bind(this);
    this.movePiece = this.movePiece.bind(this);
    this.resetSelection = this.resetSelection.bind(this);
    this.getPossibleMoves = this.getPossibleMoves.bind(this);
  }

  handleClick(i) {
    // 

    if (this.state.selectedPiece === null && this.state.squares[i].isPlayer1 === this.state.isPlayer1) {
      //console.log(this.getPossibleMoves(i));
      this.setMoveOptions(i);
    } else this.movePiece(i);
    /*
    if (this.state.squares[i].isPlayer1 === this.state.isPlayer1) {
      this.movePiece(i);
    } else {
      this.resetSelection();
    }*/
    /*
    this.setState({ selectedPiece: i }, () => {
      //this.moveOptions(i);
      console.log(this.state);
      console.log(this.state.squares[this.state.selectedPiece]);
      this.moveOptions(i);
    });
    */
  }

  getPossibleMoves(i) {
    const moves = [];
    let arr = [];
    const player = this.state.isPlayer1 === true ? 1 : -1;
    const localSquares = this.state.squares.splice();
    let num = 0;
    const diff = Math.floor(i / 9);
    //console.log(diff);
    switch(this.state.squares[i].type) {
      case 'k':
        arr = [-10, -9, -8, -1, 1, 8, 9, 10];
        arr.map((val, ind) => {
          num = i + (val * player);
          //console.log(Math.floor(num / 9) - (Math.round(val / 9) * player));
          this.state.squares[num] 
          && (this.state.squares[num].isEmpty 
            || this.state.squares[num].isPlayer1 === !this.state.squares[i].isPlayer1) 
          && diff === Math.floor(num / 9) - (Math.round(val / 9) * player)
          && moves.push(num);
        })
        break;
      case 'r':
        arr = [[-9, -18, -27, -36, -45, -54, -63, -72],
              [9, 18, 27, 36, 45, 54, 63, 72],
              [1, 2, 3, 4, 5, 6, 7, 8],
              [-1, -2, -3, -4, -5, -6, -7, -8]];
        for (let k = 0; k < 4; k++) {
          for (let l = 0; l < 8; l++) {
            num = i + arr[k][l];
            if ((k === 2 || k === 3) && diff !== Math.floor((num) / 9)) break;
            if (num < 0 || num > 81) break;
            if (this.state.squares[num].isEmpty) {
              moves.push(num);
            } else if (this.state.squares[num].isPlayer1 === !this.state.isPlayer1) {
              moves.push(num);
              break;
            } else break;
          }
        }
        break;
      case 'b':
        arr = [[-8, -16, -24, -32, -40, -48, -56, -64],
              [8, 16, 24, 32, 40, 48, 56, 64],
              [10, 20, 30, 40, 50, 60, 70, 80],
              [-10, -20, -30, -40, -50, -60, -70, -80]];
        for (let k = 0; k < 4; k++) {
          for (let l = 0; l < 8; l++) {
            num = i + arr[k][l];
            if (Math.abs(diff - Math.floor((num) / 9)) !== l + 1) break;
            if (num < 0 || num > 81) break;
            if (this.state.squares[num].isEmpty) {
              moves.push(num);
            } else if (this.state.squares[num].isPlayer1 === !this.state.isPlayer1) {
              moves.push(num);
              break;
            } else break;
          }
        }
        break;
      case 'g':
        arr = [-10, -9, -8, -1, 1, 9];
        arr.map((val, ind) => {
          num = i + (val * player);
          //console.log(Math.floor(num / 9) - (Math.round(val / 9) * player));
          this.state.squares[num] 
          && (this.state.squares[num].isEmpty 
            || this.state.squares[num].isPlayer1 === !this.state.squares[i].isPlayer1) 
          && diff === Math.floor(num / 9) - (Math.round(val / 9) * player)
          && moves.push(num);
        })
        break;
      case 's':
        arr = [-10, -9, -8, 8, 10];
        arr.map((val, ind) => {
          num = i + (val * player);
          //console.log(Math.floor(num / 9) - (Math.round(val / 9) * player));
          this.state.squares[num] 
          && (this.state.squares[num].isEmpty 
            || this.state.squares[num].isPlayer1 === !this.state.squares[i].isPlayer1) 
          && diff === Math.floor(num / 9) - (Math.round(val / 9) * player)
          && moves.push(num);
        })
        break;
      case 'n':
        num = i - (17 * player);
        //console.log(diff === Math.floor(num / 9) + (2 * player));
        this.state.squares[num] 
          && (this.state.squares[num].isEmpty 
            || this.state.squares[num].isPlayer1 === !this.state.squares[i].isPlayer1) 
          && diff === Math.floor(num / 9) + (2 * player)
          && moves.push(num);

        num = i - (19 * player);
        this.state.squares[num] 
          && (this.state.squares[num].isEmpty 
            || this.state.squares[num].isPlayer1 === !this.state.squares[i].isPlayer1) 
          && diff === Math.floor(num / 9) + (2 * player)
          && moves.push(num);
        break;

      case 'l':
        let j = 1;
        num = i - j * 9 * player;
        while (num >= 0 && num <= 80) {
          if (this.state.squares[num].isEmpty) {
            moves.push(num);
          } else if (this.state.squares[num].isPlayer1 === !this.state.isPlayer1) {
            moves.push(num);
            break;
          } else break;
          j++;
          num = i - j * 9 * player;
        }
        break;

      case 'p':
        num = i - (9 * player);
        this.state.squares[num] 
          && (this.state.squares[num].isEmpty 
            || this.state.squares[num].isPlayer1 === !this.state.squares[i].isPlayer1) 
          && moves.push(num);
        break;
    }
    console.log(moves);
    return moves.filter((num) => num >= 0 && num <= 80);
  }

  resetSelection() {
    const localSquares = this.state.squares.slice();
    this.setState((prevState) => {
      localSquares.map((obj, ind) => {
        if (obj.className === "itemSelected") localSquares[ind].className = "item";
      })
      return {
        squares: localSquares,
        selectedPiece: null
      }
    })
  }

  movePiece(j) {
    const localSquares = this.state.squares.slice();
    if (this.state.squares[j].className === "itemSelected") {
      this.setState((prevState) => {
        localSquares[j] = prevState.squares[prevState.selectedPiece];
        localSquares[prevState.selectedPiece] = {
          isEmpty: true,
          className: "item"
        }
        localSquares.map((obj, ind) => {
          if (obj.className === "itemSelected") localSquares[ind].className = "item";
        })
        return {
          squares: localSquares,
          selectedPiece: null,
          isPlayer1: !prevState.isPlayer1
        }
      })
    } else {
      this.setState((prevState) => {
        localSquares.map((obj, ind) => {
          if (obj.className === "itemSelected") localSquares[ind].className = "item";
        })
        /*localSquares[j] = prevState.squares[prevState.selectedPiece];
        localSquares[prevState.selectedPiece] = {
          isEmpty: true,
          className: "item"
        }*/
        return {
          squares: localSquares,
          selectedPiece: null
        }
      })
    }
  }

  setMoveOptions(j) {
    const options = this.getPossibleMoves(j);
    const localSquares = this.state.squares.slice();
    /*
    //console.log(this.state);
    const options = [];
    const localSquares = this.state.squares.slice();
    //const lSquare = this.state.squares.slice(this.state.selectedPiece, this.state.selectedPiece + 1);
    //console.log(this.state.selectedPiece);
    //console.log(...lSquare);
    const player = this.state.squares[j].isPlayer1 ? 1 : -1;
    switch(localSquares[j].type) {
      case "p":
        if ((j > 8 && player === 1) || (j < 72 && player === -1)) {
          if (this.state.squares[j-(9 * player)].isEmpty || (this.state.squares[j-(9 * player)].isPlayer1 !== this.state.squares[j].isPlayer1)) {
            options.push(j-(9 * player));
          }
        }
        break;
        
      default:
        return ;
        console.log(this.state.squares[j].type)
    }
    
    */
    console.log(options);
    for (let i = 0; i < options.length; i++) {
      //lSquare = this.state.squares.slice(options[i], options[i] + 1);
      //localSquares[] = 
      localSquares[options[i]].className = "itemSelected";
    }

    this.setState((prevState) => ({
      squares: localSquares,
      selectedPiece: j
    }), () => {console.log(this.state)})

    /*
    this.setState((prevState) => {
      const updated = prevState.squares.slice();
      updated[prevState.selectedPiece].isSelected = true;
      console.log(updated);
      return ({
        squares: updated
      })
      
    }, () => {console.log(this.state)})
    */
  }

  render() {
    return (
      <div>
        <h1>
          Player {this.state.isPlayer1 ? 1 : 2}
        </h1>
        <Board 
          onClick={(i) => this.handleClick(i)} 
          squares={this.state.squares}
        />
      </div>
        
    );
  }
}

function Square(props) {
  return (
      <button 
        className={props.square.className}
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

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <RecoilRoot>
    <Shogi />
  </RecoilRoot>
);
  