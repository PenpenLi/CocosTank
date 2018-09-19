require = function() {
  function r(e, n, t) {
    function o(i, f) {
      if (!n[i]) {
        if (!e[i]) {
          var c = "function" == typeof require && require;
          if (!f && c) return c(i, !0);
          if (u) return u(i, !0);
          var a = new Error("Cannot find module '" + i + "'");
          throw a.code = "MODULE_NOT_FOUND", a;
        }
        var p = n[i] = {
          exports: {}
        };
        e[i][0].call(p.exports, function(r) {
          var n = e[i][1][r];
          return o(n || r);
        }, p, p.exports, r, e, n, t);
      }
      return n[i].exports;
    }
    for (var u = "function" == typeof require && require, i = 0; i < t.length; i++) o(t[i]);
    return o;
  }
  return r;
}()({
  BattleCtrl: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "8ba1eRX5hVFTbZGiR6vdZqk", "BattleCtrl");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var LinkedMap_1 = require("../Unit/LinkedMap");
    var WebSocketManage_1 = require("../Unit/WebSocketManage");
    var HomePageCtrl_1 = require("./HomePageCtrl");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var BattleCtrl = function(_super) {
      __extends(BattleCtrl, _super);
      function BattleCtrl() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.wall_column_1 = null;
        _this.wall_row_1 = null;
        _this.wall_column_2 = null;
        _this.wall_row_2 = null;
        _this.wall_column_3 = null;
        _this.wall_row_3 = null;
        _this.BattleRegion = null;
        _this.TopCell = null;
        _this.BottomCell = null;
        _this.LeftCell = null;
        _this.RightCell = null;
        _this.player1 = null;
        _this.player2 = null;
        _this.fllower_1 = null;
        _this.fllower_2 = null;
        _this.fllower_3 = null;
        _this.horn_1 = null;
        _this.horn_2 = null;
        _this.horn_3 = null;
        _this.operation = null;
        _this.webScoket = null;
        _this.battleData = [ {
          row: 3,
          column: 7,
          scale: 1
        }, {
          row: 4,
          column: 9,
          scale: .775
        }, {
          row: 5,
          column: 11,
          scale: .645
        } ];
        _this.activeBattleData = null;
        _this.cells = 0;
        _this.externalResources = [];
        _this.activeExternalData = null;
        _this.linkedMap = {};
        _this.player = [];
        _this.Exterrandom = 0;
        _this.playerName = "tank_1";
        _this.setArray = null;
        _this.propsInterval = [];
        _this.props = null;
        _this.MainPlayerHeadImg = null;
        _this.MainPlayerName = null;
        _this.MainPlayerScore = null;
        _this.VicePlayerHeadImg = null;
        _this.VicePlayerName = null;
        _this.VicePlayerScore = null;
        _this.GameStatus = null;
        _this.defeat = null;
        _this.victory = null;
        _this.ready = null;
        _this.propsTime = null;
        _this.propsList = [ "prop_1", "prop_2", "prop_3", "prop_4", "prop_5", "prop_6", "prop_7" ];
        return _this;
      }
      BattleCtrl.prototype.start = function() {
        this.webScoket = cc.find("WebScoket").getComponent(WebSocketManage_1.default);
        this.initBattleData();
      };
      BattleCtrl.prototype.initBattleData = function() {
        var self = this;
        this.externalResources = [ {
          cellColumn: this.wall_column_1,
          cellRow: this.wall_row_1,
          flower: this.fllower_1,
          horn: this.horn_1,
          bg: "floor_1"
        }, {
          cellColumn: this.wall_column_2,
          cellRow: this.wall_row_2,
          flower: this.fllower_2,
          horn: this.horn_2,
          bg: "floor_2"
        }, {
          cellColumn: this.wall_column_3,
          cellRow: this.wall_row_3,
          flower: this.fllower_3,
          horn: this.horn_3,
          bg: "floor_3"
        } ];
        var random = Math.random() * this.battleData.length >> 0;
        this.activeBattleData = this.battleData[random];
        this.Exterrandom = Math.random() * this.externalResources.length >> 0;
        this.activeExternalData = this.externalResources[this.Exterrandom];
        this.cells = this.activeBattleData.column * this.activeBattleData.row;
        this.initPlayerPoint();
      };
      BattleCtrl.prototype.initPlayerPoint = function() {
        this.player = [];
        this.player.push({
          point: Math.random() * this.cells >> 0,
          rotation: 180 * Math.random() >> 0
        });
        this.player.push({
          point: Math.random() * this.cells >> 0,
          rotation: 180 * Math.random() >> 0
        });
        this.player[0].point === this.player[1].point && this.initPlayerPoint();
      };
      BattleCtrl.prototype.setCellData = function(type, scale) {
        if (0 === type) {
          var node = cc.instantiate(this.activeExternalData.cellColumn);
          node.scale = scale;
          return node;
        }
        var node = cc.instantiate(this.activeExternalData.cellRow);
        node.scale = scale;
        return node;
      };
      BattleCtrl.prototype.setHornData = function(scale, rotation) {
        var horn = new cc.Node();
        horn.addComponent(cc.Sprite).spriteFrame = this.activeExternalData.horn;
        horn.scale = scale;
        horn.rotation = rotation;
        return horn;
      };
      BattleCtrl.prototype.setFlowerData = function(scale, rotation) {
        var flower = new cc.Node();
        flower.addComponent(cc.Sprite).spriteFrame = this.activeExternalData.flower;
        flower.scale = scale;
        flower.rotation = rotation;
        return flower;
      };
      BattleCtrl.prototype.externalCell = function() {
        var self = this;
        cc.loader.loadRes(self.activeExternalData.bg, cc.SpriteFrame, function(err, spriteFrame) {
          self.BattleRegion.getComponent(cc.Sprite).spriteFrame = spriteFrame;
        });
        var externalCellWidth = this.TopCell.width / this.activeBattleData.column;
        var scale = externalCellWidth / 194 / .8814;
        for (var i = 0; i < this.activeBattleData.column; i++) {
          var node = this.setCellData(0, scale);
          node.setPosition(externalCellWidth * i - this.BottomCell.width / 2 + externalCellWidth / 2, 0);
          this.BottomCell.addChild(node);
          var horn_1 = this.setHornData(scale, 180);
          horn_1.setPosition(-this.BottomCell.width / 2 - horn_1.width * scale / 6, -horn_1.height * scale / 3.5);
          this.BottomCell.addChild(horn_1);
          horn_1 = this.setHornData(scale, 90);
          horn_1.setPosition(this.BottomCell.width / 2 + horn_1.width * scale / 1.5, -horn_1.height * scale / 3.5);
          this.BottomCell.addChild(horn_1);
          var flower = this.setFlowerData(scale, 180);
          flower.setPosition(externalCellWidth * i - this.BottomCell.width / 2 + externalCellWidth / 2 + 10 * scale, -flower.height * scale / 2);
          this.BottomCell.addChild(flower);
          horn_1 = this.setHornData(scale, 270);
          horn_1.setPosition(-this.TopCell.width / 2 - horn_1.width * scale / 5, horn_1.height * scale / 2);
          this.TopCell.addChild(horn_1);
          horn_1 = this.setHornData(scale, 0);
          horn_1.setPosition(this.TopCell.width / 2 + horn_1.width * scale / 1.7, horn_1.height * scale / 2);
          this.TopCell.addChild(horn_1);
          node = this.setCellData(0, scale);
          node.setPosition(externalCellWidth * i - this.TopCell.width / 2 + externalCellWidth / 2, 0);
          this.TopCell.addChild(node);
          flower = this.setFlowerData(scale, 0);
          flower.setPosition(externalCellWidth * i - this.TopCell.width / 2 + externalCellWidth / 2 + 10 * scale, flower.height * scale / 2 + node.height * scale / 2);
          this.TopCell.addChild(flower);
        }
        var externalCellHeigth = this.LeftCell.height / this.activeBattleData.row;
        scale = externalCellHeigth / 194 / .88;
        for (var i = 0; i < this.activeBattleData.row; i++) {
          var flower = this.setFlowerData(scale, 270);
          flower.setPosition(-flower.height * scale / 2 + .5, externalCellHeigth * i - this.LeftCell.height / 2 + externalCellHeigth / 2 + 12 * scale);
          this.LeftCell.addChild(flower);
          var node = this.setCellData(1, scale);
          node.setPosition(0, externalCellHeigth * i - this.LeftCell.height / 2 + externalCellHeigth / 2);
          this.LeftCell.addChild(node);
          node = this.setCellData(1, scale);
          node.setPosition(0, externalCellHeigth * i - this.RightCell.height / 2 + externalCellHeigth / 2);
          this.RightCell.addChild(node);
          flower = this.setFlowerData(scale, 90);
          flower.setPosition(flower.height * scale / 2 + node.width * scale / 2, externalCellHeigth * i - this.RightCell.height / 2 + externalCellHeigth / 2 + 11 * scale);
          this.RightCell.addChild(flower);
        }
      };
      BattleCtrl.prototype.generateRegion = function(i) {
        var probability = .9;
        var row = i / this.activeBattleData.column >> 0, column = i % this.activeBattleData.column;
        var layoutNode = new cc.Node("layoutNode");
        var cellWidth = Math.floor(this.BattleRegion.width / this.activeBattleData.column * 100) / 100;
        var cellHeight = this.BattleRegion.height / this.activeBattleData.row;
        layoutNode.addComponent(cc.Layout);
        layoutNode.setContentSize(cellWidth, cellHeight);
        this.BattleRegion.addChild(layoutNode);
        if (column !== this.activeBattleData.column - 1 && (!this.linkedMap[i] || this.linkedMap[i].indexOf(i + 1) < 0)) {
          var scale = cellHeight / 194 / .8814;
          var rightCell = cc.instantiate(this.activeExternalData.cellRow);
          layoutNode.addChild(rightCell);
          rightCell.scale = scale;
          rightCell.setPosition(this.BattleRegion.width / this.activeBattleData.column * (column + 1), -rightCell.height * scale / 2 - row * rightCell.height * scale + rightCell.height * scale * .1185 * row + 10 * scale);
        }
        if (row !== this.activeBattleData.row - 1 && (!this.linkedMap[i] || this.linkedMap[i].indexOf(i + this.activeBattleData.column) < 0)) {
          var scale = cellWidth / 194 / .8814;
          var bottomCell = cc.instantiate(this.activeExternalData.cellColumn);
          layoutNode.addChild(bottomCell);
          bottomCell.scale = scale;
          bottomCell.setPosition(this.BattleRegion.width / this.activeBattleData.column * (column + 1) - bottomCell.width * scale / 2 + 7 * scale, -this.BattleRegion.height / this.activeBattleData.row * (row + 1));
        }
        if (i === this.player[0].point) {
          var player1 = cc.instantiate(this.player1);
          player1.scale = this.activeBattleData.scale;
          player1.rotation = this.player[0].rotation;
          player1.zIndex = 10;
          player1.setPosition(this.BattleRegion.width / this.activeBattleData.column * column + this.BattleRegion.width / this.activeBattleData.column / 2, -this.BattleRegion.height / this.activeBattleData.row * row - this.BattleRegion.height / this.activeBattleData.row / 2);
          layoutNode.addChild(player1);
        }
        if (i === this.player[1].point) {
          var player2 = cc.instantiate(this.player2);
          player2.scale = this.activeBattleData.scale;
          player2.rotation = this.player[1].rotation;
          player2.zIndex = 10;
          player2.setPosition(this.BattleRegion.width / this.activeBattleData.column * column + this.BattleRegion.width / this.activeBattleData.column / 2, -this.BattleRegion.height / this.activeBattleData.row * row - this.BattleRegion.height / this.activeBattleData.row / 2);
          layoutNode.addChild(player2);
        }
      };
      BattleCtrl.prototype.onBack = function() {
        this.node.destroy();
        this.webScoket.sendMessage({
          msg: 28
        });
        clearInterval(this.propsTime);
      };
      BattleCtrl.prototype.genearteProp = function(point, rotation, type) {
        var prop = cc.instantiate(this.props);
        cc.loader.loadRes(type, cc.SpriteFrame, function(err, spriteFrame) {
          prop.getComponent(cc.Sprite).spriteFrame = spriteFrame;
        });
        prop.zIndex = 5;
        prop.rotation = rotation;
        prop.getComponent(cc.Sprite).spriteFrame.name = type;
        prop.scale = this.activeBattleData.scale;
        this.BattleRegion.children[point].addChild(prop);
      };
      BattleCtrl.prototype.propsRefreshInterval = function() {
        var _this = this;
        this.propsInterval = [];
        clearInterval(this.propsTime);
        var interval = this.setArray[this.player[0].point];
        for (var i = 0; i < this.setArray.length; i++) this.setArray[i] === interval && this.propsInterval.push(i);
        this.propsTime = setInterval(function() {
          var point = _this.propsInterval[Math.random() * _this.propsInterval.length >> 0];
          var rotation = 360 * Math.random() >> 0;
          var propType = _this.propsList[Math.random() * _this.propsList.length >> 0];
          _this.webScoket.sendMessage({
            msg: 29,
            data: {
              point: point,
              rotation: rotation,
              propType: propType
            }
          });
          _this.genearteProp(point, rotation, propType);
        }, 5e3);
      };
      BattleCtrl.prototype.onClickRestart = function() {
        this.webScoket.sendMessage({
          msg: 27
        });
        this.GameStatus.active = false;
        this.ready.active = true;
      };
      BattleCtrl.prototype.initScore = function(type) {
        var self = this;
        var homePageCtrl = cc.find("Canvas/HomePagePanel").getComponent(HomePageCtrl_1.default);
        var userData = homePageCtrl.UserData;
        var enemyUserData = homePageCtrl.enemyUserData;
        if (0 === type) {
          cc.loader.load({
            url: userData.headimgurl,
            type: "png"
          }, function(err, texture) {
            self.MainPlayerHeadImg.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(texture);
          });
          self.MainPlayerName.getComponent(cc.Label).string = userData.nickname;
          cc.loader.load({
            url: enemyUserData.headimgurl,
            type: "png"
          }, function(err, texture) {
            self.VicePlayerHeadImg.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(texture);
          });
          self.VicePlayerName.getComponent(cc.Label).string = enemyUserData.nickname;
        } else {
          cc.loader.load({
            url: userData.headimgurl,
            type: "png"
          }, function(err, texture) {
            self.VicePlayerHeadImg.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(texture);
          });
          self.VicePlayerName.getComponent(cc.Label).string = userData.nickname;
          cc.loader.load({
            url: enemyUserData.headimgurl,
            type: "png"
          }, function(err, texture) {
            self.MainPlayerHeadImg.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(texture);
          });
          self.MainPlayerName.getComponent(cc.Label).string = enemyUserData.nickname;
        }
      };
      BattleCtrl.prototype._onRemoveNode = function() {
        this.TopCell.removeAllChildren();
        this.LeftCell.removeAllChildren();
        this.RightCell.removeAllChildren();
        this.BottomCell.removeAllChildren();
        this.BattleRegion.removeAllChildren();
      };
      BattleCtrl.prototype.restart = function() {
        this._onRemoveNode();
        if ("tank_2" !== this.playerName) {
          this.initBattleData();
          this.generateMap();
        }
      };
      BattleCtrl.prototype.gameOver = function(type) {
        this.GameStatus.getChildByName("bunko").getComponent(cc.Sprite).spriteFrame = 0 === type ? this.defeat : this.victory;
        this.GameStatus.active = true;
        clearInterval(this.propsTime);
      };
      BattleCtrl.prototype.scoreCount = function(type) {
        if (0 === type) {
          var score = this.MainPlayerScore.getComponent(cc.Label).string;
          this.MainPlayerScore.getComponent(cc.Label).string = parseInt(score) + 1 + "";
        } else {
          var score = this.VicePlayerScore.getComponent(cc.Label).string;
          this.VicePlayerScore.getComponent(cc.Label).string = parseInt(score) + 1 + "";
        }
      };
      BattleCtrl.prototype.generateMap = function() {
        var self = this;
        var mapClass = new LinkedMap_1.default(self.activeBattleData.column, self.activeBattleData.row, self.player[0].point, self.player[1].point);
        self.linkedMap = mapClass.generate();
        this.setArray = mapClass.setArray;
        self.externalCell();
        for (var i = 0; i < self.cells; i++) self.generateRegion(i);
        this.BattleRegion.parent.getChildByName("operation") && this.BattleRegion.parent.getChildByName("operation").destroy();
        this.BattleRegion.parent.addChild(cc.instantiate(this.operation));
        self.webScoket.sendMessage({
          msg: 21,
          data: {
            battleData: [ {
              column: self.activeBattleData.column,
              row: self.activeBattleData.row,
              scale: self.activeBattleData.scale
            } ],
            player: self.player,
            externaData: this.Exterrandom,
            linkedMap: self.linkedMap
          }
        });
        this.propsRefreshInterval();
      };
      BattleCtrl.prototype.getMap = function(response) {
        this._onRemoveNode();
        var self = this;
        self.playerName = "tank_2";
        self.linkedMap = response.data.linkedMap;
        self.player = response.data.player;
        self.activeExternalData = self.externalResources[response.data.externaData];
        self.activeBattleData = response.data.battleData[0];
        var cells = self.activeBattleData.column * self.activeBattleData.row;
        self.externalCell();
        for (var i = 0; i < cells; i++) self.generateRegion(i);
        this.BattleRegion.parent.getChildByName("operation") && this.BattleRegion.parent.getChildByName("operation").destroy();
        this.BattleRegion.parent.addChild(cc.instantiate(this.operation));
      };
      BattleCtrl.prototype.viceLeave = function() {
        this.ready.getChildByName("labelStatus").getComponent(cc.Label).string = "对方已退出房间！";
      };
      __decorate([ property(cc.Prefab) ], BattleCtrl.prototype, "wall_column_1", void 0);
      __decorate([ property(cc.Prefab) ], BattleCtrl.prototype, "wall_row_1", void 0);
      __decorate([ property(cc.Prefab) ], BattleCtrl.prototype, "wall_column_2", void 0);
      __decorate([ property(cc.Prefab) ], BattleCtrl.prototype, "wall_row_2", void 0);
      __decorate([ property(cc.Prefab) ], BattleCtrl.prototype, "wall_column_3", void 0);
      __decorate([ property(cc.Prefab) ], BattleCtrl.prototype, "wall_row_3", void 0);
      __decorate([ property(cc.Node) ], BattleCtrl.prototype, "BattleRegion", void 0);
      __decorate([ property(cc.Node) ], BattleCtrl.prototype, "TopCell", void 0);
      __decorate([ property(cc.Node) ], BattleCtrl.prototype, "BottomCell", void 0);
      __decorate([ property(cc.Node) ], BattleCtrl.prototype, "LeftCell", void 0);
      __decorate([ property(cc.Node) ], BattleCtrl.prototype, "RightCell", void 0);
      __decorate([ property(cc.Prefab) ], BattleCtrl.prototype, "player1", void 0);
      __decorate([ property(cc.Prefab) ], BattleCtrl.prototype, "player2", void 0);
      __decorate([ property(cc.SpriteFrame) ], BattleCtrl.prototype, "fllower_1", void 0);
      __decorate([ property(cc.SpriteFrame) ], BattleCtrl.prototype, "fllower_2", void 0);
      __decorate([ property(cc.SpriteFrame) ], BattleCtrl.prototype, "fllower_3", void 0);
      __decorate([ property(cc.SpriteFrame) ], BattleCtrl.prototype, "horn_1", void 0);
      __decorate([ property(cc.SpriteFrame) ], BattleCtrl.prototype, "horn_2", void 0);
      __decorate([ property(cc.SpriteFrame) ], BattleCtrl.prototype, "horn_3", void 0);
      __decorate([ property(cc.Prefab) ], BattleCtrl.prototype, "operation", void 0);
      __decorate([ property(cc.Prefab) ], BattleCtrl.prototype, "props", void 0);
      __decorate([ property(cc.Node) ], BattleCtrl.prototype, "MainPlayerHeadImg", void 0);
      __decorate([ property(cc.Node) ], BattleCtrl.prototype, "MainPlayerName", void 0);
      __decorate([ property(cc.Node) ], BattleCtrl.prototype, "MainPlayerScore", void 0);
      __decorate([ property(cc.Node) ], BattleCtrl.prototype, "VicePlayerHeadImg", void 0);
      __decorate([ property(cc.Node) ], BattleCtrl.prototype, "VicePlayerName", void 0);
      __decorate([ property(cc.Node) ], BattleCtrl.prototype, "VicePlayerScore", void 0);
      __decorate([ property(cc.Node) ], BattleCtrl.prototype, "GameStatus", void 0);
      __decorate([ property(cc.SpriteFrame) ], BattleCtrl.prototype, "defeat", void 0);
      __decorate([ property(cc.SpriteFrame) ], BattleCtrl.prototype, "victory", void 0);
      __decorate([ property(cc.Node) ], BattleCtrl.prototype, "ready", void 0);
      BattleCtrl = __decorate([ ccclass ], BattleCtrl);
      return BattleCtrl;
    }(cc.Component);
    exports.default = BattleCtrl;
    cc._RF.pop();
  }, {
    "../Unit/LinkedMap": "LinkedMap",
    "../Unit/WebSocketManage": "WebSocketManage",
    "./HomePageCtrl": "HomePageCtrl"
  } ],
  BulletCtrl: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "2a2bbazLDJL6aDlFXxZ1Za8", "BulletCtrl");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var WebSocketManage_1 = require("../Unit/WebSocketManage");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var NewClass = function(_super) {
      __extends(NewClass, _super);
      function NewClass() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.WebScoket = null;
        _this.speedX = 5;
        _this.speedY = 5;
        return _this;
      }
      NewClass.prototype.start = function() {
        this.buttle = this.node.getComponent(cc.RigidBody);
        var speed = 500;
        var x = speed * Math.sin(Math.PI * this.node.rotation / 180);
        var y = speed * Math.cos(Math.PI * this.node.rotation / 180);
        this.buttle.linearVelocity = new cc.Vec2(x, y);
        var self = this;
        this.WebScoket = cc.find("WebScoket").getComponent(WebSocketManage_1.default);
        setTimeout(function() {
          self.node && self.node.destroy();
        }, 5e3);
      };
      NewClass.prototype.update = function(dt) {};
      NewClass.prototype.onDestroy = function() {
        this.node.destroy();
      };
      NewClass = __decorate([ ccclass ], NewClass);
      return NewClass;
    }(cc.Component);
    exports.default = NewClass;
    cc._RF.pop();
  }, {
    "../Unit/WebSocketManage": "WebSocketManage"
  } ],
  Buttle6Ctrl: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "022778WYX5Og5WwOArqNwHE", "Buttle6Ctrl");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var NewClass = function(_super) {
      __extends(NewClass, _super);
      function NewClass() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      NewClass.prototype.start = function() {
        var manager = cc.director.getCollisionManager();
        manager.enabled = false;
        setTimeout(function() {
          manager.enabled = true;
        }, 3e3);
      };
      NewClass.prototype.onCollisionEnter = function(other, self) {
        console.log("1");
      };
      NewClass = __decorate([ ccclass ], NewClass);
      return NewClass;
    }(cc.Component);
    exports.default = NewClass;
    cc._RF.pop();
  }, {} ],
  CellCtrl: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "1a3ddLI5Y9ET54Wf+qMBtnj", "CellCtrl");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var NewClass = function(_super) {
      __extends(NewClass, _super);
      function NewClass() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      NewClass.prototype.start = function() {
        var manager = cc.director.getCollisionManager();
        manager.enabled = true;
        manager.enabledDrawBoundingBox = true;
      };
      NewClass = __decorate([ ccclass ], NewClass);
      return NewClass;
    }(cc.Component);
    exports.default = NewClass;
    cc._RF.pop();
  }, {} ],
  HomePageCtrl: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "34123NWVIRNU6xkpmnqGz20", "HomePageCtrl");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var NewClass = function(_super) {
      __extends(NewClass, _super);
      function NewClass() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.lobbyPanel = null;
        _this.openSoundSprite = null;
        _this.closeSoundSprite = null;
        _this.bgSound = null;
        _this.IsSound = true;
        _this.ping = null;
        _this.UserData = {};
        _this.enemyUserData = {};
        _this.WebScoketNode = null;
        return _this;
      }
      NewClass.prototype.start = function() {
        wx.showShareMenu();
        wx.login({
          success: function(res) {
            console.log(res);
          }
        });
        wx.authorize({
          scope: "scope.userInfo"
        });
        this.ping.zIndex = 9999;
        this.getPing();
      };
      NewClass.prototype.OnClickStartButton = function() {
        wx.getSetting({
          success: function(res) {
            res.authSetting["scope.userInfo"] && wx.getUserInfo({
              success: function(res) {
                console.log(res);
              }
            });
          },
          fail: function(res) {
            console.log(res);
          }
        });
      };
      NewClass.prototype.OnClickSoundButton = function(event) {
        this.IsSound = !this.IsSound;
        var buttonSprite = event.target.getComponent(cc.Sprite);
        this.IsSound ? (buttonSprite.spriteFrame = this.openSoundSprite, this.bgSound.resume()) : (buttonSprite.spriteFrame = this.closeSoundSprite, 
        this.bgSound.pause());
      };
      NewClass.prototype.getPing = function() {
        var self = this;
        setTimeout(function() {
          self.getPing();
        }, 1e3);
        var url = "http://app.ei-marketing.net/tankWar/ping.do";
        var xmlHttp;
        var start = new Date().getTime();
        xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = state_Change;
        xmlHttp.open("GET", url, true);
        xmlHttp.send(null);
        function state_Change() {
          if (4 === xmlHttp.readyState && 200 === xmlHttp.status) {
            var end = new Date().getTime();
            self.ping.getComponent(cc.Label).string = end - start + "ms";
          }
        }
      };
      NewClass.prototype.getUserData = function(response) {
        this.UserData = response.data;
        var lobbyPanelPage = cc.instantiate(this.lobbyPanel);
        lobbyPanelPage.parent = this.node.parent;
        this.enabled = false;
      };
      __decorate([ property(cc.Prefab) ], NewClass.prototype, "lobbyPanel", void 0);
      __decorate([ property(cc.SpriteFrame) ], NewClass.prototype, "openSoundSprite", void 0);
      __decorate([ property(cc.SpriteFrame) ], NewClass.prototype, "closeSoundSprite", void 0);
      __decorate([ property(cc.AudioSource) ], NewClass.prototype, "bgSound", void 0);
      __decorate([ property(cc.Node) ], NewClass.prototype, "ping", void 0);
      __decorate([ property(cc.Node) ], NewClass.prototype, "WebScoketNode", void 0);
      NewClass = __decorate([ ccclass ], NewClass);
      return NewClass;
    }(cc.Component);
    exports.default = NewClass;
    cc._RF.pop();
  }, {} ],
  LinkedMap: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "2422a/26gRHUKNZEy4tBNpQ", "LinkedMap");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var LinkedMap = function() {
      function LinkedMap(column, row, player_1, player_2) {
        void 0 === column && (column = 0);
        void 0 === row && (row = 0);
        void 0 === player_1 && (player_1 = 0);
        void 0 === player_2 && (player_2 = 0);
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
      LinkedMap.prototype.generate = function() {
        while (!this.playerLinked()) {
          var cellPairs = this.pickRandomCellPairs();
          if (!this.unionSets.sameSet(cellPairs[0], cellPairs[1])) {
            this.unionSets.union(cellPairs[0], cellPairs[1]);
            this.addLinkedMap(cellPairs[0], cellPairs[1]);
          }
        }
        this.setArray = this.unionSets.setArray;
        console.log(this.setArray);
        return this.linkedMap;
      };
      LinkedMap.prototype.playerLinked = function() {
        return this.unionSets.sameSet(this.player_1, this.player_2);
      };
      LinkedMap.prototype.pickRandomCellPairs = function() {
        var cell = Math.random() * this.cells >> 0;
        var neiborCells = [];
        var row = cell / this.column >> 0, column = cell % this.column;
        0 !== row && neiborCells.push(cell - this.column);
        row !== this.row - 1 && neiborCells.push(cell + this.column);
        0 !== column && neiborCells.push(cell - 1);
        column !== this.column - 1 && neiborCells.push(cell + 1);
        var index = Math.random() * neiborCells.length >> 0;
        return [ cell, neiborCells[index] ];
      };
      LinkedMap.prototype.addLinkedMap = function(x, y) {
        this.linkedMap[x] || (this.linkedMap[x] = []);
        this.linkedMap[y] || (this.linkedMap[y] = []);
        this.linkedMap[x].indexOf(y) < 0 && this.linkedMap[x].push(y);
        this.linkedMap[y].indexOf(x) < 0 && this.linkedMap[y].push(x);
      };
      return LinkedMap;
    }();
    exports.default = LinkedMap;
    var UnionSet = function() {
      function UnionSet(size) {
        this.setArray = null;
        this.setArray = new Array(size);
        for (var i = this.setArray.length - 1; i >= 0; i--) this.setArray[i] = -1;
      }
      UnionSet.prototype.union = function(root1, root2) {
        if (-1 === this.setArray[root1] && -1 === this.setArray[root2]) {
          this.setArray[root1] = root2;
          this.setArray[root2] = root1;
        } else if (-1 === this.setArray[root1] && -1 !== this.setArray[root2]) this.setArray[root1] = this.setArray[root2]; else if (-1 !== this.setArray[root1] && -1 === this.setArray[root2]) this.setArray[root2] = this.setArray[root1]; else {
          var v = this.setArray[root1];
          for (var i = 0; i < this.setArray.length; i++) this.setArray[i] === v && (this.setArray[i] = this.setArray[root2]);
        }
      };
      UnionSet.prototype.sameSet = function(x, y) {
        return -1 !== this.setArray[x] && -1 !== this.setArray[y] && this.setArray[x] === this.setArray[y];
      };
      return UnionSet;
    }();
    cc._RF.pop();
  }, {} ],
  LobbyPageCtrl: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "8be5etHjxBFJ7oy5iXmUq28", "LobbyPageCtrl");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var HomePageCtrl_1 = require("./HomePageCtrl");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var NewClass = function(_super) {
      __extends(NewClass, _super);
      function NewClass() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.matchingPanel = null;
        _this.headImg = null;
        _this.userName = null;
        _this.HomePage = null;
        return _this;
      }
      NewClass.prototype.onClickBackButton = function() {
        this.node.destroy();
      };
      NewClass.prototype.onClickMatching = function() {
        var matchingPanel = cc.instantiate(this.matchingPanel);
        matchingPanel.parent = this.node.parent;
        this.enabled = false;
      };
      NewClass.prototype.start = function() {
        var self = this;
        this.HomePage = cc.find("Canvas/HomePagePanel");
        var homePage = this.HomePage.getComponent(HomePageCtrl_1.default).UserData;
        this.userName.getComponent(cc.Label).string = homePage.nickname;
        cc.loader.load({
          url: homePage.headimgurl,
          type: "png"
        }, function(err, texture) {
          self.headImg.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(texture);
        });
      };
      __decorate([ property(cc.Prefab) ], NewClass.prototype, "matchingPanel", void 0);
      __decorate([ property(cc.Node) ], NewClass.prototype, "headImg", void 0);
      __decorate([ property(cc.Node) ], NewClass.prototype, "userName", void 0);
      NewClass = __decorate([ ccclass ], NewClass);
      return NewClass;
    }(cc.Component);
    exports.default = NewClass;
    cc._RF.pop();
  }, {
    "./HomePageCtrl": "HomePageCtrl"
  } ],
  LoginPageCtrl: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "d2df5VGenVNoJazyDhc4uYt", "LoginPageCtrl");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var WebSocketManage_1 = require("../Unit/WebSocketManage");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var NewClass = function(_super) {
      __extends(NewClass, _super);
      function NewClass() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.userName = null;
        _this.WebScoketNode = null;
        _this.BattlePage = null;
        return _this;
      }
      NewClass.prototype.start = function() {};
      NewClass.prototype.onLogin = function() {
        var userName = this.userName.getComponent(cc.EditBox).string;
        var webscoket = this.WebScoketNode.getComponent(WebSocketManage_1.default);
        webscoket.sendMessage({
          name: userName
        });
        var battlePage = cc.instantiate(this.BattlePage);
        battlePage.parent = this.node.parent;
        this.enabled = false;
      };
      __decorate([ property(cc.Node) ], NewClass.prototype, "userName", void 0);
      __decorate([ property(cc.Node) ], NewClass.prototype, "WebScoketNode", void 0);
      __decorate([ property(cc.Prefab) ], NewClass.prototype, "BattlePage", void 0);
      NewClass = __decorate([ ccclass ], NewClass);
      return NewClass;
    }(cc.Component);
    exports.default = NewClass;
    cc._RF.pop();
  }, {
    "../Unit/WebSocketManage": "WebSocketManage"
  } ],
  MatchingCtrl: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "1dbafsnqO5BzadTTzTYpDVp", "MatchingCtrl");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var WebSocketManage_1 = require("../Unit/WebSocketManage");
    var HomePageCtrl_1 = require("./HomePageCtrl");
    var BattleCtrl_1 = require("./BattleCtrl");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var NewClass = function(_super) {
      __extends(NewClass, _super);
      function NewClass() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.WebScoketNode = null;
        _this.headImg = null;
        _this.Success = null;
        _this.MainPlaysName = null;
        _this.MainPlaysHeadImg = null;
        _this.VicePlaysName = null;
        _this.VicePlaysHeadImg = null;
        _this.HomePage = null;
        _this.BattlePage = null;
        _this.userData = {};
        return _this;
      }
      NewClass.prototype.onClickBackButton = function() {
        var webScoket = this.WebScoketNode.getComponent(WebSocketManage_1.default);
        webScoket.sendMessage({
          msg: 3
        });
        this.node.destroy();
      };
      NewClass.prototype.start = function() {
        var self = this;
        this.HomePage = cc.find("Canvas/HomePagePanel");
        this.userData = this.HomePage.getComponent(HomePageCtrl_1.default).UserData;
        cc.loader.load({
          url: self.userData.headimgurl,
          type: "png"
        }, function(err, texture) {
          self.headImg.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(texture);
        });
        this.WebScoketNode = cc.find("WebScoket");
        var webScoket = this.WebScoketNode.getComponent(WebSocketManage_1.default);
        webScoket.sendMessage({
          msg: 2
        });
      };
      NewClass.prototype.setBattleData = function(response) {
        var self = this;
        this.Success.active = true;
        if (response.data) {
          this.MainPlaysName.getComponent(cc.Label).string = this.userData.nickname;
          cc.loader.load({
            url: self.userData.headimgurl,
            type: "png"
          }, function(err, texture) {
            self.MainPlaysHeadImg.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(texture);
          });
          this.VicePlaysName.getComponent(cc.Label).string = response.enemyData.nickname;
          cc.loader.load({
            url: response.enemyData.headimgurl,
            type: "png"
          }, function(err, texture) {
            self.VicePlaysHeadImg.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(texture);
          });
        } else {
          this.VicePlaysName.getComponent(cc.Label).string = this.userData.nickname;
          this.VicePlaysHeadImg.getComponent(cc.Sprite).spriteFrame = this.headImg.getComponent(cc.Sprite).spriteFrame;
          this.MainPlaysName.getComponent(cc.Label).string = response.enemyData.nickname;
          cc.loader.load({
            url: response.enemyData.headimgurl,
            type: "png"
          }, function(err, texture) {
            self.MainPlaysHeadImg.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(texture);
          });
        }
        var battlePage = cc.instantiate(this.BattlePage);
        battlePage.parent = this.node.parent;
        battlePage.zIndex = -1;
        response.data ? battlePage.getComponent(BattleCtrl_1.default).initScore(0) : battlePage.getComponent(BattleCtrl_1.default).initScore(1);
        setTimeout(function() {
          response.data && battlePage.getComponent(BattleCtrl_1.default).generateMap();
          battlePage.zIndex = 1;
          self.node.destroy();
        }, 1e3);
      };
      __decorate([ property(cc.Node) ], NewClass.prototype, "headImg", void 0);
      __decorate([ property(cc.Node) ], NewClass.prototype, "Success", void 0);
      __decorate([ property(cc.Node) ], NewClass.prototype, "MainPlaysName", void 0);
      __decorate([ property(cc.Node) ], NewClass.prototype, "MainPlaysHeadImg", void 0);
      __decorate([ property(cc.Node) ], NewClass.prototype, "VicePlaysName", void 0);
      __decorate([ property(cc.Node) ], NewClass.prototype, "VicePlaysHeadImg", void 0);
      __decorate([ property(cc.Prefab) ], NewClass.prototype, "BattlePage", void 0);
      NewClass = __decorate([ ccclass ], NewClass);
      return NewClass;
    }(cc.Component);
    exports.default = NewClass;
    cc._RF.pop();
  }, {
    "../Unit/WebSocketManage": "WebSocketManage",
    "./BattleCtrl": "BattleCtrl",
    "./HomePageCtrl": "HomePageCtrl"
  } ],
  PlayerOperationCtrl: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "b0f88TROJ1H/aPIf2SVhwDA", "PlayerOperationCtrl");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var BattleCtrl_1 = require("../Page/BattleCtrl");
    var WebSocketManage_1 = require("../Unit/WebSocketManage");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var NewClass = function(_super) {
      __extends(NewClass, _super);
      function NewClass() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.BattleRegion = null;
        _this.Buttle = null;
        _this.Buttle6 = null;
        _this.currentPlayer = null;
        _this.vicePlayer = null;
        _this.rotationStatus = 0;
        _this.moveStatus = 0;
        _this.BattleCtrl = null;
        _this.WebScoket = null;
        _this.mainActionList = [];
        _this.viceActionList = [];
        _this.currentPlayerKeyBord = {
          top: false,
          right: false,
          bottom: false,
          left: false
        };
        _this.buttleType = 6;
        _this.buttle1Status = false;
        _this.i = 0;
        _this.Density = 0;
        return _this;
      }
      NewClass.prototype.start = function() {
        this.BattleRegion = this.node.parent.getChildByName("BattleRegion");
        this.BattleCtrl = this.node.parent.parent.getComponent(BattleCtrl_1.default);
        this.getPlayer(this.BattleCtrl.playerName);
        this.WebScoket = cc.find("WebScoket").getComponent(WebSocketManage_1.default);
        this.onEventListener();
      };
      NewClass.prototype.update = function(dt) {
        if (this.buttle1Status) {
          this.Density++;
          if (this.Density % 5 === 0) {
            this.i++;
            var len = 0;
            this.currentPlayer.parent.children.map(function(node) {
              node.name.length > 11 && len++;
            });
            len < 20 && this.generateBullet("tank_buttle_" + this.currentPlayer.name.substring(5, 6) + "_" + this.i, 5 - 10 * Math.random() >> 0);
          }
        }
        this.Density++;
        if (this.currentPlayerKeyBord.left) {
          this.currentPlayer.rotation - 5 < 0 ? this.currentPlayer.rotation = 360 - this.currentPlayer.rotation - 5 : this.currentPlayer.rotation = this.currentPlayer.rotation - 5;
          this.sendTankData();
        }
        if (this.currentPlayerKeyBord.right) {
          this.currentPlayer.rotation = (this.currentPlayer.rotation + 5) % 360;
          this.sendTankData();
        }
        if (this.currentPlayerKeyBord.top) {
          var speed = 5;
          this.currentPlayer.x += speed * Math.sin(Math.PI * this.currentPlayer.rotation / 180);
          this.currentPlayer.y += speed * Math.cos(Math.PI * this.currentPlayer.rotation / 180);
          this.sendTankData();
        }
        if (this.currentPlayerKeyBord.bottom) {
          var speed = 5;
          this.currentPlayer.x -= speed * Math.sin(Math.PI * this.currentPlayer.rotation / 180);
          this.currentPlayer.y -= speed * Math.cos(Math.PI * this.currentPlayer.rotation / 180);
          this.sendTankData();
        }
        if (0 !== this.viceActionList.length) for (var i = 0; i < this.viceActionList.length; i++) if (this.viceActionList[0] && 0 === this.viceActionList[0].type) {
          this.vicePlayer.x = this.viceActionList[0].x;
          this.vicePlayer.y = this.viceActionList[0].y;
          this.vicePlayer.rotation = this.viceActionList[0].rotation;
          this.viceActionList.splice(0, 1);
        } else if (1 === this.viceActionList[0].type) {
          this.generateReceiveButtle(this.viceActionList[0]);
          this.viceActionList.splice(0, 1);
        }
      };
      NewClass.prototype.onEventListener = function() {
        var self = this;
        this.node.getChildByName("left").on(cc.Node.EventType.TOUCH_START, function(event) {
          self.currentPlayerKeyBord.left = true;
        });
        this.node.getChildByName("left").on(cc.Node.EventType.TOUCH_END, function(event) {
          self.currentPlayerKeyBord.left = false;
        });
        this.node.getChildByName("left").on(cc.Node.EventType.TOUCH_CANCEL, function(event) {
          self.currentPlayerKeyBord.left = false;
        });
        this.node.getChildByName("right").on(cc.Node.EventType.TOUCH_START, function(event) {
          self.currentPlayerKeyBord.right = true;
        });
        this.node.getChildByName("right").on(cc.Node.EventType.TOUCH_CANCEL, function(event) {
          self.currentPlayerKeyBord.right = false;
        });
        this.node.getChildByName("right").on(cc.Node.EventType.TOUCH_END, function(event) {
          self.currentPlayerKeyBord.right = false;
        });
        this.node.getChildByName("up").on(cc.Node.EventType.TOUCH_START, function(event) {
          self.currentPlayerKeyBord.top = true;
        });
        this.node.getChildByName("up").on(cc.Node.EventType.TOUCH_CANCEL, function(event) {
          self.currentPlayerKeyBord.top = false;
        });
        this.node.getChildByName("up").on(cc.Node.EventType.TOUCH_END, function(event) {
          self.currentPlayerKeyBord.top = false;
        });
        this.node.getChildByName("bottom").on(cc.Node.EventType.TOUCH_START, function(event) {
          self.currentPlayerKeyBord.bottom = true;
        });
        this.node.getChildByName("bottom").on(cc.Node.EventType.TOUCH_CANCEL, function(event) {
          self.currentPlayerKeyBord.bottom = false;
        });
        this.node.getChildByName("bottom").on(cc.Node.EventType.TOUCH_END, function(event) {
          self.currentPlayerKeyBord.bottom = false;
        });
        0 === this.buttleType && this.node.getChildByName("fire").on(cc.Node.EventType.TOUCH_START, function(event) {
          var len = 0;
          self.currentPlayer.parent.children.map(function(node) {
            node.name.length > 11 && len++;
          });
          if (len < 5) {
            self.i = (self.i + 1) % 5;
            self.generateBullet("tank_buttle_" + self.currentPlayer.name.substring(5, 6) + "_" + self.i, 0);
          }
        });
        6 === this.buttleType && this.node.getChildByName("fire").on(cc.Node.EventType.TOUCH_START, function(event) {
          var buttle = cc.instantiate(self.Buttle6);
          buttle.name = "tank_buttle6_";
          buttle.scale = self.currentPlayer.scale;
          buttle.rotation = self.currentPlayer.rotation;
          buttle.zIndex = -1;
          buttle.setPosition(self.currentPlayer.x, self.currentPlayer.y);
          self.currentPlayer.parent.addChild(buttle);
        });
        if (1 === this.buttleType) {
          this.node.getChildByName("fire").on(cc.Node.EventType.TOUCH_START, function(event) {
            self.buttle1Status = true;
          });
          this.node.getChildByName("fire").on(cc.Node.EventType.TOUCH_END, function(event) {
            self.buttle1Status = false;
          });
          this.node.getChildByName("fire").on(cc.Node.EventType.TOUCH_CANCEL, function(event) {
            self.buttle1Status = false;
          });
        }
      };
      NewClass.prototype.generateBullet = function(name, offset) {
        var buttle = cc.instantiate(this.Buttle);
        buttle.name = name;
        buttle.scale = this.currentPlayer.scale;
        buttle.rotation = this.currentPlayer.rotation + offset;
        buttle.zIndex = -1;
        var centerPointx = this.currentPlayer.x;
        var centerPointy = this.currentPlayer.y;
        var buttleX = this.currentPlayer.x;
        var buttleY = this.currentPlayer.y + this.currentPlayer.height * this.currentPlayer.scale / 2;
        var x = (buttleY - centerPointy) * Math.sin(Math.PI * this.currentPlayer.rotation + offset / 180) + centerPointx;
        var y = (buttleY - centerPointy) * Math.cos(Math.PI * this.currentPlayer.rotation + offset / 180) + (buttleX - centerPointx) * Math.sin(Math.PI * this.currentPlayer.rotation + offset / 180) + centerPointy;
        buttle.setPosition(x, y);
        this.currentPlayer.parent.addChild(buttle);
        this.mainActionList.push({
          type: 1,
          buttleName: buttle.name,
          scale: this.currentPlayer.scale,
          x: x,
          y: y,
          rotation: this.currentPlayer.rotation + offset
        });
        this.WebScoket.sendMessage({
          msg: 22,
          data: this.mainActionList
        });
        this.mainActionList = [];
      };
      NewClass.prototype.generateReceiveButtle = function(response) {
        var buttle = cc.instantiate(this.Buttle);
        buttle.name = response.buttleName;
        buttle.scale = response.scale;
        buttle.rotation = response.rotation;
        buttle.setPosition(response.x, response.y);
        this.vicePlayer.parent.addChild(buttle);
      };
      NewClass.prototype.addReceiveButtle = function(response) {
        this.viceActionList.push(response);
      };
      NewClass.prototype.getPlayer = function(mainTank) {
        var viceTank = "tank_1";
        "tank_1" === mainTank && (viceTank = "tank_2");
        var children = this.BattleRegion.children;
        if (!children) return;
        for (var i = 0; i < children.length; i++) {
          children[i].getChildByName(mainTank) && (this.currentPlayer = children[i].getChildByName(mainTank));
          children[i].getChildByName(viceTank) && (this.vicePlayer = children[i].getChildByName(viceTank));
          if (this.currentPlayer && this.vicePlayer) return;
        }
      };
      NewClass.prototype.sendTankData = function() {
        this.mainActionList.push({
          type: 0,
          x: this.currentPlayer.x,
          y: this.currentPlayer.y,
          rotation: this.currentPlayer.rotation
        });
        if (this.mainActionList.length > 0) {
          this.WebScoket.sendMessage({
            msg: 22,
            data: this.mainActionList
          });
          this.mainActionList = [];
        }
      };
      NewClass.prototype.setOtherTankDataFor2 = function(response) {
        for (var i = 0; i < response.data.length; i++) this.viceActionList.push(response.data[i]);
      };
      __decorate([ property(cc.Prefab) ], NewClass.prototype, "Buttle", void 0);
      __decorate([ property(cc.Prefab) ], NewClass.prototype, "Buttle6", void 0);
      NewClass = __decorate([ ccclass ], NewClass);
      return NewClass;
    }(cc.Component);
    exports.default = NewClass;
    cc._RF.pop();
  }, {
    "../Page/BattleCtrl": "BattleCtrl",
    "../Unit/WebSocketManage": "WebSocketManage"
  } ],
  PropsCtrl: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "14414OS2Y5JT7xR/Ygdc9cz", "PropsCtrl");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var NewClass = function(_super) {
      __extends(NewClass, _super);
      function NewClass() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.nodeDestoryTime = null;
        _this.propType = "";
        return _this;
      }
      NewClass.prototype.start = function() {
        var _this = this;
        this.propType = this.node.getComponent(cc.Sprite).spriteFrame.name;
        var self = this;
        setTimeout(function() {
          self.onNodeTwinkle();
          setTimeout(function() {
            clearTimeout(self.nodeDestoryTime);
            _this.node && self.node.destroy();
          }, 3e3);
        }, 12e3);
      };
      NewClass.prototype.onNodeTwinkle = function() {
        var _this = this;
        var self = this;
        this.nodeDestoryTime = setTimeout(function() {
          if (!_this.node) return;
          self.node.opacity = 20;
          setTimeout(function() {
            self.node.opacity = 200;
            self.onNodeTwinkle();
          }, 200);
        }, 200);
      };
      NewClass.prototype.onCollisionEnter = function(other, self) {
        var spriteFrameName = other.node.name + "_" + this.node.getComponent(cc.Sprite).spriteFrame.name.substring(5, 6);
        cc.loader.loadRes(spriteFrameName, cc.SpriteFrame, function(err, spriteFrame) {
          other.node.getComponent(cc.Sprite).spriteFrame = spriteFrame;
        });
        self.node.destroy();
      };
      NewClass = __decorate([ ccclass ], NewClass);
      return NewClass;
    }(cc.Component);
    exports.default = NewClass;
    cc._RF.pop();
  }, {} ],
  TankCtrl: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "33ad7W4Sq9CJ4BpgZFyxICj", "TankCtrl");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var WebSocketManage_1 = require("../Unit/WebSocketManage");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var NewClass = function(_super) {
      __extends(NewClass, _super);
      function NewClass() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.Boom = null;
        _this.WebScoket = null;
        _this.flag = true;
        return _this;
      }
      NewClass.prototype.start = function() {
        this.playerRg = this.getComponent(cc.RigidBody);
        this.WebScoket = cc.find("WebScoket").getComponent(WebSocketManage_1.default);
      };
      NewClass.prototype.onBeginContact = function(contact, selfCollider, otherCollider) {
        var self = this;
        if (this.flag) {
          var othername = otherCollider.node.name.substring(5, 11);
          var loser = this.node.name;
          var scoreType = 0;
          if ("buttle" === othername) {
            cc.find("Canvas/BattlePagePanel/BattleBox/BattleRegion").parent.getChildByName("operation") && cc.find("Canvas/BattlePagePanel/BattleBox/BattleRegion").parent.getChildByName("operation").destroy();
            this.flag = false;
            var x = selfCollider.node.x;
            var y = selfCollider.node.y;
            var parent = selfCollider.node.parent;
            var boom = cc.instantiate(this.Boom);
            boom.setPosition(x, y);
            parent.addChild(boom);
            otherCollider.node.destroy();
            selfCollider.node.destroy();
            "tank_1" === loser && (scoreType = 1);
            this.WebScoket.sendMessage({
              msg: 25,
              data: {
                scoreType: scoreType,
                buttleName: otherCollider.node.name
              }
            });
          }
        }
      };
      NewClass.prototype.gameOver = function(response) {
        cc.find("Canvas/BattlePagePanel/BattleBox/BattleRegion").parent.getChildByName("operation") && cc.find("Canvas/BattlePagePanel/BattleBox/BattleRegion").parent.getChildByName("operation").destroy();
        var x = this.node.x;
        var y = this.node.y;
        var parent = this.node.parent;
        var boom = cc.instantiate(this.Boom);
        boom.setPosition(x, y);
        parent.addChild(boom);
        this.node.destroy();
      };
      __decorate([ property(cc.Prefab) ], NewClass.prototype, "Boom", void 0);
      NewClass = __decorate([ ccclass ], NewClass);
      return NewClass;
    }(cc.Component);
    exports.default = NewClass;
    cc._RF.pop();
  }, {
    "../Unit/WebSocketManage": "WebSocketManage"
  } ],
  TransferClass: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "f365fMBokNNhoCix8wcU7gU", "TransferClass");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var HomePageCtrl_1 = require("../Page/HomePageCtrl");
    var MatchingCtrl_1 = require("../Page/MatchingCtrl");
    var BattleCtrl_1 = require("../Page/BattleCtrl");
    var PlayerOperationCtrl_1 = require("../Parts/PlayerOperationCtrl");
    var TankCtrl_1 = require("../Parts/TankCtrl");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var Transfer = function(_super) {
      __extends(Transfer, _super);
      function Transfer() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.HomePage = null;
        _this.MatchPage = null;
        _this.BattlePage = null;
        _this.Operation = null;
        return _this;
      }
      Transfer.prototype.getUserDataForHomePageCtrl = function(res) {
        var homePageCtrl = null;
        this.HomePage = cc.find("Canvas/HomePagePanel");
        homePageCtrl = this.HomePage.getComponent(HomePageCtrl_1.default);
        homePageCtrl.getUserData(res);
      };
      Transfer.prototype.generateMapForHomePageCtrl = function(res) {
        var homePageCtrl = null;
        this.HomePage = cc.find("Canvas/HomePagePanel");
        homePageCtrl = this.HomePage.getComponent(HomePageCtrl_1.default);
        homePageCtrl.enemyUserData = res.enemyData;
        var matchPageCtrl = null;
        this.MatchPage = cc.find("Canvas/MatchingPagePanel");
        matchPageCtrl = this.MatchPage.getComponent(MatchingCtrl_1.default);
        matchPageCtrl.setBattleData(res);
      };
      Transfer.prototype.getMapForBattlePageCtrl = function(res) {
        var battlePageCtrl = null;
        this.BattlePage = cc.find("Canvas/BattlePagePanel");
        battlePageCtrl = this.BattlePage.getComponent(BattleCtrl_1.default);
        battlePageCtrl.getMap(res);
      };
      Transfer.prototype.positionUnicomForOperationCtrl = function(res) {
        var operationCtrl = null;
        this.Operation = cc.find("Canvas/BattlePagePanel/BattleBox/operation");
        operationCtrl = this.Operation.getComponent(PlayerOperationCtrl_1.default);
        operationCtrl.setOtherTankDataFor2(res);
      };
      Transfer.prototype.fireButtleForOperationCtrl = function(res) {
        var operationCtrl = null;
        this.Operation = cc.find("Canvas/BattlePagePanel/BattleBox/operation");
        operationCtrl = this.Operation.getComponent(PlayerOperationCtrl_1.default);
        operationCtrl.addReceiveButtle(res);
      };
      Transfer.prototype.dieForTankCtrl = function(res) {
        var player = null;
        var children = cc.find("Canvas/BattlePagePanel/BattleBox/BattleRegion").children;
        cc.find("Canvas/BattlePagePanel").getComponent(BattleCtrl_1.default).scoreCount(res.data.scoreType);
        1 === res.data.scoreType && "tank_1" === cc.find("Canvas/BattlePagePanel").getComponent(BattleCtrl_1.default).playerName || 0 === res.data.scoreType && "tank_2" === cc.find("Canvas/BattlePagePanel").getComponent(BattleCtrl_1.default).playerName ? cc.find("Canvas/BattlePagePanel").getComponent(BattleCtrl_1.default).gameOver(0) : cc.find("Canvas/BattlePagePanel").getComponent(BattleCtrl_1.default).gameOver(1);
        for (var i = 0; i < children.length; i++) if (children[i].getChildByName(res.data.buttleName)) {
          children[i].getChildByName(res.data.buttleName).destroy();
          break;
        }
        if (0 === res.data.scoreType) {
          for (var i = 0; i < children.length; i++) if (children[i].getChildByName("tank_2")) {
            player = children[i].getChildByName("tank_2");
            var playerCompeont = player.getComponent(TankCtrl_1.default);
            playerCompeont.gameOver(res);
            return;
          }
        } else for (var i = 0; i < children.length; i++) if (children[i].getChildByName("tank_1")) {
          player = children[i].getChildByName("tank_1");
          var playerCompeont = player.getComponent(TankCtrl_1.default);
          playerCompeont.gameOver(res);
          return;
        }
      };
      Transfer.prototype.restartForBattleCtrl = function(res) {
        var battlePageCtrl = null;
        this.BattlePage = cc.find("Canvas/BattlePagePanel");
        battlePageCtrl = this.BattlePage.getComponent(BattleCtrl_1.default);
        battlePageCtrl.ready.active = false;
        "tank_1" === battlePageCtrl.playerName && battlePageCtrl.restart();
      };
      Transfer.prototype.leaveForBattleCtrl = function(res) {
        var battlePageCtrl = null;
        this.BattlePage = cc.find("Canvas/BattlePagePanel");
        battlePageCtrl = this.BattlePage.getComponent(BattleCtrl_1.default);
        battlePageCtrl.viceLeave();
      };
      Transfer.prototype.genteraPropsForBattleCtrl = function(res) {
        var battlePageCtrl = null;
        this.BattlePage = cc.find("Canvas/BattlePagePanel");
        battlePageCtrl = this.BattlePage.getComponent(BattleCtrl_1.default);
        battlePageCtrl.genearteProp(res.data.point, res.data.rotation, res.data.propType);
      };
      Transfer = __decorate([ ccclass ], Transfer);
      return Transfer;
    }(cc.Component);
    exports.default = Transfer;
    cc._RF.pop();
  }, {
    "../Page/BattleCtrl": "BattleCtrl",
    "../Page/HomePageCtrl": "HomePageCtrl",
    "../Page/MatchingCtrl": "MatchingCtrl",
    "../Parts/PlayerOperationCtrl": "PlayerOperationCtrl",
    "../Parts/TankCtrl": "TankCtrl"
  } ],
  WebSocketManage: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "c388ajcATZPpbzuPQDZar4D", "WebSocketManage");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var TransferClass_1 = require("./TransferClass");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var WebSocketManage = function(_super) {
      __extends(WebSocketManage, _super);
      function WebSocketManage() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.TransferClass = new TransferClass_1.default();
        return _this;
      }
      WebSocketManage.prototype.start = function() {
        var self = this;
        this.ws = new WebSocket("ws://172.17.0.13:8080/tankWar/echo.do");
        this.ws.onopen = function(event) {
          console.log("服务器已打开");
        };
        this.ws.onerror = function(event) {
          console.log("连接服务器失败", event);
        };
        this.ws.onclose = function(event) {
          console.log("服务器关闭", event);
        };
        this.ws.onmessage = function(event) {
          var response = JSON.parse(event.data);
          "-1" === response.dataMessage && self.TransferClass.getUserDataForHomePageCtrl(response);
          "0" === response.dataMessage && self.TransferClass.generateMapForHomePageCtrl(response);
          "1" === response.dataMessage && self.TransferClass.getMapForBattlePageCtrl(response);
          "2" === response.dataMessage && self.TransferClass.positionUnicomForOperationCtrl(response);
          "3" === response.dataMessage && self.TransferClass.fireButtleForOperationCtrl(response);
          "4" === response.dataMessage && self.TransferClass.dieForTankCtrl(response);
          "5" === response.dataMessage && self.TransferClass.restartForBattleCtrl(response);
          "6" === response.dataMessage && self.TransferClass.leaveForBattleCtrl(response);
          "7" === response.dataMessage && self.TransferClass.genteraPropsForBattleCtrl(response);
        };
      };
      WebSocketManage.prototype.sendMessage = function(JSONmessage) {
        var message = JSON.stringify(JSONmessage);
        this.ws.send(message);
      };
      WebSocketManage = __decorate([ ccclass ], WebSocketManage);
      return WebSocketManage;
    }(cc.Component);
    exports.default = WebSocketManage;
    cc._RF.pop();
  }, {
    "./TransferClass": "TransferClass"
  } ],
  init: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "df5b1Aph8JCcYxWKb619e7b", "init");
    cc.director.getPhysicsManager().enabled = true;
    cc.director.getPhysicsManager().gravity = cc.v2();
    cc._RF.pop();
  }, {} ]
}, {}, [ "BattleCtrl", "HomePageCtrl", "LobbyPageCtrl", "LoginPageCtrl", "MatchingCtrl", "BulletCtrl", "Buttle6Ctrl", "CellCtrl", "PlayerOperationCtrl", "PropsCtrl", "TankCtrl", "LinkedMap", "TransferClass", "WebSocketManage", "init" ]);