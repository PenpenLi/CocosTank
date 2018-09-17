"use strict";
cc._RF.push(module, '33ad7W4Sq9CJ4BpgZFyxICj', 'TankCtrl');
// Scripts/Parts/TankCtrl.ts

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
        _this.Boom = null;
        // webScoket脚本
        _this.WebScoket = null;
        _this.flag = true;
        return _this;
    }
    NewClass.prototype.start = function () {
        this.playerRg = this.getComponent(cc.RigidBody);
        this.WebScoket = cc.find('WebScoket').getComponent(WebSocketManage_1.default);
    };
    NewClass.prototype.onBeginContact = function (contact, selfCollider, otherCollider) {
        var self = this;
        if (this.flag) {
            var othername = otherCollider.node.name.substring(5, 11);
            console.log("flog:" + othername);
            var loser = this.node.name;
            var scoreType = 0;
            if (othername === 'buttle') {
                this.flag = false;
                var x = selfCollider.node.x;
                var y = selfCollider.node.y;
                var parent = selfCollider.node.parent;
                var boom = cc.instantiate(this.Boom);
                boom.setPosition(x, y);
                parent.addChild(boom);
                otherCollider.node.destroy();
                selfCollider.node.destroy();
                if (loser === 'tank_1') {
                    scoreType = 1;
                }
                this.WebScoket.sendMessage({
                    msg: 25,
                    data: {
                        scoreType: scoreType,
                        buttleName: otherCollider.node.name
                    }
                });
                // this.WebScoket.sendMessage({
                //     msg: 27
                // })
                // if (cc.find('Canvas/BattlePagePanel').getComponent(BattleCtrl).playerName === 'tank_1') {
                //     setTimeout(() => {
                //         cc.find('Canvas/BattlePagePanel').getComponent(BattleCtrl).restart();
                //     }, 2000);
                // }
            }
        }
    };
    NewClass.prototype.gameOver = function (response) {
        var x = this.node.x;
        var y = this.node.y;
        var parent = this.node.parent;
        var boom = cc.instantiate(this.Boom);
        boom.setPosition(x, y);
        parent.addChild(boom);
        this.node.destroy();
        // if (cc.find('Canvas/BattlePagePanel').getComponent(BattleCtrl).playerName === 'tank_1') {
        //     setTimeout(() => {
        //         cc.find('Canvas/BattlePagePanel').getComponent(BattleCtrl).restart();
        //     }, 2000);
        // }
    };
    __decorate([
        property(cc.Prefab)
    ], NewClass.prototype, "Boom", void 0);
    NewClass = __decorate([
        ccclass
    ], NewClass);
    return NewClass;
}(cc.Component));
exports.default = NewClass;

cc._RF.pop();