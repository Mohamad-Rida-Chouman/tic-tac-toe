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
    checkScore()
}

function checkScore() {
    
    let squares = document.querySelectorAll('.square')
    let winCombos = [
        [0,1,2], [3,4,5], [6,7,8],
        [0,3,6], [1,4,7], [2,5,8],
        [0,4,8], [2,4,6]
    ]
    
    winCombos.forEach(array => {
        let winCircle = array.every(cell => squares[cell].firstChild?.classList.contains('circle'))
        if (winCircle) {
            statusDisplay.textContent = 'Well played, circle. Well played...'
            squares.forEach(square => square.replaceWith(square.cloneNode(true)))
            return
        }
    })

    winCombos.forEach(array => {
        let winCross = array.every(cell => squares[cell].firstChild?.classList.contains('cross'))
        if (winCross) {
            statusDisplay.textContent = 'Magnificient game, cross!'
            squares.forEach(square => square.replaceWith(square.cloneNode(true)))
            return
        }
    })
}