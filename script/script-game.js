let gameBoard = document.querySelector('#gameBoard')

let statusDisplay = document.querySelector('#status')

let emptyCells = [
    '', '', '', '', '', '', '', '', ''
]

p2_score_first = 0

player_1 = params.player_1
player_2 = params.player_2

let toPlay = player_1

let turn = 'circle'

statusDisplay.textContent = player_1.concat(', raise your shield!')

let moves = 0

let winnerFound = 0

let player_1_win = 0

let player_2_win = 0

function score_modify() {
    // remove previous elements in scores
    element = document.getElementById("score_player_1")
    element.remove()
    element = document.getElementById("splitter")
    element.remove()
    element = document.getElementById("score_player_2")
    element.remove()

    // create new elements
    p1_score = document.createElement('div')
    p1_score.id = "score_player_1"
    p1_score.innerHTML = player_1.concat(': '+player_1_win)

    splitter = document.createElement('div')
    splitter.id = "splitter"
    splitter.innerHTML = '|'

    p2_score = document.createElement('div')
    p2_score.id = "score_player_2"
    p2_score.innerHTML = player_2.concat(': '+player_2_win)

    //append new elements
    if (p2_score_first == 0) {
        scores_container = document.getElementById('scores')
        scores_container.appendChild(p1_score)
        scores_container.appendChild(splitter)
        scores_container.appendChild(p2_score)
    }
    else{
        scores_container = document.getElementById('scores')
        scores_container.appendChild(p2_score)
        scores_container.appendChild(splitter)
        scores_container.appendChild(p1_score)
    }

}

score_modify()

function createBoard() {
    // create cells
    emptyCells.forEach((cell, index) => {
        // assign div and index to each cell
        let cellElement = document.createElement('div')
        
        cellElement.classList.add('square')
        
        cellElement.id = index
        
        cellElement.addEventListener('click', mark)
        
        gameBoard.append(cellElement)
    })
}
createBoard()

//define next player mark and turn
function mark (e) {
    
    let markDisplay = document.createElement('div')
    markDisplay.classList.add(turn)
    
    e.target.append(markDisplay)
    turn = turn === 'circle' ? 'cross' : 'circle'
    toPlay = toPlay === player_1 ? player_2 : player_1
    
    if (toPlay == player_1){
        statusDisplay.textContent = 'Raise your shield once again, ' + toPlay + '!'
    }
    else{
        statusDisplay.textContent = 'Draw your sword, ' + toPlay + '!'
    }

    e.target.removeEventListener('click', mark)

    checkScore()

}

function checkScore() {

    moves = moves + 1

    let squares = document.querySelectorAll('.square')
    let winCombos = [
        [0,1,2], [3,4,5], [6,7,8],
        [0,3,6], [1,4,7], [2,5,8],
        [0,4,8], [2,4,6]
    ]

    //circle win condition
    winCombos.forEach(array => {
        let winCircle = array.every(cell => squares[cell].firstChild?.classList.contains('circle'))
        if (winCircle) {
            winnerFound = 1
            statusDisplay.textContent = 'Well played, '+ player_1 +'. Well played!'
            squares.forEach(square => square.replaceWith(square.cloneNode(true)))
            player_1_win = player_1_win + 1
            score_modify()
            document.getElementById("reset").style.display = "block";
            // define and apply color to winning combo
            winningCombo = array
            let single_sq = document.getElementById(winningCombo[0])
            single_sq.style.backgroundColor = 'gold'
            single_sq = document.getElementById(winningCombo[1])
            single_sq.style.backgroundColor = 'gold'
            single_sq = document.getElementById(winningCombo[2])
            single_sq.style.backgroundColor = 'gold'
        }
    })

    //cross win condition
    winCombos.forEach(array => {
        let winCross = array.every(cell => squares[cell].firstChild?.classList.contains('cross'))
        if (winCross) {
            winnerFound = 1
            statusDisplay.textContent = 'Magnificient game, '+ player_2 +'!'
            squares.forEach(square => square.replaceWith(square.cloneNode(true)))
            player_2_win = player_2_win + 1
            score_modify()
            document.getElementById("reset").style.display = "block";
            // defining and applying color to winning combo
            winningCombo = array
            let single_sq = document.getElementById(winningCombo[0])
            single_sq.style.backgroundColor = 'gold'
            single_sq = document.getElementById(winningCombo[1])
            single_sq.style.backgroundColor = 'gold'
            single_sq = document.getElementById(winningCombo[2])
            single_sq.style.backgroundColor = 'gold'
        }
    })

    //draw condition
    if (moves == 9 && winnerFound == 0){
        statusDisplay.textContent = 'A truce it is then.'
        squares.forEach(square => square.replaceWith(square.cloneNode(true)))
        document.getElementById("reset").style.display = "block";
        score_modify()
    }
}


function reset() {

    //initialize all variable as new
    let old_gameboard = document.getElementById("gameBoard");
    old_gameboard.remove();

    let new_gameboard = document.createElement("div");
    new_gameboard.id = 'gameBoard'
    document.getElementById('gameBoard_container').appendChild(new_gameboard);

    moves = 0
    winnerFound = 0

    temp = player_1
    player_1 = player_2
    player_2 = temp

    temp = player_1_win
    player_1_win = player_2_win
    player_2_win = temp

    p2_score_first = p2_score_first === 0 ? 1 : 0
    score_modify()

    statusDisplay.textContent = player_1.concat(', raise your shield!')

    gameBoard = document.querySelector('#gameBoard')

    statusDisplay = document.querySelector('#status')

    emptyCells = [
        '', '', '', '', '', '', '', '', ''
    ]

    toPlay = player_1

    turn = 'circle'

    createBoard()

}