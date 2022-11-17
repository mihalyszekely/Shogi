import React from "react";
import Square from "./square";
export default class Board extends React.Component {
    constructor(props) {
      super(props);
    }
    /*
    renderSquare(i) {
      return (
        <Square
            key={i}
            onClick={() => this.props.onClick(i)}
            square={this.props.squares[i]}
            />
      );
    }
    */
    render() {
      return (
        <div className="grid-container">
          {
            this.props.squares.map((v, i) => 
              <Square
                key={i}
                squareID={i}
                onClick={() => this.props.onClick(i)}
                square={this.props.squares[i]}
              />
            )
          }
        </div>
      );
    }
  }