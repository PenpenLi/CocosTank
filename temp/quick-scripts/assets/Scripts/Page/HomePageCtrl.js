(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Scripts/Page/HomePageCtrl.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '34123NWVIRNU6xkpmnqGz20', 'HomePageCtrl', __filename);
// Scripts/Page/HomePageCtrl.ts

Object.defineProperty(exports, "__esModule", { value: true });
var WebSocketManage_1 = require("../Unit/WebSocketManage");
var FriendPageCtrl_1 = require("../Page/FriendPageCtrl");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var NewClass = /** @class */ (function (_super) {
    __extends(NewClass, _super);
    function NewClass() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.lobbyPanel = null;
        _this.openSoundSprite = null;
        _this.closeSoundSprite = null;
        _this.bgSound = null;
        _this.FriendPage = null;
        _this.IsSound = true; //是否开启音效
        _this.status = true;
        _this.ping = null;
        _this.WebScoketNode = null;
        _this.viceUserInfo = {
            nickname: '',
            headimgurl: ''
        };
        _this.userInfo = {
            openid: '',
            nickname: '',
            headimgurl: ''
        };
        _this.WebSocket = null;
        return _this;
    }
    NewClass.prototype.start = function () {
        this.WebSocket = this.WebScoketNode.getComponent(WebSocketManage_1.default);
        this.getPing();
        this._onInit();
    };
    /**
     * 初始化
     */
    NewClass.prototype._onInit = function () {
        var _self = this;
        // 获取授权
        wx.authorize({ scope: 'scope.userInfo' });
        this.WebSocket.ws.onopen = function (event) {
            _self.getUserOpenid();
            wx.onShow(function (response) {
                if (response.query.room) {
                    _self.isWxShare(response.query.room);
                }
            });
            if (wx.getLaunchOptionsSync().query.room) {
                _self.isWxShare(wx.getLaunchOptionsSync().query.room);
            }
            ;
        };
    };
    /**
    * 通过小游戏转发进入游戏
    * room: 房间号
    * userInfo：当前玩家信息
    */
    NewClass.prototype.isWxShare = function (roomId) {
        var _self = this;
        wx.getUserInfo({
            success: function (res) {
                res = res.userInfo;
                var userInfo = {
                    nickname: res.nickName,
                    headimgurl: res.avatarUrl,
                    openid: ''
                };
                _self.userInfo = userInfo;
                _self.WebSocket.sendMessage({
                    msg: 6,
                    houseid: roomId,
                    userInfo: userInfo
                });
            }
        });
    };
    /**
     * 获取用户openid
     */
    NewClass.prototype.getUserOpenid = function () {
        var _self = this;
        wx.login({
            success: function (res) {
                var xhr = new XMLHttpRequest();
                xhr.onreadystatechange = function () {
                    if (xhr.readyState === 4 && (xhr.status >= 200 && xhr.status < 400)) {
                        var res = JSON.parse(xhr.responseText);
                        _self.userInfo.openid = res.openid;
                        _self.uploadUserInfo();
                    }
                };
                xhr.open('GET', "http://app.ei-marketing.net/tankWar/acceputJSCODE.do?JSCODE=" + res.code, true);
                xhr.send();
            }
        });
    };
    /**
     * 点击开始
     */
    NewClass.prototype.OnClickStartButton = function () {
        if (!this.status) {
            return;
        }
        this.status = !this.status;
        var lobbyPanelPage = cc.instantiate(this.lobbyPanel);
        lobbyPanelPage.parent = this.node.parent;
        this.enabled = false;
        // this.uploadUserInfo();
        // this.WebSocket.sendMessage({msg: 1})
    };
    NewClass.prototype.uploadUserInfo = function () {
        var _self = this;
        wx.getSetting({
            success: function (res) {
                if (res.authSetting['scope.userInfo']) {
                    wx.getUserInfo({
                        success: function (res) {
                            res = res.userInfo;
                            console.log(res);
                            _self.userInfo.nickname = res.nickName;
                            _self.userInfo.headimgurl = res.avatarUrl;
                            _self.WebSocket.sendMessage({
                                msg: 'userInfo',
                                data: {
                                    openid: _self.userInfo.openid,
                                    nickname: _self.userInfo.nickname,
                                    headimgurl: _self.userInfo.headimgurl
                                }
                            });
                        }
                    });
                }
            }
        });
    };
    /**
     * 点击声音按钮
     */
    NewClass.prototype.OnClickSoundButton = function (event) {
        this.IsSound = !this.IsSound;
        var buttonSprite = event.target.getComponent(cc.Sprite);
        this.IsSound ? (buttonSprite.spriteFrame = this.openSoundSprite, this.bgSound.resume()) : (buttonSprite.spriteFrame = this.closeSoundSprite, this.bgSound.pause());
    };
    /**
     * 获取网络延迟信息
     */
    NewClass.prototype.getPing = function () {
        var net_1 = cc.find('Canvas/Ping/net_1');
        var net_2 = cc.find('Canvas/Ping/net_2');
        var net_3 = cc.find('Canvas/Ping/net_3');
        var pingNode = this.node.parent.getChildByName('Ping');
        pingNode.zIndex = 9999;
        var self = this;
        setTimeout(function () {
            self.getPing();
        }, 1000);
        var url = 'http://app.ei-marketing.net/tankWar/ping.do';
        // var url = 'http://172.17.0.13:8080/tankWar/ping.do'
        var xmlHttp;
        var start = new Date().getTime();
        xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = state_Change;
        xmlHttp.open('GET', url, true);
        xmlHttp.send(null);
        function state_Change() {
            if (xmlHttp.readyState === 4) {
                if (xmlHttp.status === 200) {
                    var end = new Date().getTime();
                    if ((end - start) < 50) {
                        net_1.active = true;
                        net_2.active = false;
                        net_3.active = false;
                    }
                    else if ((end - start) < 100) {
                        net_1.active = false;
                        net_2.active = true;
                        net_3.active = false;
                    }
                    else {
                        net_1.active = false;
                        net_2.active = false;
                        net_3.active = true;
                    }
                    pingNode.getComponent(cc.Label).string = (end - start) + 'ms';
                }
            }
        }
    };
    NewClass.prototype.getUserData = function (response) {
        console.log('---');
        this.userInfo = response.data;
        var lobbyPanelPage = cc.instantiate(this.lobbyPanel);
        lobbyPanelPage.parent = this.node.parent;
        this.enabled = false;
    };
    NewClass.prototype.setViceUserInfoForFriend = function (nickname, headimgurl) {
        this.viceUserInfo.nickname = nickname;
        this.viceUserInfo.headimgurl = headimgurl;
    };
    NewClass.prototype.linkForFriend = function (res) {
        this.viceUserInfo.nickname = res.data.nickname;
        this.viceUserInfo.headimgurl = res.data.headimgurl;
        var friendPage = cc.instantiate(this.FriendPage);
        friendPage.parent = this.node.parent;
        friendPage.getComponent(FriendPageCtrl_1.default).init(2);
        this.enabled = false;
    };
    __decorate([
        property(cc.Prefab)
    ], NewClass.prototype, "lobbyPanel", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], NewClass.prototype, "openSoundSprite", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], NewClass.prototype, "closeSoundSprite", void 0);
    __decorate([
        property(cc.AudioSource)
    ], NewClass.prototype, "bgSound", void 0);
    __decorate([
        property(cc.Prefab)
    ], NewClass.prototype, "FriendPage", void 0);
    __decorate([
        property(cc.Node)
    ], NewClass.prototype, "ping", void 0);
    __decorate([
        property(cc.Node)
    ], NewClass.prototype, "WebScoketNode", void 0);
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
        //# sourceMappingURL=HomePageCtrl.js.map
        