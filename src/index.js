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

const startBoard = [
  'l', 'n', 's', 'g', 'k', 'g', 's', 'n', 'l',
  '', 'r', '', '', '', '', '', 'b', '',
  'p', 'p', 'p', 'p', 'p', 'p', 'p', 'p', 'p', 
  '', '', '', '', '', '', '', '', '',
  '', '', '', '', '', '', '', '', '', 
  '', '', '', '', '', '', '', '', '',
  'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P',
  '', 'B', '', '', '', '', '', 'R', '',
  'L', 'N', 'S', 'G', 'K', 'G', 'S', 'N', 'L',
]

const squareState = Array(81).fill(null).map((val, ind, arr) => arr[ind] = atom({
  key: ind.toString(),
  default: startBoard[ind],
}))

class Shogi extends React.Component {
  constructor(props) {
    super(props);

  }
    render() {
      return (
          <Board />
      );
    }
}

function Square(props) {

  const state = useRecoilValue(squareState[props.i]);
  return (
      <button className='item'>
        {
          state !== '' && 
          <img
            src={require('../images/' + state.toLowerCase() + '.png')}
            alt={state}
            style={{transform: `rotate(${state === state.toLowerCase() ? 180 : 0}deg)`}}
            >
          </img>
        }
        
        {/*{state}*/}
      </button>
  );
}


class Board extends React.Component {
    
  renderSquare(i) {
    return (
      <Square
          i={i}
          key={i} 
          //value={this.props.squares[i][j]}
          //onClick={() => this.props.onClick(i)}  
          />
    );
  }

  render() {
    return (
      <div className="grid-container">
        {
          squareState.map((v, i) => this.renderSquare(i))
        }
      </div>
    );
  }
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <RecoilRoot>
    <Shogi />
  </RecoilRoot>
);
  