import Cell from "./Cell";

export default class Grid {
  cells: Cell[][];
  bombs: number;
  gameOver = false;

  static random(height: number, width: number, bombs: number): Grid {
    let grid = Array.from(new Array<boolean>(height), () =>
      Array.from(new Array<boolean>(width), () => false)
    );
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

  constructor(grid: boolean[][], bombs: number) {
    this.cells = grid.map((line, y) =>
      line.map(
        (hasBomb, x) =>
          new Cell(
            x,
            y,
            this.canFlag.bind(this),
            hasBomb,
            Grid.getBombsInVicinity(grid, x, y)
          )
      )
    );
    this.bombs = bombs;
  }

  get(x: number, y: number) {
    Grid.assertCoordinate(this.cells, x, y);
    return this.cells[y][x];
  }

  hasBomb(x: number, y: number): boolean {
    return this.get(x, y).hasBomb;
  }

  reveal(x: number, y: number): Grid {
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
    this.cells.forEach((line) =>
      line.forEach((cell) => {
        if (cell.hasBomb) cell.reveal();
      })
    );
    this.gameOver = true;
  }

  canFlag(): boolean {
    return this.getFlaggedCells().length < this.bombs;
  }

  flag(x: number, y: number): Grid {
    this.get(x, y).flag();
    return this;
  }

  getTotalCells(): number {
    return this.flattenCells().length;
  }

  flattenCells(): Cell[] {
    return this.cells.reduce((flat, line) => flat.concat(line), []);
  }

  getFlaggedCells(): Cell[] {
    return this.flattenCells().filter((cell) => cell.flagged);
  }

  getMissingCells(): Cell[] {
    return this.flattenCells().filter(
      (cell) => !cell.revealed && !cell.flagged
    );
  }

  isGameOver(): boolean {
    return this.gameOver;
  }

  toString(): string {
    return this.cells
      .map((line) => line.map((cell) => cell.toString()).join(" "))
      .join("\n");
  }

  private static isValidCoordinate<T>(
    grid: T[][],
    x: number,
    y: number
  ): boolean {
    return y >= 0 && y < grid.length && x >= 0 && x < grid[y].length;
  }

  private static assertCoordinate<T>(grid: T[][], x: number, y: number) {
    if (!Grid.isValidCoordinate(grid, x, y)) {
      throw new RangeError("coordinates out of range");
    }
  }

  static getVicinity<T>(grid: T[][], x: number, y: number): T[] {
    Grid.assertCoordinate(grid, x, y);
    let vicinity = [];
    for (let neighbourY = y - 1; neighbourY <= y + 1; neighbourY++) {
      for (let neighbourX = x - 1; neighbourX <= x + 1; neighbourX++) {
        if (
          Grid.isValidCoordinate(grid, neighbourX, neighbourY) &&
          !(neighbourX === x && neighbourY === y)
        ) {
          vicinity.push(grid[neighbourY][neighbourX]);
        }
      }
    }
    return vicinity;
  }

  static getBombsInVicinity(grid: boolean[][], x: number, y: number): number {
    const vicinity = Grid.getVicinity(grid, x, y);
    return vicinity.filter((cell) => cell).length;
  }
}
