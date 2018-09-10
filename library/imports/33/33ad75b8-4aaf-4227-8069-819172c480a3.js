"use strict";
cc._RF.push(module, '33ad7W4Sq9CJ4BpgZFyxICj', 'TankCtrl');
// Scripts/Parts/TankCtrl.ts

Object.defineProperty(exports, "__esModule", { value: true });
var BattleCtrl_1 = require("../Page/BattleCtrl");
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
        // webScoket脚本
        _this.WebScoket = null;
        return _this;
    }
    NewClass.prototype.start = function () {
        this.playerRg = this.getComponent(cc.RigidBody);
        this.WebScoket = cc.find('WebScoket').getComponent(WebSocketManage_1.default);
    };
    NewClass.prototype.update = function () {
    };
    NewClass.prototype.onCollisionEnter = function (other, self) {
        var otherName = other.node.name.substring(5, 11);
        var loser = self.node.name;
        var scoreType = 0;
        var mainPlayer = 0;
        if (cc.find('Canvas/BattlePagePanel').getComponent(BattleCtrl_1.default).playerName === 'tank_1') {
            mainPlayer = 1;
        }
        if (loser === 'tank_1') {
            scoreType = 1;
        }
        if (otherName === 'buttle') {
            console.log('die');
            this.node.destroy();
            var node = other.node;
            node.destroy();
            cc.find('Canvas/BattlePagePanel').getComponent(BattleCtrl_1.default).restart(scoreType);
            // this.WebScoket.sendMessage({
            //     msg: 25,
            //     data: {
            //         type: mainPlayer
            //     }
            // })
        }
    };
    NewClass = __decorate([
        ccclass
    ], NewClass);
    return NewClass;
}(cc.Component));
exports.default = NewClass;

cc._RF.pop();