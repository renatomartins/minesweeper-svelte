import Cell2 from "./Cell.js";
export default class Grid {
  constructor(grid, bombs) {
    this.gameOver = false;
    this.cells = grid.map((line, y) => line.map((hasBomb, x) => new Cell2(x, y, this.canFlag.bind(this), hasBomb, Grid.getBombsInVicinity(grid, x, y))));
    this.bombs = bombs;
  }
  static random(height, width, bombs) {
    let grid = Array.from(new Array(height), () => Array.from(new Array(width), () => false));
    let numberOfBombs = bombs;
    while (numberOfBombs > 0) {
      let x = Math.floor(Math.random() * width);
      let y = Math.floor(Math.random() * height);
      if (!grid[y][x]) {
        grid[y][x] = true;
        numberOfBombs--;
      }
    }
    return new Grid(grid, bombs);
  }
  get(x, y) {
    Grid.assertCoordinate(this.cells, x, y);
    return this.cells[y][x];
  }
  hasBomb(x, y) {
    return this.get(x, y).hasBomb;
  }
  reveal(x, y) {
    const cell = this.get(x, y);
    if (!cell.flagged && cell.hasBomb) {
      this.revealAllBombs();
      return this;
    }
    cell.reveal();
    if (cell.isSafe()) {
      const vicinity = Grid.getVicinity(this.cells, x, y);
      vicinity.forEach((neighbour) => {
        if (!neighbour.revealed) {
          this.reveal(neighbour.x, neighbour.y);
        }
      });
    }
    return this;
  }
  revealAllBombs() {
    this.cells.forEach((line) => line.forEach((cell) => {
      if (cell.hasBomb)
        cell.reveal();
    }));
    this.gameOver = true;
  }
  canFlag() {
    return this.getFlaggedCells().length < this.bombs;
  }
  flag(x, y) {
    this.get(x, y).flag();
    return this;
  }
  getTotalCells() {
    return this.flattenCells().length;
  }
  flattenCells() {
    return this.cells.reduce((flat, line) => flat.concat(line), []);
  }
  getFlaggedCells() {
    return this.flattenCells().filter((cell) => cell.flagged);
  }
  getMissingCells() {
    return this.flattenCells().filter((cell) => !cell.revealed && !cell.flagged);
  }
  isGameOver() {
    return this.gameOver;
  }
  toString() {
    return this.cells.map((line) => line.map((cell) => cell.toString()).join(" ")).join("\n");
  }
  static isValidCoordinate(grid, x, y) {
    return y >= 0 && y < grid.length && x >= 0 && x < grid[y].length;
  }
  static assertCoordinate(grid, x, y) {
    if (!Grid.isValidCoordinate(grid, x, y)) {
      throw new RangeError("coordinates out of range");
    }
  }
  static getVicinity(grid, x, y) {
    Grid.assertCoordinate(grid, x, y);
    let vicinity = [];
    for (let neighbourY = y - 1; neighbourY <= y + 1; neighbourY++) {
      for (let neighbourX = x - 1; neighbourX <= x + 1; neighbourX++) {
        if (Grid.isValidCoordinate(grid, neighbourX, neighbourY) && !(neighbourX === x && neighbourY === y)) {
          vicinity.push(grid[neighbourY][neighbourX]);
        }
      }
    }
    return vicinity;
  }
  static getBombsInVicinity(grid, x, y) {
    const vicinity = Grid.getVicinity(grid, x, y);
    return vicinity.filter((cell) => cell).length;
  }
}
