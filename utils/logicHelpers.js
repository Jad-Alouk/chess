import Bishop from "../pieces/bishop.js"
import Knight from "../pieces/knight.js"
import Queen from "../pieces/queen.js"
import Rook from "../pieces/rook.js"
import { queenSvg, rookSvg, bishopSvg, knightSvg } from "./icons.js"
import { Black, White } from "../players.js"


// Maps a -> 1, b -> 2, c -> 3....
export const convertFileToNum = (char) => {
    const fileAsNum = (char.charCodeAt(0) - "a".charCodeAt(0)) + 1

    return fileAsNum
}


export const getPosFrom = (squareId) => {
    const file = squareId[0]
    const rank = Number(squareId[1])

    return [file, rank]
}


export const getDraggedPieceValFrom = (currentPos, color, draggedPiece) => {
    const group = color === "white" ? White : Black
    for (const key in group) {
        if (
            group[key].currentPos[0] === currentPos[0] &&
            group[key].currentPos[1] === currentPos[1]
        ) {
            draggedPiece = group[key]
            break
        }
    }
    return draggedPiece
}


export const deletePieceAt = (file, rank, color) => {
    const group = color === "white" ? White : Black
    for (const key in group) {
        if (group[key].currentPos[0] === file && group[key].currentPos[1] === rank) {
            delete group[key]
            break
        }
    }
}


export const findPieceAt = (file, rank, color) => {
    const group = color === "white" ? White : Black
    for (const key in group) {
        if (group[key].currentPos[0] === file && group[key].currentPos[1] === rank) {
            return group[key]
        }
    }

    return null
}


let counter = 1

const swapPieces = (oldPiece, newPiece) => {

    const group = oldPiece.color === "white" ? White : Black
    let swappedPiece = null

    for (const key in group) {
        if (group[key] === oldPiece) {
            switch (newPiece) {
                case "Q":
                    swappedPiece = group[`newQueen${counter}`] = new Queen(
                        "Q", queenSvg, 9, oldPiece.currentPos, oldPiece.currentPos, oldPiece.color
                    )
                    delete group[key]
                    counter++
                    break
                case "R":
                    swappedPiece = group[`newRook${counter}`] = new Rook(
                        "R", rookSvg, 5, oldPiece.currentPos, oldPiece.currentPos, oldPiece.color
                    )
                    delete group[key]
                    counter++
                    break
                case "B":
                    swappedPiece = group[`newBishop${counter}`] = new Bishop(
                        "B", bishopSvg, 3, oldPiece.currentPos, oldPiece.currentPos, oldPiece.color
                    )
                    delete group[key]
                    counter++
                    break
                case "N":
                    swappedPiece = group[`newKnight${counter}`] = new Knight(
                        "N", knightSvg, 3, oldPiece.currentPos, oldPiece.currentPos, oldPiece.color
                    )
                    delete group[key]
                    counter++
                    break
                default:
                    break
            }
        }
    }

    return swappedPiece
}


export const promote = (btnEvent, outerRows, promotionMenu) => {

    outerRows.forEach((row) => {

        if (
            row.firstChild &&
            row.firstChild.attributes &&
            row.firstChild.getAttribute("id") === "P"
        ) {

            const [file, rank] = getPosFrom(row.getAttribute("square-id"))
            const color = row.classList.contains("white") ? "white" : "black"

            const oldPiece = getDraggedPieceValFrom(
                [file, rank], color, {}
            )

            switch (btnEvent.currentTarget.getAttribute("id")) {
                case "Q":
                    swapPieces(oldPiece, "Q")
                    row.innerHTML = queenSvg
                    break
                case "R":
                    swapPieces(oldPiece, "R")
                    row.innerHTML = rookSvg
                    break
                case "B":
                    swapPieces(oldPiece, "B")
                    row.innerHTML = bishopSvg
                    break
                case "N":
                    swapPieces(oldPiece, "N")
                    row.innerHTML = knightSvg
                    break
                default:
                    break
            }
        }
    })

    promotionMenu.classList.remove("visible")
    promotionMenu.classList.add("hidden")
}


