let gameBoard = document.querySelector('#gameBoard')

let statusDisplay = document.querySelector('#status')

let emptyCells = [
    '', '', '', '', '', '', '', '', ''
]

function createBoard() {
    emptyCells.forEach((cell, index) => {
        let cellElement = document.createElement('div')
        cellElement.classList.add('square')
        gameBoard.append(cellElement)
    })
}

createBoard()
