import Piece from "./piece.root.js"
import { changeFile, convertFileToNum, domQuery } from "../utils/logicHelpers.js"


export default class King extends Piece {
    constructor(name, avatar, value, startingPos, currentPos, color) {
        super(name, avatar, value, startingPos, currentPos, color)
    }

    checkIfLegal(targetPos) {

        const fromFile = convertFileToNum(this.currentPos[0])
        const toFile = convertFileToNum(targetPos[0])

        const fromRank = this.currentPos[1]
        const toRank = targetPos[1]

        // Can't move more than one square at a time
        if (Math.abs(toFile - fromFile) > 1 || Math.abs(toRank - fromRank) > 1) {
            return false
        }

        // Check diagonal move
        if (Math.abs(toFile - fromFile) === Math.abs(toRank - fromRank)) {
            return true
        }

        // Check straight moves
        if (Math.abs(toFile - fromFile) > 0 && Math.abs(toRank - fromRank) > 0) {
            return false
        }

        if (Math.abs(toFile - fromFile) === 1 && Math.abs(toRank - fromRank) === 0) {
            return true
        }

        if (Math.abs(toRank - fromRank) === 1 && Math.abs(toFile - fromFile) === 0) {
            return true
        }

        return false
    }


    getScope() {

        const scope = []

        const fromFile = convertFileToNum(this.currentPos[0])
        const fromRank = this.currentPos[1]

        if (fromFile + 1 <= 8 && fromRank + 1 <= 8 && fromFile - 1 > 0 && fromRank - 1 > 0) {

            // +File
            if (
                !domQuery(changeFile(this.currentPos[0], 1, 1), fromRank)
                    .classList.contains(this.color)
            ) {
                scope.push([changeFile(this.currentPos[0], 1, 1), fromRank])
            }

            // +File && +Rank
            if (
                !domQuery(changeFile(this.currentPos[0], 1, 1), fromRank + 1)
                    .classList.contains(this.color)
            ) {
                scope.push([changeFile(this.currentPos[0], 1, 1), fromRank + 1])
            }

            // +File && -Rank
            if (
                !domQuery(changeFile(this.currentPos[0], 1, 1), fromRank - 1)
                    .classList.contains(this.color)
            ) {
                scope.push([changeFile(this.currentPos[0], 1, 1), fromRank - 1])
            }

            // -File
            if (
                !domQuery(changeFile(this.currentPos[0], 1, -1), fromRank)
                    .classList.contains(this.color)
            ) {
                scope.push([changeFile(this.currentPos[0], 1, -1), fromRank])
            }

            // -File && +Rank
            if (
                !domQuery(changeFile(this.currentPos[0], 1, -1), fromRank + 1)
                    .classList.contains(this.color)
            ) {
                scope.push([changeFile(this.currentPos[0], 1, -1), fromRank + 1])
            }

            // -File && -Rank
            if (
                !domQuery(changeFile(this.currentPos[0], 1, -1), fromRank - 1)
                    .classList.contains(this.color)
            ) {
                scope.push([changeFile(this.currentPos[0], 1, -1), fromRank - 1])
            }

            // +Rank
            if (!domQuery(this.currentPos[0], fromRank + 1).classList.contains(this.color)) {
                scope.push([this.currentPos[0], fromRank + 1])
            }

            // -Rank
            if (!domQuery(this.currentPos[0], fromRank - 1).classList.contains(this.color)) {
                scope.push([this.currentPos[0], fromRank - 1])
            }
        }

        return scope
    }
}