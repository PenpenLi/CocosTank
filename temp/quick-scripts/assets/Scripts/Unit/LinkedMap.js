(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Scripts/Unit/LinkedMap.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '2422a/26gRHUKNZEy4tBNpQ', 'LinkedMap', __filename);
// Scripts/Unit/LinkedMap.ts

Object.defineProperty(exports, "__esModule", { value: true });
var LinkedMap = /** @class */ (function () {
    function LinkedMap(column, row, player_1, player_2) {
        if (column === void 0) { column = 0; }
        if (row === void 0) { row = 0; }
        if (player_1 === void 0) { player_1 = 0; }
        if (player_2 === void 0) { player_2 = 0; }
        this.column = 0;
        this.row = 0;
        this.cells = 0;
        this.player_1 = 0;
        this.player_2 = 0;
        this.linkedMap = {};
        this.unionSets = null;
        this.setArray = null;
        this.column = column;
        this.row = row;
        this.cells = column * row;
        this.player_1 = player_1;
        this.player_2 = player_2;
        this.unionSets = new UnionSet(this.cells);
    }
    LinkedMap.prototype.generate = function () {
        while (!this.playerLinked()) {
            var cellPairs = this.pickRandomCellPairs();
            if (!this.unionSets.sameSet(cellPairs[0], cellPairs[1])) {
                this.unionSets.union(cellPairs[0], cellPairs[1]);
                this.addLinkedMap(cellPairs[0], cellPairs[1]);
            }
        }
        this.setArray = this.unionSets.setArray;
        return this.linkedMap;
    };
    LinkedMap.prototype.playerLinked = function () {
        return this.unionSets.sameSet(this.player_1, this.player_2);
    };
    LinkedMap.prototype.pickRandomCellPairs = function () {
        var cell = Math.random() * this.cells >> 0;
        var neiborCells = [];
        var row = cell / this.column >> 0, column = cell % this.column;
        if (row !== 0) {
            neiborCells.push(cell - this.column);
        }
        if (row !== this.row - 1) {
            neiborCells.push(cell + this.column);
        }
        if (column !== 0) {
            neiborCells.push(cell - 1);
        }
        if (column !== this.column - 1) {
            neiborCells.push(cell + 1);
        }
        var index = Math.random() * neiborCells.length >> 0;
        return [cell, neiborCells[index]];
    };
    LinkedMap.prototype.addLinkedMap = function (x, y) {
        if (!this.linkedMap[x])
            this.linkedMap[x] = [];
        if (!this.linkedMap[y])
            this.linkedMap[y] = [];
        if (this.linkedMap[x].indexOf(y) < 0)
            this.linkedMap[x].push(y);
        if (this.linkedMap[y].indexOf(x) < 0)
            this.linkedMap[y].push(x);
    };
    return LinkedMap;
}());
exports.default = LinkedMap;
var UnionSet = /** @class */ (function () {
    function UnionSet(size) {
        this.setArray = null;
        this.setArray = new Array(size);
        for (var i = this.setArray.length - 1; i >= 0; i--) {
            this.setArray[i] = -1;
        }
    }
    UnionSet.prototype.union = function (root1, root2) {
        if (this.setArray[root1] === -1 && this.setArray[root2] === -1) {
            this.setArray[root1] = root2;
            this.setArray[root2] = root1;
        }
        else if (this.setArray[root1] === -1 && this.setArray[root2] !== -1) {
            this.setArray[root1] = this.setArray[root2];
        }
        else if (this.setArray[root1] !== -1 && this.setArray[root2] === -1) {
            this.setArray[root2] = this.setArray[root1];
        }
        else {
            var v = this.setArray[root1];
            for (var i = 0; i < this.setArray.length; i++) {
                if (this.setArray[i] === v) {
                    this.setArray[i] = this.setArray[root2];
                }
            }
        }
    };
    UnionSet.prototype.sameSet = function (x, y) {
        return this.setArray[x] !== -1 && this.setArray[y] !== -1 && this.setArray[x] === this.setArray[y];
    };
    return UnionSet;
}());

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=LinkedMap.js.map
        