# 🎮 BoardEngine

A generic and modular JavaScript engine for developing board games on the web. Build interactive, turn-based board games with an easy-to-use API and flexible styling.

## ✨ Features

- **🎯 Easy Setup** - Create a board grid in just a few lines of code
- **👥 Player Management** - Register players and manage turns
- **♟️ Piece System** - Spawn, move, and remove pieces dynamically
- **🎨 Flexible Styling** - Customize cells and pieces with CSS classes
- **📱 Interactive** - Built-in cell click handling and event system
- **🔧 Modular** - Export and reuse components in your own projects
- **📦 Lightweight** - Minimal dependencies (Vite for building)

## 📦 Installation

### Via NPM

```bash
npm install duk-board-engine
```

### From Source

```bash
git clone <repository-url>
cd BoardEngine
npm install
```

## 🚀 Quick Start

### Basic Setup

```javascript
import { BoardEngine } from 'duk-board-engine';

// Create an 8x8 board
const game = new BoardEngine('board', 8, 8);

// Style the board
game.colorizeCells((row, col) => {
    return (row + col) % 2 === 0 ? 'light-cell' : 'dark-cell';
});

// Handle cell clicks
game.onCellClick = (row, col) => {
    console.log(`Cell clicked: ${row}, ${col}`);
};
```

### HTML Setup

```html
<!DOCTYPE html>
<html>
<head>
    <link rel="stylesheet" href="path/to/engine.css">
</head>
<body>
    <!-- This is where your board will be rendered -->
    <div id="board"></div>
    
    <script type="module" src="app.js"></script>
</body>
</html>
```

## 📚 API Documentation

### Constructor

```javascript
new BoardEngine(containerId, rows, cols)
```

Creates a new board instance.

- **containerId** (string): ID of the HTML element to contain the board
- **rows** (number): Number of rows in the board
- **cols** (number): Number of columns in the board

### Properties

- **container**: Reference to the DOM element containing the board
- **rows**: Number of rows
- **cols**: Number of columns
- **state**: 2D array representing the board state
- **players**: Object containing registered players
- **currentTurn**: ID of the current player's turn
- **onCellClick**: Callback function for cell clicks

### Player Management

#### `registerPlayer(playerId, playerName, attributes)`

Register a player in the game.

```javascript
game.registerPlayer('white', 'Player 1', { canEat: 0 });
game.registerPlayer('black', 'Player 2', { canEat: 0 });
```

#### `getPlayer(playerId)`

Retrieve a player's information.

```javascript
const player = game.getPlayer('white');
console.log(player.name); // 'Player 1'
```

#### `updatePlayer(playerId, attributeKey, newValue)`

Update a player's attribute.

```javascript
game.updatePlayer('white', 'canEat', 1);
```

### Turn System

#### `setTurnSystem(initialTurn)`

Set the initial turn.

```javascript
game.setTurnSystem('white');
```

#### `switchTurn(nextTurn)`

Switch to the next player's turn.

```javascript
game.switchTurn('black');
```

### Board Manipulation

#### `colorizeCells(callback)`

Apply CSS classes to cells based on a callback function.

```javascript
game.colorizeCells((row, col) => {
    if ((row + col) % 2 === 0) return 'light-marble';
    return 'dark-marble';
});
```

#### `getCellElement(row, col)`

Get the DOM element of a specific cell.

```javascript
const cellElement = game.getCellElement(0, 0);
```

### Piece Management

#### `spawnPiece(row, col, pieceId, playerOwner, customClasses, customProperties)`

Create a new piece on the board.

```javascript
game.spawnPiece(
    0, 0,                      // row, col
    'piece-1',                 // pieceId
    'white',                   // playerOwner
    ['king'],                  // customClasses (optional)
    { health: 100 }            // customProperties (optional)
);
```

#### `movePiece(fromRow, fromCol, toRow, toCol)`

Move a piece from one cell to another.

```javascript
if (game.movePiece(0, 0, 1, 1)) {
    console.log('Piece moved successfully');
}
```

#### `removePiece(row, col)`

Remove a piece from the board.

```javascript
if (game.removePiece(1, 1)) {
    console.log('Piece removed');
}
```

#### `clearBoard()`

Clear all pieces from the board and reset game state.

```javascript
game.clearBoard();
```

## 🎮 Examples

### Tic Tac Toe

A complete implementation of Tic Tac Toe is included in `examples/tictactoe/`.

**Features:**
- 3x3 grid
- Turn-based gameplay
- Win detection
- Game restart functionality

**Run the example:**
```bash
npm run dev
# Navigate to http://localhost:5173/examples/tictactoe/
```

### Checkers

A full implementation of Checkers is included in `examples/checkers/`.

**Features:**
- 8x8 board with alternating colors
- Piece selection and movement validation
- King promotion
- Capture/jump system
- Turn indicator
- Game restart

**Run the example:**
```bash
npm run dev
# Navigate to http://localhost:5173/examples/checkers/
```

## 🎨 Styling

The engine comes with a base stylesheet at `src/styles/engine.css`. Customize it with CSS variables:

```css
/* Override board dimensions */
.board-container {
    --board-rows: 8;
    --board-cols: 8;
}

/* Style cells */
.engine-cell {
    width: 60px;
    height: 60px;
    background-color: #f0f0f0;
    border: 1px solid #ccc;
}

.engine-cell.light-cell {
    background-color: #ffffff;
}

.engine-cell.dark-cell {
    background-color: #333333;
}

/* Style pieces */
.engine-piece {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: #ff0000;
}

.engine-piece.selected {
    box-shadow: 0 0 10px rgba(0, 0, 255, 0.5);
}
```

## 🛠️ Development

### Installation

```bash
npm install
```

### Development Server

Start the Vite development server:

```bash
npm run dev
```

The server will be available at `http://localhost:5173`.

### Build for Production

```bash
npm run build
```

Build output will be in the `dist/` directory.

### Preview Build

```bash
npm run preview
```

## 📖 Project Structure

```
BoardEngine/
├── src/
│   ├── index.js                 # Main export file
│   ├── core/
│   │   └── BoardEngine.js       # Core engine class
│   ├── components/
│   │   ├── Cell.js              # Cell component (extensible)
│   │   └── Piece.js             # Piece component (extensible)
│   └── styles/
│       └── engine.css           # Base styles
├── examples/
│   ├── tictactoe/               # Tic Tac Toe example
│   │   ├── index.html
│   │   ├── app.js
│   │   └── styles.css
│   └── checkers/                # Checkers example
│       ├── index.html
│       ├── app.js
│       └── styles.css
├── package.json
├── vite.config.js
└── README.md
```

## 💡 Usage Tips

1. **State Management**: The `state` property holds your game data. Use it to track piece information:
   ```javascript
   game.state[row][col] = { id: 'piece-1', owner: 'white', king: true };
   ```

2. **Custom Attributes**: Add any custom attributes to pieces using the `customProperties` parameter:
   ```javascript
   game.spawnPiece(0, 0, 'p1', 'white', [], { health: 100, attack: 10 });
   ```

3. **CSS Classes for Visual States**: Use CSS classes to represent game states:
   ```javascript
   game.getCellElement(row, col).classList.add('valid-move');
   ```

4. **Turn Management**: Keep track of turns with the built-in system:
   ```javascript
   game.setTurnSystem('white');
   game.switchTurn('black');
   ```

## 🤝 Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Diego Dukón** (dieduk89)

---

## 🎓 Getting Help

- Check the [examples](examples/) directory for sample implementations
- Review the API documentation above
- Inspect the base CSS file for styling reference

Happy game developing! 🎮✨
