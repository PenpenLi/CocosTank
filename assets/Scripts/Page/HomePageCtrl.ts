import WebSocketManage from '../Unit/WebSocketManage';
import FriendPageCtrl from '../Page/FriendPageCtrl';
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
    @property(cc.Prefab)
    FriendPage: cc.Prefab = null;

    public IsSound: boolean = true;//是否开启音效

    public status = true;
    @property(cc.Node)
    private ping: cc.Node = null;
    @property(cc.Node)
    private WebScoketNode: cc.Node = null;

    public viceUserInfo = {
        nickname: '',
        headimgurl: ''
    }
    public userInfo = {
        openid: '',
        nickname: '',
        headimgurl: ''
    }
    private WebSocket: WebSocketManage = null;

    start() {
        this.WebSocket = this.WebScoketNode.getComponent(WebSocketManage);
        this.getPing();
        this._onInit();
    }
    /**
     * 初始化
     */
    private _onInit() {
        var _self = this;
        // 获取授权
        wx.authorize({ scope: 'scope.userInfo' })
        this.WebSocket.ws.onopen = function (event) {
            _self.getUserOpenid();
            wx.onShow((response) => {
                if (response.query.room) {
                    _self.isWxShare(response.query.room);
                }
            });
            if (wx.getLaunchOptionsSync().query.room) {
                _self.isWxShare(wx.getLaunchOptionsSync().query.room);
            };
        }

    }
    /**
    * 通过小游戏转发进入游戏
    * room: 房间号
    * userInfo：当前玩家信息
    */
    private isWxShare(roomId) {
        var _self = this;
        wx.getUserInfo({
            success: function (res) {
                res = res.userInfo;
                var userInfo = {
                    nickname: res.nickName,
                    headimgurl: res.avatarUrl,
                    openid: ''
                }
                _self.userInfo = userInfo;
                _self.WebSocket.sendMessage({
                    msg: 6,
                    houseid: roomId,
                    userInfo: userInfo
                })
            }
        })
    }
    /**
     * 获取用户openid
     */
    private getUserOpenid() {
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
                }
                xhr.open('GET', `http://app.ei-marketing.net/tankWar/acceputJSCODE.do?JSCODE=${res.code}`, true);
                xhr.send();
            }
        })
    }
    /**
     * 点击开始
     */
    private OnClickStartButton() {
        if (!this.status) {
            return;
        }
        this.status = !this.status;
        var lobbyPanelPage = cc.instantiate(this.lobbyPanel);
        lobbyPanelPage.parent = this.node.parent;
        this.enabled = false;
        // this.uploadUserInfo();
        // this.WebSocket.sendMessage({msg: 1})
    }
    private uploadUserInfo() {
        var _self = this;
        wx.getSetting({
            success: function (res) {
                if (res.authSetting['scope.userInfo']) {
                    wx.getUserInfo({
                        success: function (res) {
                            res = res.userInfo;
                            console.log(res);
                            _self.userInfo.nickname = res.nickName
                            _self.userInfo.headimgurl = res.avatarUrl
                            _self.WebSocket.sendMessage({
                                msg: 'userInfo',
                                data: {
                                    openid: _self.userInfo.openid,
                                    nickname: _self.userInfo.nickname,
                                    headimgurl: _self.userInfo.headimgurl
                                }
                            })

                        }
                    })
                }
            }
        })
    }
    /**
     * 点击声音按钮
     */
    private OnClickSoundButton(event) {
        this.IsSound = !this.IsSound;
        var buttonSprite: cc.Sprite = event.target.getComponent(cc.Sprite);
        this.IsSound ? (buttonSprite.spriteFrame = this.openSoundSprite, this.bgSound.resume()) : (buttonSprite.spriteFrame = this.closeSoundSprite, this.bgSound.pause())
    }
    /**
     * 获取网络延迟信息
     */
    private getPing() {
        var net_1 = cc.find('Canvas/Ping/net_1')
        var net_2 = cc.find('Canvas/Ping/net_2')
        var net_3 = cc.find('Canvas/Ping/net_3')
        var pingNode = this.node.parent.getChildByName('Ping');
        pingNode.zIndex = 9999;
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
                    if((end - start) < 50) {
                        net_1.active = true;
                        net_2.active = false;
                        net_3.active = false;
                    } else if((end - start) < 100) {
                        net_1.active = false;
                        net_2.active = true;
                        net_3.active = false;
                    } else {
                        net_1.active = false;
                        net_2.active = false;
                        net_3.active = true;
                    }
                    pingNode.getComponent(cc.Label).string = (end - start) + 'ms'
                }
            }
        }
    }
    public getUserData(response) {
        console.log('---')
        this.userInfo = response.data;
        var lobbyPanelPage = cc.instantiate(this.lobbyPanel);
        lobbyPanelPage.parent = this.node.parent;
        this.enabled = false;
    }

    public setViceUserInfoForFriend(nickname, headimgurl) {
        this.viceUserInfo.nickname = nickname;
        this.viceUserInfo.headimgurl = headimgurl;
    }

    public linkForFriend(res) {
        this.viceUserInfo.nickname = res.data.nickname
        this.viceUserInfo.headimgurl = res.data.headimgurl
        var friendPage = cc.instantiate(this.FriendPage);
        friendPage.parent = this.node.parent;
        friendPage.getComponent(FriendPageCtrl).init(2);
        this.enabled = false;
    }
}
