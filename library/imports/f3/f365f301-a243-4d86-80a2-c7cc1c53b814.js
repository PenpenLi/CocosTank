"use strict";
cc._RF.push(module, 'f365fMBokNNhoCix8wcU7gU', 'TransferClass');
// Scripts/Unit/TransferClass.ts

Object.defineProperty(exports, "__esModule", { value: true });
var HomePageCtrl_1 = require("../Page/HomePageCtrl");
var MatchingCtrl_1 = require("../Page/MatchingCtrl");
var BattleCtrl_1 = require("../Page/BattleCtrl");
var PlayerOperationCtrl_1 = require("../Parts/PlayerOperationCtrl");
var TankCtrl_1 = require("../Parts/TankCtrl");
// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Transfer = /** @class */ (function (_super) {
    __extends(Transfer, _super);
    function Transfer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // 主页
        _this.HomePage = null;
        // 匹配页
        _this.MatchPage = null;
        // 战斗页
        _this.BattlePage = null;
        // 操作盘
        _this.Operation = null;
        return _this;
    }
    // 主玩家
    // 获取用户信息
    Transfer.prototype.getUserDataForHomePageCtrl = function (res) {
        var homePageCtrl = null;
        this.HomePage = cc.find('Canvas/HomePagePanel');
        homePageCtrl = this.HomePage.getComponent(HomePageCtrl_1.default);
        homePageCtrl.getUserData(res);
    };
    // 切换匹配状态
    Transfer.prototype.generateMapForHomePageCtrl = function (res) {
        var homePageCtrl = null;
        this.HomePage = cc.find('Canvas/HomePagePanel');
        homePageCtrl = this.HomePage.getComponent(HomePageCtrl_1.default);
        homePageCtrl.enemyUserData = res.enemyData;
        var matchPageCtrl = null;
        this.MatchPage = cc.find('Canvas/MatchingPagePanel');
        matchPageCtrl = this.MatchPage.getComponent(MatchingCtrl_1.default);
        matchPageCtrl.setBattleData(res);
    };
    // 地图匹配
    Transfer.prototype.getMapForBattlePageCtrl = function (res) {
        var battlePageCtrl = null;
        this.BattlePage = cc.find('Canvas/BattlePagePanel');
        battlePageCtrl = this.BattlePage.getComponent(BattleCtrl_1.default);
        battlePageCtrl.getMap(res);
    };
    // 位置匹配
    Transfer.prototype.positionUnicomForOperationCtrl = function (res) {
        var operationCtrl = null;
        this.Operation = cc.find('Canvas/BattlePagePanel/BattleBox/operation');
        operationCtrl = this.Operation.getComponent(PlayerOperationCtrl_1.default);
        operationCtrl.setOtherTankDataFor2(res);
    };
    // 开炮
    Transfer.prototype.fireButtleForOperationCtrl = function (res) {
        var operationCtrl = null;
        this.Operation = cc.find('Canvas/BattlePagePanel/BattleBox/operation');
        operationCtrl = this.Operation.getComponent(PlayerOperationCtrl_1.default);
        operationCtrl.addReceiveButtle(res);
    };
    // 死亡
    Transfer.prototype.dieForTankCtrl = function (res) {
        // 0代表副玩家
        var player = null;
        var children = cc.find('Canvas/BattlePagePanel/BattleBox/BattleRegion').children;
        cc.find('Canvas/BattlePagePanel').getComponent(BattleCtrl_1.default).scoreCount(res.data.scoreType);
        if (res.data.scoreType === 1 && cc.find('Canvas/BattlePagePanel').getComponent(BattleCtrl_1.default).playerName === 'tank_1' ||
            res.data.scoreType === 0 && cc.find('Canvas/BattlePagePanel').getComponent(BattleCtrl_1.default).playerName === 'tank_2') {
            cc.find('Canvas/BattlePagePanel').getComponent(BattleCtrl_1.default).gameOver(0);
        }
        else {
            cc.find('Canvas/BattlePagePanel').getComponent(BattleCtrl_1.default).gameOver(1);
        }
        // 移除碰撞子弹节点
        for (var i = 0; i < children.length; i++) {
            if (children[i].getChildByName(res.data.buttleName)) {
                children[i].getChildByName(res.data.buttleName).destroy();
                break;
            }
        }
        if (res.data.scoreType === 0) {
            for (var i = 0; i < children.length; i++) {
                if (children[i].getChildByName('tank_2')) {
                    player = children[i].getChildByName('tank_2');
                    console.log(2);
                    var playerCompeont = player.getComponent(TankCtrl_1.default);
                    playerCompeont.gameOver(res);
                    return;
                }
            }
        }
        else {
            for (var i = 0; i < children.length; i++) {
                if (children[i].getChildByName('tank_1')) {
                    player = children[i].getChildByName('tank_1');
                    console.log(1);
                    var playerCompeont = player.getComponent(TankCtrl_1.default);
                    playerCompeont.gameOver(res);
                    return;
                }
            }
        }
    };
    // 重新开始
    Transfer.prototype.restartForBattleCtrl = function (res) {
        var battlePageCtrl = null;
        this.BattlePage = cc.find('Canvas/BattlePagePanel');
        battlePageCtrl = this.BattlePage.getComponent(BattleCtrl_1.default);
        battlePageCtrl.ready.active = false;
        if (battlePageCtrl.playerName === 'tank_1') {
            battlePageCtrl.restart();
        }
    };
    // 对方离开房间
    Transfer.prototype.leaveForBattleCtrl = function (res) {
        var battlePageCtrl = null;
        this.BattlePage = cc.find('Canvas/BattlePagePanel');
        battlePageCtrl = this.BattlePage.getComponent(BattleCtrl_1.default);
        battlePageCtrl.viceLeave();
    };
    Transfer.prototype.genteraPropsForBattleCtrl = function (res) {
        var battlePageCtrl = null;
        this.BattlePage = cc.find('Canvas/BattlePagePanel');
        battlePageCtrl = this.BattlePage.getComponent(BattleCtrl_1.default);
        battlePageCtrl.generateProps(res);
    };
    Transfer = __decorate([
        ccclass
    ], Transfer);
    return Transfer;
}(cc.Component));
exports.default = Transfer;

cc._RF.pop();