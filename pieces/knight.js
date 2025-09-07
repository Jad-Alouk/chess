import Piece from "./piece.root.js"
import { convertFileToNum, domQuery, changeFile } from "../utils/logicHelpers.js"


export default class Knight extends Piece {
    constructor(name, avatar, value, startingPos, currentPos, color) {
        super(name, avatar, value, startingPos, currentPos, color)
    }

    checkIfLegal(targetPos) {

        const fromFile = convertFileToNum(this.currentPos[0])
        const toFile = convertFileToNum(targetPos[0])

        const fromRank = this.currentPos[1]
        const toRank = targetPos[1]

        if (Math.abs(toFile - fromFile) === 1) {
            if (Math.abs(toRank - fromRank) === 2) {
                return true
            }
        }

        if (Math.abs(toFile - fromFile) === 2) {
            if (Math.abs(toRank - fromRank) === 1) {
                return true
            }
        }

        return false
    }


    getScope() {

        const scope = {
            piece: this.name,
            origin: this.currentPos,
            vertical: {
                rightUp: null,
                rightDown: null,
                leftUp: null,
                leftDown: null
            },
            horizontal: {
                rightUp: null,
                rightDown: null,
                leftUp: null,
                leftDown: null
            }
        }

        const fromFile = convertFileToNum(this.currentPos[0])
        const fromRank = this.currentPos[1]

        // Vertical direction
        if (fromFile + 1 <= 8) {

            // Right + Up
            if (fromRank + 2 <= 8) {

                if (
                    !domQuery(changeFile(this.currentPos[0], 1, 1), fromRank + 2)
                        .classList.contains(this.color)
                ) {
                    scope.vertical.rightUp = (
                        [changeFile(this.currentPos[0], 1, 1), fromRank + 2]
                    )
                }

            }

            // Right + Down
            if (fromRank - 2 > 0) {

                if (
                    !domQuery(changeFile(this.currentPos[0], 1, 1), fromRank - 2)
                        .classList.contains(this.color)
                ) {
                    scope.vertical.rightDown = (
                        [changeFile(this.currentPos[0], 1, 1), fromRank - 2]
                    )
                }

            }

        }

        // Vertical direction
        if (fromFile - 1 > 0) {

            if (fromRank + 2 <= 8) {

                // Left + Up
                if (
                    !domQuery(changeFile(this.currentPos[0], 1, -1), fromRank + 2)
                        .classList.contains(this.color)
                ) {
                    scope.vertical.leftUp = (
                        [changeFile(this.currentPos[0], 1, -1), fromRank + 2]
                    )
                }

            }

            if (fromRank - 2 > 0) {

                // Left + Down
                if (
                    !domQuery(changeFile(this.currentPos[0], 1, -1), fromRank - 2)
                        .classList.contains(this.color)
                ) {
                    scope.vertical.leftDown = (
                        [changeFile(this.currentPos[0], 1, -1), fromRank - 2]
                    )
                }

            }

        }

        // Horizontal direction
        if (fromFile + 2 <= 8) {

            if (fromRank + 1 <= 8) {

                // Right + Up
                if (
                    !domQuery(changeFile(this.currentPos[0], 2, 1), fromRank + 1)
                        .classList.contains(this.color)
                ) {
                    scope.horizontal.rightUp = (
                        [changeFile(this.currentPos[0], 2, 1), fromRank + 1]
                    )
                }

            }

            // Right + Down
            if (fromRank - 2 > 0) {
                if (
                    !domQuery(changeFile(this.currentPos[0], 2, 1), fromRank - 1)
                        .classList.contains(this.color)
                ) {
                    scope.horizontal.rightDown = (
                        [changeFile(this.currentPos[0], 2, 1), fromRank - 1]
                    )
                }

            }

        }

        // Horizontal direction
        if (fromFile - 2 > 0) {

            // Left + Up
            if (fromRank + 1 <= 8) {
                if (
                    !domQuery(changeFile(this.currentPos[0], 2, -1), fromRank + 1)
                        .classList.contains(this.color)
                ) {
                    scope.horizontal.leftUp = (
                        [changeFile(this.currentPos[0], 2, -1), fromRank + 1]
                    )
                }

            }

            // Left + Down
            if (fromRank - 2 > 0) {
                if (
                    !domQuery(changeFile(this.currentPos[0], 2, -1), fromRank - 1)
                        .classList.contains(this.color)
                ) {
                    scope.horizontal.leftDown = (
                        [changeFile(this.currentPos[0], 2, -1), fromRank - 1]
                    )
                }

            }

        }

        return scope
    }
}