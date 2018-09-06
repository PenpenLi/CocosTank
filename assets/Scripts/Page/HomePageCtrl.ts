import WebSocketManage from '../WebSocketManage';
import { AudioSource } from '../../creator';

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component 
{
    @property (cc.Prefab)
    lobbyPanel:cc.Prefab = null;
    @property (cc.SpriteFrame)
    openSoundSprite:cc.SpriteFrame = null;
    @property (cc.SpriteFrame)
    closeSoundSprite:cc.SpriteFrame = null;
    @property (cc.AudioSource)
    bgSound:AudioSource = null;
    public IsSound:boolean = true;//是否开启音效
     
    @property (cc.Node)
    private ping: cc.Node = null;
    public UserData = {};
    public enemyUserData = {};
    @property (cc.Node)
    private WebScoketNode: cc.Node = null;
    start() {
        this.ping.zIndex = 9999;
        this.getPing()
    }
    /**
     * 点击开始
     */
    OnClickStartButton()
    {
        var webscoket = this.WebScoketNode.getComponent(WebSocketManage);
        webscoket.sendMessage({msg: 1})
    }
    /**
     * 点击声音按钮
     */
    OnClickSoundButton(event)
    {
        this.IsSound = !this.IsSound;
        var buttonSprite:cc.Sprite = event.target.getComponent(cc.Sprite);
        this.IsSound ? (buttonSprite.spriteFrame = this.openSoundSprite, this.bgSound.resume()) : (buttonSprite.spriteFrame = this.closeSoundSprite,this.bgSound.pause())
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
        function state_Change(){
            if(xmlHttp.readyState === 4) {
                if(xmlHttp.status === 200) {
                    var end = new Date().getTime();
                    self.ping.getComponent(cc.Label).string = (end - start) + 'ms'
                }
            }
        }
    }
    public getUserData(response) {
        this.UserData = response.data;
        var lobbyPanelPage = cc.instantiate(this.lobbyPanel);
        lobbyPanelPage.parent = this.node.parent;
        this.enabled = false;
    }
}
