(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Scripts/Page/MatchingCtrl.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '1dbafsnqO5BzadTTzTYpDVp', 'MatchingCtrl', __filename);
// Scripts/Page/MatchingCtrl.ts

Object.defineProperty(exports, "__esModule", { value: true });
var WebSocketManage_1 = require("../WebSocketManage");
var HomePageCtrl_1 = require("./HomePageCtrl");
var BattleCatrl_1 = require("./BattleCatrl");
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
var NewClass = /** @class */ (function (_super) {
    __extends(NewClass, _super);
    function NewClass() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
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
    /**
     * 点击返回按钮
     */
    NewClass.prototype.onClickBackButton = function () {
        var webScoket = this.WebScoketNode.getComponent(WebSocketManage_1.default);
        webScoket.sendMessage({ msg: 3 });
        this.node.destroy();
    };
    NewClass.prototype.start = function () {
        var self = this;
        this.HomePage = cc.find('Canvas/HomePagePanel');
        this.userData = this.HomePage.getComponent(HomePageCtrl_1.default).UserData;
        cc.loader.load({ url: self.userData.headimgurl, type: 'png' }, function (err, texture) {
            self.headImg.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(texture);
        });
        this.WebScoketNode = cc.find('WebScoket');
        var webScoket = this.WebScoketNode.getComponent(WebSocketManage_1.default);
        webScoket.sendMessage({ msg: 2 });
    };
    NewClass.prototype.setBattelData = function (response) {
        var self = this;
        this.Success.active = true;
        if (response.data) {
            this.MainPlaysName.getComponent(cc.Label).string = this.userData.nickname;
            cc.loader.load({ url: self.userData.headimgurl, type: 'png' }, function (err, texture) {
                self.MainPlaysHeadImg.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(texture);
            });
            this.VicePlaysName.getComponent(cc.Label).string = response.enemyData.nickname;
            cc.loader.load({ url: response.enemyData.headimgurl, type: 'png' }, function (err, texture) {
                self.VicePlaysHeadImg.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(texture);
            });
        }
        else {
            this.VicePlaysName.getComponent(cc.Label).string = this.userData.nickname;
            this.VicePlaysHeadImg.getComponent(cc.Sprite).spriteFrame = this.headImg.getComponent(cc.Sprite).spriteFrame;
            this.MainPlaysName.getComponent(cc.Label).string = response.enemyData.nickname;
            cc.loader.load({ url: response.enemyData.headimgurl, type: 'png' }, function (err, texture) {
                self.MainPlaysHeadImg.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(texture);
            });
        }
        var battlePage = cc.instantiate(this.BattlePage);
        battlePage.parent = this.node.parent;
        battlePage.zIndex = -1;
        if (response.data) {
            battlePage.getComponent(BattleCatrl_1.default).initScore(0);
        }
        else {
            battlePage.getComponent(BattleCatrl_1.default).initScore(1);
        }
        setTimeout(function () {
            if (response.data) {
                battlePage.getComponent(BattleCatrl_1.default).sendCallBackFor0();
            }
            battlePage.zIndex = 1;
            self.node.destroy();
        }, 1000);
    };
    __decorate([
        property(cc.Node)
    ], NewClass.prototype, "headImg", void 0);
    __decorate([
        property(cc.Node)
    ], NewClass.prototype, "Success", void 0);
    __decorate([
        property(cc.Node)
    ], NewClass.prototype, "MainPlaysName", void 0);
    __decorate([
        property(cc.Node)
    ], NewClass.prototype, "MainPlaysHeadImg", void 0);
    __decorate([
        property(cc.Node)
    ], NewClass.prototype, "VicePlaysName", void 0);
    __decorate([
        property(cc.Node)
    ], NewClass.prototype, "VicePlaysHeadImg", void 0);
    __decorate([
        property(cc.Prefab)
    ], NewClass.prototype, "BattlePage", void 0);
    NewClass = __decorate([
        ccclass
    ], NewClass);
    return NewClass;
}(cc.Component));
exports.default = NewClass;

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
        //# sourceMappingURL=MatchingCtrl.js.map
        