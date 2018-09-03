import HomePageCtrl from './HomePageCtrl'
import { SpriteFrame } from '../../../creator';
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
    @property(cc.Prefab)
    matchingPanel: cc.Prefab = null;
    @property(cc.Node)
    headImg: cc.Node = null;
    @property(cc.Node)
    userName: cc.Node = null;

    private HomePage: cc.Node = null;
    /**
     * 点击返回按钮
     */
    onClickBackButton() {
        this.node.destroy()
    }
    /**
     * 点击在线匹配
     */
    onClickMatching() {
        var matchingPanel = cc.instantiate(this.matchingPanel);
        matchingPanel.parent = this.node.parent;
        this.enabled = false;
    }
    start() {
        var self = this;
        this.HomePage = cc.find('Canvas/HomePagePanel');
        var homePage = this.HomePage.getComponent(HomePageCtrl).UserData;
        this.userName.getComponent(cc.Label).string = homePage.nickname;
        cc.loader.load({url: homePage.headimgurl, type: 'png'}, function(err, texture){
            self.headImg.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(texture);
        })
    }
}
