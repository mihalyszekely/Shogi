import React from "react";
export default class Square extends React.Component {
    constructor(props) {
      super(props);
    }
    /*
    shouldComponentUpdate(nextProps, nextState) {
      console.log(this.props.square.className);
      if (this.props.square.className !== nextProps.square.className || this.props.square.isEmpty !== nextProps.square.isEmpty) {
        console.log(this.props.square);
        return true;
  
      }
      return false;
    }
    */
    render() {
      return (
          <button 
            className={this.props.square.className}
            onClick={this.props.onClick}
          >
            {
              !this.props.square.isEmpty && setImage(this.props.square.type, this.props.square.isPlayer1)
            }
            
          </button>
      );
    }
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