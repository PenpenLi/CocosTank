import WebSocketManage from '../Unit/WebSocketManage';
import HomePageCtrl from './HomePageCtrl'
import BattleCtrl from './BattleCtrl';
// Learn TypeScript:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/typescript/index.html
// Learn Attribute:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/reference/attributes/index.html
// Learn life-cycle callbacks:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/life-cycle-callbacks/index.html

const { ccclass, property } = cc._decorator;


@ccclass
export default class NewClass extends cc.Component {
    private WebScoketNode: cc.Node = null;
    @property(cc.Node)
    private headImg: cc.Node = null;
    @property(cc.Node)
    private Success: cc.Node = null;
    @property(cc.Node)
    private MainPlaysName: cc.Node = null;
    @property(cc.Node)
    private MainPlaysHeadImg: cc.Node = null;
    @property(cc.Node)
    private VicePlaysName: cc.Node = null;
    @property(cc.Node)
    private VicePlaysHeadImg: cc.Node = null;
    private HomePage: cc.Node = null;

    @property(cc.Prefab)
    private BattlePage: cc.Prefab = null;
    private userData = {};
    /**
     * 点击返回按钮
     */
    onClickBackButton() {
        var webScoket = this.WebScoketNode.getComponent(WebSocketManage);
        webScoket.sendMessage({ msg: 3 });
        this.node.destroy();
    }
    start() {
        var self = this;
        this.HomePage = cc.find('Canvas/HomePagePanel');
        this.userData = this.HomePage.getComponent(HomePageCtrl).userInfo;
        cc.loader.load({ url: self.userData.headimgurl, type: 'png' }, function (err, texture) {
            self.headImg.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(texture);
        })
        this.WebScoketNode = cc.find('WebScoket')
        var webScoket = this.WebScoketNode.getComponent(WebSocketManage);
        webScoket.sendMessage({ msg: 2 });
    }
    public setBattleData(response) {
        var self = this;
        this.Success.active = true;
        if (response.data) {
            this.MainPlaysName.getComponent(cc.Label).string = this.userData.nickname;
            cc.loader.load({ url: self.userData.headimgurl, type: 'png' }, function (err, texture) {
                self.MainPlaysHeadImg.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(texture);
            })
            this.VicePlaysName.getComponent(cc.Label).string = response.enemyData.nickname;
            cc.loader.load({ url: response.enemyData.headimgurl, type: 'png' }, function (err, texture) {
                self.VicePlaysHeadImg.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(texture);
            })
        } else {
            this.VicePlaysName.getComponent(cc.Label).string = this.userData.nickname;
            this.VicePlaysHeadImg.getComponent(cc.Sprite).spriteFrame = this.headImg.getComponent(cc.Sprite).spriteFrame;
            this.MainPlaysName.getComponent(cc.Label).string = response.enemyData.nickname;
            cc.loader.load({ url: response.enemyData.headimgurl, type: 'png' }, function (err, texture) {
                self.MainPlaysHeadImg.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(texture);
            })
        }
        var battlePage = cc.instantiate(this.BattlePage);
        battlePage.parent = this.node.parent;
        battlePage.zIndex = -1;
        if(response.data){
            battlePage.getComponent(BattleCtrl).initScore(0);
        } else {
            battlePage.getComponent(BattleCtrl).initScore(1);
        }
        setTimeout(() => {
            if (response.data) {
                battlePage.getComponent(BattleCtrl).generateMap();
            }
            battlePage.zIndex = 1;
            self.node.destroy();
        }, 1000);
    }
}
