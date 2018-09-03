(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Scripts/Page/HomePageCtrl.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '34123NWVIRNU6xkpmnqGz20', 'HomePageCtrl', __filename);
// Scripts/Page/HomePageCtrl.ts

Object.defineProperty(exports, "__esModule", { value: true });
var WebSocketManage_1 = require("../WebSocketManage");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var NewClass = /** @class */ (function (_super) {
    __extends(NewClass, _super);
    function NewClass() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.lobbyPanel = null;
        _this.openSoundSprite = null;
        _this.closeSoundSprite = null;
        _this.bgSound = null;
        _this.IsSound = true; //是否开启音效
        _this.UserData = {};
        _this.enemyUserData = {};
        _this.WebScoketNode = null;
        return _this;
    }
    NewClass.prototype.start = function () {
    };
    /**
     * 点击开始
     */
    NewClass.prototype.OnClickStartButton = function () {
        var webscoket = this.WebScoketNode.getComponent(WebSocketManage_1.default);
        webscoket.sendMessage({ msg: 1 });
    };
    /**
     * 点击声音按钮
     */
    NewClass.prototype.OnClickSoundButton = function (event) {
        this.IsSound = !this.IsSound;
        var buttonSprite = event.target.getComponent(cc.Sprite);
        this.IsSound ? (buttonSprite.spriteFrame = this.openSoundSprite, this.bgSound.resume()) : (buttonSprite.spriteFrame = this.closeSoundSprite, this.bgSound.pause());
    };
    NewClass.prototype.getUserData = function (response) {
        this.UserData = response.data;
        var lobbyPanelPage = cc.instantiate(this.lobbyPanel);
        lobbyPanelPage.parent = this.node.parent;
        this.enabled = false;
    };
    __decorate([
        property(cc.Prefab)
    ], NewClass.prototype, "lobbyPanel", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], NewClass.prototype, "openSoundSprite", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], NewClass.prototype, "closeSoundSprite", void 0);
    __decorate([
        property(cc.AudioSource)
    ], NewClass.prototype, "bgSound", void 0);
    __decorate([
        property(cc.Node)
    ], NewClass.prototype, "WebScoketNode", void 0);
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
        //# sourceMappingURL=HomePageCtrl.js.map
        