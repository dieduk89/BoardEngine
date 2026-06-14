/* examples/checkers/app.js */
import { BoardEngine } from '../../src/core/BoardEngine.js';
import '../../src/styles/engine.css'; 

const game = new BoardEngine('board', 8, 8);

game.colorizeCells((row, col) => {
    return (row + col) % 2 === 1 ? 'dark-wood' : 'light-wood';
});

initGame('white', 'Player 1', 'Player 2');
let selectedPiece = null;
let mustContinueJump = false;

document.getElementById('btn-restart').onclick = newGame;
document.getElementById('btn-new-game').onclick = newGame;

game.onCellClick = (row, col) => {
    const cell = game.state[row][col]; 
    if (selectedPiece) {
        let unselect = false;
        let move = false;
        if (selectedPiece.row === row && selectedPiece.col === col && !mustContinueJump) {
            unselect = true;
        } else {
            if (cell === null) {
                move = validMove(selectedPiece.row, selectedPiece.col, row, col);
            }
        }
        if (unselect) {
            const pieceElement = game.getCellElement(row, col).querySelector('.engine-piece');
            pieceElement.classList.remove('selected');
            selectedPiece = null;
        }
        if (move) {
            selectedPiece = { row, col };
            const pieceElement = game.getCellElement(row, col).querySelector('.engine-piece');
            if ((game.currentTurn === 'white' && row === 0) || (game.currentTurn === 'black' && row === 7) && !game.state[row][col].king) {
                pieceElement.classList.add('border-gold');
                game.state[row][col].king = true; 
            }
            if(!mustContinueJump){ 
                pieceElement.classList.remove('selected');
                selectedPiece = null;
                let turnId = game.currentTurn + '-turn';
                document.getElementById(turnId).classList.add('hide');
                game.switchTurn(game.currentTurn === 'white' ? 'black' : 'white');
                turnId = game.currentTurn + '-turn';
                document.getElementById(turnId).classList.remove('hide');
            } 
            updateGameProps();
        }
    }
    else{
        if (cell && cell.owner === game.currentTurn) {
            let validSelection = game.players[game.currentTurn].canEat > 0 ? cell.canEat : cell.canMove;
            if(validSelection){
                const pieceElement = game.getCellElement(row, col).querySelector('.engine-piece');
                selectedPiece = { row, col };
                pieceElement.classList.add('selected');
            }
        }
    }
};

function validMove(fromRow, fromCol, toRow, toCol) {
    const cell = game.state[fromRow][fromCol];
    const isBlack = cell.owner === 'black';
    const direction = isBlack ? 1 : -1;
    if (Math.abs(toRow - fromRow) === 1 && Math.abs(toCol - fromCol) === 1 && !mustContinueJump) {
        const difRow = toRow - fromRow;
        if (cell.king || difRow === direction) {
            return game.movePiece(fromRow, fromCol, toRow, toCol);
        }
    }
    if (Math.abs(toRow - fromRow) === 2 && Math.abs(toCol - fromCol) === 2) {
        const difRow = toRow - fromRow;
        if(cell.king || difRow === 2 * direction) {
            const midRow = fromRow + (toRow - fromRow) / 2;
            const midCol = fromCol + (toCol - fromCol) / 2;
            const midCell = game.state[midRow][midCol];
            if (midCell && midCell.owner !== cell.owner) {
                game.removePiece(midRow, midCol);
                game.movePiece(fromRow, fromCol, toRow, toCol);
                mustContinueJump = checkJump(toRow, toCol);
                return true;
            }
        }
    }
    return false;
}

function checkJump(row, col) {
    const cell = game.state[row][col];
    const isBlack = cell.owner === 'black';
    const directions = cell.king ? [[1, 1], [1, -1], [-1, 1], [-1, -1]] : (isBlack ? [[1, 1], [1, -1]] : [[-1, 1], [-1, -1]]);
    for (const [dRow, dCol] of directions) {
        const midRow = row + dRow;
        const midCol = col + dCol;
        const jumpRow = row + 2 * dRow;
        const jumpCol = col + 2 * dCol; 
        if (jumpRow >= 0 && jumpRow < game.rows && jumpCol >= 0 && jumpCol < game.cols) {
            const midCell = game.state[midRow][midCol];
            if(midCell !== null)
            {
                const jumpCell = game.state[jumpRow][jumpCol];
                if(cell.owner !== midCell.owner && jumpCell === null){
                    return true;
                }
            }           
        }
    }
    return false;
}

function checkMove(row, col){
    const cell = game.state[row][col];
    const isBlack = cell.owner === 'black';
    const directions = cell.king ? [[1, 1], [1, -1], [-1, 1], [-1, -1]] : (isBlack ? [[1, 1], [1, -1]] : [[-1, 1], [-1, -1]]);    
    for (const [dRow, dCol] of directions) {
        const jumpRow = row + dRow;
        const jumpCol = col + dCol; 
        if (jumpRow >= 0 && jumpRow < game.rows && jumpCol >= 0 && jumpCol < game.cols) {
            const jumpCell = game.state[jumpRow][jumpCol];
            if(jumpCell === null){
                return true;
            }    
        }
    }
}

