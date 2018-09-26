"use strict";
cc._RF.push(module, 'c4966pl/QZBX5VLCYhF85CV', 'Buttle3Ctrl');
// Scripts/Parts/Buttle3Ctrl.ts

Object.defineProperty(exports, "__esModule", { value: true });
var PlayerOperationCtrl_1 = require("./PlayerOperationCtrl");
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
        _this.OperationCtrl = null;
        return _this;
    }
    NewClass.prototype.start = function () {
        var _self = this;
        this.OperationCtrl = cc.find('Canvas/BattlePagePanel/BattleBox/operation').getComponent(PlayerOperationCtrl_1.default);
        this.bullet = this.node.getComponent(cc.RigidBody);
        var speed = 500;
        var x = speed * Math.sin(Math.PI * this.node.rotation / 180);
        var y = speed * Math.cos(Math.PI * this.node.rotation / 180);
        this.bullet.linearVelocity = new cc.Vec2(x, y);
    };
    NewClass.prototype.onBeginContact = function (contact, selfCollider, otherCollider) {
    };
    NewClass.prototype.boom = function () {
        var _self = this;
        for (var i = 0; i < 360 / 30; i++) {
            var bullet = _self.OperationCtrl.generateBullet({
                name: "tank_buttle_" + i,
                type: 1,
                bulletType: 1,
                rotation: i * 30,
                scale: _self.node.scale,
                x: _self.node.x,
                y: _self.node.y
            }, 0);
            _self.node.parent.addChild(bullet);
        }
        _self.node.destroy();
    };
    NewClass.prototype.update = function (dt) { };
    NewClass = __decorate([
        ccclass
    ], NewClass);
    return NewClass;
}(cc.Component));
exports.default = NewClass;

cc._RF.pop();