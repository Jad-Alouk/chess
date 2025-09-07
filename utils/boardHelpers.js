import { Black, White } from "../players.js"


const files = ["a", "b", "c", "d", "e", "f", "g", "h"]


export const createBoard = (gameBoard) => {

    // Loops go in different directions to map the files and ranks correctly
    for (let i = 8; i >= 1; i--) {

        for (let j = 0; j < files.length; j++) {

            const square = document.createElement("div")
            square.classList.add("square")
            square.setAttribute("square-id", `${files[j]}${i}`)


            for (const key in Black) {
                if (
                    Black[key].startingPos[0] == files[j] &&
                    Black[key].startingPos[1] == i
                ) {
                    square.innerHTML = Black[key].avatar
                    square.classList.add("black")
                    square.setAttribute("draggable", true)
                    break
                }
            }

            for (const key in White) {
                if (
                    White[key].startingPos[0] == files[j] &&
                    White[key].startingPos[1] == i
                ) {
                    square.innerHTML = White[key].avatar
                    square.classList.add("white")
                    square.setAttribute("draggable", true)
                    break
                }
            }

            // Alternate between light and dark
            if ((i + j) % 2 === 0) {
                square.classList.add("light")
            } else {
                square.classList.add("dark")
            }

            gameBoard.append(square)
        }
    }
}


export const grabOuterRows = () => {
    const firstRow = []
    const lastRow = []

    for (const file of files) {
        firstRow.push(document.querySelector(`[square-id="${file}${1}"]`))
        lastRow.push(document.querySelector(`[square-id="${file}${8}"]`))
    }

    return [...firstRow, ...lastRow]
}


export const showSvgWhileDragging = (e, svg, isWhite) => {
    if (svg) {
        const clone = svg.cloneNode(true)
        clone.style.width = "45px"
        clone.style.height = "45px"
        clone.style.fill = isWhite ? "white" : "black"

        const wrapper = document.createElement("div")
        wrapper.style.position = "absolute"
        wrapper.style.top = "-1000px"
        wrapper.style.left = "-1000px"
        wrapper.appendChild(clone)
        document.body.appendChild(wrapper)

        e.dataTransfer.setDragImage(wrapper, 22, 22)

        setTimeout(() => {
            document.body.removeChild(wrapper)
        }, 0)
    }
}