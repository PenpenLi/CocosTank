(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Scripts/Parts/PlayerOperationCtrl.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'b0f88TROJ1H/aPIf2SVhwDA', 'PlayerOperationCtrl', __filename);
// Scripts/Parts/PlayerOperationCtrl.ts

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
        _this.BattleRegion = null;
        _this.Buttle = null;
        // 当前玩家控制节点
        _this.currentPlayer = null;
        _this.vicePlayer = null;
        // 旋转状态控制
        _this.rotationStatus = 0;
        // 移动状态控制
        _this.moveStatus = 0;
        // 战斗区域脚本
        _this.BattleCtrl = null;
        // webScoket脚本
        _this.WebScoket = null;
        _this.mainActionList = [];
        _this.viceActionList = [];
        _this.currentPlayerKeyBord = {
            top: false,
            right: false,
            bottom: false,
            left: false
        };
        // 用于控制坦克子弹的生成控制
        _this.i = 0;
        return _this;
    }
    NewClass.prototype.start = function () {
        this.BattleRegion = this.node.parent.getChildByName('BattleRegion');
        this.BattleCtrl = this.node.parent.parent.getComponent(BattleCtrl_1.default);
        this.getPlayer(this.BattleCtrl.playerName);
        this.WebScoket = cc.find('WebScoket').getComponent(WebSocketManage_1.default);
        this.onEventListener();
    };
    NewClass.prototype.onEventListener = function () {
        var self = this;
        this.node.getChildByName('left').on(cc.Node.EventType.TOUCH_START, function (event) {
            self.currentPlayerKeyBord.left = true;
        });
        this.node.getChildByName('left').on(cc.Node.EventType.TOUCH_END, function (event) {
            self.currentPlayerKeyBord.left = false;
        });
        this.node.getChildByName('left').on(cc.Node.EventType.TOUCH_CANCEL, function (event) {
            self.currentPlayerKeyBord.left = false;
        });
        this.node.getChildByName('right').on(cc.Node.EventType.TOUCH_START, function (event) {
            self.currentPlayerKeyBord.right = true;
        });
        this.node.getChildByName('right').on(cc.Node.EventType.TOUCH_CANCEL, function (event) {
            self.currentPlayerKeyBord.right = false;
        });
        this.node.getChildByName('right').on(cc.Node.EventType.TOUCH_END, function (event) {
            self.currentPlayerKeyBord.right = false;
        });
        this.node.getChildByName('up').on(cc.Node.EventType.TOUCH_START, function (event) {
            self.currentPlayerKeyBord.top = true;
        });
        this.node.getChildByName('up').on(cc.Node.EventType.TOUCH_CANCEL, function (event) {
            self.currentPlayerKeyBord.top = false;
        });
        this.node.getChildByName('up').on(cc.Node.EventType.TOUCH_END, function (event) {
            self.currentPlayerKeyBord.top = false;
        });
        this.node.getChildByName('bottom').on(cc.Node.EventType.TOUCH_START, function (event) {
            self.currentPlayerKeyBord.bottom = true;
        });
        this.node.getChildByName('bottom').on(cc.Node.EventType.TOUCH_CANCEL, function (event) {
            self.currentPlayerKeyBord.bottom = false;
        });
        this.node.getChildByName('bottom').on(cc.Node.EventType.TOUCH_END, function (event) {
            self.currentPlayerKeyBord.bottom = false;
        });
        this.node.getChildByName('fire').on(cc.Node.EventType.TOUCH_START, function (event) {
            var len = 0;
            self.currentPlayer.parent.children.map(function (node) {
                if (node.name.length > 11) {
                    len++;
                }
            });
            if (len < 5) {
                self.i = (self.i + 1) % 5;
                self.generateBullet("tank_buttle_" + self.i);
            }
        });
    };
    // 子弹生成
    NewClass.prototype.generateBullet = function (name) {
        var buttle = cc.instantiate(this.Buttle);
        buttle.name = name;
        var scale = this.currentPlayer.scale;
        var rotation = this.currentPlayer.rotation;
        buttle.scale = scale;
        buttle.rotation = rotation;
        buttle.zIndex = -1;
        var centerPointx = this.currentPlayer.x;
        var centerPointy = this.currentPlayer.y;
        var buttleX = this.currentPlayer.x;
        var buttleY = this.currentPlayer.y + this.currentPlayer.height * scale / 2 + buttle.width * scale / 2 + 1;
        var x = (buttleY - centerPointy) * Math.sin(Math.PI * rotation / 180) + centerPointx;
        var y = (buttleY - centerPointy) * Math.cos(Math.PI * rotation / 180) + (buttleX - centerPointx) * Math.sin(Math.PI * rotation / 180) + centerPointy;
        buttle.setPosition(x, y);
        this.currentPlayer.parent.addChild(buttle);
        this.mainActionList.push({
            type: 1,
            buttleName: buttle.name,
            scale: scale,
            x: x,
            y: y,
            rotation: rotation
        });
        this.WebScoket.sendMessage({
            msg: 22,
            data: this.mainActionList
        });
        this.mainActionList = [];
    };
    NewClass.prototype.generateReceiveButtle = function (response) {
        var buttle = cc.instantiate(this.Buttle);
        buttle.name = response.buttleName;
        buttle.scale = response.scale;
        buttle.rotation = response.rotation;
        buttle.setPosition(response.x, response.y);
        this.vicePlayer.parent.addChild(buttle);
    };
    // 得到对面子弹生成信息，添加到我方区域
    NewClass.prototype.addReceiveButtle = function (response) {
        this.viceActionList.push(response);
    };
    // 获得玩家信息
    NewClass.prototype.getPlayer = function (mainTank) {
        var viceTank = 'tank_1';
        if (mainTank === 'tank_1') {
            viceTank = 'tank_2';
        }
        var children = this.BattleRegion.children;
        if (!children) {
            return;
        }
        for (var i = 0; i < children.length; i++) {
            if (children[i].getChildByName(mainTank)) {
                this.currentPlayer = children[i].getChildByName(mainTank);
            }
            if (children[i].getChildByName(viceTank)) {
                this.vicePlayer = children[i].getChildByName(viceTank);
            }
            if (this.currentPlayer && this.vicePlayer) {
                return;
            }
        }
    };
    NewClass.prototype.update = function (dt) {
        if (this.currentPlayerKeyBord.left) {
            if (this.currentPlayer.rotation - 5 < 0) {
                this.currentPlayer.rotation = 360 - this.currentPlayer.rotation - 5;
            }
            else {
                this.currentPlayer.rotation = this.currentPlayer.rotation - 5;
            }
            this.sendTankData();
        }
        if (this.currentPlayerKeyBord.right) {
            this.currentPlayer.rotation = (this.currentPlayer.rotation + 5) % 360;
            this.sendTankData();
        }
        if (this.currentPlayerKeyBord.top) {
            var speed = 5;
            this.currentPlayer.x += speed * Math.sin(Math.PI * this.currentPlayer.rotation / 180);
            this.currentPlayer.y += speed * Math.cos(Math.PI * this.currentPlayer.rotation / 180);
            this.sendTankData();
        }
        if (this.currentPlayerKeyBord.bottom) {
            var speed = 5;
            this.currentPlayer.x -= speed * Math.sin(Math.PI * this.currentPlayer.rotation / 180);
            this.currentPlayer.y -= speed * Math.cos(Math.PI * this.currentPlayer.rotation / 180);
            this.sendTankData();
        }
        if (this.viceActionList.length !== 0) {
            // 位置联调
            if (this.viceActionList[0].type === 0) {
                this.vicePlayer.x = this.viceActionList[0].x;
                this.vicePlayer.y = this.viceActionList[0].y;
                this.vicePlayer.rotation = this.viceActionList[0].rotation;
                this.viceActionList.splice(0, 1);
            }
            else if (this.viceActionList[0].type === 1) { // 子弹发射
                this.generateReceiveButtle(this.viceActionList[0]);
                this.viceActionList.splice(0, 1);
            }
        }
    };
    NewClass.prototype.sendTankData = function () {
        this.mainActionList.push({
            type: 0,
            x: this.currentPlayer.x,
            y: this.currentPlayer.y,
            rotation: this.currentPlayer.rotation
        });
        if (this.mainActionList.length > 2) {
            this.WebScoket.sendMessage({
                msg: 22,
                data: this.mainActionList
            });
            this.mainActionList = [];
        }
    };
    NewClass.prototype.selfToSelfForOperationCtrl = function (response) {
    };
    NewClass.prototype.setOtherTankDataFor2 = function (response) {
        for (var i = 0; i < response.data.length; i++) {
            this.viceActionList.push(response.data[i]);
        }
    };
    __decorate([
        property(cc.Prefab)
    ], NewClass.prototype, "Buttle", void 0);
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
        