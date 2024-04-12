/** Class for a game of Connect 4.
 * height, width: nums that define size of board. Default params of 6 and 7.
 * player1, player2: objects holding each player's color for game.
 */
class Game {
  constructor(player1, player2, height = 6, width = 7) {
    this.height = height;
    this.width = width;
    this.player1 = player1;
    this.player2 = player2;
    this.currPlayer = player1;

    this.board = this.makeBoard();
    this.isGameOver = false;
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
    this.currPlayer = this.currPlayer === this.player1 ? this.player2 : this.player1;
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

    const _win = (cells) => {
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
    };

    // Old method -- Bound context to _win
    // instead of making it an arrow function.
    // would call checkCells() on line 79 in place of _win.
    // const checkCells = _win.bind(this);

    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        // get "checklist" of 4 cells (starting here) for each of the different
        // ways to win
        const horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
        const vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
        const diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
        const diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];

        // find winner (only checking each win-possibility as needed)
        if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
          return true;
        }
      }
    }
    return false;
  }
}

/** Class for a player in Connect 4 game. Takes in color name/hex code for
 * player piece, and name of player.
  */

class Player {
  constructor(playerColor, playerName) {
    this.playerColor = playerColor;
    this.playerName = playerName;
  }
}

export {
  Game,
  Player
  /*WIDTH,
  HEIGHT,
  gameState,
  makeBoard,
  findSpotInCol,
  checkForWin,
  switchCurrPlayer,*/
};
