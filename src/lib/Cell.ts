export default class Cell {
  x: number;
  y: number;
  hasBomb = false;
  bombsInVicinity = 0;
  canFlag: () => boolean;
  revealed = false;
  flagged = false;

  constructor(
    x: number,
    y: number,
    canFlag: () => boolean,
    hasBomb = false,
    bombsInVicinity = 0
  ) {
    this.x = x;
    this.y = y;
    this.hasBomb = hasBomb;
    this.bombsInVicinity = bombsInVicinity;
    this.canFlag = canFlag;
  }

  isSafe(): boolean {
    return !this.hasBomb && this.bombsInVicinity === 0;
  }

  isRevealable(): boolean {
    return !this.flagged;
  }

  reveal() {
    if (this.isRevealable()) {
      this.revealed = true;
    }
  }

  flag() {
    if (!this.revealed) {
      this.flagged = !this.flagged && this.canFlag();
    }
  }

  toString(): string {
    if (this.flagged) {
      return "#";
    } else if (!this.revealed) {
      return ".";
    } else if (this.hasBomb) {
      return "x";
    } else {
      return String(this.bombsInVicinity);
    }
  }
}
