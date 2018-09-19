(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Scripts/Parts/BulletCtrl.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '2a2bbazLDJL6aDlFXxZ1Za8', 'BulletCtrl', __filename);
// Scripts/Parts/BulletCtrl.ts

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
        _this.WebScoket = null;
        _this.speedX = 5;
        _this.speedY = 5;
        return _this;
    }
    NewClass.prototype.start = function () {
        this.buttle = this.node.getComponent(cc.RigidBody);
        var speed = 500;
        var x = speed * Math.sin(Math.PI * this.node.rotation / 180);
        var y = speed * Math.cos(Math.PI * this.node.rotation / 180);
        this.buttle.linearVelocity = new cc.Vec2(x, y);
        var self = this;
        this.WebScoket = cc.find('WebScoket').getComponent(WebSocketManage_1.default);
        setTimeout(function () {
            if (self.node) {
                self.node.destroy();
            }
        }, 5000);
    };
    NewClass.prototype.update = function (dt) {
    };
    NewClass.prototype.onDestroy = function () {
        this.node.destroy();
    };
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
        //# sourceMappingURL=BulletCtrl.js.map
        