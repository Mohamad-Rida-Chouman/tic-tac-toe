let gameBoard = document.querySelector('#gameBoard')

let statusDisplay = document.querySelector('#status')

let emptyCells = [
    '', '', '', '', '', '', '', '', ''
]

function createBoard() {
    emptyCells.forEach((cell, index) => {
        let cellElement = document.createElement('div')
        cellElement.classList.add('square')
        cellElement.id = index
        cellElement.addEventListener('click', mark)
        gameBoard.append(cellElement)
    })
}
createBoard()

function mark (e){
    let markDisplay = document.createElement('div')
    markDisplay.classList.add('cross')
    e.target.append(markDisplay)
}
