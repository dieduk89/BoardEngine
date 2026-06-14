/* examples/tictactoe/app.js */
import { BoardEngine } from '../../src/core/BoardEngine.js';
import '../../src/styles/engine.css'; 

const game = new BoardEngine('board', 3, 3);

game.colorizeCells((row, col) => {
    return 'light-marble';
});

game.state[0][0] = {value: null};
game.state[0][1] = {value: null};
game.state[0][2] = {value: null};
game.state[1][0] = {value: null};
game.state[1][1] = {value: null};
game.state[1][2] = {value: null};
game.state[2][0] = {value: null};
game.state[2][1] = {value: null};
game.state[2][2] = {value: null};

game.setTurnSystem("O");
game.container.setAttribute('--current-turn', 'O');

let endGame = false;
let totalMoves = 0;

game.onCellClick = (row, col) => {
    const cell = game.state[row][col]; 
    if(cell.value === null && !endGame){
        game.state[row][col].value = game.currentTurn;
        game.getCellElement(row,col).innerHTML = game.currentTurn;
        let nextTurn = game.currentTurn === 'X' ? 'O' : 'X';
        game.switchTurn(nextTurn);  
        game.container.setAttribute('--current-turn', nextTurn);
        totalMoves++;
        endGame = checkEndgame();
        if(endGame){
            game.container.setAttribute('--current-turn', '');
            document.getElementById('new-game-button').style.display = 'block';
        }
    }
}

function checkEndgame(){
    let winner = null;

    if(game.state[0][0].value === game.state[0][1].value && game.state[0][0].value === game.state[0][2].value && game.state[0][0].value !== null){
        winner = game.state[0][0].value;
    }
    if(game.state[1][0].value === game.state[1][1].value && game.state[1][0].value === game.state[1][2].value && game.state[1][0].value !== null){
        winner = game.state[1][0].value;   
    }
    if(game.state[2][0].value === game.state[2][1].value && game.state[2][0].value === game.state[2][2].value && game.state[2][0].value !== null){
        winner = game.state[2][0].value;  
    }
    if(game.state[0][0].value === game.state[1][0].value && game.state[0][0].value === game.state[2][0].value && game.state[0][0].value !== null){
        winner = game.state[0][0].value;  
    }
    if(game.state[0][1].value === game.state[1][1].value && game.state[0][1].value === game.state[2][1].value && game.state[0][1].value !== null){
        winner = game.state[0][1].value;   
    }
    if(game.state[0][2].value === game.state[1][2].value && game.state[0][2].value === game.state[2][2].value && game.state[0][2].value !== null){
        winner = game.state[0][2].value;    
    }
    if(game.state[0][0].value === game.state[1][1].value && game.state[0][0].value === game.state[2][2].value && game.state[0][0].value !== null){
        winner = game.state[0][0].value; 
    }
    if(game.state[0][2].value === game.state[1][1].value && game.state[0][2].value === game.state[2][0].value && game.state[0][2].value !== null){
        winner = game.state[0][2].value;   
    }
    if(winner){
        document.getElementById("endgame-text").innerHTML = winner + ' won! 🎉🎉🎉';
    }
    else if(totalMoves === 9){
        document.getElementById("endgame-text").innerHTML = 'I\'ts a Tie 🤝';
    }

    return winner !== null || totalMoves === 9;
}

function restarGame(){

    for (let r = 0; r < game.rows; r++) {
        for (let c = 0; c < game.cols; c++) {
            game.state[r][c].value = null;
            game.getCellElement(r,c).innerHTML = '';
        }
    }
    
    game.setTurnSystem("O");
    game.container.setAttribute('--current-turn', 'O');

    endGame = false;
    totalMoves = 0;

    document.getElementById('new-game-button').style.display = 'none';
    document.getElementById("endgame-text").innerHTML = '';
}

document.getElementById('new-game-button').onclick = restarGame;