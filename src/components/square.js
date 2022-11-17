import React from "react";
import { useRecoilState } from "recoil";
import { squareState } from "../atom.js";
export default function Square(props) {

  //const [square, setSquare] = useRecoilState(squareState(props.squareID));
/*
    const squareAtom = atom({

    })
    */
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
    //render() {
      return (
          <button 
            className={props.square.className}
            onClick={props.onClick
            /*
            () => {
              setSquare(() => ({type: "t"}));
            }*/
            }
          >
            {
              !props.square.isEmpty && setImage(props.square.type, props.square.isPlayer1)
            }
            {/*console.log(square.type)*/}
          </button>
      );
    //}
  }

  function setImage(type, isPlayer1) {
    return (
      <img
        src={require('../../images/' + type + '.png')}
        alt={type}
        style={{transform: `rotate(${!isPlayer1 ? 180 : 0}deg)`}}
        >
      </img>
    )
  }