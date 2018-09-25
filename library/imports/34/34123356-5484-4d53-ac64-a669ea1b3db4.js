"use strict";
cc._RF.push(module, '34123NWVIRNU6xkpmnqGz20', 'HomePageCtrl');
// Scripts/Page/HomePageCtrl.ts

Object.defineProperty(exports, "__esModule", { value: true });
var WebSocketManage_1 = require("../Unit/WebSocketManage");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var NewClass = /** @class */ (function (_super) {
    __extends(NewClass, _super);
    function NewClass() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.lobbyPanel = null;
        _this.openSoundSprite = null;
        _this.closeSoundSprite = null;
        _this.bgSound = null;
        _this.IsSound = true; //是否开启音效
        _this.ping = null;
        _this.enemyUserData = {};
        _this.WebScoketNode = null;
        _this.userInfo = {
            openid: '',
            nickname: '',
            headimgurl: ''
        };
        _this.WebSocket = null;
        return _this;
    }
    NewClass.prototype.start = function () {
        var _self = this;
        this.WebSocket = this.WebScoketNode.getComponent(WebSocketManage_1.default);
        // wx.showShareMenu();
        // wx.login({
        //     success: function(res) {
        //         var xhr = new XMLHttpRequest();
        //         xhr.onreadystatechange = function() {
        //             if(xhr.readyState === 4 && (xhr.status >= 200 && xhr.status < 400)) {
        //                 var response = JSON.parse(xhr.responseText);
        //                 _self.userInfo.openid = response.openid;
        //             }
        //         }
        //         xhr.open('GET', `http://172.17.0.13:8080/tankWar/acceputJSCODE.do?JSCODE=${res.code}`, true);
        //         xhr.send();
        //     }
        // })
        // wx.authorize({ scope: 'scope.userInfo' })
        this.ping.zIndex = 9999;
        this.getPing();
    };
    /**
     * 点击开始
     */
    NewClass.prototype.OnClickStartButton = function () {
        var _self = this;
        console.log(_self.userInfo, '===');
        // wx.shareAppMessage({
        //     title: '转发标题'
        // })
        // wx.getSetting({
        //     success: function(res) {
        //         console.log(_self.userInfo)
        //         if(res.authSetting['scope.userInfo']) {
        //             wx.getUserInfo({
        //                 success: function(res) {
        //                     res = res.userInfo;
        //                     _self.userInfo.nickname = res.nickName
        //                     _self.userInfo.headimgurl = res.avatarUrl
        //                     console.log(_self.userInfo)
        //                     var xhr = new XMLHttpRequest();
        //                     xhr.onreadystatechange = function() {
        //                     }
        //                     xhr.open('GET', `http://172.17.0.13:8080/tankWar/wechatUserinfo.do?openid=${_self.userInfo.openid}&nickname=${_self.userInfo.nickname}&headimgurl=${_self.userInfo.headimgurl}`, true);
        //                     xhr.send();
        //                 }
        //             })
        //         }
        //     },
        //     fail: function(res){
        //         console.log(res)
        //     }
        // })
        _self.WebSocket.sendMessage({ msg: 1 });
    };
    /**
     * 点击声音按钮
     */
    NewClass.prototype.OnClickSoundButton = function (event) {
        this.IsSound = !this.IsSound;
        var buttonSprite = event.target.getComponent(cc.Sprite);
        this.IsSound ? (buttonSprite.spriteFrame = this.openSoundSprite, this.bgSound.resume()) : (buttonSprite.spriteFrame = this.closeSoundSprite, this.bgSound.pause());
    };
    NewClass.prototype.getPing = function () {
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
                    self.ping.getComponent(cc.Label).string = (end - start) + 'ms';
                }
            }
        }
    };
    NewClass.prototype.getUserData = function (response) {
        this.userInfo = response.data;
        var lobbyPanelPage = cc.instantiate(this.lobbyPanel);
        lobbyPanelPage.parent = this.node.parent;
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