function updateGameProps(){
    let playersProps = {
        white: {name: game.players['white'].name, pieces: 0, canMove: 0, canEat: 0},
        black: {name: game.players['black'].name, pieces: 0, canMove: 0, canEat: 0}
    }
    for (let r = 0; r < game.rows; r++) {
        for (let c = 0; c < game.cols; c++) {
            const cell = game.state[r][c];
            if(cell !== null){
                playersProps[cell.owner].pieces = playersProps[cell.owner].pieces + 1;
                let jump = checkJump(r,c);
                let move = checkMove(r,c);
                cell.canEat = jump;
                cell.canMove = move;
                if(jump)
                {
                    playersProps[cell.owner].canEat = playersProps[cell.owner].canEat + 1 
                }
                if(move)
                {
                    playersProps[cell.owner].canMove = playersProps[cell.owner].canMove + 1 
                }
            }
        }
    }  
    game.players = playersProps; 
    if(checkEndGame()){
        document.getElementById('winner-screen').style.display = 'flex';
    }  
}

function checkEndGame(){
    let winner = null;
    if(game.players['white'].pieces === 0 || (game.players['white'].canMove === 0 && game.currentTurn === 'white')){
        winner = 'black';
    }
    if(game.players['black'].pieces === 0 || (game.players['black'].canMove === 0 && game.currentTurn === 'black')){
        winner = 'white';
    }
    if(winner !== null){
        document.getElementById('winner-text').innerHTML = game.players[winner].name + ' won! 🎉🎉🎉';
    }
    return winner !== null;
}

function initGame(initTurn, player1Name, player2Name){

    game.clearBoard();
    document.getElementById('winner-screen').style.display = 'none';

    let defaultProps = {
        king: false,
        canMove: false,
        canEat: false
    }

    let firstRowProps = {
        king: false,
        canMove: true,
        canEat: false
    }

    game.spawnPiece(0, 1, 'black-1', 'black', ['black'], defaultProps);
    game.spawnPiece(0, 3, 'black-2', 'black', ['black'], defaultProps);
    game.spawnPiece(0, 5, 'black-3', 'black', ['black'], defaultProps);
    game.spawnPiece(0, 7, 'black-4', 'black', ['black'], defaultProps);
    game.spawnPiece(1, 0, 'black-5', 'black', ['black'], defaultProps);
    game.spawnPiece(1, 2, 'black-6', 'black', ['black'], defaultProps);
    game.spawnPiece(1, 4, 'black-7', 'black', ['black'], defaultProps);
    game.spawnPiece(1, 6, 'black-8', 'black', ['black'], defaultProps);
    game.spawnPiece(2, 1, 'black-9', 'black', ['black'], firstRowProps);
    game.spawnPiece(2, 3, 'black-10', 'black', ['black'], firstRowProps);
    game.spawnPiece(2, 5, 'black-11', 'black', ['black'], firstRowProps);
    game.spawnPiece(2, 7, 'black-12', 'black', ['black'], firstRowProps);


    game.spawnPiece(7, 6, 'white-1', 'white', ['white'], defaultProps);
    game.spawnPiece(7, 4, 'white-2', 'white', ['white'], defaultProps);
    game.spawnPiece(7, 2, 'white-3', 'white', ['white'], defaultProps);
    game.spawnPiece(7, 0, 'white-4', 'white', ['white'], defaultProps);
    game.spawnPiece(6, 7, 'white-5', 'white', ['white'], defaultProps);
    game.spawnPiece(6, 5, 'white-6', 'white', ['white'], defaultProps);
    game.spawnPiece(6, 3, 'white-7', 'white', ['white'], defaultProps);
    game.spawnPiece(6, 1, 'white-8', 'white', ['white'], defaultProps);
    game.spawnPiece(5, 6, 'white-9', 'white', ['white'], firstRowProps);
    game.spawnPiece(5, 4, 'white-10', 'white', ['white'], firstRowProps);
    game.spawnPiece(5, 2, 'white-11', 'white', ['white'], firstRowProps);
    game.spawnPiece(5, 0, 'white-12', 'white', ['white'], firstRowProps);

    game.setTurnSystem(initTurn);

    game.registerPlayer('white', player1Name, {pieces: 12, canMove: 4, canEat: 0});
    game.registerPlayer('black', player2Name, {pieces: 12, canMove: 4, canEat: 0});

    document.getElementById('namep1').innerHTML = player1Name;
    document.getElementById('namep2').innerHTML = player2Name;

    document.getElementById('white-turn').classList.remove('hide');
    document.getElementById('black-turn').classList.remove('hide');

    const hideTurn = initTurn === 'black' ? 'white-turn' : 'black-turn';
    document.getElementById(hideTurn).classList.add('hide');
}

function newGame(){
    initGame('white', 'Player 1', 'Player 2');
    selectedPiece = null;
    mustContinueJump = false;
}