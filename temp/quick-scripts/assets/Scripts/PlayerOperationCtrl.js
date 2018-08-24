(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Scripts/PlayerOperationCtrl.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'c8f9bczRL9LBY0TeU61gGwq', 'PlayerOperationCtrl', __filename);
// Scripts/PlayerOperationCtrl.ts

Object.defineProperty(exports, "__esModule", { value: true });
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
        _this.BattleRegion = null;
        _this.player = null;
        _this.rotationStatus = 0;
        _this.moveStatus = 0;
        return _this;
    }
    NewClass.prototype.start = function () {
        this.getPlayer();
        var self = this;
        this.node.getChildByName('left').on(cc.Node.EventType.TOUCH_START, function (event) {
            self.rotationStatus = 1;
        });
        this.node.getChildByName('left').on(cc.Node.EventType.TOUCH_END, function (event) {
            self.rotationStatus = 0;
        });
        this.node.getChildByName('right').on(cc.Node.EventType.TOUCH_START, function (event) {
            self.rotationStatus = 2;
        });
        this.node.getChildByName('right').on(cc.Node.EventType.TOUCH_END, function (event) {
            self.rotationStatus = 0;
        });
        this.node.getChildByName('up').on(cc.Node.EventType.TOUCH_START, function (event) {
            self.moveStatus = 1;
        });
        this.node.getChildByName('up').on(cc.Node.EventType.TOUCH_END, function (event) {
            self.moveStatus = 0;
        });
        this.node.getChildByName('bottom').on(cc.Node.EventType.TOUCH_START, function (event) {
            self.moveStatus = 2;
        });
        this.node.getChildByName('bottom').on(cc.Node.EventType.TOUCH_END, function (event) {
            self.moveStatus = 0;
        });
    };
    NewClass.prototype.getPlayer = function () {
        var children = this.BattleRegion.children;
        for (var i = 0; i < children.length; i++) {
            if (children[i].getChildByName('tank_1')) {
                this.player = children[i].getChildByName('tank_1');
                return;
            }
        }
    };
    NewClass.prototype.onLoad = function () {
    };
    NewClass.prototype.update = function (dt) {
        if (this.rotationStatus === 1) {
            if (this.player.rotation - 5 < 0) {
                this.player.rotation = 360 - this.player.rotation - 5;
            }
            else {
                this.player.rotation = this.player.rotation - 5;
            }
        }
        if (this.rotationStatus === 2) {
            this.player.rotation = (this.player.rotation + 5) % 360;
        }
        if (this.moveStatus === 1) {
            var speed = 5;
            this.player.x += speed * Math.sin(Math.PI * this.player.rotation / 180);
            this.player.y += speed * Math.cos(Math.PI * this.player.rotation / 180);
        }
        if (this.moveStatus === 2) {
            var speed = 5;
            this.player.x -= speed * Math.sin(Math.PI * this.player.rotation / 180);
            this.player.y -= speed * Math.cos(Math.PI * this.player.rotation / 180);
        }
    };
    __decorate([
        property(cc.Node)
    ], NewClass.prototype, "BattleRegion", void 0);
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
        //# sourceMappingURL=PlayerOperationCtrl.js.map
        