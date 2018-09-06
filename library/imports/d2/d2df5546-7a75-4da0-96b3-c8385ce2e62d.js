"use strict";
cc._RF.push(module, 'd2df5VGenVNoJazyDhc4uYt', 'LoginPageCtrl');
// Scripts/Page/LoginPageCtrl.ts

Object.defineProperty(exports, "__esModule", { value: true });
var WebSocketManage_1 = require("../Unit/WebSocketManage");
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
        _this.userName = null;
        _this.WebScoketNode = null;
        _this.BattlePage = null;
        return _this;
    }
    NewClass.prototype.start = function () {
    };
    NewClass.prototype.onLogin = function () {
        var userName = this.userName.getComponent(cc.EditBox).string;
        var webscoket = this.WebScoketNode.getComponent(WebSocketManage_1.default);
        webscoket.sendMessage({ name: userName });
        var battlePage = cc.instantiate(this.BattlePage);
        battlePage.parent = this.node.parent;
        this.enabled = false;
    };
    __decorate([
        property(cc.Node)
    ], NewClass.prototype, "userName", void 0);
    __decorate([
        property(cc.Node)
    ], NewClass.prototype, "WebScoketNode", void 0);
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