export const getAllScopes = () => {

    const whiteScopes = []
    const blackScopes = []

    for (const key in White) {
        whiteScopes.push(White[key].getScope())
    }

    for (const key in Black) {
        blackScopes.push(Black[key].getScope())
    }

    return { whiteScopes, blackScopes }
}


export const isUnderCheck = (enemyScopes, color) => {

    const group = color === "white" ? White : Black
    const attacker = []

    enemyScopes.forEach(scope => {

        switch (scope.piece) {

            case "P":

                if (
                    scope.leftDiagonal &&
                    scope.leftDiagonal[0] === group.king.currentPos[0] &&
                    scope.leftDiagonal[1] === group.king.currentPos[1]
                ) {
                    attacker.push({
                        piece: scope.piece,
                        origin: scope.origin,
                        activeScope: scope.leftDiagonal
                    })
                }

                if (
                    scope.rightDiagonal &&
                    scope.rightDiagonal[0] === group.king.currentPos[0] &&
                    scope.rightDiagonal[1] === group.king.currentPos[1]
                ) {
                    attacker.push({
                        piece: scope.piece,
                        origin: scope.origin,
                        activeScope: scope.rightDiagonal
                    })
                }

                break

            case "R":

                if (scope.up) {
                    scope.up.forEach(coord => {
                        if (
                            coord[0] === group.king.currentPos[0] &&
                            coord[1] === group.king.currentPos[1]
                        ) {
                            attacker.push({
                                piece: scope.piece,
                                origin: scope.origin,
                                activeScope: scope.up
                            })
                        }
                    })
                }

                if (scope.down) {
                    scope.down.forEach(coord => {
                        if (
                            coord[0] === group.king.currentPos[0] &&
                            coord[1] === group.king.currentPos[1]
                        ) {
                            attacker.push({
                                piece: scope.piece,
                                origin: scope.origin,
                                activeScope: scope.down
                            })
                        }
                    })
                }

                if (scope.left) {
                    scope.left.forEach(coord => {
                        if (
                            coord[0] === group.king.currentPos[0] &&
                            coord[1] === group.king.currentPos[1]
                        ) {
                            attacker.push({
                                piece: scope.piece,
                                origin: scope.origin,
                                activeScope: scope.left
                            })
                        }
                    })
                }

                if (scope.right) {
                    scope.right.forEach(coord => {
                        if (
                            coord[0] === group.king.currentPos[0] &&
                            coord[1] === group.king.currentPos[1]
                        ) {
                            attacker.push({
                                piece: scope.piece,
                                origin: scope.origin,
                                activeScope: scope.right
                            })
                        }
                    })
                }

                break

            case "B":

                if (scope.rightUp) {
                    scope.rightUp.forEach(coord => {
                        if (
                            coord[0] === group.king.currentPos[0] &&
                            coord[1] === group.king.currentPos[1]
                        ) {
                            attacker.push({
                                piece: scope.piece,
                                origin: scope.origin,
                                activeScope: scope.rightUp
                            })
                        }
                    })
                }

                if (scope.rightDown) {
                    scope.rightDown.forEach(coord => {
                        if (
                            coord[0] === group.king.currentPos[0] &&
                            coord[1] === group.king.currentPos[1]
                        ) {
                            attacker.push({
                                piece: scope.piece,
                                origin: scope.origin,
                                activeScope: scope.rightDown
                            })
                        }
                    })
                }

                if (scope.leftUp) {
                    scope.leftUp.forEach(coord => {
                        if (
                            coord[0] === group.king.currentPos[0] &&
                            coord[1] === group.king.currentPos[1]
                        ) {
                            attacker.push({
                                piece: scope.piece,
                                origin: scope.origin,
                                activeScope: scope.leftUp
                            })
                        }
                    })
                }

                if (scope.leftDown) {
                    scope.leftDown.forEach(coord => {
                        if (
                            coord[0] === group.king.currentPos[0] &&
                            coord[1] === group.king.currentPos[1]
                        ) {
                            attacker.push({
                                piece: scope.piece,
                                origin: scope.origin,
                                activeScope: scope.leftDown
                            })
                        }
                    })
                }

                break

            case "Q":

                if (scope.up) {
                    scope.up.forEach(coord => {
                        if (
                            coord[0] === group.king.currentPos[0] &&
                            coord[1] === group.king.currentPos[1]
                        ) {
                            attacker.push({
                                piece: scope.piece,
                                origin: scope.origin,
                                activeScope: scope.up
                            })
                        }
                    })
                }

                if (scope.down) {
                    scope.down.forEach(coord => {
                        if (
                            coord[0] === group.king.currentPos[0] &&
                            coord[1] === group.king.currentPos[1]
                        ) {
                            attacker.push({
                                piece: scope.piece,
                                origin: scope.origin,
                                activeScope: scope.down
                            })
                        }
                    })
                }

                if (scope.left) {
                    scope.left.forEach(coord => {
                        if (
                            coord[0] === group.king.currentPos[0] &&
                            coord[1] === group.king.currentPos[1]
                        ) {
                            attacker.push({
                                piece: scope.piece,
                                origin: scope.origin,
                                activeScope: scope.left
                            })
                        }
                    })
                }

                if (scope.right) {
                    scope.right.forEach(coord => {
                        if (
                            coord[0] === group.king.currentPos[0] &&
                            coord[1] === group.king.currentPos[1]
                        ) {
                            attacker.push({
                                piece: scope.piece,
                                origin: scope.origin,
                                activeScope: scope.right
                            })
                        }
                    })
                }

                if (scope.rightUp) {
                    scope.rightUp.forEach(coord => {
                        if (
                            coord[0] === group.king.currentPos[0] &&
                            coord[1] === group.king.currentPos[1]
                        ) {
                            attacker.push({
                                piece: scope.piece,
                                origin: scope.origin,
                                activeScope: scope.rightUp
                            })
                        }
                    })
                }

                if (scope.rightDown) {
                    scope.rightDown.forEach(coord => {
                        if (
                            coord[0] === group.king.currentPos[0] &&
                            coord[1] === group.king.currentPos[1]
                        ) {
                            attacker.push({
                                piece: scope.piece,
                                origin: scope.origin,
                                activeScope: scope.rightDown
                            })
                        }
                    })
                }

                if (scope.leftUp) {
                    scope.leftUp.forEach(coord => {
                        if (
                            coord[0] === group.king.currentPos[0] &&
                            coord[1] === group.king.currentPos[1]
                        ) {
                            attacker.push({
                                piece: scope.piece,
                                origin: scope.origin,
                                activeScope: scope.leftUp
                            })
                        }
                    })
                }

                if (scope.leftDown) {
                    scope.leftDown.forEach(coord => {
                        if (
                            coord[0] === group.king.currentPos[0] &&
                            coord[1] === group.king.currentPos[1]
                        ) {
                            attacker.push({
                                piece: scope.piece,
                                origin: scope.origin,
                                activeScope: scope.leftDown
                            })
                        }
                    })
                }

                break

            case "N":

                if (scope.vertical) {

                    if (
                        scope.vertical.rightUp &&
                        scope.vertical.rightUp[0] === group.king.currentPos[0] &&
                        scope.vertical.rightUp[1] === group.king.currentPos[1]
                    ) {
                        attacker.push({
                            piece: scope.piece,
                            origin: scope.origin,
                            activeScope: scope.vertical.rightUp
                        })
                    }

                    if (
                        scope.vertical.rightDown &&
                        scope.vertical.rightDown[0] === group.king.currentPos[0] &&
                        scope.vertical.rightDown[1] === group.king.currentPos[1]
                    ) {
                        attacker.push({
                            piece: scope.piece,
                            origin: scope.origin,
                            activeScope: scope.vertical.rightDown
                        })
                    }

                    if (
                        scope.vertical.leftUp &&
                        scope.vertical.leftUp[0] === group.king.currentPos[0] &&
                        scope.vertical.leftUp[1] === group.king.currentPos[1]
                    ) {
                        attacker.push({
                            piece: scope.piece,
                            origin: scope.origin,
                            activeScope: scope.vertical.leftUp
                        })
                    }

                    if (
                        scope.vertical.leftDown &&
                        scope.vertical.leftDown[0] === group.king.currentPos[0] &&
                        scope.vertical.leftDown[1] === group.king.currentPos[1]
                    ) {
                        attacker.push({
                            piece: scope.piece,
                            origin: scope.origin,
                            activeScope: scope.vertical.leftDown
                        })
                    }

                }

                if (scope.horizontal) {

                    if (
                        scope.horizontal.rightUp &&
                        scope.horizontal.rightUp[0] === group.king.currentPos[0] &&
                        scope.horizontal.rightUp[1] === group.king.currentPos[1]
                    ) {
                        attacker.push({
                            piece: scope.piece,
                            origin: scope.origin,
                            activeScope: scope.horizontal.rightUp
                        })
                    }

                    if (
                        scope.horizontal.rightDown &&
                        scope.horizontal.rightDown[0] === group.king.currentPos[0] &&
                        scope.horizontal.rightDown[1] === group.king.currentPos[1]
                    ) {
                        attacker.push({
                            piece: scope.piece,
                            origin: scope.origin,
                            activeScope: scope.horizontal.rightDown
                        })
                    }

                    if (
                        scope.horizontal.leftUp &&
                        scope.horizontal.leftUp[0] === group.king.currentPos[0] &&
                        scope.horizontal.leftUp[1] === group.king.currentPos[1]
                    ) {
                        attacker.push({
                            piece: scope.piece,
                            origin: scope.origin,
                            activeScope: scope.horizontal.leftUp
                        })
                    }

                    if (
                        scope.horizontal.leftDown &&
                        scope.horizontal.leftDown[0] === group.king.currentPos[0] &&
                        scope.horizontal.leftDown[1] === group.king.currentPos[1]
                    ) {
                        attacker.push({
                            piece: scope.piece,
                            origin: scope.origin,
                            activeScope: scope.horizontal.leftDown
                        })
                    }

                }

                break

            default:
                break

        }

    })

    return attacker
}


