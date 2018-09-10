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
    private playerRg: cc.RigidBody;
    // webScoket脚本
    private WebScoket: WebSocketManage = null;
    start() {
        this.playerRg = this.getComponent(cc.RigidBody);
        this.WebScoket = cc.find('WebScoket').getComponent(WebSocketManage);
    }
    update() {
    }
    onCollisionEnter(other, self) {
        var otherName = other.node.name.substring(5, 11);
        var loser = self.node.name;
        var scoreType = 0;
        var mainPlayer = 0;
        if( cc.find('Canvas/BattlePagePanel').getComponent(BattleCtrl).playerName === 'tank_1'){
            mainPlayer = 1;
        }
        if(loser === 'tank_1'){
            scoreType = 1;
        }
        if (otherName === 'buttle') {
            console.log('die')
            this.node.destroy();
            var node: cc.Node = other.node;
            node.destroy();
            cc.find('Canvas/BattlePagePanel').getComponent(BattleCtrl).restart(scoreType)
            // this.WebScoket.sendMessage({
            //     msg: 25,
            //     data: {
            //         type: mainPlayer
            //     }
            // })
        }
    }
}
