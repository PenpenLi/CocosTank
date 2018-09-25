import WebSocketManage from '../Unit/WebSocketManage';
import { AudioSource } from '../../creator';

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
    @property(cc.Prefab)
    lobbyPanel: cc.Prefab = null;
    @property(cc.SpriteFrame)
    openSoundSprite: cc.SpriteFrame = null;
    @property(cc.SpriteFrame)
    closeSoundSprite: cc.SpriteFrame = null;
    @property(cc.AudioSource)
    bgSound: AudioSource = null;
    public IsSound: boolean = true;//是否开启音效

    @property(cc.Node)
    private ping: cc.Node = null;
    public enemyUserData = {};
    @property(cc.Node)
    private WebScoketNode: cc.Node = null;

    public userInfo = {
        openid: '',
        nickname: '',
        headimgurl: ''
    }
    private WebSocket: WebSocketManage = null;
    start() {
        var _self = this;
        this.WebSocket = this.WebScoketNode.getComponent(WebSocketManage);
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
        this.getPing()
    }
    /**
     * 点击开始
     */
    OnClickStartButton() {
        var _self = this;
        console.log(_self.userInfo,'===')
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
        _self.WebSocket.sendMessage({msg: 1})
    }
    /**
     * 点击声音按钮
     */
    OnClickSoundButton(event) {
        this.IsSound = !this.IsSound;
        var buttonSprite: cc.Sprite = event.target.getComponent(cc.Sprite);
        this.IsSound ? (buttonSprite.spriteFrame = this.openSoundSprite, this.bgSound.resume()) : (buttonSprite.spriteFrame = this.closeSoundSprite, this.bgSound.pause())
    }
    getPing() {
        var self = this;
        setTimeout(() => {
            self.getPing();
        }, 1000)
        var url = 'http://app.ei-marketing.net/tankWar/ping.do'
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
                    self.ping.getComponent(cc.Label).string = (end - start) + 'ms'
                }
            }
        }
    }
    public getUserData(response) {
        this.userInfo = response.data;
        var lobbyPanelPage = cc.instantiate(this.lobbyPanel);
        lobbyPanelPage.parent = this.node.parent;
        this.enabled = false;
    }
}
