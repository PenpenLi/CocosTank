"use strict";
cc._RF.push(module, '022778WYX5Og5WwOArqNwHE', 'Buttle6Ctrl');
// Scripts/Parts/Buttle6Ctrl.ts

Object.defineProperty(exports, "__esModule", { value: true });
var WebSocketManage_1 = require("../Unit/WebSocketManage");
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
var NewClass = /** @class */ (function (_super) {
    __extends(NewClass, _super);
    function NewClass() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // webScoket脚本
        _this.WebScoket = null;
        return _this;
        // update (dt) {}
    }
    NewClass.prototype.start = function () {
        var _self = this;
        this.WebScoket = cc.find('WebScoket').getComponent(WebSocketManage_1.default);
        var manager = cc.director.getCollisionManager();
        manager.enabled = false;
        setTimeout(function () {
            _self.node.opacity = 20;
            manager.enabled = true;
        }, 3000);
    };
    NewClass.prototype.onCollisionEnter = function (other, self) {
        var scoreType = 0;
        if (other.node.name === 'tank_1')
            scoreType = 1;
        this.WebScoket.sendMessage({
            msg: 25,
            data: {
                scoreType: scoreType,
                buttleName: this.node.name
            }
        });
    };
    NewClass = __decorate([
        ccclass
    ], NewClass);
    return NewClass;
}(cc.Component));
exports.default = NewClass;

cc._RF.pop();