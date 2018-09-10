import HomePageCtrl from '../Page/HomePageCtrl';
import MatchingPage from '../Page/MatchingCtrl';
import BattleCtrl from '../Page/BattleCtrl';
import PlayerOperationCtrl from '../Parts/PlayerOperationCtrl';

// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class Transfer extends cc.Component {
    // 主页
    public HomePage: cc.Node = null;
    // 匹配页
    public MatchPage: cc.Node = null;
    // 战斗页
    public BattlePage: cc.Node = null;
    // 操作盘
    public Operation: cc.Node = null;
    // 获取用户信息
    public getUserDataForHomePageCtrl(res) {
        var homePageCtrl = null;
        this.HomePage = cc.find('Canvas/HomePagePanel');
        homePageCtrl = this.HomePage.getComponent(HomePageCtrl);
        homePageCtrl.getUserData(res);
    }
    // 切换匹配状态
    public generateMapForHomePageCtrl(res) {
        var homePageCtrl = null;
        this.HomePage = cc.find('Canvas/HomePagePanel');
        homePageCtrl = this.HomePage.getComponent(HomePageCtrl);
        homePageCtrl.enemyUserData = res.enemyData;
        var matchPageCtrl = null;
        this.MatchPage = cc.find('Canvas/MatchingPagePanel');
        matchPageCtrl = this.MatchPage.getComponent(MatchingPage);
        matchPageCtrl.setBattleData(res)
    }
    // 地图匹配
    public getMapForBattlePageCtrl(res) {
        var battlePageCtrl = null;
        this.BattlePage = cc.find('Canvas/BattlePagePanel');
        battlePageCtrl = this.BattlePage.getComponent(BattleCtrl);
        battlePageCtrl.getMap(res)
    }
    // 位置匹配
    public positionUnicomForOperationCtrl(res) {
        var operationCtrl = null;
        this.Operation = cc.find('Canvas/BattlePagePanel/BattleBox/operation');
        operationCtrl = this.Operation.getComponent(PlayerOperationCtrl);
        operationCtrl.setOtherTankDataFor2(res)
    }
    // 开炮
    public fireButtleForOperationCtrl(res) {
        var operationCtrl = null;
        this.Operation = cc.find('Canvas/BattlePagePanel/BattleBox/operation');
        operationCtrl = this.Operation.getComponent(PlayerOperationCtrl);
        operationCtrl.addReceiveButtle(res)
    }
    // 个人位置延迟
    public selfToSelfForOperationCtrl(res) {
        return
        var operationCtrl = null;
        this.Operation = cc.find('Canvas/BattlePagePanel/BattleBox/operation');
        operationCtrl = this.Operation.getComponent(PlayerOperationCtrl);
        operationCtrl.setSelfTankData(res);
    }
}
