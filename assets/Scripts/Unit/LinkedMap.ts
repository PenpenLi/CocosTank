export default class LinkedMap {
  private column: number = 0;
  private row: number = 0;
  private cells: number = 0;
  private player_1: number = 0;
  private player_2: number = 0;
  private linkedMap = {};
  private unionSets = null;
  constructor(column: number = 0, row: number = 0, player_1: number = 0, player_2: number = 0) {
    this.column = column;
    this.row = row;
    this.cells = column * row;
    this.player_1 = player_1;
    this.player_2 = player_2;
    this.unionSets = new UnionSet(this.cells);
  }
  generate() {
    while(!this.playerLinked()) {
      var cellPairs = this.pickRandomCellPairs();
      if(!this.unionSets.sameSet(cellPairs[0], cellPairs[1])) {
        this.unionSets.union(cellPairs[0], cellPairs[1]);
        this.addLinkedMap(cellPairs[0], cellPairs[1]);
      }
    }
    return this.linkedMap;
  }
  playerLinked() {
    return this.unionSets.sameSet(this.player_1, this.player_2);
  }
  pickRandomCellPairs() {
    var cell = Math.random() * this.cells >> 0;
    var neiborCells = [];
    var row = cell / this.column >> 0,
        column = cell % this.column;
    if(row !== 0) {
      neiborCells.push(cell - this.column);
    }
    if(row !== this.row - 1) {
      neiborCells.push(cell + this.column);
    }
    if(column !== 0) {
      neiborCells.push(cell - 1);
    }
    if(column !== this.column - 1) {
      neiborCells.push(cell + 1);
    }
    var index = Math.random() * neiborCells.length >> 0;
    return [cell, neiborCells[index]];
  }
  addLinkedMap(x, y) {
    if(!this.linkedMap[x]) this.linkedMap[x] = [];
    if(!this.linkedMap[y]) this.linkedMap[y] = [];
    if(this.linkedMap[x].indexOf(y) < 0) this.linkedMap[x].push(y);
    if(this.linkedMap[y].indexOf(x) < 0) this.linkedMap[y].push(x);
  }
}
class UnionSet {
  private setArray = null;
  constructor(size) {
    this.setArray = new Array(size);
    for (let i = this.setArray.length - 1; i >= 0; i--) {
      this.setArray[i] = -1;
    }
  }
  union(root1, root2) {
    if (this.setArray[root1] === -1 && this.setArray[root2] === -1) {
      this.setArray[root1] = root2;
      this.setArray[root2] = root1;
    } else if (this.setArray[root1] === -1 && this.setArray[root2] !== -1) {
      this.setArray[root1] = this.setArray[root2];
    } else if (this.setArray[root1] !== -1 && this.setArray[root2] === -1) {
      this.setArray[root2] = this.setArray[root1];
    } else {
      let v = this.setArray[root1];
      for (let i = 0; i < this.setArray.length; i++) {
        if (this.setArray[i] === v) {
          this.setArray[i] = this.setArray[root2]
        }
      }
    }
  }
  sameSet(x, y) {
    return this.setArray[x] !== -1 && this.setArray[y] !== -1 && this.setArray[x] === this.setArray[y]
  }
}