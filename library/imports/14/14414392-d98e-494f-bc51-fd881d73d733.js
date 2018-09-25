"use strict";
cc._RF.push(module, '14414OS2Y5JT7xR/Ygdc9cz', 'PropsCtrl');
// Scripts/Parts/PropsCtrl.ts

Object.defineProperty(exports, "__esModule", { value: true });
var PlayerOperationCtrl_1 = require("./PlayerOperationCtrl");
var BattleCtrl_1 = require("../Page/BattleCtrl");
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
        _this.nodeDestoryTime = null;
        return _this;
        // update (dt) {}
    }
    NewClass.prototype.start = function () {
        var _this = this;
        var self = this;
        console.log(this.node.name);
        setTimeout(function () {
            self.onNodeTwinkle();
            setTimeout(function () {
                clearTimeout(self.nodeDestoryTime);
                if (_this.node) {
                    self.node.destroy();
                }
            }, 3000);
        }, 12000);
    };
    // 消失前三秒闪烁
    NewClass.prototype.onNodeTwinkle = function () {
        var _this = this;
        var self = this;
        this.nodeDestoryTime = setTimeout(function () {
            if (!_this.node)
                return;
            self.node.opacity = 20;
            setTimeout(function () {
                self.node.opacity = 200;
                self.onNodeTwinkle();
            }, 200);
        }, 200);
    };
    // 碰撞事件
    NewClass.prototype.onCollisionEnter = function (other, self) {
        var propType = parseInt(this.node.name.substring(5, 6));
        var spriteFrameName = other.node.name + "_" + propType;
        var playerName = cc.find('Canvas/BattlePagePanel').getComponent(BattleCtrl_1.default).playerName;
        if (other.node.name === playerName) {
            cc.find('Canvas/BattlePagePanel/BattleBox/operation').getComponent(PlayerOperationCtrl_1.default).player.current.buttleType = propType;
        }
        else {
            cc.find('Canvas/BattlePagePanel/BattleBox/operation').getComponent(PlayerOperationCtrl_1.default).player.vice.buttleType = propType;
        }
        cc.loader.loadRes(spriteFrameName, cc.SpriteFrame, function (err, spriteFrame) {
            other.node.getComponent(cc.Sprite).spriteFrame = spriteFrame;
        });
        self.node.destroy();
    };
    NewClass = __decorate([
        ccclass
    ], NewClass);
    return NewClass;
}(cc.Component));
exports.default = NewClass;

cc._RF.pop();