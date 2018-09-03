"use strict";
cc._RF.push(module, 'c8f9bczRL9LBY0TeU61gGwq', 'PlayerOperationCtrl');
// Scripts/PlayerOperationCtrl.ts

Object.defineProperty(exports, "__esModule", { value: true });
var BattleCatrl_1 = require("./Page/BattleCatrl");
var WebSocketManage_1 = require("./WebSocketManage");
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
        _this.player = null;
        _this.rotationStatus = 0;
        _this.moveStatus = 0;
        _this.BattleCtrl = null;
        _this.WebScoket = null;
        _this.i = 0;
        _this.correct = -1;
        return _this;
    }
    NewClass.prototype.start = function () {
        this.BattleCtrl = this.node.parent.parent.getComponent(BattleCatrl_1.default);
        this.WebScoket = cc.find('WebScoket').getComponent(WebSocketManage_1.default);
        var self = this;
        this.node.getChildByName('left').on(cc.Node.EventType.TOUCH_START, function (event) {
            self.getPlayer(self.BattleCtrl.playerName);
            self.rotationStatus = 1;
        });
        this.node.getChildByName('left').on(cc.Node.EventType.TOUCH_END, function (event) {
            self.getPlayer(self.BattleCtrl.playerName);
            self.rotationStatus = 0;
        });
        this.node.getChildByName('left').on(cc.Node.EventType.TOUCH_CANCEL, function (event) {
            self.getPlayer(self.BattleCtrl.playerName);
            self.rotationStatus = 0;
        });
        this.node.getChildByName('right').on(cc.Node.EventType.TOUCH_START, function (event) {
            self.getPlayer(self.BattleCtrl.playerName);
            self.rotationStatus = 2;
        });
        this.node.getChildByName('right').on(cc.Node.EventType.TOUCH_CANCEL, function (event) {
            self.getPlayer(self.BattleCtrl.playerName);
            self.rotationStatus = 0;
        });
        this.node.getChildByName('right').on(cc.Node.EventType.TOUCH_END, function (event) {
            self.getPlayer(self.BattleCtrl.playerName);
            self.rotationStatus = 0;
        });
        this.node.getChildByName('up').on(cc.Node.EventType.TOUCH_START, function (event) {
            self.getPlayer(self.BattleCtrl.playerName);
            self.moveStatus = 1;
        });
        this.node.getChildByName('up').on(cc.Node.EventType.TOUCH_CANCEL, function (event) {
            self.getPlayer(self.BattleCtrl.playerName);
            self.moveStatus = 0;
        });
        this.node.getChildByName('up').on(cc.Node.EventType.TOUCH_END, function (event) {
            self.getPlayer(self.BattleCtrl.playerName);
            self.moveStatus = 0;
        });
        this.node.getChildByName('bottom').on(cc.Node.EventType.TOUCH_START, function (event) {
            self.getPlayer(self.BattleCtrl.playerName);
            self.moveStatus = 2;
        });
        this.node.getChildByName('bottom').on(cc.Node.EventType.TOUCH_CANCEL, function (event) {
            self.getPlayer(self.BattleCtrl.playerName);
            self.moveStatus = 0;
        });
        this.node.getChildByName('bottom').on(cc.Node.EventType.TOUCH_END, function (event) {
            self.getPlayer(self.BattleCtrl.playerName);
            self.moveStatus = 0;
        });
        this.node.getChildByName('fire').on(cc.Node.EventType.TOUCH_START, function (event) {
            var len = 0;
            self.getPlayer(self.BattleCtrl.playerName);
            self.player.parent.children.map(function (node) {
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
    NewClass.prototype.generateBullet = function (name) {
        var buttle = cc.instantiate(this.Buttle);
        buttle.name = name;
        var scale = this.player.scale;
        var rotation = this.player.rotation;
        buttle.scale = scale;
        buttle.rotation = rotation;
        buttle.zIndex = -1;
        var centerPointx = this.player.x;
        var centerPointy = this.player.y;
        var buttleX = this.player.x;
        var buttleY = this.player.y + this.player.height * scale / 2 + 2;
        var x = (buttleY - centerPointy) * Math.sin(Math.PI * rotation / 180) + centerPointx;
        var y = (buttleY - centerPointy) * Math.cos(Math.PI * rotation / 180) + (buttleX - centerPointx) * Math.sin(Math.PI * rotation / 180) + centerPointy;
        buttle.setPosition(x, y);
        this.player.parent.addChild(buttle);
        this.WebScoket.sendMessage({
            msg: 23,
            data: {
                buttleName: buttle.name,
                scale: scale,
                x: x,
                y: y,
                rotation: rotation
            }
        });
    };
    NewClass.prototype.generateReceiveButtle = function (response) {
        this.getPlayer(this.BattleCtrl.playerName);
        var buttle = cc.instantiate(this.Buttle);
        console.log(buttle.name);
        buttle.name = response.data.buttleName;
        buttle.scale = response.data.scale;
        buttle.rotation = response.data.rotation;
        buttle.setPosition(response.data.x, response.data.y);
        var tank = 'tank_2';
        console.log(this.player);
        if (this.player.name === 'tank_2') {
            tank = 'tank_1';
        }
        this.getTankName(tank).parent.addChild(buttle);
    };
    NewClass.prototype.getTankName = function (tank) {
        var player = null;
        var children = this.BattleRegion.children;
        if (!children) {
            return;
        }
        for (var i = 0; i < children.length; i++) {
            if (children[i].getChildByName(tank)) {
                player = children[i].getChildByName(tank);
                return player;
            }
        }
    };
    NewClass.prototype.getPlayer = function (tank) {
        var children = this.BattleRegion.children;
        if (!children) {
            return;
        }
        for (var i = 0; i < children.length; i++) {
            if (children[i].getChildByName(tank)) {
                this.player = children[i].getChildByName(tank);
                return;
            }
        }
        console.log(this.player);
    };
    NewClass.prototype.update = function (dt) {
        var self = this;
        if (this.rotationStatus === 1) {
            if (this.player.rotation - 5 < 0) {
                this.player.rotation = 360 - this.player.rotation - 5;
            }
            else {
                this.player.rotation = this.player.rotation - 5;
            }
            this.sendTankData();
        }
        if (this.rotationStatus === 2) {
            this.player.rotation = (this.player.rotation + 5) % 360;
            this.sendTankData();
        }
        if (this.moveStatus === 1) {
            var speed = 5;
            this.player.x += speed * Math.sin(Math.PI * this.player.rotation / 180);
            this.player.y += speed * Math.cos(Math.PI * this.player.rotation / 180);
            console.log(this.player.x, this.player.y);
            this.sendTankData();
        }
        if (this.moveStatus === 2) {
            var speed = 5;
            this.player.x -= speed * Math.sin(Math.PI * this.player.rotation / 180);
            this.player.y -= speed * Math.cos(Math.PI * this.player.rotation / 180);
            this.sendTankData();
        }
    };
    NewClass.prototype.sendTankData = function () {
        var self = this;
        this.WebScoket.sendMessage({
            msg: 22,
            data: {
                tankName: self.BattleCtrl.playerName,
                x: self.player.x,
                y: self.player.y,
                rotation: self.player.rotation
            }
        });
    };
    NewClass.prototype.setOtherTankDataFor2 = function (response) {
        var player = null;
        if (response.dataMessage === '2') {
            player = this.getTankName(response.data.tankName);
        }
        if (player) {
            player.x = response.data.x;
            player.y = response.data.y;
            player.rotation = response.data.rotation;
        }
    };
    __decorate([
        property(cc.Node)
    ], NewClass.prototype, "BattleRegion", void 0);
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