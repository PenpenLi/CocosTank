(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Scripts/Parts/PropsCtrl.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '14414OS2Y5JT7xR/Ygdc9cz', 'PropsCtrl', __filename);
// Scripts/Parts/PropsCtrl.ts

// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var NewClass = /** @class */ (function (_super) {
    __extends(NewClass, _super);
    function NewClass() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.nodeDestoryTime = null;
        _this.propType = '';
        return _this;
        // update (dt) {}
    }
    NewClass.prototype.start = function () {
        var _this = this;
        this.propType = this.node.getComponent(cc.Sprite).spriteFrame.name;
        var self = this;
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
            if (!_this.node) {
                return;
            }
            self.node.opacity = 20;
            setTimeout(function () {
                self.node.opacity = 200;
                self.onNodeTwinkle();
            }, 200);
        }, 200);
    };
    // 碰撞事件
    NewClass.prototype.onCollisionEnter = function (other, self) {
        var spriteFrameName = other.node.name + "_" + this.node.getComponent(cc.Sprite).spriteFrame.name.substring(5, 6);
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
        //# sourceMappingURL=PropsCtrl.js.map
        