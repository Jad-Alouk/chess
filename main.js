import { createBoard, grabOuterRows, showSvgWhileDragging } from "./utils/boardHelpers.js"
import {
    getDraggedPieceValFrom,
    deletePieceAt,
    promote,
    getPosFrom,
    getAllScopes,
    isUnderCheck,
    evalMoveAfterCheck
} from "./utils/logicHelpers.js"


const gameBoard = document.querySelector(".gameBoard")
const promotionMenu = document.querySelector(".promotionMenu")
const promoOptions = document.querySelectorAll(".promoOption")

createBoard(gameBoard)

const outerRows = grabOuterRows()
promoOptions.forEach(
    option => option.addEventListener("click", (btnEvent) => promote(btnEvent, outerRows, promotionMenu))
)


const allSquares = document.querySelectorAll(".square")

allSquares.forEach(square => {
    square.addEventListener("dragstart", dragStart)
    square.addEventListener("dragover", dragOver)
    square.addEventListener("drop", dragDrop)
})


// Global state
const history = []
let move = {}
let playerTurn = "white"
let currentPos = null
let draggedPiece = null
let enPassant = false
let allScopes = getAllScopes()
let stopDrop = false
let kingUnderCheck = isUnderCheck(allScopes.blackScopes, "white")


function dragStart(e) {

    const [file, rank] = getPosFrom(e.currentTarget.getAttribute("square-id"))

    // State for the svg when being dragged
    let isWhite = null

    if (e.currentTarget.hasChildNodes()) {

        currentPos = [file, rank]

        if (e.currentTarget.classList.contains("white")) {
            draggedPiece = getDraggedPieceValFrom(currentPos, "white", draggedPiece)
            isWhite = true

        } else {
            draggedPiece = getDraggedPieceValFrom(currentPos, "black", draggedPiece)
            isWhite = false
        }

        !draggedPiece.checkIfCorrectGo(playerTurn, draggedPiece.color) ? stopDrop = true : stopDrop = false

        // AI slop but it works
        const svg = e.currentTarget.querySelector("svg")
        showSvgWhileDragging(e, svg, isWhite)
    }
}


function dragOver(e) {
    e.preventDefault()
}


function dragDrop(e) {

    if (stopDrop || currentPos == null || draggedPiece == null) {
        e.preventDefault()
        return
    }

    // Get the start and target
    const originSquare = document.querySelector(`[square-id="${currentPos[0]}${currentPos[1]}"]`)
    const targetSquare = e.currentTarget
    const [file, rank] = getPosFrom(targetSquare.getAttribute("square-id"))


    if (
        (currentPos[0] == file && currentPos[1] == rank) // Ignore dropping a piece in its place
        ||
        e.currentTarget.classList.contains(draggedPiece.color) // Player can't take own pieces
    ) return


    switch (draggedPiece.constructor.name) {

        case "Pawn":

            const checkEnPassant = draggedPiece.checkEnPassant(
                history,
                draggedPiece,
                file,
                rank,
                currentPos
            )
            enPassant = checkEnPassant
            move["enPassant"] = checkEnPassant

            if (!enPassant) {
                const movePurpose = e.currentTarget.firstChild ? "toCapture" : "toMove"
                const target = [file, rank]
                const isWhite = draggedPiece.color === "white" ? true : false

                if (!draggedPiece.checkIfLegal(movePurpose, target, isWhite)) return
            }

            move["promotion"] = false
            if (draggedPiece.checkPromotion(rank, draggedPiece.color)) {
                promotionMenu.classList.remove("hidden")
                promotionMenu.classList.add("visible")
                promotionMenu.classList.add(draggedPiece.color)
                move["promotion"] = true
            }

            break

        case "King":

            if (!draggedPiece.checkIfLegal([file, rank])) return

            break

        case "Queen":

            if (!draggedPiece.checkIfLegal([file, rank])) return

            break

        case "Rook":

            if (!draggedPiece.checkIfLegal([file, rank])) return

            break

        case "Knight":

            if (!draggedPiece.checkIfLegal([file, rank])) return

            break

        case "Bishop":

            if (!draggedPiece.checkIfLegal([file, rank])) return

            break

        default:
            break
    }


    if (kingUnderCheck.length > 0) {
        evalMoveAfterCheck(kingUnderCheck, draggedPiece, [file, rank])
    }


    // Remove piece functionality from the origin square
    originSquare.classList.remove(draggedPiece.color)
    originSquare.setAttribute("draggable", false)
    originSquare.innerHTML = ""

    // Record the move
    move["from"] = currentPos
    move["to"] = [file, rank]
    move["piece"] = draggedPiece
    move["color"] = draggedPiece.color
    move["purpose"] = targetSquare.firstChild ? "toCapture" : "toMove"
    enPassant ? move["purpose"] = "toCapture" : move["purpose"] = "toMove"
    history.push(Object.assign({}, move))

    // Add piece functionality for the targeted square
    targetSquare.setAttribute("draggable", true)
    targetSquare.classList.contains("white")
        ? deletePieceAt(file, rank, "white")
        : deletePieceAt(file, rank, "black")

    targetSquare.classList.remove("white", "black")
    targetSquare.classList.add(draggedPiece.color)
    targetSquare.innerHTML = draggedPiece.avatar

    if (enPassant) {
        if (draggedPiece.color === "white") {
            document.querySelector(`[square-id="${file}${rank - 1}"]`).innerHTML = ""
            deletePieceAt(file, rank - 1, "black")
        }

        if (draggedPiece.color === "black") {
            document.querySelector(`[square-id="${file}${rank + 1}"]`).innerHTML = ""
            deletePieceAt(file, rank + 1, "white")
        }
    }

    // Update all states
    draggedPiece.currentPos = [file, rank]
    allScopes = getAllScopes()
    if (draggedPiece.color === "white") {
        kingUnderCheck = isUnderCheck(allScopes.whiteScopes, "black")
    } else {
        kingUnderCheck = isUnderCheck(allScopes.blackScopes, "white")
    }
    draggedPiece = null
    currentPos = null
    playerTurn = playerTurn === "white" ? "black" : "white"
    move = {}
    enPassant = false
    console.log(kingUnderCheck)
}