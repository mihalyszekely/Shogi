import React from "react";
import { useRecoilState } from "recoil";
import { squaresState, selectedState } from "../atom.js";
export default function Square(props) {

  const [squares, setSquares] = useRecoilState(squaresState);
  const [selected, setSelected] = useRecoilState(selectedState);
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
            onClick={//props.onClick
            
            () => {
              setSquares(() => {
                const nextSquares = squares.map((s, i) => {
                  if (i === props.squareID) {
                    console.log(s);
                    return {...s, type: "k"};
                  } else {
                    return s;
                  }
                })
                console.log(nextSquares);
                return nextSquares;
              });
              setSelected(() => {console.log(props.squareID);return props.squareID;})
            }
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