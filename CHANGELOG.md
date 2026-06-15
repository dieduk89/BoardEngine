# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2026-06-15

### Added

#### Core Engine Features
- Initial release of `BoardEngine` class for creating grid-based board games
- Support for configurable board dimensions (rows and columns)
- Dynamic board rendering with HTML5 and CSS Grid
- Cell state management with 2D array representation
- Cell click event handling system with `onCellClick` callback

#### Player Management System
- Player registration with `registerPlayer()` method
- Support for custom player attributes
- Player data retrieval with `getPlayer()` method
- Player attribute updates with `updatePlayer()` method
- Multi-player support infrastructure

#### Turn System
- Turn-based gameplay support with `setTurnSystem()` method
- Turn switching with `switchTurn()` method
- Current turn tracking via `currentTurn` property
- Player-specific game state management

#### Piece Management
- Piece spawning with `spawnPiece()` method
- Support for custom piece classes and properties
- Piece movement with `movePiece()` method
- Piece removal with `removePiece()` method
- Piece position tracking in game state
- Piece ownership (linked to players)

#### Board Customization
- Cell styling with `colorizeCells()` method
- Dynamic CSS class application based on position
- `getCellElement()` method for direct DOM access
- Base CSS stylesheet (`engine.css`) with customizable styling

#### Styling System
- CSS Grid-based board layout
- CSS variable support for board dimensions (`--board-rows`, `--board-cols`)
- Pre-defined CSS classes for cells (`.engine-cell`) and pieces (`.engine-piece`)
- Support for custom CSS classes on cells and pieces
- Extensible styling architecture

#### Build System
- Vite integration for development and production builds
- ES6 module exports
- Development server with hot module replacement
- Production build optimization

#### Example Implementations

**Tic Tac Toe**
- Complete 3x3 game implementation
- Turn-based gameplay (X and O)
- Win detection algorithm (rows, columns, diagonals)
- Tie game detection
- Game restart functionality
- Visual cell styling with marble theme
- Move validation

**Checkers**
- Complete 8x8 game implementation
- Alternating light/dark cell coloring with wood theme
- Piece selection and highlighting
- Move validation (single step and jump moves)
- Capture/jump system with piece removal
- King promotion on board edges
- Consecutive jump detection and enforcement
- Turn indicator display
- Game restart and new game functionality
- Player management for white and black pieces

#### Documentation
- Comprehensive README with API documentation
- Quick start guide
- Code examples for common use cases
- Project structure documentation
- Styling guide with CSS examples
- Development setup instructions

#### Export System
- Main `BoardEngine` class export from `src/index.js`
- `Piece` component export for potential future extension
- Module-based architecture for easy component reuse

### Project Metadata
- Package name: `duk-board-engine`
- Version: `1.0.0`
- License: MIT
- Author: Diego Dukón (dieduk89)
- Keywords: boardgame, engine, javascript, framework

### Development Scripts
- `npm run dev` - Start development server with Vite
- `npm run build` - Build for production
- `npm run preview` - Preview production build

---

[1.0.0]: https://github.com/dieduk89/BoardEngine/releases/tag/v1.0.0
