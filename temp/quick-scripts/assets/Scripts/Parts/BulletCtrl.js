(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Scripts/Parts/BulletCtrl.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '2a2bbazLDJL6aDlFXxZ1Za8', 'BulletCtrl', __filename);
// Scripts/Parts/BulletCtrl.ts

Object.defineProperty(exports, "__esModule", { value: true });
var WebSocketManage_1 = require("../WebSocketManage");
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
        var self = this;
        this.WebScoket = cc.find('WebScoket').getComponent(WebSocketManage_1.default);
        setTimeout(function () {
            if (self.node) {
                self.node.destroy();
            }
        }, 5000);
    };
    NewClass.prototype.update = function (dt) {
        var rotation = this.node.rotation;
        this.node.x += this.speedX * Math.sin(Math.PI * rotation / 180);
        this.node.y += this.speedY * Math.cos(Math.PI * rotation / 180);
    };
    NewClass.prototype.onCollisionEnter = function (other, self) {
        switch (other.tag) {
            case 0:
                this.speedY *= -1;
                break;
            case 1:
                this.speedX *= -1;
                break;
            case 2:
                this.speedY *= -1;
                break;
            case 3:
                this.speedX *= -1;
                break;
        }
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
        