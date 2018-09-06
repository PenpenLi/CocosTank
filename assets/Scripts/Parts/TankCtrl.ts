import PlayerOperationCtrl from './PlayerOperationCtrl'
import BattleCtrl from '../Page/BattleCtrl';

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
    start() {
        this.playerRg = this.getComponent(cc.RigidBody);
    }
    update() {
    }
    onCollisionEnter(other, self) {
        var otherName = other.node.name.substring(5, 11);
        var loser = self.node.name;
        var scoreType = 0;
        if(loser === 'tank_1'){
            scoreType = 1;
        }
        if (otherName === 'buttle') {
            this.node.destroy();
            var node: cc.Node = other.node;
            node.destroy();
            cc.find('Canvas/BattlePagePanel').getComponent(BattleCtrl).restart(scoreType)
        }
    }
}
