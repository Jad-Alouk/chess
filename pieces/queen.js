import Piece from "./piece.root.js"
import { changeFile, convertFileToNum, domQuery } from "../utils/logicHelpers.js"


export default class Queen extends Piece {
    constructor(name, avatar, value, startingPos, currentPos, color) {
        super(name, avatar, value, startingPos, currentPos, color)
    }

    checkIfLegal(targetPos) {

        const fromFile = convertFileToNum(this.currentPos[0])
        const toFile = convertFileToNum(targetPos[0])

        const fromRank = this.currentPos[1]
        const toRank = targetPos[1]

        // Change in file === Change in rank ? diagonal move : not diagonal move
        if (Math.abs(toFile - fromFile) === Math.abs(toRank - fromRank)) {

            // Edge case: 1 square moves have no pieces in between the start and target squares
            if (Math.abs(toFile - fromFile) === 1) {
                return true
            }


            let x = (toFile - fromFile) > 0 ? 1 : -1 // Change in file sign
            let y = (toRank - fromRank) > 0 ? 1 : -1 // Change in rank sign

            for (let i = 0; i < Math.abs(toFile - fromFile) - 1; i++) {

                // The zeroth position is the start
                // We add/subtract one from the file/rank of the starting position
                // We stop one square before the target 
                // This gives us all the pieces in between the start and the target
                // We determine if we should add or subctract using the sign in the x, y variables
                // If any square that has the x, y coordinates has a child return false

                if (
                    document.querySelector(
                        `[
                            square-id="${String.fromCharCode(
                            (this.currentPos[0].charCodeAt(0)) + ((i + 1) * x))}${fromRank + ((i + 1) * y)}"
                        ]`
                    ).firstChild
                ) {
                    return false
                }
            }

            return true
        }

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
            right: [],
            rightUp: [],
            rightDown: [],
            leftUp: [],
            leftDown: []
        }

        const fromFile = convertFileToNum(this.currentPos[0])
        const fromRank = this.currentPos[1]

        // +File && +Rank
        for (let i = 1; i < 8; i++) {

            if (fromFile + i <= 8 && fromRank + i <= 8) {

                if (
                    domQuery(changeFile(this.currentPos[0], i, 1), fromRank + i)
                        .classList.contains(this.color)
                ) {
                    break
                }

                if (
                    domQuery(changeFile(this.currentPos[0], i, 1), fromRank + i)
                        .firstChild
                ) {
                    scope.rightUp.push(
                        [changeFile(this.currentPos[0], i, 1), fromRank + i]
                    )
                    break
                }

                scope.rightUp.push(
                    [changeFile(this.currentPos[0], i, 1), fromRank + i]
                )

            }

        }

        // +File && -Rank
        for (let i = 1; i < 8; i++) {

            if (fromFile + i <= 8 && fromRank - i > 0) {

                if (
                    domQuery(changeFile(this.currentPos[0], i, 1), fromRank - i)
                        .classList.contains(this.color)
                ) {
                    break
                }

                if (
                    domQuery(changeFile(this.currentPos[0], i, 1), fromRank - i)
                        .firstChild
                ) {
                    scope.rightDown.push(
                        [changeFile(this.currentPos[0], i, 1), fromRank - i]
                    )
                    break
                }

                scope.rightDown.push(
                    [changeFile(this.currentPos[0], i, 1), fromRank - i]
                )

            }

        }

        // -File && +Rank
        for (let i = 1; i < 8; i++) {

            if (fromFile - i > 0 && fromRank + i <= 8) {

                if (
                    domQuery(changeFile(this.currentPos[0], i, -1), fromRank + i)
                        .classList.contains(this.color)
                ) {
                    break
                }

                if (
                    domQuery(changeFile(this.currentPos[0], i, -1), fromRank + i)
                        .firstChild
                ) {
                    scope.leftUp.push(
                        [changeFile(this.currentPos[0], i, -1), fromRank + i]
                    )
                    break
                }

                scope.leftUp.push(
                    [changeFile(this.currentPos[0], i, -1), fromRank + i]
                )

            }

        }

        // -File && -Rank
        for (let i = 1; i < 8; i++) {

            if (fromFile - i > 0 && fromRank - i > 0) {

                if (
                    domQuery(changeFile(this.currentPos[0], i, -1), fromRank - i)
                        .classList.contains(this.color)
                ) {
                    break
                }

                if (
                    domQuery(changeFile(this.currentPos[0], i, -1), fromRank - i)
                        .firstChild
                ) {
                    scope.leftDown.push(
                        [changeFile(this.currentPos[0], i, -1), fromRank - i]
                    )
                    break
                }

                scope.leftDown.push(
                    [changeFile(this.currentPos[0], i, -1), fromRank - i]
                )

            }

        }

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

                scope.up.push([this.currentPos[0], fromRank + i])

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