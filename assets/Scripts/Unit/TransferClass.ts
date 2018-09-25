import HomePageCtrl from '../Page/HomePageCtrl';
import MatchingPage from '../Page/MatchingCtrl';
import BattleCtrl from '../Page/BattleCtrl';
import PlayerOperationCtrl from '../Parts/PlayerOperationCtrl';
import TankCtrl from '../Parts/TankCtrl';

// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

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
    // 主玩家


    // 获取用户信息
    public getUserDataForHomePageCtrl(res) {
        console.log(res)
        var homePageCtrl = null;
        this.HomePage = cc.find('Canvas/HomePagePanel');
        homePageCtrl = this.HomePage.getComponent(HomePageCtrl);
        homePageCtrl.getUserData(res);
    }
    // 切换匹配状态
    public generateMapForHomePageCtrl(res) {
        console.log(res)
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
        operationCtrl.getViceOperationData(res)
    }
    // 开炮
    public fireButtleForOperationCtrl(res) {
        var operationCtrl = null;
        this.Operation = cc.find('Canvas/BattlePagePanel/BattleBox/operation');
        operationCtrl = this.Operation.getComponent(PlayerOperationCtrl);
        operationCtrl.addReceiveButtle(res)
    }
    // 死亡
    public dieForTankCtrl(res) {
        // 0代表副玩家
        var player: cc.Node = null;
        var children = cc.find('Canvas/BattlePagePanel/BattleBox/BattleRegion').children;
        cc.find('Canvas/BattlePagePanel').getComponent(BattleCtrl).scoreCount(res.data.scoreType);
        if(res.data.scoreType === 1 && cc.find('Canvas/BattlePagePanel').getComponent(BattleCtrl).playerName === 'tank_1' ||
            res.data.scoreType === 0 && cc.find('Canvas/BattlePagePanel').getComponent(BattleCtrl).playerName === 'tank_2'
        ) {
            cc.find('Canvas/BattlePagePanel').getComponent(BattleCtrl).gameOver(0);
        } else {
            cc.find('Canvas/BattlePagePanel').getComponent(BattleCtrl).gameOver(1);
        }
        // 移除碰撞子弹节点
        for(let i = 0; i < children.length; i++) {
            if(children[i].getChildByName(res.data.buttleName)) {
                children[i].getChildByName(res.data.buttleName).destroy();
                break;
            }
        }
        if (res.data.scoreType === 0) {
            for (let i = 0; i < children.length; i++) {
                if (children[i].getChildByName('tank_2')) {
                    player = children[i].getChildByName('tank_2')
                    var playerCompeont = player.getComponent(TankCtrl);
                    playerCompeont.gameOver(res);
                    return
                }
            }
        } else {
            for (let i = 0; i < children.length; i++) {
                if (children[i].getChildByName('tank_1')) {
                    player = children[i].getChildByName('tank_1')
                    var playerCompeont = player.getComponent(TankCtrl);
                    playerCompeont.gameOver(res);
                    return
                }
            }
        }
    }
    // 重新开始
    public restartForBattleCtrl(res) {
        var battlePageCtrl = null;
        this.BattlePage = cc.find('Canvas/BattlePagePanel');
        battlePageCtrl = this.BattlePage.getComponent(BattleCtrl);
        battlePageCtrl.ready.active = false;
        if(battlePageCtrl.playerName === 'tank_1') {
            battlePageCtrl.restart();
        }
    }
    // 对方离开房间
    public leaveForBattleCtrl(res) {
        var battlePageCtrl = null;
        this.BattlePage = cc.find('Canvas/BattlePagePanel');
        battlePageCtrl = this.BattlePage.getComponent(BattleCtrl);
        battlePageCtrl.viceLeave();
    }
    public genteraPropsForBattleCtrl(res) {
        var battlePageCtrl = null;
        this.BattlePage = cc.find('Canvas/BattlePagePanel');
        battlePageCtrl = this.BattlePage.getComponent(BattleCtrl);
        battlePageCtrl.genearteProp(res.data.point, res.data.rotation, res.data.propType);
    }
}
