(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Scripts/Unit/TransferClass.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'f365fMBokNNhoCix8wcU7gU', 'TransferClass', __filename);
// Scripts/Unit/TransferClass.ts

Object.defineProperty(exports, "__esModule", { value: true });
var HomePageCtrl_1 = require("../Page/HomePageCtrl");
var MatchingCtrl_1 = require("../Page/MatchingCtrl");
var BattleCtrl_1 = require("../Page/BattleCtrl");
var PlayerOperationCtrl_1 = require("../Parts/PlayerOperationCtrl");
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
    // 个人位置延迟
    Transfer.prototype.selfToSelfForOperationCtrl = function (res) {
        return;
        var operationCtrl = null;
        this.Operation = cc.find('Canvas/BattlePagePanel/BattleBox/operation');
        operationCtrl = this.Operation.getComponent(PlayerOperationCtrl_1.default);
        operationCtrl.setSelfTankData(res);
    };
    Transfer = __decorate([
        ccclass
    ], Transfer);
    return Transfer;
}(cc.Component));
exports.default = Transfer;

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
        //# sourceMappingURL=TransferClass.js.map
        