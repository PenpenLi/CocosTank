(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Scripts/Page/LobbyPageCtrl.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '8be5etHjxBFJ7oy5iXmUq28', 'LobbyPageCtrl', __filename);
// Scripts/Page/LobbyPageCtrl.ts

Object.defineProperty(exports, "__esModule", { value: true });
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
var NewClass = /** @class */ (function (_super) {
    __extends(NewClass, _super);
    function NewClass() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.matchingPanel = null;
        _this.headImg = null;
        _this.userName = null;
        _this.HomePage = null;
        return _this;
    }
    /**
     * 点击返回按钮
     */
    NewClass.prototype.onClickBackButton = function () {
        this.node.destroy();
    };
    /**
     * 点击在线匹配
     */
    NewClass.prototype.onClickMatching = function () {
        var matchingPanel = cc.instantiate(this.matchingPanel);
        matchingPanel.parent = this.node.parent;
        this.enabled = false;
    };
    NewClass.prototype.start = function () {
        var self = this;
        this.HomePage = cc.find('Canvas/HomePagePanel');
        var homePage = this.HomePage.getComponent(HomePageCtrl_1.default);
        this.userName.getComponent(cc.Label).string = homePage.userInfo.nickname;
        cc.loader.load({ url: homePage.userInfo.headimgurl, type: 'png' }, function (err, texture) {
            self.headImg.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(texture);
        });
    };
    __decorate([
        property(cc.Prefab)
    ], NewClass.prototype, "matchingPanel", void 0);
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
        //# sourceMappingURL=LobbyPageCtrl.js.map
        