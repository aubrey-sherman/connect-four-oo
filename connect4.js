class Game {
  constructor(height = 6, width = 7) {
    this.height = height;
    this.width = width;

    this.board = this.makeBoard();
    this.currPlayer = 1;
  }

  /** makeBoard: fill in global `board`:
  *    board = array of rows, each row is array of cells  (board[y][x])
  */
  makeBoard() {
    const newBoard = [];

    for (let y = 0; y < this.height; y++) {
      const emptyRow = Array(this.width).fill(null);
      newBoard[y] = emptyRow;
    }

    return newBoard;
  }

  /** switchCurrPlayer:
   *   checks the value of currPlayer and swaps the value to the other
   *   player instance
   */
  switchCurrPlayer() {
    this.currPlayer = this.currPlayer === 1 ? 2 : 1;
  }

  /** findSpotInCol: given column x, return y coordinate of furthest-down spot
  * (return null if filled)
  */
  findSpotInCol(x) {
    for (let y = this.height - 1; y >= 0; y--) {
      if (this.board[y][x] === null) {
        return y;
      }
    }
    return null;
  }

  /** checkForWin: check board cell-by-cell for "does a win start here?" */

  checkForWin() {

    function _win(cells) {
      // Check four cells to see if they're all color of current player
      //  - cells: list of four (y, x) cells
      //  - returns true if all are legal coordinates & all match currPlayer

      return cells.every(
        ([y, x]) =>
          y >= 0 &&
          y < this.height &&
          x >= 0 &&
          x < this.width &&
          this.board[y][x] === this.currPlayer
      );
    }

    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        // get "checklist" of 4 cells (starting here) for each of the different
        // ways to win
        const horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
        const vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
        const diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
        const diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];

        // find winner (only checking each win-possibility as needed)
        const checkCells = _win.bind(this);
        if (checkCells(horiz) || checkCells(vert) || checkCells(diagDR) || checkCells(diagDL)) {
          return true;
        }
      }
    }
    return false;
  }

}


export {
  Game
  /*WIDTH,
  HEIGHT,
  gameState,
  makeBoard,
  findSpotInCol,
  checkForWin,
  switchCurrPlayer,*/
};
