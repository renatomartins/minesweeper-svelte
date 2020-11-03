import Cell from "./Cell";

describe("Cell", () => {
  const canFlag = () => true;

  it("checks if cell is safe", () => {
    const surroundedCell = new Cell(0, 0, canFlag, false, 3);
    const bombCell = new Cell(0, 0, canFlag, true, 0);
    const safeCell = new Cell(0, 0, canFlag, false, 0);
    expect(surroundedCell.isSafe()).toBe(false);
    expect(bombCell.isSafe()).toBe(false);
    expect(safeCell.isSafe()).toBe(true);
  });

  it("toggles flag", () => {
    const cell = new Cell(0, 0, canFlag, false, 0);
    expect(cell.flagged).toBe(false);
    cell.flag();
    expect(cell.flagged).toBe(true);
    cell.flag();
    expect(cell.flagged).toBe(false);
  });

  it("cannot be revealed if it's flagged", () => {
    const cell = new Cell(0, 0, canFlag, false, 0);
    cell.flag();
    expect(cell.flagged).toBe(true);
    expect(cell.isRevealable()).toBe(false);
    cell.reveal();
    expect(cell.revealed).toBe(false);
    cell.flag();
    expect(cell.flagged).toBe(false);
    expect(cell.isRevealable()).toBe(true);
    cell.reveal();
    expect(cell.revealed).toBe(true);
  });

  it("cannot flag if the callback doesn't allow it", () => {
    const cell = new Cell(0, 0, () => false, false, 0);
    expect(cell.flagged).toBe(false);
    cell.flag();
    expect(cell.flagged).toBe(false);
  });
});
