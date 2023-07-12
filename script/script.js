let gameBoard = document.querySelector('#gameBoard')

let statusDisplay = document.querySelector('#status')

let emptyCells = [
    '', '', '', '', '', '', '', '', ''
]

let turn = 'circle'
statusDisplay.textContent = 'Circle, Commence!'

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

function mark (e) {
    let markDisplay = document.createElement('div')
    markDisplay.classList.add(turn)
    e.target.append(markDisplay)
    turn = turn === 'circle' ? 'cross' : 'circle'
    statusDisplay.textContent = 'Dare to make a move, ' + turn + '?'
    e.target.removeEventListener('click', mark)
}
