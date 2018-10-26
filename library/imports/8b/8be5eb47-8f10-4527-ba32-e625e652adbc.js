"use strict";
cc._RF.push(module, '8be5etHjxBFJ7oy5iXmUq28', 'LobbyPageCtrl');
// Scripts/Page/LobbyPageCtrl.ts

Object.defineProperty(exports, "__esModule", { value: true });
var HomePageCtrl_1 = require("./HomePageCtrl");
var FriendPageCtrl_1 = require("./FriendPageCtrl");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var NewClass = /** @class */ (function (_super) {
    __extends(NewClass, _super);
    function NewClass() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.matchingPanel = null;
        _this.friendPanel = null;
        _this.headImg = null;
        _this.userName = null;
        _this.HomePage = null;
        return _this;
    }
    NewClass.prototype.start = function () {
        var self = this;
        this.HomePage = cc.find('Canvas/HomePagePanel');
        var homePage = this.HomePage.getComponent(HomePageCtrl_1.default);
        this.userName.getComponent(cc.Label).string = homePage.userInfo.nickname;
        cc.loader.load({ url: homePage.userInfo.headimgurl, type: 'png' }, function (err, texture) {
            self.headImg.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(texture);
        });
    };
    /**
     * 点击返回按钮
     */
    NewClass.prototype.onBackButton = function () {
        this.node.destroy();
        this.HomePage.getComponent(HomePageCtrl_1.default).status = true;
        this.HomePage.getComponent(HomePageCtrl_1.default).enabled = true;
    };
    /**
     * 点击在线匹配
     */
    NewClass.prototype.onClickMatching = function () {
        var matchingPanel = cc.instantiate(this.matchingPanel);
        matchingPanel.parent = this.node.parent;
        this.enabled = false;
    };
    /**
     * 点击好友对战
     */
    NewClass.prototype.onClickFriend = function () {
        var friendPanel = cc.instantiate(this.friendPanel);
        friendPanel.parent = this.node.parent;
        friendPanel.getComponent(FriendPageCtrl_1.default).init(0);
        this.enabled = false;
    };
    __decorate([
        property(cc.Prefab)
    ], NewClass.prototype, "matchingPanel", void 0);
    __decorate([
        property(cc.Prefab)
    ], NewClass.prototype, "friendPanel", void 0);
    __decorate([
        property(cc.Node)
    ], NewClass.prototype, "headImg", void 0);
    __decorate([
        property(cc.Node)
    ], NewClass.prototype, "userName", void 0);
    NewClass = __decorate([
        ccclass
    ], NewClass);
    return NewClass;
}(cc.Component));
exports.default = NewClass;

cc._RF.pop();