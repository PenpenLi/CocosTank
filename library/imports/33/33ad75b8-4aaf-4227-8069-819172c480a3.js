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
        return _this;
    }
    NewClass.prototype.start = function () {
        this.WebScoket = cc.find('WebScoket').getComponent(WebSocketManage_1.default);
    };
    NewClass.prototype.onBeginContact = function (contact, selfCollider, otherCollider) {
        var otherName = otherCollider.node.name.substring(5, 11);
        if (otherName === 'buttle') {
            var scoreType = 0;
            if (this.node.name === 'tank_1')
                scoreType = 1;
            this.WebScoket.sendMessage({
                msg: 25,
                data: {
                    scoreType: scoreType,
                    buttleName: otherCollider.node.name
                }
            });
        }
    };
    NewClass.prototype.gameOver = function (response) {
        if (cc.find('Canvas/BattlePagePanel/BattleBox/BattleRegion').parent.getChildByName('operation'))
            cc.find('Canvas/BattlePagePanel/BattleBox/BattleRegion').parent.getChildByName('operation').destroy();
        var boom = cc.instantiate(this.Boom);
        boom.setPosition(this.node.x, this.node.y);
        this.node.parent.addChild(boom);
        this.node.destroy();
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