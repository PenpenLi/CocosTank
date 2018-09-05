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
  BattleCatrl: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "13937DLhkBG67xqI6V6mxta", "BattleCatrl");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var LinkedMap_1 = require("../Unit/LinkedMap");
    var WebSocketManage_1 = require("../WebSocketManage");
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
        _this.MainPlayerHeadImg = null;
        _this.MainPlayerName = null;
        _this.MainPlayerScore = null;
        _this.VicePlayerHeadImg = null;
        _this.VicePlayerName = null;
        _this.VicePlayerScore = null;
        return _this;
      }
      BattleCtrl.prototype.start = function() {
        this.webScoket = cc.find("WebScoket").getComponent(WebSocketManage_1.default);
        this.initBattleData();
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
      BattleCtrl.prototype.restart = function(type) {
        console.log(type, "restart");
        if (0 === type) {
          var score = this.MainPlayerScore.getComponent(cc.Label).string;
          this.MainPlayerScore.getComponent(cc.Label).string = parseInt(score) + 1 + "";
        } else {
          var score = this.VicePlayerScore.getComponent(cc.Label).string;
          this.VicePlayerScore.getComponent(cc.Label).string = parseInt(score) + 1 + "";
        }
        this.TopCell.removeAllChildren();
        this.LeftCell.removeAllChildren();
        this.RightCell.removeAllChildren();
        this.BottomCell.removeAllChildren();
        this.BattleRegion.removeAllChildren();
        if ("tank_2" !== this.playerName) {
          this.initBattleData();
          this.sendCallBackFor0();
        }
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
      BattleCtrl.prototype.sendCallBackFor0 = function() {
        var self = this;
        self.linkedMap = new LinkedMap_1.default(self.activeBattleData.column, self.activeBattleData.row, self.player[0].point, self.player[1].point).generate();
        self.externalCell();
        for (var i = 0; i < self.cells; i++) self.generateRegion(i);
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
      };
      BattleCtrl.prototype.sendCallBackFor1 = function(response) {
        var self = this;
        self.playerName = "tank_2";
        self.linkedMap = response.data.linkedMap;
        self.player = response.data.player;
        self.activeExternalData = self.externalResources[response.data.externaData];
        self.activeBattleData = response.data.battleData[0];
        var cells = self.activeBattleData.column * self.activeBattleData.row;
        self.externalCell();
        for (var i = 0; i < cells; i++) self.generateRegion(i);
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
        this.player[0] === this.player[1] && this.initPlayerPoint();
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
          player1.setPosition(this.BattleRegion.width / this.activeBattleData.column * column + this.BattleRegion.width / this.activeBattleData.column / 2, -this.BattleRegion.height / this.activeBattleData.row * row - this.BattleRegion.height / this.activeBattleData.row / 2);
          layoutNode.addChild(player1);
        }
        if (i === this.player[1].point) {
          var player2 = cc.instantiate(this.player2);
          player2.scale = this.activeBattleData.scale;
          player2.rotation = this.player[1].rotation;
          player2.setPosition(this.BattleRegion.width / this.activeBattleData.column * column + this.BattleRegion.width / this.activeBattleData.column / 2, -this.BattleRegion.height / this.activeBattleData.row * row - this.BattleRegion.height / this.activeBattleData.row / 2);
          layoutNode.addChild(player2);
        }
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
      __decorate([ property(cc.Node) ], BattleCtrl.prototype, "MainPlayerHeadImg", void 0);
      __decorate([ property(cc.Node) ], BattleCtrl.prototype, "MainPlayerName", void 0);
      __decorate([ property(cc.Node) ], BattleCtrl.prototype, "MainPlayerScore", void 0);
      __decorate([ property(cc.Node) ], BattleCtrl.prototype, "VicePlayerHeadImg", void 0);
      __decorate([ property(cc.Node) ], BattleCtrl.prototype, "VicePlayerName", void 0);
      __decorate([ property(cc.Node) ], BattleCtrl.prototype, "VicePlayerScore", void 0);
      BattleCtrl = __decorate([ ccclass ], BattleCtrl);
      return BattleCtrl;
    }(cc.Component);
    exports.default = BattleCtrl;
    cc._RF.pop();
  }, {
    "../Unit/LinkedMap": "LinkedMap",
    "../WebSocketManage": "WebSocketManage",
    "./HomePageCtrl": "HomePageCtrl"
  } ],
  BulletCtrl: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "2a2bbazLDJL6aDlFXxZ1Za8", "BulletCtrl");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var WebSocketManage_1 = require("../WebSocketManage");
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
        var self = this;
        this.WebScoket = cc.find("WebScoket").getComponent(WebSocketManage_1.default);
        setTimeout(function() {
          self.node && self.node.destroy();
        }, 5e3);
      };
      NewClass.prototype.update = function(dt) {
        var rotation = this.node.rotation;
        this.node.x += this.speedX * Math.sin(Math.PI * rotation / 180);
        this.node.y += this.speedY * Math.cos(Math.PI * rotation / 180);
      };
      NewClass.prototype.onCollisionEnter = function(other, self) {
        switch (other.tag) {
         case 0:
          this.speedY *= -1;
          break;

         case 1:
          this.speedX *= -1;
          break;

         case 2:
          this.speedY *= -1;
          break;

         case 3:
          this.speedX *= -1;
        }
      };
      NewClass.prototype.onDestroy = function() {
        this.node.destroy();
      };
      NewClass = __decorate([ ccclass ], NewClass);
      return NewClass;
    }(cc.Component);
    exports.default = NewClass;
    cc._RF.pop();
  }, {
    "../WebSocketManage": "WebSocketManage"
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
  HomePageCtrl: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "34123NWVIRNU6xkpmnqGz20", "HomePageCtrl");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var WebSocketManage_1 = require("../WebSocketManage");
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
        this.ping.zIndex = 9999;
        var self = this;
        this.getPing();
      };
      NewClass.prototype.OnClickStartButton = function() {
        var webscoket = this.WebScoketNode.getComponent(WebSocketManage_1.default);
        webscoket.sendMessage({
          msg: 1
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
        }, 100);
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
  }, {
    "../WebSocketManage": "WebSocketManage"
  } ],
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
    var WebSocketManage_1 = require("../WebSocketManage");
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
    "../WebSocketManage": "WebSocketManage"
  } ],
  MatchingCtrl: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "1dbafsnqO5BzadTTzTYpDVp", "MatchingCtrl");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var WebSocketManage_1 = require("../WebSocketManage");
    var HomePageCtrl_1 = require("./HomePageCtrl");
    var BattleCatrl_1 = require("./BattleCatrl");
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
      NewClass.prototype.setBattelData = function(response) {
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
        response.data ? battlePage.getComponent(BattleCatrl_1.default).initScore(0) : battlePage.getComponent(BattleCatrl_1.default).initScore(1);
        setTimeout(function() {
          response.data && battlePage.getComponent(BattleCatrl_1.default).sendCallBackFor0();
          battlePage.zIndex = 1;
          self.destroy();
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
    "../WebSocketManage": "WebSocketManage",
    "./BattleCatrl": "BattleCatrl",
    "./HomePageCtrl": "HomePageCtrl"
  } ],
  PlayerOperationCtrl: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "c8f9bczRL9LBY0TeU61gGwq", "PlayerOperationCtrl");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var BattleCatrl_1 = require("./Page/BattleCatrl");
    var WebSocketManage_1 = require("./WebSocketManage");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var NewClass = function(_super) {
      __extends(NewClass, _super);
      function NewClass() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.BattleRegion = null;
        _this.Buttle = null;
        _this.player = null;
        _this.rotationStatus = 0;
        _this.moveStatus = 0;
        _this.BattleCtrl = null;
        _this.WebScoket = null;
        _this.i = 0;
        _this.correct = -1;
        return _this;
      }
      NewClass.prototype.start = function() {
        this.BattleCtrl = this.node.parent.parent.getComponent(BattleCatrl_1.default);
        this.WebScoket = cc.find("WebScoket").getComponent(WebSocketManage_1.default);
        var self = this;
        this.node.getChildByName("left").on(cc.Node.EventType.TOUCH_START, function(event) {
          self.getPlayer(self.BattleCtrl.playerName);
          self.rotationStatus = 1;
        });
        this.node.getChildByName("left").on(cc.Node.EventType.TOUCH_END, function(event) {
          self.getPlayer(self.BattleCtrl.playerName);
          self.rotationStatus = 0;
        });
        this.node.getChildByName("left").on(cc.Node.EventType.TOUCH_CANCEL, function(event) {
          self.getPlayer(self.BattleCtrl.playerName);
          self.rotationStatus = 0;
        });
        this.node.getChildByName("right").on(cc.Node.EventType.TOUCH_START, function(event) {
          self.getPlayer(self.BattleCtrl.playerName);
          self.rotationStatus = 2;
        });
        this.node.getChildByName("right").on(cc.Node.EventType.TOUCH_CANCEL, function(event) {
          self.getPlayer(self.BattleCtrl.playerName);
          self.rotationStatus = 0;
        });
        this.node.getChildByName("right").on(cc.Node.EventType.TOUCH_END, function(event) {
          self.getPlayer(self.BattleCtrl.playerName);
          self.rotationStatus = 0;
        });
        this.node.getChildByName("up").on(cc.Node.EventType.TOUCH_START, function(event) {
          self.getPlayer(self.BattleCtrl.playerName);
          self.moveStatus = 1;
        });
        this.node.getChildByName("up").on(cc.Node.EventType.TOUCH_CANCEL, function(event) {
          self.getPlayer(self.BattleCtrl.playerName);
          self.moveStatus = 0;
        });
        this.node.getChildByName("up").on(cc.Node.EventType.TOUCH_END, function(event) {
          self.getPlayer(self.BattleCtrl.playerName);
          self.moveStatus = 0;
        });
        this.node.getChildByName("bottom").on(cc.Node.EventType.TOUCH_START, function(event) {
          self.getPlayer(self.BattleCtrl.playerName);
          self.moveStatus = 2;
        });
        this.node.getChildByName("bottom").on(cc.Node.EventType.TOUCH_CANCEL, function(event) {
          self.getPlayer(self.BattleCtrl.playerName);
          self.moveStatus = 0;
        });
        this.node.getChildByName("bottom").on(cc.Node.EventType.TOUCH_END, function(event) {
          self.getPlayer(self.BattleCtrl.playerName);
          self.moveStatus = 0;
        });
        this.node.getChildByName("fire").on(cc.Node.EventType.TOUCH_START, function(event) {
          var len = 0;
          self.getPlayer(self.BattleCtrl.playerName);
          self.player.parent.children.map(function(node) {
            node.name.length > 11 && len++;
          });
          if (len < 5) {
            self.i = (self.i + 1) % 5;
            self.generateBullet("tank_buttle_" + self.i);
          }
        });
      };
      NewClass.prototype.generateBullet = function(name) {
        var buttle = cc.instantiate(this.Buttle);
        buttle.name = name;
        var scale = this.player.scale;
        var rotation = this.player.rotation;
        buttle.scale = scale;
        buttle.rotation = rotation;
        buttle.zIndex = -1;
        var centerPointx = this.player.x;
        var centerPointy = this.player.y;
        var buttleX = this.player.x;
        var buttleY = this.player.y + this.player.height * scale / 2 + 2;
        var x = (buttleY - centerPointy) * Math.sin(Math.PI * rotation / 180) + centerPointx;
        var y = (buttleY - centerPointy) * Math.cos(Math.PI * rotation / 180) + (buttleX - centerPointx) * Math.sin(Math.PI * rotation / 180) + centerPointy;
        buttle.setPosition(x, y);
        this.player.parent.addChild(buttle);
        this.WebScoket.sendMessage({
          msg: 23,
          data: {
            buttleName: buttle.name,
            scale: scale,
            x: x,
            y: y,
            rotation: rotation
          }
        });
      };
      NewClass.prototype.generateReceiveButtle = function(response) {
        this.getPlayer(this.BattleCtrl.playerName);
        var buttle = cc.instantiate(this.Buttle);
        buttle.name = response.data.buttleName;
        buttle.scale = response.data.scale;
        buttle.rotation = response.data.rotation;
        buttle.setPosition(response.data.x, response.data.y);
        var tank = "tank_2";
        "tank_2" === this.player.name && (tank = "tank_1");
        this.getTankName(tank).parent.addChild(buttle);
      };
      NewClass.prototype.getTankName = function(tank) {
        var player = null;
        var children = this.BattleRegion.children;
        if (!children) return;
        for (var i = 0; i < children.length; i++) if (children[i].getChildByName(tank)) {
          player = children[i].getChildByName(tank);
          return player;
        }
      };
      NewClass.prototype.getPlayer = function(tank) {
        var children = this.BattleRegion.children;
        if (!children) return;
        for (var i = 0; i < children.length; i++) if (children[i].getChildByName(tank)) {
          this.player = children[i].getChildByName(tank);
          return;
        }
        console.log(this.player);
      };
      NewClass.prototype.update = function(dt) {
        var self = this;
        if (1 === this.rotationStatus) {
          this.player.rotation - 5 < 0 ? this.player.rotation = 360 - this.player.rotation - 5 : this.player.rotation = this.player.rotation - 5;
          this.sendTankData();
        }
        if (2 === this.rotationStatus) {
          this.player.rotation = (this.player.rotation + 5) % 360;
          this.sendTankData();
        }
        if (1 === this.moveStatus) {
          var speed = 5;
          this.player.x += speed * Math.sin(Math.PI * this.player.rotation / 180);
          this.player.y += speed * Math.cos(Math.PI * this.player.rotation / 180);
          console.log(this.player.x, this.player.y);
          this.sendTankData();
        }
        if (2 === this.moveStatus) {
          var speed = 5;
          this.player.x -= speed * Math.sin(Math.PI * this.player.rotation / 180);
          this.player.y -= speed * Math.cos(Math.PI * this.player.rotation / 180);
          this.sendTankData();
        }
      };
      NewClass.prototype.sendTankData = function() {
        var self = this;
        this.WebScoket.sendMessage({
          msg: 22,
          data: {
            tankName: self.BattleCtrl.playerName,
            x: self.player.x,
            y: self.player.y,
            rotation: self.player.rotation
          }
        });
      };
      NewClass.prototype.setOtherTankDataFor2 = function(response) {
        var player = null;
        "2" === response.dataMessage && (player = this.getTankName(response.data.tankName));
        if (player) {
          player.x = response.data.x;
          player.y = response.data.y;
          player.rotation = response.data.rotation;
        }
      };
      __decorate([ property(cc.Node) ], NewClass.prototype, "BattleRegion", void 0);
      __decorate([ property(cc.Prefab) ], NewClass.prototype, "Buttle", void 0);
      NewClass = __decorate([ ccclass ], NewClass);
      return NewClass;
    }(cc.Component);
    exports.default = NewClass;
    cc._RF.pop();
  }, {
    "./Page/BattleCatrl": "BattleCatrl",
    "./WebSocketManage": "WebSocketManage"
  } ],
  TankCtrl: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "33ad7W4Sq9CJ4BpgZFyxICj", "TankCtrl");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var BattleCatrl_1 = require("../Page/BattleCatrl");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var NewClass = function(_super) {
      __extends(NewClass, _super);
      function NewClass() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      NewClass.prototype.start = function() {
        this.playerRg = this.getComponent(cc.RigidBody);
      };
      NewClass.prototype.update = function() {};
      NewClass.prototype.onCollisionEnter = function(other, self) {
        var otherName = other.node.name.substring(5, 11);
        var loser = self.node.name;
        var scoreType = 0;
        "tank_1" === loser && (scoreType = 1);
        if ("buttle" === otherName) {
          this.node.destroy();
          var node = other.node;
          node.destroy();
          cc.find("Canvas/BattlePagePanel").getComponent(BattleCatrl_1.default).restart(scoreType);
        }
      };
      NewClass = __decorate([ ccclass ], NewClass);
      return NewClass;
    }(cc.Component);
    exports.default = NewClass;
    cc._RF.pop();
  }, {
    "../Page/BattleCatrl": "BattleCatrl"
  } ],
  WebSocketManage: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "8aeccTbL45CTogTfRwPMgzA", "WebSocketManage");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var BattleCatrl_1 = require("./Page/BattleCatrl");
    var PlayerOperationCtrl_1 = require("./PlayerOperationCtrl");
    var HomePageCtrl_1 = require("./Page/HomePageCtrl");
    var MatchingCtrl_1 = require("./Page/MatchingCtrl");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var WebSocketManage = function(_super) {
      __extends(WebSocketManage, _super);
      function WebSocketManage() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.BattlePage = null;
        _this.Operation = null;
        _this.HomePage = null;
        _this.MatchingPage = null;
        return _this;
      }
      WebSocketManage.prototype.start = function() {
        var self = this;
        this.ws = new WebSocket("ws://app.ei-marketing.net/tankWar/echo.do");
        this.ws.onopen = function(event) {
          console.log("服务器已打开");
        };
        this.ws.onerror = function(event) {
          console.log("连接服务器失败");
        };
        this.ws.onclose = function(event) {
          console.log("服务器关闭");
        };
        this.ws.onmessage = function(event) {
          var response = JSON.parse(event.data);
          if ("-1" === response.dataMessage) {
            self.HomePage = cc.find("Canvas/HomePagePanel");
            self.HomePage.getComponent(HomePageCtrl_1.default).getUserData(response);
          }
          if ("0" === response.dataMessage) {
            self.HomePage = cc.find("Canvas/HomePagePanel");
            self.HomePage.getComponent(HomePageCtrl_1.default).enemyUserData = response.enemyData;
            self.MatchingPage = cc.find("Canvas/MatchingPagePanel");
            self.MatchingPage.getComponent(MatchingCtrl_1.default).setBattelData(response);
          }
          if ("1" === response.dataMessage) {
            self.BattlePage = cc.find("Canvas/BattlePagePanel");
            self.BattlePage.getComponent(BattleCatrl_1.default).sendCallBackFor1(response);
          }
          if ("2" === response.dataMessage) {
            self.Operation = cc.find("Canvas/BattlePagePanel/BattleBox/operation");
            self.Operation.getComponent(PlayerOperationCtrl_1.default).setOtherTankDataFor2(response);
          }
          if ("3" === response.dataMessage) {
            self.Operation = cc.find("Canvas/BattlePagePanel/BattleBox/operation");
            self.Operation.getComponent(PlayerOperationCtrl_1.default).generateReceiveButtle(response);
          }
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
    "./Page/BattleCatrl": "BattleCatrl",
    "./Page/HomePageCtrl": "HomePageCtrl",
    "./Page/MatchingCtrl": "MatchingCtrl",
    "./PlayerOperationCtrl": "PlayerOperationCtrl"
  } ],
  init: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "3ff06I6ha1G4Y7NMh0WTs/7", "init");
    cc.director.getPhysicsManager().enabled = true;
    cc.director.getPhysicsManager().gravity = cc.v2();
    cc._RF.pop();
  }, {} ]
}, {}, [ "BattleCatrl", "HomePageCtrl", "LobbyPageCtrl", "LoginPageCtrl", "MatchingCtrl", "BulletCtrl", "CellCtrl", "TankCtrl", "PlayerOperationCtrl", "LinkedMap", "WebSocketManage", "init" ]);