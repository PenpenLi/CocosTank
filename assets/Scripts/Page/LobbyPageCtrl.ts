import HomePageCtrl from './HomePageCtrl'
import FriendPageCtrl from './FriendPageCtrl'
import { SpriteFrame } from '../../../creator';
const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
    @property(cc.Prefab)
    matchingPanel: cc.Prefab = null;
    @property(cc.Prefab)
    friendPanel: cc.Prefab = null;
    @property(cc.Prefab)
    leaguePanel: cc.Prefab = null;

    @property(cc.Node)
    headImg: cc.Node = null;
    @property(cc.Node)
    userName: cc.Node = null;

    private HomePage: cc.Node = null;
    start() {
        var self = this;
        this.HomePage = cc.find('Canvas/HomePagePanel');
        var homePage = this.HomePage.getComponent(HomePageCtrl);
        this.userName.getComponent(cc.Label).string = homePage.userInfo.nickname;
        cc.loader.load({ url: homePage.userInfo.headimgurl, type: 'png' }, function (err, texture) {
            self.headImg.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(texture);
        })
    }
    /**
     * 点击返回按钮
     */
    onBackButton() {
        this.node.destroy();
        this.HomePage.getComponent(HomePageCtrl).status = true;
        this.HomePage.getComponent(HomePageCtrl).enabled = true;
    }
    /**
     * 点击在线匹配
     */
    onClickMatching() {
        var matchingPanel = cc.instantiate(this.matchingPanel);
        matchingPanel.parent = this.node.parent;
        this.enabled = false;
    }
    /**
     * 点击好友对战
     */
    onClickFriend() {
        var friendPanel = cc.instantiate(this.friendPanel);
        friendPanel.parent = this.node.parent;
        friendPanel.getComponent(FriendPageCtrl).init(0);
        this.enabled = false;
    }
    /**
     * 点击联赛
     */
    onClickLeague() {
        var leaguePanel = cc.instantiate(this.leaguePanel);
        leaguePanel.parent = this.node.parent;
        this.enabled = false;
    }
}
