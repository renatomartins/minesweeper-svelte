import Grid from "./Grid";

describe("Grid", () => {
  const _ = false;
  const x = true;
  const numberOfBombs = 4;
  const data = [
    [_, _, x, _],
    [_, _, x, x],
    [_, _, _, _],
    [_, _, _, x],
  ];

  it("generates random grid", () => {
    const grid: Grid = Grid.random(4, 6, 7);
    expect(grid.cells).toHaveLength(4);
    expect(grid.cells[0]).toHaveLength(6);
    expect(grid.flattenCells()).toHaveLength(24);
    expect(grid.flattenCells().filter((c) => c.hasBomb)).toHaveLength(7);
  });

  it("checks a given cell for bomb", () => {
    const grid = new Grid(data, numberOfBombs);
    expect(grid.hasBomb(0, 0)).toBe(false);
    expect(grid.hasBomb(3, 1)).toBe(true);
    expect(grid.hasBomb(2, 2)).toBe(false);
    expect(() => grid.hasBomb(-1, 0)).toThrowError(RangeError);
    expect(() => grid.hasBomb(0, -1)).toThrowError(RangeError);
    expect(() => grid.hasBomb(4, 0)).toThrowError(RangeError);
    expect(() => grid.hasBomb(0, 4)).toThrowError(RangeError);
  });

  it("gets vicinity", () => {
    expect(Grid.getVicinity(data, 0, 0)).toStrictEqual([_, _, _]);
    const got = Grid.getVicinity(data, 1, 1);
    expect(got).toStrictEqual([_, _, x, _, x, _, _, _]);
    expect(Grid.getVicinity(data, 2, 3)).toStrictEqual([_, _, _, _, x]);
    expect(Grid.getVicinity(data, 3, 3)).toStrictEqual([_, _, _]);
    expect(() => Grid.getVicinity(data, -1, 0)).toThrowError(RangeError);
    expect(() => Grid.getVicinity(data, 0, -1)).toThrowError(RangeError);
    expect(() => Grid.getVicinity(data, 4, 0)).toThrowError(RangeError);
    expect(() => Grid.getVicinity(data, 0, 4)).toThrowError(RangeError);
  });

  it("detects number of bombs in vicinity of a cell", () => {
    const grid = new Grid(data, numberOfBombs);
    expect(Grid.getBombsInVicinity(data, 0, 0)).toBe(0);
    expect(Grid.getBombsInVicinity(data, 1, 0)).toBe(2);
    expect(Grid.getBombsInVicinity(data, 2, 1)).toBe(2);
    expect(Grid.getBombsInVicinity(data, 3, 0)).toBe(3);
    expect(() => Grid.getBombsInVicinity(data, -1, 0)).toThrowError(RangeError);
    expect(() => Grid.getBombsInVicinity(data, 0, -1)).toThrowError(RangeError);
    expect(() => Grid.getBombsInVicinity(data, 4, 0)).toThrowError(RangeError);
    expect(() => Grid.getBombsInVicinity(data, 0, 4)).toThrowError(RangeError);
  });

  it("starts with unknown state for all cells", () => {
    const grid = new Grid(data, numberOfBombs);
    expect(grid.toString()).toBe(". . . .\n. . . .\n. . . .\n. . . .");
  });

  it("reveals a cell", () => {
    const grid = new Grid(data, numberOfBombs);
    grid.reveal(2, 2);
    expect(grid.toString()).toBe(". . . .\n. . . .\n. . 3 .\n. . . .");
    grid.reveal(3, 2);
    expect(grid.toString()).toBe(". . . .\n. . . .\n. . 3 3\n. . . .");
    grid.reveal(1, 1);
    expect(grid.toString()).toBe(". . . .\n. 2 . .\n. . 3 3\n. . . .");
    grid.reveal(3, 0);
    expect(grid.toString()).toBe(". . . 3\n. 2 . .\n. . 3 3\n. . . .");
  });

  it("flags and unflags a cell", () => {
    const grid = new Grid(data, numberOfBombs);
    grid.flag(0, 0);
    grid.flag(1, 0);
    expect(grid.toString()).toBe("# # . .\n. . . .\n. . . .\n. . . .");
    grid.flag(0, 0);
    grid.reveal(1, 1);
    grid.flag(1, 1);
    expect(grid.toString()).toBe(". # . .\n. 2 . .\n. . . .\n. . . .");
  });

  it("counts total cells", () => {
    const grid = new Grid(data, numberOfBombs);
    expect(grid.getTotalCells()).toBe(16);
  });

  it("gets flagged cells", () => {
    const grid = new Grid(data, numberOfBombs);
    expect(grid.getFlaggedCells()).toHaveLength(0);
    grid.flag(0, 0);
    expect(grid.getFlaggedCells()).toHaveLength(1);
    grid.flag(0, 1);
    grid.flag(0, 2);
    expect(grid.getFlaggedCells()).toHaveLength(3);
  });

  it("gets missing cells", () => {
    const grid = new Grid(data, numberOfBombs);
    expect(grid.getMissingCells()).toHaveLength(16);
    grid.reveal(0, 0);
    expect(grid.getMissingCells()).toHaveLength(6);
    grid.flag(3, 0);
    expect(grid.getMissingCells()).toHaveLength(5);
  });

  it("recursively reveals cells without bombs in vicinity", () => {
    const grid = new Grid(data, numberOfBombs);
    grid.reveal(0, 0);
    expect(grid.toString()).toBe("0 2 . .\n0 2 . .\n0 1 3 .\n0 0 1 .");
  });

  it("reveals all bombs when a bomb is revealed", () => {
    const grid = new Grid(data, numberOfBombs);
    grid.reveal(1, 1);
    grid.reveal(2, 0);
    expect(grid.toString()).toBe(". . x .\n. 2 x x\n. . . .\n. . . x");
  });

  it("informs if game is over", () => {
    const grid = new Grid(data, numberOfBombs);
    expect(grid.isGameOver()).toBe(false);
    grid.reveal(2, 1);
    expect(grid.isGameOver()).toBe(true);
  });
});
