import { atom } from "recoil"
import setUpBoard from "./components/setupboard"

export const squareState = (id) => atom({
    key: `square${id}`,
    default: {
        isEmpty: false,
        type: "p",
        isPromoted: false,
        isPlayer1: true,
        className: "item"
      }
})

export const squaresState = atom({
  key: "squares",
  default: setUpBoard()
})

export const selectedState = atom({
  key: "selected",
  default: null
})