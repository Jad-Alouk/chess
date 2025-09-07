import Piece from "./piece.root.js"
import { changeFile, convertFileToNum, domQuery } from "../utils/logicHelpers.js"


export default class Pawn extends Piece {
    constructor(name, avatar, value, startingPos, currentPos, color, hasMovedTwoSquares) {
        super(name, avatar, value, startingPos, currentPos, color)
        this.hasMovedTwoSquares = hasMovedTwoSquares
    }

    checkIfLegal(movePurpose, targetPos, isWhite) {

        const fromFile = convertFileToNum(this.currentPos[0])
        const toFile = convertFileToNum(targetPos[0])

        const fromRank = this.currentPos[1]
        const toRank = targetPos[1]

        if (movePurpose === "toMove") {

            // Can't move sideways
            if (fromFile !== toFile) {
                return false
            }

            if (this.hasMovedTwoSquares) this.hasMovedTwoSquares = false

            // Check if first move
            if (isWhite) {

                if (
                    fromFile === convertFileToNum(this.startingPos[0]) &&
                    fromRank === this.startingPos[1] &&
                    toRank - fromRank === 2 &&
                    !document.querySelector(`[square-id="${this.currentPos[0]}${fromRank + 1}"]`).firstChild
                ) {

                    this.hasMovedTwoSquares = true
                    return true

                }

            } else {

                if (
                    fromFile === convertFileToNum(this.startingPos[0]) &&
                    fromRank === this.startingPos[1] &&
                    fromRank - toRank === 2 &&
                    !document.querySelector(`[square-id="${this.currentPos[0]}${fromRank - 1}"]`).firstChild
                ) {

                    this.hasMovedTwoSquares = true
                    return true

                }

            }


            // Can't move more than one square ahead + Can't move backwards
            if (isWhite) {

                if (toRank - fromRank !== 1) {
                    return false
                }

            } else {

                if (fromRank - toRank !== 1) {
                    return false
                }

            }

        } else if (movePurpose === "toCapture") {

            this.hasMovedTwoSquares = false

            if (isWhite) {

                // Check left and right sides
                if (Math.abs(toFile - fromFile) !== 1) {
                    return false
                }

                if (toRank - fromRank !== 1) {
                    return false
                }

            } else {

                // Check left and right sides
                if (Math.abs(fromFile - toFile) !== 1) {
                    return false
                }

                if (fromRank - toRank !== 1) {
                    return false
                }

            }
        }

        return true
    }

    checkPromotion(rank, color) {

        if (color === "white" && rank === 8) {
            return true
        }

        if (color === "black" && rank === 1) {
            return true
        }

        return false
    }

    checkEnPassant(history, draggedPiece, file, rank, currentPos) {

        if (history.length > 1) {
            const lastMove = history[history.length - 1]
            const enPassantPos = draggedPiece.color === "white"
                ? lastMove.to[1] + 1
                : lastMove.to[1] - 1

            if (lastMove.piece.hasMovedTwoSquares) {
                if (
                    file === lastMove.to[0] &&
                    rank === enPassantPos &&
                    currentPos[1] === lastMove.to[1]
                ) {
                    return true
                }
            }
        }

        return false
    }

    getScope() {

        const scope = {
            piece: this.name,
            origin: this.currentPos,
            leftDiagonal: null,
            rightDiagonal: null
        }

        const fromFile = convertFileToNum(this.currentPos[0])
        const fromRank = this.currentPos[1]

        if (this.color === "white") {

            // Right diagonal
            if (fromFile + 1 <= 8 && fromRank + 1 <= 8) {
                if (domQuery(changeFile(this.currentPos[0], 1, 1), fromRank + 1)) {
                    scope.rightDiagonal = (
                        [changeFile(this.currentPos[0], 1, 1), fromRank + 1]
                    )
                }
            }

            // left diagonal
            if (fromFile - 1 > 0 && fromRank + 1 <= 8) {
                if (domQuery(changeFile(this.currentPos[0], 1, -1), fromRank + 1)) {
                    scope.leftDiagonal = (
                        [changeFile(this.currentPos[0], 1, -1), fromRank + 1]
                    )
                }
            }
        }

        if (this.color === "black") {

            // Right diagonal
            if (fromFile + 1 <= 8 && fromRank - 1 > 0) {
                if (domQuery(changeFile(this.currentPos[0], 1, 1), fromRank - 1)) {
                    scope.rightDiagonal = (
                        [changeFile(this.currentPos[0], 1, 1), fromRank - 1]
                    )
                }
            }

            // Left diagonal
            if (fromFile - 1 > 0 && fromRank - 1 > 0) {
                if (domQuery(changeFile(this.currentPos[0], 1, -1), fromRank - 1)) {
                    scope.leftDiagonal = (
                        [changeFile(this.currentPos[0], 1, -1), fromRank - 1]
                    )
                }
            }
        }

        return scope
    }
}