export const evalMoveAfterCheck = (enemyScopes, draggedPiece, target) => {

    console.log("I don't care about this project anymore")

    // Case 1: Double check → only king can move
    // if (enemyScopes.length === 2) {
    //     if (draggedPiece.constructor.name !== "King") {
    //         return false // only king can move in double check
    //     }
    //     // king move must not land on attacked square
    //     return !enemyScopes.some(scope =>
    //         Array.isArray(scope.activeScope[0])
    //             ? scope.activeScope.some(coord => coord[0] === target[0] && coord[1] === target[1])
    //             : (scope.activeScope[0] === target[0] && scope.activeScope[1] === target[1])
    //     )
    // }

    // // Case 2: Single check
    // if (enemyScopes.length === 1) {
    //     const attacker = enemyScopes[0]

    //     // If king is moving
    //     if (draggedPiece.constructor.name === "King") {
    //         // King can capture attacker
    //         if (target[0] === attacker.origin[0] && target[1] === attacker.origin[1]) {
    //             return true
    //         }
    //         // King can move to any safe square (not under attack)
    //         return !enemyScopes.some(scope =>
    //             Array.isArray(scope.activeScope[0])
    //                 ? scope.activeScope.some(coord => coord[0] === target[0] && coord[1] === target[1])
    //                 : (scope.activeScope[0] === target[0] && scope.activeScope[1] === target[1])
    //         )
    //     }

    //     // If another piece is moving
    //     else {
    //         // Can capture the attacker
    //         if (target[0] === attacker.origin[0] && target[1] === attacker.origin[1]) {
    //             return true
    //         }

    //         // Can block the attacker (only for sliding pieces: R, B, Q)
    //         if (Array.isArray(attacker.activeScope)) {
    //             return attacker.activeScope.some(coord =>
    //                 coord[0] === target[0] && coord[1] === target[1]
    //             )
    //         }

    //         return false
    //     }
    // }

    // // Case 3: No check → move is normal
    // return true
}



export const domQuery = (file, rank) => (document.querySelector(`[square-id="${file}${rank}"]`))

export const changeFile = (curr, idx, sign) => (String.fromCharCode(curr.charCodeAt(0) + (idx * sign)))