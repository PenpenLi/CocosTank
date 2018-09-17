import PlayerOperationCtrl from './PlayerOperationCtrl'
import BattleCtrl from '../Page/BattleCtrl';
import WebSocketManage from '../Unit/WebSocketManage';
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
    private Boom: cc.Prefab = null;

    private playerRg: cc.RigidBody;
    // webScoket脚本
    private WebScoket: WebSocketManage = null;
    public flag = true;
    start() {
        this.playerRg = this.getComponent(cc.RigidBody);
        this.WebScoket = cc.find('WebScoket').getComponent(WebSocketManage);
    }
    onBeginContact(contact, selfCollider, otherCollider) {
        var self =this;
        if (this.flag) {
            var othername = otherCollider.node.name.substring(5, 11);
            console.log("flog:" + othername)
            var loser = this.node.name;
            var scoreType = 0;
            if (othername === 'buttle') {
                this.flag = false;
                var x = selfCollider.node.x;
                var y = selfCollider.node.y;
                var parent: cc.Node = selfCollider.node.parent;
                var boom = cc.instantiate(this.Boom);
                boom.setPosition(x, y);
                parent.addChild(boom);
                otherCollider.node.destroy();
                selfCollider.node.destroy();
                if (loser === 'tank_1') {
                    scoreType = 1;
                }
                this.WebScoket.sendMessage({
                    msg: 25,
                    data: {
                        scoreType: scoreType,
                        buttleName: otherCollider.node.name
                    }
                })
                // this.WebScoket.sendMessage({
                //     msg: 27
                // })
                // if (cc.find('Canvas/BattlePagePanel').getComponent(BattleCtrl).playerName === 'tank_1') {
                //     setTimeout(() => {
                //         cc.find('Canvas/BattlePagePanel').getComponent(BattleCtrl).restart();
                //     }, 2000);
                // }
            }
        }
    }
    public gameOver(response) {
        var x = this.node.x;
        var y = this.node.y;
        var parent: cc.Node = this.node.parent;
        var boom = cc.instantiate(this.Boom);
        boom.setPosition(x, y);
        parent.addChild(boom);
        this.node.destroy();
        // if (cc.find('Canvas/BattlePagePanel').getComponent(BattleCtrl).playerName === 'tank_1') {
        //     setTimeout(() => {
        //         cc.find('Canvas/BattlePagePanel').getComponent(BattleCtrl).restart();
        //     }, 2000);
        // }
    }
}
