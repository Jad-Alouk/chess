export default class Piece {
    constructor(name, avatar, value, startingPos, currentPos, color) {
        this.name = name
        this.avatar = avatar
        this.value = value
        this.startingPos = startingPos
        this.currentPos = currentPos
        this.color = color
    }

    checkIfCorrectGo(playerTurn, playerColor) {
        if (playerTurn !== playerColor) {
            return false
        }

        return true
    }
}