/* src/core/BoardEngine.js */
export class BoardEngine {
    
    constructor(containerId, rows, cols) {
        this.container = document.getElementById(containerId);
        this.rows = rows;
        this.cols = cols;
        this.state = Array(rows).fill(null).map(() => Array(cols).fill(null));
        this.onCellClick = null;
        this.players = {};
        this.currentTurn = null;
        this._buildBoard();
    }
    
    registerPlayer(playerId, playerName, attributes = {}) {
        this.players[playerId] = {
            name: playerName,
            ...attributes
        };
    }

    getPlayer(playerId) {
        return this.players[playerId] || null;
    }

    updatePlayer(playerId, attributeKey, newValue) {
        if (this.players[playerId]) {
            this.players[playerId][attributeKey] = newValue;
            return true;
        }
        return false;
    }

    setTurnSystem(initialTurn) {
        this.currentTurn = initialTurn;
    }

    
    switchTurn(nextTurn) {
        this.currentTurn = nextTurn;
    }

    _buildBoard() {
        this.container.style.setProperty('--board-rows', this.rows);
        this.container.style.setProperty('--board-cols', this.cols);
        this.container.classList.add('board-container');

        for (let r = 0; r < this.rows; r++) {
            for (let c = 0; c < this.cols; c++) {
                const cell = document.createElement('div');
                cell.classList.add('engine-cell');
                cell.dataset.row = r;
                cell.dataset.col = c;

                cell.addEventListener('click', (e) => this._handleCellClick(e));
                this.container.appendChild(cell);
            }
        }
    }

    _handleCellClick(event) {
        const row = parseInt(event.currentTarget.dataset.row);
        const col = parseInt(event.currentTarget.dataset.col);
        
        if (this.onCellClick) {
            this.onCellClick(row, col);
        }
    }

    colorizeCells(callback) {
        const cells = this.container.querySelectorAll('.engine-cell');
        cells.forEach(cell => {
            const row = parseInt(cell.dataset.row);
            const col = parseInt(cell.dataset.col);
            const className = callback(row, col);
            if (className) cell.classList.add(className);
        });
    }

    getCellElement(row, col) {
        return this.container.querySelector(`[data-row="${row}"][data-col="${col}"]`);
    }

    spawnPiece(row, col, pieceId, playerOwner, customClasses = [], customProperties = {}) {
        const cell = this.getCellElement(row, col);
        if (!cell) return null;

        const piece = document.createElement('div');
        piece.id = pieceId;
        piece.classList.add('engine-piece');
        customClasses.forEach(cls => piece.classList.add(cls));
        cell.appendChild(piece);

        this.state[row][col] = { id: pieceId, owner: playerOwner, ...customProperties };
        return piece;
    }

    removePiece(row, col) {
        const cell = this.getCellElement(row, col);
        const piece = cell?.querySelector('.engine-piece');

        if (piece) {
            piece.remove(); 
            this.state[row][col] = null; 
            return true; 
        }
        
        return false; 
    }

    movePiece(fromRow, fromCol, toRow, toCol) {
        const fromCell = this.getCellElement(fromRow, fromCol);
        const toCell = this.getCellElement(toRow, toCol);
        const piece = fromCell?.querySelector('.engine-piece');

        if (piece && toCell) {
            toCell.appendChild(piece);
            this.state[toRow][toCol] = this.state[fromRow][fromCol];
            this.state[fromRow][fromCol] = null;
            return true;
        }
        return false;
    }

    clearBoard() {
        const pieces = this.container.querySelectorAll('.engine-piece');
        pieces.forEach(piece => piece.remove());

        for (let r = 0; r < this.rows; r++) {
            for (let c = 0; c < this.cols; c++) {
                this.state[r][c] = null;
            }
        }
        
        this.players = {};
        this.currentTurn = null;
    }
}
