"use strict";
cc._RF.push(module, '33ad7W4Sq9CJ4BpgZFyxICj', 'TankCtrl');
// Scripts/Parts/TankCtrl.ts

Object.defineProperty(exports, "__esModule", { value: true });
var BattleCatrl_1 = require("../Page/BattleCatrl");
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
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NewClass.prototype.start = function () {
        this.playerRg = this.getComponent(cc.RigidBody);
    };
    NewClass.prototype.update = function () {
    };
    NewClass.prototype.onCollisionEnter = function (other, self) {
        var otherName = other.node.name.substring(5, 11);
        var loser = self.node.name;
        var scoreType = 0;
        if (loser === 'tank_1') {
            scoreType = 1;
        }
        if (otherName === 'buttle') {
            this.node.destroy();
            var node = other.node;
            node.destroy();
            cc.find('Canvas/BattlePagePanel').getComponent(BattleCatrl_1.default).restart(scoreType);
        }
    };
    NewClass = __decorate([
        ccclass
    ], NewClass);
    return NewClass;
}(cc.Component));
exports.default = NewClass;

cc._RF.pop();