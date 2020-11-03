export default class Cell {
  constructor(x, y, canFlag, hasBomb = false, bombsInVicinity = 0) {
    this.hasBomb = false;
    this.bombsInVicinity = 0;
    this.revealed = false;
    this.flagged = false;
    this.x = x;
    this.y = y;
    this.hasBomb = hasBomb;
    this.bombsInVicinity = bombsInVicinity;
    this.canFlag = canFlag;
  }
  isSafe() {
    return !this.hasBomb && this.bombsInVicinity === 0;
  }
  isRevealable() {
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
  toString() {
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
