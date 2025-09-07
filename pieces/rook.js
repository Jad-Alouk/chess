import Piece from "./piece.root.js"
import { changeFile, convertFileToNum, domQuery } from "../utils/logicHelpers.js"


export default class Rook extends Piece {
    constructor(name, avatar, value, startingPos, currentPos, color) {
        super(name, avatar, value, startingPos, currentPos, color)
    }

    checkIfLegal(targetPos) {

        const fromFile = convertFileToNum(this.currentPos[0])
        const toFile = convertFileToNum(targetPos[0])

        const fromRank = this.currentPos[1]
        const toRank = targetPos[1]

        // Change in either file or rank === straight move
        if (Math.abs(toFile - fromFile) > 0 && Math.abs(toRank - fromRank) > 0) {
            return false
        }

        // Check if there are pieces between the start file and target file
        if (Math.abs(toFile - fromFile) > 1) {
            let x = toFile - fromFile > 0 ? 1 : -1

            for (let i = 0; i < Math.abs(toFile - fromFile) - 1; i++) {
                if (document.querySelector(
                    `[
                        square-id="${String.fromCharCode(this.currentPos[0].charCodeAt(0) + ((i + 1) * x))}${fromRank}"
                    ]`
                ).firstChild) {
                    return false
                }
            }
        }

        // Check if there are pieces between the start rank and target rank
        if (Math.abs(toRank - fromRank) > 1) {
            let y = toRank - fromRank > 0 ? 1 : -1

            for (let i = 0; i < Math.abs(toRank - fromRank) - 1; i++) {
                if (document.querySelector(
                    `[
                        square-id="${this.currentPos[0]}${fromRank + ((i + 1) * y)}"
                    ]`
                ).firstChild) {
                    return false
                }
            }
        }

        return true
    }


    getScope() {

        const scope = {
            piece: this.name,
            origin: this.currentPos,
            up: [],
            down: [],
            left: [],
            right: []
        }

        const fromFile = convertFileToNum(this.currentPos[0])
        const fromRank = this.currentPos[1]

        // Up
        for (let i = 1; i < 8; i++) {

            if (fromRank + i <= 8) {

                if (domQuery(this.currentPos[0], fromRank + i).classList.contains(this.color)) {
                    break
                }

                if (domQuery(this.currentPos[0], fromRank + i).firstChild) {
                    scope.up.push(
                        [this.currentPos[0], fromRank + i]
                    )
                    break
                }

                scope.up.push(
                    [this.currentPos[0], fromRank + i]
                )

            }

        }

        // Down
        for (let i = 1; i < 8; i++) {

            if (fromRank - i > 0) {

                if (domQuery(this.currentPos[0], fromRank - i).classList.contains(this.color)) {
                    break
                }

                if (domQuery(this.currentPos[0], fromRank - i).firstChild) {
                    scope.down.push(
                        [this.currentPos[0], fromRank - i]
                    )
                    break
                }

                scope.down.push(
                    [this.currentPos[0], fromRank - i]
                )

            }

        }

        // Right
        for (let i = 1; i < 8; i++) {

            if (fromFile + i <= 8) {

                if (
                    domQuery(changeFile(this.currentPos[0], i, 1), fromRank)
                        .classList.contains(this.color)
                ) {
                    break
                }

                if (
                    domQuery(changeFile(this.currentPos[0], i, 1), fromRank)
                        .firstChild
                ) {
                    scope.right.push(
                        [changeFile(this.currentPos[0], i, 1), fromRank]
                    )
                    break
                }

                scope.right.push(
                    [changeFile(this.currentPos[0], i, 1), fromRank]
                )

            }

        }

        // Left
        for (let i = 1; i < 8; i++) {

            if (fromFile - i > 0) {

                if (
                    domQuery(changeFile(this.currentPos[0], i, -1), fromRank)
                        .classList.contains(this.color)
                ) {
                    break
                }

                if (
                    domQuery(changeFile(this.currentPos[0], i, -1), fromRank)
                        .firstChild
                ) {
                    scope.left.push(
                        [changeFile(this.currentPos[0], i, -1), fromRank]
                    )
                    break
                }

                scope.left.push(
                    [changeFile(this.currentPos[0], i, -1), fromRank]
                )

            }

        }

        return scope
    }
}