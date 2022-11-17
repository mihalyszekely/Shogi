import { atom } from "recoil"

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