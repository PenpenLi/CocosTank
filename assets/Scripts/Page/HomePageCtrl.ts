import WebSocketManage from "./WebSocketManage";
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
    @property (WebSocketManage)
    webSocketManage:WebSocketManage = null;
    @property (cc.AudioSource)
    bgSound:AudioSource = null;
    public IsSound:boolean = true;      //是否开启音效
    /**
     * 点击开始
     */
    OnClickStartButton()
    {
        var lobbyPanelPage = cc.instantiate(this.lobbyPanel);
        lobbyPanelPage.parent = this.node.parent;
        this.enabled = false;
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
}