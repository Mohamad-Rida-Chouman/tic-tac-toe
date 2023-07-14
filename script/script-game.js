let gameBoard = document.querySelector('#gameBoard')

let statusDisplay = document.querySelector('#status')

let emptyCells = [
    '', '', '', '', '', '', '', '', ''
]

player_1 = params.player_1
player_2 = params.player_2

let toPlay = player_1

let turn = 'circle'

statusDisplay.textContent = player_1.concat(', you are circle. Commence!')

let moves = 0

let winnerFound = 0

let player_1_win = 0

let player_2_win = 0

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
    toPlay = toPlay === player_1 ? player_2 : player_1
    
    statusDisplay.textContent = 'Dare to make a move, ' + toPlay + '?'

    e.target.removeEventListener('click', mark)

    checkScore()

}

function checkScore() {

        moves = moves + 1
        console.log(moves)

        let squares = document.querySelectorAll('.square')
        let winCombos = [
            [0,1,2], [3,4,5], [6,7,8],
            [0,3,6], [1,4,7], [2,5,8],
            [0,4,8], [2,4,6]
        ]
        

        winCombos.forEach(array => {
            let winCircle = array.every(cell => squares[cell].firstChild?.classList.contains('circle'))
            if (winCircle) {
                winnerFound = 1
                statusDisplay.textContent = 'Well played, '+ player_1 +'. Well played!'
                squares.forEach(square => square.replaceWith(square.cloneNode(true)))
                player_1_win = player_1_win + 1
                document.getElementById("reset").style.display = "block";
            }
        })

        winCombos.forEach(array => {
            let winCross = array.every(cell => squares[cell].firstChild?.classList.contains('cross'))
            if (winCross) {
                winnerFound = 1
                statusDisplay.textContent = 'Magnificient game, '+ player_2 +'!'
                squares.forEach(square => square.replaceWith(square.cloneNode(true)))
                player_2_win = player_2_win + 1
                document.getElementById("reset").style.display = "block";
            }
        })

        if (moves == 9 && winnerFound == 0){
            statusDisplay.textContent = 'A truce it is then.'
            squares.forEach(square => square.replaceWith(square.cloneNode(true)))
            document.getElementById("reset").style.display = "block";
        }
    }
