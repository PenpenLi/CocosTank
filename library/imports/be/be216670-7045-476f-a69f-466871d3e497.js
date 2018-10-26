"use strict";
cc._RF.push(module, 'be216ZwcEVHb6afRmhx0+SX', 'FriendPageCtrl');
// Scripts/Page/FriendPageCtrl.ts

Object.defineProperty(exports, "__esModule", { value: true });
var WebSocketManage_1 = require("../Unit/WebSocketManage");
var HomePageCtrl_1 = require("../Page/HomePageCtrl");
var BattleCtrl_1 = require("../Page/BattleCtrl");
// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var NewClass = /** @class */ (function (_super) {
    __extends(NewClass, _super);
    function NewClass() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.BattlePage = null;
        _this.HomePageCtrl = null;
        _this.WebSocket = null;
        _this.roomNumber = '';
        _this.currentPlayer = true;
        _this.player = {
            // 主玩家
            main: {
                headImgNode: null,
                nickNameNode: null,
            },
            // 副玩家
            vice: {
                headImgNode: null,
                nickNameNode: null,
            }
        };
        return _this;
    }
    NewClass.prototype.start = function () {
        this.WebSocket = cc.find('WebScoket').getComponent(WebSocketManage_1.default);
        this.WebSocket.sendMessage({
            msg: 4
        });
    };
    NewClass.prototype.init = function (type) {
        var _self = this;
        this.player.main.headImgNode = this.node.getChildByName('Player').getChildByName('player1').getChildByName('Mask').getChildByName('headImg');
        this.player.main.nickNameNode = this.node.getChildByName('Player').getChildByName('player1').getChildByName('nickname');
        this.player.vice.headImgNode = this.node.getChildByName('Player').getChildByName('player2').getChildByName('Mask').getChildByName('headImg');
        this.player.vice.nickNameNode = this.node.getChildByName('Player').getChildByName('player2').getChildByName('nickname');
        this.HomePageCtrl = cc.find('Canvas/HomePagePanel').getComponent(HomePageCtrl_1.default);
        // 创建房间
        if (type === 0) {
            var userInfo = this.HomePageCtrl.userInfo;
            this.player.main.nickNameNode.getComponent(cc.Label).string = userInfo.nickname;
            cc.loader.load({ url: userInfo.headimgurl, type: 'png' }, function (err, texture) {
                _self.player.main.headImgNode.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(texture);
            });
        }
        // 房主获取对方信息
        if (type === 1) {
            var viceuserInfo = this.HomePageCtrl.viceUserInfo;
            this.player.vice.nickNameNode.getComponent(cc.Label).string = viceuserInfo.nickname;
            cc.loader.load({ url: viceuserInfo.headimgurl, type: 'png' }, function (err, texture) {
                _self.player.vice.headImgNode.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(texture);
            });
        }
        // 被邀请玩家进入房间
        if (type === 2) {
            this.currentPlayer = false;
            var userInfo = this.HomePageCtrl.userInfo;
            this.player.vice.nickNameNode.getComponent(cc.Label).string = userInfo.nickname;
            cc.loader.load({ url: userInfo.headimgurl, type: 'png' }, function (err, texture) {
                _self.player.vice.headImgNode.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(texture);
            });
            this.node.getChildByName('ButtonBox').getChildByName('button_4').active = false;
            var viceuserInfo = this.HomePageCtrl.viceUserInfo;
            this.player.main.nickNameNode.getComponent(cc.Label).string = viceuserInfo.nickname;
            cc.loader.load({ url: viceuserInfo.headimgurl, type: 'png' }, function (err, texture) {
                _self.player.main.headImgNode.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(texture);
            });
        }
    };
    NewClass.prototype.onShare = function () {
        if (this.roomNumber === '') {
            return;
        }
        wx.shareAppMessage({
            title: '坦克大战',
            query: "room=" + this.roomNumber,
            success: function (res) {
                console.log(wx.getLaunchOptionsSync());
            },
            fail: function (res) {
                console.log(res, 'error');
            }
        });
    };
    NewClass.prototype.onBack = function () {
        this.WebSocket.sendMessage({
            msg: '5'
        });
        this.node.destroy();
    };
    NewClass.prototype.onClickStart = function () {
        this.WebSocket.sendMessage({
            msg: '211'
        });
        var battlePage = cc.instantiate(this.BattlePage);
        battlePage.parent = this.node.parent;
        battlePage.getComponent(BattleCtrl_1.default).initScore(0);
        battlePage.getComponent(BattleCtrl_1.default).generateMap();
        this.node.destroy();
    };
    NewClass.prototype.getOnClickStart = function () {
        var battlePage = cc.instantiate(this.BattlePage);
        battlePage.parent = this.node.parent;
        battlePage.getComponent(BattleCtrl_1.default).initScore(1);
        this.node.destroy();
    };
    // update (dt) {}
    NewClass.prototype.getRoomNumber = function (res) {
        this.roomNumber = res.data;
    };
    __decorate([
        property(cc.Prefab)
    ], NewClass.prototype, "BattlePage", void 0);
    NewClass = __decorate([
        ccclass
    ], NewClass);
    return NewClass;
}(cc.Component));
exports.default = NewClass;

cc._RF.pop();