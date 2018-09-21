"use strict";
cc._RF.push(module, '8ba1eRX5hVFTbZGiR6vdZqk', 'BattleCtrl');
// Scripts/Page/BattleCtrl.ts

Object.defineProperty(exports, "__esModule", { value: true });
var LinkedMap_1 = require("../Unit/LinkedMap");
var WebSocketManage_1 = require("../Unit/WebSocketManage");
var HomePageCtrl_1 = require("./HomePageCtrl");
// Learn TypeScript:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/typescript/index.html
// Learn Attribute:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/reference/attributes/index.html
// Learn life-cycle callbacks:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/life-cycle-callbacks/index.html
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var BattleCtrl = /** @class */ (function (_super) {
    __extends(BattleCtrl, _super);
    function BattleCtrl() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
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
        // 战斗数据
        _this.battleData = [
            { row: 3, column: 7, scale: 1 },
            { row: 4, column: 9, scale: 0.775 },
            { row: 5, column: 11, scale: 0.645 },
        ];
        _this.activeBattleData = null;
        _this.cells = 0;
        _this.externalResources = [];
        _this.activeExternalData = null;
        _this.linkedMap = {};
        _this.player = [];
        _this.Exterrandom = 0;
        // 当前玩家节点名称
        _this.playerName = 'tank_1';
        // 根据双方玩家位置生成的区间数组
        _this.setArray = null;
        // 道具刷新区间
        _this.propsInterval = [];
        _this.props = null;
        // 主玩家头像
        _this.MainPlayerHeadImg = null;
        // 主玩家名字
        _this.MainPlayerName = null;
        // 主玩家得分
        _this.MainPlayerScore = null;
        // 副玩家头像
        _this.VicePlayerHeadImg = null;
        // 副玩家名字
        _this.VicePlayerName = null;
        // 副玩家得分
        _this.VicePlayerScore = null;
        // 游戏结束显示节点
        _this.GameStatus = null;
        _this.defeat = null;
        _this.victory = null;
        _this.ready = null;
        _this.propsTime = null;
        // 道具图标列表
        _this.propsList = ['prop_1', 'prop_2', 'prop_3', 'prop_6'];
        return _this;
    }
    BattleCtrl.prototype.start = function () {
        this.webScoket = cc.find('WebScoket').getComponent(WebSocketManage_1.default);
        this.initBattleData();
    };
    BattleCtrl.prototype.initBattleData = function () {
        var self = this;
        this.externalResources = [
            { cellColumn: this.wall_column_1, cellRow: this.wall_row_1, flower: this.fllower_1, horn: this.horn_1, bg: 'floor_1' },
            { cellColumn: this.wall_column_2, cellRow: this.wall_row_2, flower: this.fllower_2, horn: this.horn_2, bg: 'floor_2' },
            { cellColumn: this.wall_column_3, cellRow: this.wall_row_3, flower: this.fllower_3, horn: this.horn_3, bg: 'floor_3' },
        ];
        // 地图尺寸随机
        var random = Math.random() * this.battleData.length >> 0;
        this.activeBattleData = this.battleData[random];
        // 地图修饰随机
        this.Exterrandom = Math.random() * this.externalResources.length >> 0;
        this.activeExternalData = this.externalResources[this.Exterrandom];
        this.cells = this.activeBattleData.column * this.activeBattleData.row;
        this.initPlayerPoint();
    };
    // 双方玩家位置随机
    BattleCtrl.prototype.initPlayerPoint = function () {
        this.player = [];
        this.player.push({
            point: Math.random() * this.cells >> 0,
            rotation: Math.random() * 180 >> 0
        });
        this.player.push({
            point: Math.random() * this.cells >> 0,
            rotation: Math.random() * 180 >> 0
        });
        if (this.player[0].point === this.player[1].point) {
            this.initPlayerPoint();
        }
    };
    // 设置墙属性
    BattleCtrl.prototype.setCellData = function (type, scale) {
        if (type === 0) {
            var node = cc.instantiate(this.activeExternalData.cellColumn);
            node.scale = scale;
            return node;
        }
        else {
            var node = cc.instantiate(this.activeExternalData.cellRow);
            node.scale = scale;
            return node;
        }
    };
    BattleCtrl.prototype.setHornData = function (scale, rotation) {
        var horn = new cc.Node();
        horn.addComponent(cc.Sprite).spriteFrame = this.activeExternalData.horn;
        horn.scale = scale;
        horn.rotation = rotation;
        return horn;
    };
    BattleCtrl.prototype.setFlowerData = function (scale, rotation) {
        var flower = new cc.Node();
        flower.addComponent(cc.Sprite).spriteFrame = this.activeExternalData.flower;
        flower.scale = scale;
        flower.rotation = rotation;
        return flower;
    };
    /**
     * 生成外部墙体
     */
    BattleCtrl.prototype.externalCell = function () {
        var self = this;
        cc.loader.loadRes(self.activeExternalData.bg, cc.SpriteFrame, function (err, spriteFrame) {
            self.BattleRegion.getComponent(cc.Sprite).spriteFrame = spriteFrame;
        });
        // 计算图片缩放比，0.8814为不算阴影的图片墙体实际比例，此处将该实体墙比例作为1比例计算
        var externalCellWidth = this.TopCell.width / this.activeBattleData.column;
        var scale = externalCellWidth / 194 / 0.8814;
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
        scale = externalCellHeigth / 194 / 0.88;
        for (var i = 0; i < this.activeBattleData.row; i++) {
            var flower = this.setFlowerData(scale, 270);
            flower.setPosition(-flower.height * scale / 2 + 0.5, externalCellHeigth * i - this.LeftCell.height / 2 + externalCellHeigth / 2 + 12 * scale);
            this.LeftCell.addChild(flower);
            var node = this.setCellData(1, scale);
            node.setPosition(0, externalCellHeigth * i - this.LeftCell.height / 2 + externalCellHeigth / 2);
            this.LeftCell.addChild(node);
            node = this.setCellData(1, scale);
            node.setPosition(0, externalCellHeigth * i - this.RightCell.height / 2 + externalCellHeigth / 2);
            this.RightCell.addChild(node);
            flower = this.setFlowerData(scale, 90);
            flower.setPosition((flower.height * scale / 2 + node.width * scale / 2), externalCellHeigth * i - this.RightCell.height / 2 + externalCellHeigth / 2 + 11 * scale);
            this.RightCell.addChild(flower);
        }
    };
    /**
     * 内部资源生成
     * @param i
     */
    BattleCtrl.prototype.generateRegion = function (i) {
        var probability = 0.9;
        var row = i / this.activeBattleData.column >> 0, column = i % this.activeBattleData.column;
        var layoutNode = new cc.Node('layoutNode');
        var cellWidth = Math.floor((this.BattleRegion.width / this.activeBattleData.column) * 100) / 100;
        var cellHeight = this.BattleRegion.height / this.activeBattleData.row;
        layoutNode.addComponent(cc.Layout);
        layoutNode.setContentSize(cellWidth, cellHeight);
        this.BattleRegion.addChild(layoutNode);
        // 右边的墙
        if (column !== this.activeBattleData.column - 1 && (!this.linkedMap[i] || this.linkedMap[i].indexOf(i + 1) < 0)) {
            var scale = cellHeight / 194 / 0.8814;
            var rightCell = cc.instantiate(this.activeExternalData.cellRow);
            layoutNode.addChild(rightCell);
            rightCell.scale = scale;
            rightCell.setPosition(this.BattleRegion.width / this.activeBattleData.column * (column + 1), -rightCell.height * scale / 2 - (row * rightCell.height * scale) + (rightCell.height * scale * 0.1185) * row + 10 * scale);
        }
        // 下边的墙
        if (row !== this.activeBattleData.row - 1 && (!this.linkedMap[i] || this.linkedMap[i].indexOf(i + this.activeBattleData.column) < 0)) {
            var scale = cellWidth / 194 / 0.8814;
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
    // 返回大厅
    BattleCtrl.prototype.onBack = function () {
        this.node.destroy();
        this.webScoket.sendMessage({
            msg: 28
        });
        clearInterval(this.propsTime);
    };
    // 生成道具
    BattleCtrl.prototype.genearteProp = function (point, rotation, type) {
        var prop = cc.instantiate(this.props);
        cc.loader.loadRes(type, cc.SpriteFrame, function (err, spriteFrame) {
            prop.getComponent(cc.Sprite).spriteFrame = spriteFrame;
        });
        prop.zIndex = 5;
        prop.rotation = rotation;
        prop.name = type;
        prop.scale = this.activeBattleData.scale;
        this.BattleRegion.children[point].addChild(prop);
    };
    // 获取道具可生成区域
    BattleCtrl.prototype.propsRefreshInterval = function () {
        var _this = this;
        this.propsInterval = [];
        clearInterval(this.propsTime);
        var interval = this.setArray[this.player[0].point];
        for (var i = 0; i < this.setArray.length; i++) {
            if (this.setArray[i] === interval) {
                this.propsInterval.push(i);
            }
        }
        this.propsTime = setInterval(function () {
            var point = _this.propsInterval[Math.random() * _this.propsInterval.length >> 0];
            var rotation = Math.random() * 360 >> 0;
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
        }, 5000);
    };
    // 点击再來一局修改准备状态
    BattleCtrl.prototype.onClickRestart = function () {
        this.webScoket.sendMessage({
            msg: 27
        });
        this.GameStatus.active = false;
        this.ready.active = true;
    };
    BattleCtrl.prototype.initScore = function (type) {
        var self = this;
        var homePageCtrl = cc.find('Canvas/HomePagePanel').getComponent(HomePageCtrl_1.default);
        var userData = homePageCtrl.UserData;
        var enemyUserData = homePageCtrl.enemyUserData;
        // 该玩家是主玩家
        if (type === 0) {
            cc.loader.load({ url: userData.headimgurl, type: 'png' }, function (err, texture) {
                self.MainPlayerHeadImg.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(texture);
            });
            self.MainPlayerName.getComponent(cc.Label).string = userData.nickname;
            cc.loader.load({ url: enemyUserData.headimgurl, type: 'png' }, function (err, texture) {
                self.VicePlayerHeadImg.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(texture);
            });
            self.VicePlayerName.getComponent(cc.Label).string = enemyUserData.nickname;
        }
        else {
            cc.loader.load({ url: userData.headimgurl, type: 'png' }, function (err, texture) {
                self.VicePlayerHeadImg.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(texture);
            });
            self.VicePlayerName.getComponent(cc.Label).string = userData.nickname;
            cc.loader.load({ url: enemyUserData.headimgurl, type: 'png' }, function (err, texture) {
                self.MainPlayerHeadImg.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(texture);
            });
            self.MainPlayerName.getComponent(cc.Label).string = enemyUserData.nickname;
        }
    };
    BattleCtrl.prototype._onRemoveNode = function () {
        this.TopCell.removeAllChildren();
        this.LeftCell.removeAllChildren();
        this.RightCell.removeAllChildren();
        this.BottomCell.removeAllChildren();
        this.BattleRegion.removeAllChildren();
    };
    // 重新开始
    BattleCtrl.prototype.restart = function () {
        this._onRemoveNode();
        if (this.playerName !== 'tank_2') {
            this.initBattleData();
            this.generateMap();
        }
    };
    /**
     * type: 游戏玩家区分 1是主玩家 0是副玩家
     */
    BattleCtrl.prototype.gameOver = function (type) {
        if (type === 0) {
            this.GameStatus.getChildByName('bunko').getComponent(cc.Sprite).spriteFrame = this.defeat;
        }
        else {
            this.GameStatus.getChildByName('bunko').getComponent(cc.Sprite).spriteFrame = this.victory;
        }
        this.GameStatus.active = true;
        clearInterval(this.propsTime);
    };
    BattleCtrl.prototype.scoreCount = function (type) {
        if (type === 0) {
            var score = this.MainPlayerScore.getComponent(cc.Label).string;
            this.MainPlayerScore.getComponent(cc.Label).string = parseInt(score) + 1 + '';
        }
        else {
            var score = this.VicePlayerScore.getComponent(cc.Label).string;
            this.VicePlayerScore.getComponent(cc.Label).string = parseInt(score) + 1 + '';
        }
    };
    // 生成地图
    BattleCtrl.prototype.generateMap = function () {
        var self = this;
        var mapClass = new LinkedMap_1.default(self.activeBattleData.column, self.activeBattleData.row, self.player[0].point, self.player[1].point);
        self.linkedMap = mapClass.generate();
        this.setArray = mapClass.setArray;
        self.externalCell();
        for (var i = 0; i < self.cells; i++) {
            self.generateRegion(i);
        }
        if (this.BattleRegion.parent.getChildByName('operation')) {
            this.BattleRegion.parent.getChildByName('operation').destroy();
        }
        this.BattleRegion.parent.addChild(cc.instantiate(this.operation));
        self.webScoket.sendMessage({
            msg: 21,
            data: {
                battleData: [{
                        column: self.activeBattleData.column,
                        row: self.activeBattleData.row,
                        scale: self.activeBattleData.scale
                    }],
                player: self.player,
                externaData: this.Exterrandom,
                linkedMap: self.linkedMap
            }
        });
        this.propsRefreshInterval();
    };
    // 获取地图信息
    BattleCtrl.prototype.getMap = function (response) {
        this._onRemoveNode();
        var self = this;
        self.playerName = 'tank_2';
        self.linkedMap = response.data.linkedMap;
        self.player = response.data.player;
        self.activeExternalData = self.externalResources[response.data.externaData];
        self.activeBattleData = response.data.battleData[0];
        var cells = self.activeBattleData.column * self.activeBattleData.row;
        self.externalCell();
        for (var i = 0; i < cells; i++) {
            self.generateRegion(i);
        }
        if (this.BattleRegion.parent.getChildByName('operation')) {
            this.BattleRegion.parent.getChildByName('operation').destroy();
        }
        this.BattleRegion.parent.addChild(cc.instantiate(this.operation));
    };
    BattleCtrl.prototype.viceLeave = function () {
        this.ready.getChildByName('labelStatus').getComponent(cc.Label).string = '对方已退出房间！';
    };
    __decorate([
        property(cc.Prefab)
    ], BattleCtrl.prototype, "wall_column_1", void 0);
    __decorate([
        property(cc.Prefab)
    ], BattleCtrl.prototype, "wall_row_1", void 0);
    __decorate([
        property(cc.Prefab)
    ], BattleCtrl.prototype, "wall_column_2", void 0);
    __decorate([
        property(cc.Prefab)
    ], BattleCtrl.prototype, "wall_row_2", void 0);
    __decorate([
        property(cc.Prefab)
    ], BattleCtrl.prototype, "wall_column_3", void 0);
    __decorate([
        property(cc.Prefab)
    ], BattleCtrl.prototype, "wall_row_3", void 0);
    __decorate([
        property(cc.Node)
    ], BattleCtrl.prototype, "BattleRegion", void 0);
    __decorate([
        property(cc.Node)
    ], BattleCtrl.prototype, "TopCell", void 0);
    __decorate([
        property(cc.Node)
    ], BattleCtrl.prototype, "BottomCell", void 0);
    __decorate([
        property(cc.Node)
    ], BattleCtrl.prototype, "LeftCell", void 0);
    __decorate([
        property(cc.Node)
    ], BattleCtrl.prototype, "RightCell", void 0);
    __decorate([
        property(cc.Prefab)
    ], BattleCtrl.prototype, "player1", void 0);
    __decorate([
        property(cc.Prefab)
    ], BattleCtrl.prototype, "player2", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], BattleCtrl.prototype, "fllower_1", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], BattleCtrl.prototype, "fllower_2", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], BattleCtrl.prototype, "fllower_3", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], BattleCtrl.prototype, "horn_1", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], BattleCtrl.prototype, "horn_2", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], BattleCtrl.prototype, "horn_3", void 0);
    __decorate([
        property(cc.Prefab)
    ], BattleCtrl.prototype, "operation", void 0);
    __decorate([
        property(cc.Prefab)
    ], BattleCtrl.prototype, "props", void 0);
    __decorate([
        property(cc.Node)
    ], BattleCtrl.prototype, "MainPlayerHeadImg", void 0);
    __decorate([
        property(cc.Node)
    ], BattleCtrl.prototype, "MainPlayerName", void 0);
    __decorate([
        property(cc.Node)
    ], BattleCtrl.prototype, "MainPlayerScore", void 0);
    __decorate([
        property(cc.Node)
    ], BattleCtrl.prototype, "VicePlayerHeadImg", void 0);
    __decorate([
        property(cc.Node)
    ], BattleCtrl.prototype, "VicePlayerName", void 0);
    __decorate([
        property(cc.Node)
    ], BattleCtrl.prototype, "VicePlayerScore", void 0);
    __decorate([
        property(cc.Node)
    ], BattleCtrl.prototype, "GameStatus", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], BattleCtrl.prototype, "defeat", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], BattleCtrl.prototype, "victory", void 0);
    __decorate([
        property(cc.Node)
    ], BattleCtrl.prototype, "ready", void 0);
    BattleCtrl = __decorate([
        ccclass
    ], BattleCtrl);
    return BattleCtrl;
}(cc.Component));
exports.default = BattleCtrl;

cc._RF.pop();