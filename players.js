import { King, Queen, Bishop, Knight, Rook, Pawn } from "./pieces/index.js"
import { kingSvg, queenSvg, rookSvg, knightSvg, bishopSvg, pawnSvg } from "./utils/icons.js"


export const White = {

    darkRook: new Rook("R", rookSvg, 5, ["a", 1], ["a", 1], "white"),
    lightKnight: new Knight("N", knightSvg, 3, ["b", 1], ["b", 1], "white"),
    darkBishop: new Bishop("B", bishopSvg, 3, ["c", 1], ["c", 1], "white"),
    queen: new Queen("Q", queenSvg, 9, ["d", 1], ["d", 1], "white"),
    king: new King("K", kingSvg, Infinity, ["e", 1], ["e", 1], "white"),
    lightBishop: new Bishop("B", bishopSvg, 3, ["f", 1], ["f", 1], "white"),
    darkKnight: new Knight("N", knightSvg, 3, ["g", 1], ["g", 1], "white"),
    lightRook: new Rook("R", rookSvg, 5, ["h", 1], ["h", 1], "white"),

    pawn1: new Pawn("P", pawnSvg, 1, ["a", 2], ["a", 2], "white", false),
    pawn2: new Pawn("P", pawnSvg, 1, ["b", 2], ["b", 2], "white", false),
    pawn3: new Pawn("P", pawnSvg, 1, ["c", 2], ["c", 2], "white", false),
    pawn4: new Pawn("P", pawnSvg, 1, ["d", 2], ["d", 2], "white", false),
    pawn5: new Pawn("P", pawnSvg, 1, ["e", 2], ["e", 2], "white", false),
    pawn6: new Pawn("P", pawnSvg, 1, ["f", 2], ["f", 2], "white", false),
    pawn7: new Pawn("P", pawnSvg, 1, ["g", 2], ["g", 2], "white", false),
    pawn8: new Pawn("P", pawnSvg, 1, ["h", 2], ["h", 2], "white", false)

}

export const Black = {

    lightRook: new Rook("R", rookSvg, 5, ["a", 8], ["a", 8], "black"),
    darkKnight: new Knight("N", knightSvg, 3, ["b", 8], ["b", 8], "black"),
    lightBishop: new Bishop("B", bishopSvg, 3, ["c", 8], ["c", 8], "black"),
    queen: new Queen("Q", queenSvg, 9, ["d", 8], ["d", 8], "black"),
    king: new King("K", kingSvg, Infinity, ["e", 8], ["e", 8], "black"),
    darkBishop: new Bishop("B", bishopSvg, 3, ["f", 8], ["f", 8], "black"),
    lightKnight: new Knight("N", knightSvg, 3, ["g", 8], ["g", 8], "black"),
    darkRook: new Rook("R", rookSvg, 5, ["h", 8], ["h", 8], "black"),

    pawn1: new Pawn("P", pawnSvg, 1, ["a", 7], ["a", 7], "black", false),
    pawn2: new Pawn("P", pawnSvg, 1, ["b", 7], ["b", 7], "black", false),
    pawn3: new Pawn("P", pawnSvg, 1, ["c", 7], ["c", 7], "black", false),
    pawn4: new Pawn("P", pawnSvg, 1, ["d", 7], ["d", 7], "black", false),
    pawn5: new Pawn("P", pawnSvg, 1, ["e", 7], ["e", 7], "black", false),
    pawn6: new Pawn("P", pawnSvg, 1, ["f", 7], ["f", 7], "black", false),
    pawn7: new Pawn("P", pawnSvg, 1, ["g", 7], ["g", 7], "black", false),
    pawn8: new Pawn("P", pawnSvg, 1, ["h", 7], ["h", 7], "black", false)

}