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
        _this.battleData = [];
        _this.activeBattleData = null;
        _this.cells = 0;
        _this.externalResources = [];
        _this.activeExternalData = null;
        _this.linkedMap = {};
        _this.player = [];
        _this.Exterrandom = 0;
        _this.playerName = "tank_1";
        _this.setArray = null;
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
        _this.propsList = [ "prop_1", "prop_3", "prop_6" ];
        _this.reGameOverStatus = false;
        return _this;
      }
      BattleCtrl.prototype.start = function() {
        this.initBattleData();
      };
      BattleCtrl.prototype.initBattleData = function() {
        this.webScoket = cc.find("WebScoket").getComponent(WebSocketManage_1.default);
        console.log("initBattleData");
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
        this.battleData = [ {
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
        this.player[0].point - this.player[1].point > -10 && this.player[0].point - this.player[1].point < 10 && this.initPlayerPoint();
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
        this.webScoket.sendMessage({
          msg: 28
        });
        this.node.destroy();
        clearInterval(this.propsTime);
      };
      BattleCtrl.prototype.genearteProp = function(point, rotation, type) {
        var prop = cc.instantiate(this.props);
        cc.loader.loadRes(type, cc.SpriteFrame, function(err, spriteFrame) {
          prop.getComponent(cc.Sprite).spriteFrame = spriteFrame;
        });
        prop.zIndex = 5;
        prop.rotation = rotation;
        prop.name = type;
        prop.scale = this.activeBattleData.scale;
        this.BattleRegion.children[point].addChild(prop);
      };
      BattleCtrl.prototype.propsRefreshInterval = function() {
        var _this = this;
        var propsInterval = [];
        var propsLocationList = [];
        clearInterval(this.propsTime);
        var interval = this.setArray[this.player[0].point];
        for (var i = 0; i < this.setArray.length; i++) this.setArray[i] === interval && propsInterval.push(i);
        this.propsTime = setInterval(function() {
          var point = _this.propLocation(propsInterval, propsLocationList);
          propsLocationList.push(point);
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
        setTimeout(function() {
          setInterval(function() {
            0 !== propsLocationList.length && propsLocationList.splice(0, 1);
          }, 5e3);
        }, 12e3);
      };
      BattleCtrl.prototype.propLocation = function(regionList, currentList) {
        var point = regionList[Math.random() * regionList.length >> 0];
        return -1 === currentList.indexOf(point) ? point : this.propLocation(regionList, currentList);
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
        var userData = homePageCtrl.userInfo;
        var enemyUserData = homePageCtrl.viceUserInfo;
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
        this.reGameOverStatus = true;
        this.initBattleData();
        var self = this;
        console.log(self.activeBattleData, "column");
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
        this.reGameOverStatus = true;
        this.initBattleData();
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
        clearInterval(this.propsTime);
        this.ready.active = true;
        this.ready.getChildByName("waiting_1").active = false;
        this.ready.getChildByName("waiting_2").active = true;
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
        return _this;
      }
      NewClass.prototype.start = function() {
        this.bullet = this.node.getComponent(cc.RigidBody);
        var speed = 500;
        var x = speed * Math.sin(Math.PI * this.node.rotation / 180);
        var y = speed * Math.cos(Math.PI * this.node.rotation / 180);
        this.bullet.linearVelocity = new cc.Vec2(x, y);
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
  Buttle3Ctrl: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "c4966pl/QZBX5VLCYhF85CV", "Buttle3Ctrl");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var PlayerOperationCtrl_1 = require("./PlayerOperationCtrl");
    var WebSocketManage_1 = require("../Unit/WebSocketManage");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var NewClass = function(_super) {
      __extends(NewClass, _super);
      function NewClass() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.WebSocket = null;
        _this.OperationCtrl = null;
        return _this;
      }
      NewClass.prototype.start = function() {
        var manager = cc.director.getCollisionManager();
        manager.enabled = true;
        this.WebSocket = cc.find("WebScoket").getComponent(WebSocketManage_1.default);
        var _self = this;
        this.OperationCtrl = cc.find("Canvas/BattlePagePanel/BattleBox/operation").getComponent(PlayerOperationCtrl_1.default);
        this.bullet = this.node.getComponent(cc.RigidBody);
        var speed = 500;
        var x = speed * Math.sin(Math.PI * this.node.rotation / 180);
        var y = speed * Math.cos(Math.PI * this.node.rotation / 180);
        this.bullet.linearVelocity = new cc.Vec2(x, y);
      };
      NewClass.prototype.onCollisionEnter = function(other, self) {
        var scoreType = 0;
        "tank_1" === other.node.name && (scoreType = 1);
        this.WebSocket.sendMessage({
          msg: 25,
          data: {
            scoreType: scoreType,
            buttleName: this.node.name
          }
        });
      };
      NewClass.prototype.onBeginContact = function(contact, selfCollider, otherCollider) {};
      NewClass.prototype.boom = function() {
        var _self = this;
        for (var i = 0; i < 12; i++) {
          var bullet = _self.OperationCtrl.generateBullet({
            name: "tank_buttle_" + i,
            type: 1,
            bulletType: 1,
            rotation: 30 * i,
            scale: _self.node.scale,
            x: _self.node.x,
            y: _self.node.y
          }, 0);
          _self.node.parent.addChild(bullet);
        }
        _self.node.destroy();
      };
      NewClass.prototype.update = function(dt) {};
      NewClass = __decorate([ ccclass ], NewClass);
      return NewClass;
    }(cc.Component);
    exports.default = NewClass;
    cc._RF.pop();
  }, {
    "../Unit/WebSocketManage": "WebSocketManage",
    "./PlayerOperationCtrl": "PlayerOperationCtrl"
  } ],
  Buttle6Ctrl: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "022778WYX5Og5WwOArqNwHE", "Buttle6Ctrl");
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
        return _this;
      }
      NewClass.prototype.start = function() {
        var _self = this;
        this.WebScoket = cc.find("WebScoket").getComponent(WebSocketManage_1.default);
        var manager = cc.director.getCollisionManager();
        manager.enabled = false;
        setTimeout(function() {
          _self.node.opacity = 20;
          manager.enabled = true;
        }, 3e3);
      };
      NewClass.prototype.onCollisionEnter = function(other, self) {
        var _self = this;
        var scoreType = 0;
        "tank_1" === other.node.name && (scoreType = 1);
        _self.WebScoket.sendMessage({
          msg: 25,
          data: {
            scoreType: scoreType,
            buttleName: this.node.name
          }
        });
      };
      NewClass = __decorate([ ccclass ], NewClass);
      return NewClass;
    }(cc.Component);
    exports.default = NewClass;
    cc._RF.pop();
  }, {
    "../Unit/WebSocketManage": "WebSocketManage"
  } ],
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
  FriendPageCtrl: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "be216ZwcEVHb6afRmhx0+SX", "FriendPageCtrl");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var WebSocketManage_1 = require("../Unit/WebSocketManage");
    var HomePageCtrl_1 = require("../Page/HomePageCtrl");
    var BattleCtrl_1 = require("../Page/BattleCtrl");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var NewClass = function(_super) {
      __extends(NewClass, _super);
      function NewClass() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.BattlePage = null;
        _this.HomePageCtrl = null;
        _this.WebSocket = null;
        _this.roomNumber = "";
        _this.currentPlayer = true;
        _this.player = {
          main: {
            headImgNode: null,
            nickNameNode: null
          },
          vice: {
            headImgNode: null,
            nickNameNode: null
          }
        };
        return _this;
      }
      NewClass.prototype.start = function() {
        this.WebSocket = cc.find("WebScoket").getComponent(WebSocketManage_1.default);
        this.WebSocket.sendMessage({
          msg: 4
        });
      };
      NewClass.prototype.init = function(type) {
        var _self = this;
        this.player.main.headImgNode = this.node.getChildByName("Player").getChildByName("player1").getChildByName("Mask").getChildByName("headImg");
        this.player.main.nickNameNode = this.node.getChildByName("Player").getChildByName("player1").getChildByName("nickname");
        this.player.vice.headImgNode = this.node.getChildByName("Player").getChildByName("player2").getChildByName("Mask").getChildByName("headImg");
        this.player.vice.nickNameNode = this.node.getChildByName("Player").getChildByName("player2").getChildByName("nickname");
        this.HomePageCtrl = cc.find("Canvas/HomePagePanel").getComponent(HomePageCtrl_1.default);
        if (0 === type) {
          var userInfo = this.HomePageCtrl.userInfo;
          this.player.main.nickNameNode.getComponent(cc.Label).string = userInfo.nickname;
          cc.loader.load({
            url: userInfo.headimgurl,
            type: "png"
          }, function(err, texture) {
            _self.player.main.headImgNode.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(texture);
          });
        }
        if (1 === type) {
          var viceuserInfo = this.HomePageCtrl.viceUserInfo;
          this.player.vice.nickNameNode.getComponent(cc.Label).string = viceuserInfo.nickname;
          cc.loader.load({
            url: viceuserInfo.headimgurl,
            type: "png"
          }, function(err, texture) {
            _self.player.vice.headImgNode.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(texture);
          });
        }
        if (2 === type) {
          this.currentPlayer = false;
          var userInfo = this.HomePageCtrl.userInfo;
          this.player.vice.nickNameNode.getComponent(cc.Label).string = userInfo.nickname;
          cc.loader.load({
            url: userInfo.headimgurl,
            type: "png"
          }, function(err, texture) {
            _self.player.vice.headImgNode.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(texture);
          });
          this.node.getChildByName("ButtonBox").getChildByName("button_4").active = false;
          var viceuserInfo = this.HomePageCtrl.viceUserInfo;
          this.player.main.nickNameNode.getComponent(cc.Label).string = viceuserInfo.nickname;
          cc.loader.load({
            url: viceuserInfo.headimgurl,
            type: "png"
          }, function(err, texture) {
            _self.player.main.headImgNode.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(texture);
          });
        }
      };
      NewClass.prototype.onShare = function() {
        if ("" === this.roomNumber) return;
        wx.shareAppMessage({
          title: "坦克大战",
          query: "room=" + this.roomNumber,
          success: function(res) {
            console.log(wx.getLaunchOptionsSync());
          },
          fail: function(res) {
            console.log(res, "error");
          }
        });
      };
      NewClass.prototype.onBack = function() {
        this.WebSocket.sendMessage({
          msg: "5"
        });
        this.node.destroy();
      };
      NewClass.prototype.onClickStart = function() {
        this.WebSocket.sendMessage({
          msg: "211"
        });
        var battlePage = cc.instantiate(this.BattlePage);
        battlePage.parent = this.node.parent;
        battlePage.getComponent(BattleCtrl_1.default).initScore(0);
        battlePage.getComponent(BattleCtrl_1.default).generateMap();
        this.node.destroy();
      };
      NewClass.prototype.getOnClickStart = function() {
        var battlePage = cc.instantiate(this.BattlePage);
        battlePage.parent = this.node.parent;
        battlePage.getComponent(BattleCtrl_1.default).initScore(1);
        this.node.destroy();
      };
      NewClass.prototype.getRoomNumber = function(res) {
        this.roomNumber = res.data;
      };
      __decorate([ property(cc.Prefab) ], NewClass.prototype, "BattlePage", void 0);
      NewClass = __decorate([ ccclass ], NewClass);
      return NewClass;
    }(cc.Component);
    exports.default = NewClass;
    cc._RF.pop();
  }, {
    "../Page/BattleCtrl": "BattleCtrl",
    "../Page/HomePageCtrl": "HomePageCtrl",
    "../Unit/WebSocketManage": "WebSocketManage"
  } ],
  HomePageCtrl: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "34123NWVIRNU6xkpmnqGz20", "HomePageCtrl");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var WebSocketManage_1 = require("../Unit/WebSocketManage");
    var FriendPageCtrl_1 = require("../Page/FriendPageCtrl");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var NewClass = function(_super) {
      __extends(NewClass, _super);
      function NewClass() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.lobbyPanel = null;
        _this.openSoundSprite = null;
        _this.closeSoundSprite = null;
        _this.bgSound = null;
        _this.FriendPage = null;
        _this.IsSound = true;
        _this.status = true;
        _this.ping = null;
        _this.WebScoketNode = null;
        _this.viceUserInfo = {
          nickname: "",
          headimgurl: ""
        };
        _this.userInfo = {
          openid: "",
          nickname: "",
          headimgurl: ""
        };
        _this.WebSocket = null;
        return _this;
      }
      NewClass.prototype.start = function() {
        this.WebSocket = this.WebScoketNode.getComponent(WebSocketManage_1.default);
        this.getPing();
        this._onInit();
      };
      NewClass.prototype._onInit = function() {
        var _self = this;
        wx.authorize({
          scope: "scope.userInfo"
        });
        this.WebSocket.ws.onopen = function(event) {
          _self.getUserOpenid();
          wx.onShow(function(response) {
            response.query.room && _self.isWxShare(response.query.room);
          });
          wx.getLaunchOptionsSync().query.room && _self.isWxShare(wx.getLaunchOptionsSync().query.room);
        };
      };
      NewClass.prototype.isWxShare = function(roomId) {
        var _self = this;
        wx.getUserInfo({
          success: function(res) {
            res = res.userInfo;
            var userInfo = {
              nickname: res.nickName,
              headimgurl: res.avatarUrl,
              openid: ""
            };
            _self.userInfo = userInfo;
            _self.WebSocket.sendMessage({
              msg: 6,
              houseid: roomId,
              userInfo: userInfo
            });
          }
        });
      };
      NewClass.prototype.getUserOpenid = function() {
        var _self = this;
        wx.login({
          success: function(res) {
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function() {
              if (4 === xhr.readyState && xhr.status >= 200 && xhr.status < 400) {
                var res = JSON.parse(xhr.responseText);
                _self.userInfo.openid = res.openid;
                _self.uploadUserInfo();
              }
            };
            xhr.open("GET", "http://app.ei-marketing.net/tankWar/acceputJSCODE.do?JSCODE=" + res.code, true);
            xhr.send();
          }
        });
      };
      NewClass.prototype.OnClickStartButton = function() {
        if (!this.status) return;
        this.status = !this.status;
        var lobbyPanelPage = cc.instantiate(this.lobbyPanel);
        lobbyPanelPage.parent = this.node.parent;
        this.enabled = false;
      };
      NewClass.prototype.uploadUserInfo = function() {
        var _self = this;
        wx.getSetting({
          success: function(res) {
            res.authSetting["scope.userInfo"] && wx.getUserInfo({
              success: function(res) {
                res = res.userInfo;
                console.log(res);
                _self.userInfo.nickname = res.nickName;
                _self.userInfo.headimgurl = res.avatarUrl;
                _self.WebSocket.sendMessage({
                  msg: "userInfo",
                  data: {
                    openid: _self.userInfo.openid,
                    nickname: _self.userInfo.nickname,
                    headimgurl: _self.userInfo.headimgurl
                  }
                });
              }
            });
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
        var net_1 = cc.find("Canvas/Ping/net_1");
        var net_2 = cc.find("Canvas/Ping/net_2");
        var net_3 = cc.find("Canvas/Ping/net_3");
        var pingNode = this.node.parent.getChildByName("Ping");
        pingNode.zIndex = 9999;
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
            if (end - start < 50) {
              net_1.active = true;
              net_2.active = false;
              net_3.active = false;
            } else if (end - start < 100) {
              net_1.active = false;
              net_2.active = true;
              net_3.active = false;
            } else {
              net_1.active = false;
              net_2.active = false;
              net_3.active = true;
            }
            pingNode.getComponent(cc.Label).string = end - start + "ms";
          }
        }
      };
      NewClass.prototype.getUserData = function(response) {
        console.log("---");
        this.userInfo = response.data;
        var lobbyPanelPage = cc.instantiate(this.lobbyPanel);
        lobbyPanelPage.parent = this.node.parent;
        this.enabled = false;
      };
      NewClass.prototype.setViceUserInfoForFriend = function(nickname, headimgurl) {
        this.viceUserInfo.nickname = nickname;
        this.viceUserInfo.headimgurl = headimgurl;
      };
      NewClass.prototype.linkForFriend = function(res) {
        this.viceUserInfo.nickname = res.data.nickname;
        this.viceUserInfo.headimgurl = res.data.headimgurl;
        var friendPage = cc.instantiate(this.FriendPage);
        friendPage.parent = this.node.parent;
        friendPage.getComponent(FriendPageCtrl_1.default).init(2);
        this.enabled = false;
      };
      __decorate([ property(cc.Prefab) ], NewClass.prototype, "lobbyPanel", void 0);
      __decorate([ property(cc.SpriteFrame) ], NewClass.prototype, "openSoundSprite", void 0);
      __decorate([ property(cc.SpriteFrame) ], NewClass.prototype, "closeSoundSprite", void 0);
      __decorate([ property(cc.AudioSource) ], NewClass.prototype, "bgSound", void 0);
      __decorate([ property(cc.Prefab) ], NewClass.prototype, "FriendPage", void 0);
      __decorate([ property(cc.Node) ], NewClass.prototype, "ping", void 0);
      __decorate([ property(cc.Node) ], NewClass.prototype, "WebScoketNode", void 0);
      NewClass = __decorate([ ccclass ], NewClass);
      return NewClass;
    }(cc.Component);
    exports.default = NewClass;
    cc._RF.pop();
  }, {
    "../Page/FriendPageCtrl": "FriendPageCtrl",
    "../Unit/WebSocketManage": "WebSocketManage"
  } ],
  LeaguePageCtrl: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "02d17/9jONKbb7nMuEI4Zmm", "LeaguePageCtrl");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var NewClass = function(_super) {
      __extends(NewClass, _super);
      function NewClass() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      NewClass.prototype.start = function() {};
      NewClass.prototype.onBack = function() {
        this.node.destroy();
      };
      NewClass.prototype.onClickEvery = function() {
        this.node.getChildByName("mask").active = true;
      };
      NewClass.prototype.onClickReEvery = function() {
        this.node.getChildByName("mask").active = false;
      };
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
    var FriendPageCtrl_1 = require("./FriendPageCtrl");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var NewClass = function(_super) {
      __extends(NewClass, _super);
      function NewClass() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.matchingPanel = null;
        _this.friendPanel = null;
        _this.leaguePanel = null;
        _this.headImg = null;
        _this.userName = null;
        _this.HomePage = null;
        return _this;
      }
      NewClass.prototype.start = function() {
        var self = this;
        this.HomePage = cc.find("Canvas/HomePagePanel");
        var homePage = this.HomePage.getComponent(HomePageCtrl_1.default);
        this.userName.getComponent(cc.Label).string = homePage.userInfo.nickname;
        cc.loader.load({
          url: homePage.userInfo.headimgurl,
          type: "png"
        }, function(err, texture) {
          self.headImg.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(texture);
        });
      };
      NewClass.prototype.onBackButton = function() {
        this.node.destroy();
        this.HomePage.getComponent(HomePageCtrl_1.default).status = true;
        this.HomePage.getComponent(HomePageCtrl_1.default).enabled = true;
      };
      NewClass.prototype.onClickMatching = function() {
        var matchingPanel = cc.instantiate(this.matchingPanel);
        matchingPanel.parent = this.node.parent;
        this.enabled = false;
      };
      NewClass.prototype.onClickFriend = function() {
        var friendPanel = cc.instantiate(this.friendPanel);
        friendPanel.parent = this.node.parent;
        friendPanel.getComponent(FriendPageCtrl_1.default).init(0);
        this.enabled = false;
      };
      NewClass.prototype.onClickLeague = function() {
        var leaguePanel = cc.instantiate(this.leaguePanel);
        leaguePanel.parent = this.node.parent;
        this.enabled = false;
      };
      __decorate([ property(cc.Prefab) ], NewClass.prototype, "matchingPanel", void 0);
      __decorate([ property(cc.Prefab) ], NewClass.prototype, "friendPanel", void 0);
      __decorate([ property(cc.Prefab) ], NewClass.prototype, "leaguePanel", void 0);
      __decorate([ property(cc.Node) ], NewClass.prototype, "headImg", void 0);
      __decorate([ property(cc.Node) ], NewClass.prototype, "userName", void 0);
      NewClass = __decorate([ ccclass ], NewClass);
      return NewClass;
    }(cc.Component);
    exports.default = NewClass;
    cc._RF.pop();
  }, {
    "./FriendPageCtrl": "FriendPageCtrl",
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
        this.userData = this.HomePage.getComponent(HomePageCtrl_1.default).userInfo;
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
    var Buttle3Ctrl_1 = require("./Buttle3Ctrl");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var NewClass = function(_super) {
      __extends(NewClass, _super);
      function NewClass() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.bullet = null;
        _this.bullet6 = null;
        _this.bullet3 = null;
        _this.currentSpecialBullet = null;
        _this.BattleRegion = null;
        _this.WebSocket = null;
        _this.player = {
          current: {
            node: null,
            actionList: [],
            fireStatus: 0,
            bulletLimit: 0,
            fireRate: 0,
            buttleType: 0
          },
          vice: {
            node: null,
            actionList: [],
            buttleType: 0
          }
        };
        _this.operationStatus = {
          up: false,
          right: false,
          bottom: false,
          left: false
        };
        _this.bullet6num = 0;
        return _this;
      }
      NewClass.prototype.start = function() {
        this.BattleRegion = this.node.parent.getChildByName("BattleRegion");
        this.WebSocket = cc.find("WebScoket").getComponent(WebSocketManage_1.default);
        this._onGetPlayerNode(this.BattleRegion.parent.parent.getComponent(BattleCtrl_1.default).playerName);
        this._onEventListener();
      };
      NewClass.prototype.update = function(dt) {
        this.operationStatus.up && this.onCurrentOperation(0);
        this.operationStatus.right && this.onCurrentOperation(1);
        this.operationStatus.bottom && this.onCurrentOperation(2);
        this.operationStatus.left && this.onCurrentOperation(3);
        if (1 === this.player.current.fireStatus) {
          this.bulletLimit(0, 5, 0);
          this.player.current.fireStatus = 0;
        }
        2 === this.player.current.fireStatus && this.player.current.fireRate % 5 === 0 && this.bulletLimit(1, 20, 8 - 16 * Math.random());
        this.player.current.fireRate++;
        this.onViceOperation();
      };
      NewClass.prototype.onCurrentOperation = function(type) {
        var speed = 5;
        switch (type) {
         case 0:
          this.player.current.node.x += speed * Math.sin(Math.PI * this.player.current.node.rotation / 180);
          this.player.current.node.y += speed * Math.cos(Math.PI * this.player.current.node.rotation / 180);
          break;

         case 1:
          this.player.current.node.rotation = (this.player.current.node.rotation + 5) % 360;
          break;

         case 2:
          this.player.current.node.x -= speed * Math.sin(Math.PI * this.player.current.node.rotation / 180);
          this.player.current.node.y -= speed * Math.cos(Math.PI * this.player.current.node.rotation / 180);
          break;

         case 3:
          this.player.current.node.rotation - 5 < 0 ? this.player.current.node.rotation = 360 - this.player.current.node.rotation - 5 : this.player.current.node.rotation -= 5;
        }
        this.sendOperationData({
          type: 0,
          x: this.player.current.node.x,
          y: this.player.current.node.y,
          rotation: this.player.current.node.rotation
        });
      };
      NewClass.prototype.sendOperationData = function(data) {
        this.player.current.actionList.push(data);
        this.WebSocket.sendMessage({
          msg: 22,
          data: this.player.current.actionList
        });
        this.player.current.actionList = [];
      };
      NewClass.prototype.onViceOperation = function() {
        if (0 === this.player.vice.actionList.length) return;
        for (var i = 0; i < this.player.vice.actionList.length; i++) {
          if (this.player.vice.actionList[0] && 0 === this.player.vice.actionList[0].type) {
            this.player.vice.node.x = this.player.vice.actionList[0].x;
            this.player.vice.node.y = this.player.vice.actionList[0].y;
            this.player.vice.node.rotation = this.player.vice.actionList[0].rotation;
            this.player.vice.actionList.splice(0, 1);
          }
          if (this.player.vice.actionList[0] && 1 === this.player.vice.actionList[0].type) if (31 === this.player.vice.actionList[0].bulletType) {
            var _self = this;
            this.currentSpecialBullet.boom();
            this.player.vice.actionList.splice(0, 1);
            cc.loader.loadRes(_self.player.vice.node.name, cc.SpriteFrame, function(err, spriteFrame) {
              _self.player.vice.buttleType = 0;
              _self.player.vice.node.getComponent(cc.Sprite).spriteFrame = spriteFrame;
            });
          } else {
            var bullet = this.generateBullet(this.player.vice.actionList[0], 1);
            this.player.vice.node.parent.addChild(bullet);
            this.player.vice.actionList.splice(0, 1);
          }
        }
      };
      NewClass.prototype._onGetPlayerNode = function(mainNodeName) {
        var viceNodeName = "tank_1";
        "tank_1" === mainNodeName && (viceNodeName = "tank_2");
        var children = this.BattleRegion.children;
        if (!children) return;
        for (var i = 0; i < children.length; i++) {
          children[i].getChildByName(mainNodeName) && (this.player.current.node = children[i].getChildByName(mainNodeName));
          children[i].getChildByName(viceNodeName) && (this.player.vice.node = children[i].getChildByName(viceNodeName));
          if (this.player.current.node && this.player.vice.node) return;
        }
      };
      NewClass.prototype._onEventListener = function() {
        this._onMoveListener(this.node.getChildByName("left"), "left");
        this._onMoveListener(this.node.getChildByName("right"), "right");
        this._onMoveListener(this.node.getChildByName("bottom"), "bottom");
        this._onMoveListener(this.node.getChildByName("up"), "up");
        this._onFireListener();
      };
      NewClass.prototype._onMoveListener = function(node, moveType) {
        var _self = this;
        node.on(cc.Node.EventType.TOUCH_START, function(event) {
          _self.operationStatus[moveType] = true;
        });
        node.on(cc.Node.EventType.TOUCH_END, function(event) {
          _self.operationStatus[moveType] = false;
        });
        node.on(cc.Node.EventType.TOUCH_CANCEL, function(event) {
          _self.operationStatus[moveType] = false;
        });
      };
      NewClass.prototype._onFireListener = function() {
        var _self = this;
        var node = this.node.getChildByName("fire");
        node.on(cc.Node.EventType.TOUCH_START, function(event) {
          if (0 === _self.player.current.buttleType) _self.player.current.fireStatus = 1; else if (1 === _self.player.current.buttleType) _self.player.current.fireStatus = 2; else if (6 === _self.player.current.buttleType) {
            var bullet = _self.generateBullet({
              name: "buttle6",
              bulletType: 6,
              scale: _self.player.current.node.scale,
              rotation: _self.player.current.node.rotation,
              x: _self.player.current.node.x,
              y: _self.player.current.node.y
            }, 0);
            _self.sendOperationData({
              type: 1,
              bulletType: 6,
              name: bullet.name,
              scale: bullet.scale,
              x: bullet.x,
              y: bullet.y,
              rotation: bullet.rotation
            });
            _self.player.current.node.parent.addChild(bullet);
          } else if (3 === _self.player.current.buttleType) {
            var point = _self.bulletLocation();
            var bullet = _self.generateBullet({
              name: "tank_buttle3",
              bulletType: 3,
              scale: _self.player.current.node.scale,
              rotation: _self.player.current.node.rotation,
              x: point.x,
              y: point.y
            }, 0);
            _self.player.current.buttleType = 31;
            _self.sendOperationData({
              type: 1,
              bulletType: 3,
              name: bullet.name,
              scale: bullet.scale,
              x: bullet.x,
              y: bullet.y,
              rotation: bullet.rotation
            });
            _self.player.current.node.parent.addChild(bullet);
          } else if (31 === _self.player.current.buttleType) {
            _self.currentSpecialBullet.boom();
            _self.sendOperationData({
              type: 1,
              bulletType: 31
            });
            cc.loader.loadRes(_self.player.current.node.name, cc.SpriteFrame, function(err, spriteFrame) {
              _self.player.current.buttleType = 0;
              _self.player.current.node.getComponent(cc.Sprite).spriteFrame = spriteFrame;
            });
          }
        });
        node.on(cc.Node.EventType.TOUCH_END, function(event) {
          _self.player.current.fireStatus = 0;
        });
        node.on(cc.Node.EventType.TOUCH_CANCEL, function(event) {
          _self.player.current.fireStatus = 0;
        });
      };
      NewClass.prototype.bulletLocation = function() {
        var centerX = this.player.current.node.x;
        var CenterY = this.player.current.node.y;
        var buttleX = centerX;
        var buttleY = CenterY + this.player.current.node.height * this.player.current.node.scale / 2;
        var x = (buttleY - CenterY) * Math.sin(Math.PI * this.player.current.node.rotation / 180) + centerX;
        var y = (buttleY - CenterY) * Math.cos(Math.PI * this.player.current.node.rotation / 180) + (buttleX - centerX) * Math.sin(Math.PI * this.player.current.node.rotation / 180) + CenterY;
        return {
          x: x,
          y: y
        };
      };
      NewClass.prototype.generateBullet = function(data, type) {
        var _self = this;
        var bullet;
        if (1 === data.bulletType || 0 === data.bulletType) {
          bullet = cc.instantiate(this.bullet);
          bullet.setPosition(data.x, data.y);
        }
        if (6 === data.bulletType) {
          this.bullet6num++;
          if (5 === this.bullet6num) {
            0 === type ? cc.loader.loadRes(_self.player.current.node.name, cc.SpriteFrame, function(err, spriteFrame) {
              _self.player.current.buttleType = 0;
              _self.player.current.node.getComponent(cc.Sprite).spriteFrame = spriteFrame;
            }) : cc.loader.loadRes(_self.player.vice.node.name, cc.SpriteFrame, function(err, spriteFrame) {
              _self.player.vice.buttleType = 0;
              _self.player.vice.node.getComponent(cc.Sprite).spriteFrame = spriteFrame;
            });
            _self.bullet6num = 0;
          }
          if (0 === type) {
            bullet = cc.instantiate(this.bullet6);
            bullet.setPosition(this.player.current.node.x, this.player.current.node.y);
          } else {
            bullet = cc.instantiate(this.bullet6);
            bullet.setPosition(this.player.vice.node.x, this.player.vice.node.y);
          }
        }
        if (3 === data.bulletType) {
          bullet = cc.instantiate(this.bullet3);
          this.currentSpecialBullet = bullet.getComponent(Buttle3Ctrl_1.default);
          bullet.setPosition(data.x, data.y);
        }
        bullet.name = data.name;
        bullet.scale = data.scale;
        bullet.rotation = data.rotation;
        return bullet;
      };
      NewClass.prototype.bulletLimit = function(bulletType, maxNumber, offset) {
        var len = 0;
        this.player.current.node.parent.children.map(function(node) {
          node.name.length > 11 && len++;
        });
        if (len < maxNumber) {
          this.player.current.bulletLimit = (this.player.current.bulletLimit + 1) % maxNumber;
          var point = this.bulletLocation();
          var data = {
            name: "tank_buttle_" + this.player.current.node.name.substring(5, 6) + "_" + this.player.current.bulletLimit,
            bulletType: bulletType,
            scale: this.player.current.node.scale,
            rotation: this.player.current.node.rotation + offset,
            x: point.x,
            y: point.y
          };
          var bullet = this.generateBullet(data, 0);
          this.player.current.node.parent.addChild(bullet);
          this.sendOperationData({
            type: 1,
            bulletType: bulletType,
            name: bullet.name,
            scale: bullet.scale,
            x: bullet.x,
            y: bullet.y,
            rotation: bullet.rotation
          });
        }
      };
      NewClass.prototype.getViceOperationData = function(res) {
        this.player.vice.actionList.push(res.data[0]);
      };
      __decorate([ property(cc.Prefab) ], NewClass.prototype, "bullet", void 0);
      __decorate([ property(cc.Prefab) ], NewClass.prototype, "bullet6", void 0);
      __decorate([ property(cc.Prefab) ], NewClass.prototype, "bullet3", void 0);
      NewClass = __decorate([ ccclass ], NewClass);
      return NewClass;
    }(cc.Component);
    exports.default = NewClass;
    cc._RF.pop();
  }, {
    "../Page/BattleCtrl": "BattleCtrl",
    "../Unit/WebSocketManage": "WebSocketManage",
    "./Buttle3Ctrl": "Buttle3Ctrl"
  } ],
  PropsCtrl: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "14414OS2Y5JT7xR/Ygdc9cz", "PropsCtrl");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var PlayerOperationCtrl_1 = require("./PlayerOperationCtrl");
    var BattleCtrl_1 = require("../Page/BattleCtrl");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var NewClass = function(_super) {
      __extends(NewClass, _super);
      function NewClass() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.nodeDestoryTime = null;
        return _this;
      }
      NewClass.prototype.start = function() {
        var _this = this;
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
        var propType = parseInt(this.node.name.substring(5, 6));
        var spriteFrameName = other.node.name + "_" + propType;
        var playerName = cc.find("Canvas/BattlePagePanel").getComponent(BattleCtrl_1.default).playerName;
        other.node.name === playerName ? cc.find("Canvas/BattlePagePanel/BattleBox/operation").getComponent(PlayerOperationCtrl_1.default).player.current.buttleType = propType : cc.find("Canvas/BattlePagePanel/BattleBox/operation").getComponent(PlayerOperationCtrl_1.default).player.vice.buttleType = propType;
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
  }, {
    "../Page/BattleCtrl": "BattleCtrl",
    "./PlayerOperationCtrl": "PlayerOperationCtrl"
  } ],
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
        return _this;
      }
      NewClass.prototype.start = function() {
        this.WebScoket = cc.find("WebScoket").getComponent(WebSocketManage_1.default);
      };
      NewClass.prototype.onBeginContact = function(contact, selfCollider, otherCollider) {
        var otherName = otherCollider.node.name.substring(5, 11);
        if ("buttle" === otherName) {
          var scoreType = 0;
          "tank_1" === this.node.name && (scoreType = 1);
          this.WebScoket.sendMessage({
            msg: 25,
            data: {
              scoreType: scoreType,
              buttleName: otherCollider.node.name
            }
          });
        }
      };
      NewClass.prototype.gameOver = function(response) {
        cc.find("Canvas/BattlePagePanel/BattleBox/BattleRegion").parent.getChildByName("operation") && cc.find("Canvas/BattlePagePanel/BattleBox/BattleRegion").parent.getChildByName("operation").destroy();
        var boom = cc.instantiate(this.Boom);
        boom.setPosition(this.node.x, this.node.y);
        this.node.parent.addChild(boom);
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
    var FriendPageCtrl_1 = require("../Page/FriendPageCtrl");
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
        console.log(res, "64");
        var homePageCtrl = null;
        this.HomePage = cc.find("Canvas/HomePagePanel");
        homePageCtrl = this.HomePage.getComponent(HomePageCtrl_1.default);
        homePageCtrl.viceUserInfo = res.enemyData;
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
        operationCtrl.getViceOperationData(res);
      };
      Transfer.prototype.fireButtleForOperationCtrl = function(res) {
        var operationCtrl = null;
        this.Operation = cc.find("Canvas/BattlePagePanel/BattleBox/operation");
        operationCtrl = this.Operation.getComponent(PlayerOperationCtrl_1.default);
        operationCtrl.addReceiveButtle(res);
      };
      Transfer.prototype.dieForTankCtrl = function(res) {
        if (!cc.find("Canvas/BattlePagePanel").getComponent(BattleCtrl_1.default).reGameOverStatus) return;
        cc.find("Canvas/BattlePagePanel").getComponent(BattleCtrl_1.default).reGameOverStatus = false;
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
      Transfer.prototype.getRoomNumberForFriendCtrl = function(res) {
        var friendCtrl = cc.find("Canvas/FriendPagePanel").getComponent(FriendPageCtrl_1.default);
        friendCtrl.getRoomNumber(res);
      };
      Transfer.prototype.getFriendForHomePageCtrl = function(res) {
        console.log(res);
        if (2 === res.palyNum) {
          var homePageCtrl = null;
          this.HomePage = cc.find("Canvas/HomePagePanel");
          homePageCtrl = this.HomePage.getComponent(HomePageCtrl_1.default);
          homePageCtrl.setViceUserInfoForFriend(res.data.nickname, res.data.headimgurl);
          var friendCtrl = cc.find("Canvas/FriendPagePanel").getComponent(FriendPageCtrl_1.default);
          friendCtrl.init(1);
        } else if (1 === res.palyNum) {
          var homePageCtrl = null;
          this.HomePage = cc.find("Canvas/HomePagePanel");
          homePageCtrl = this.HomePage.getComponent(HomePageCtrl_1.default);
          homePageCtrl.linkForFriend(res);
        }
      };
      Transfer.prototype.getOnClickStart = function() {
        var friendCtrl = cc.find("Canvas/FriendPagePanel").getComponent(FriendPageCtrl_1.default);
        friendCtrl.getOnClickStart();
      };
      Transfer = __decorate([ ccclass ], Transfer);
      return Transfer;
    }(cc.Component);
    exports.default = Transfer;
    cc._RF.pop();
  }, {
    "../Page/BattleCtrl": "BattleCtrl",
    "../Page/FriendPageCtrl": "FriendPageCtrl",
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
        _this.websocketUrl = "ws://app.ei-marketing.net/tankWar/echo.do";
        return _this;
      }
      WebSocketManage.prototype.start = function() {
        this.init();
      };
      WebSocketManage.prototype.init = function() {
        var self = this;
        this.ws = new WebSocket(this.websocketUrl);
        this.ws.onopen = function(event) {
          console.log("服务器已打开");
        };
        this.ws.onerror = function(event) {
          console.log("连接服务器失败", event);
        };
        this.ws.onclose = function(event) {
          console.log("服务器已断开!", event);
          self.init();
        };
        this.ws.onmessage = function(event) {
          var response = JSON.parse(event.data);
          "-1" === response.dataMessage && self.TransferClass.getUserDataForHomePageCtrl(response);
          "0" === response.dataMessage && self.TransferClass.generateMapForHomePageCtrl(response);
          if ("1" === response.dataMessage) {
            console.log("接收地图");
            self.TransferClass.getMapForBattlePageCtrl(response);
          }
          "2" === response.dataMessage && self.TransferClass.positionUnicomForOperationCtrl(response);
          "4" === response.dataMessage && self.TransferClass.dieForTankCtrl(response);
          "5" === response.dataMessage && self.TransferClass.restartForBattleCtrl(response);
          if ("6" === response.dataMessage) {
            console.log("对方离开房间!");
            self.TransferClass.leaveForBattleCtrl(response);
          }
          "7" === response.dataMessage && self.TransferClass.genteraPropsForBattleCtrl(response);
          "8" === response.dataMessage && self.TransferClass.getRoomNumberForFriendCtrl(response);
          "9" === response.dataMessage && self.TransferClass.getFriendForHomePageCtrl(response);
          "211" === response.dataMessage && self.TransferClass.getOnClickStart();
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
}, {}, [ "BattleCtrl", "FriendPageCtrl", "HomePageCtrl", "LeaguePageCtrl", "LobbyPageCtrl", "LoginPageCtrl", "MatchingCtrl", "BulletCtrl", "Buttle3Ctrl", "Buttle6Ctrl", "CellCtrl", "PlayerOperationCtrl", "PropsCtrl", "TankCtrl", "LinkedMap", "TransferClass", "WebSocketManage", "init" ]);