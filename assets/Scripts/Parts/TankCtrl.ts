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
    // webScoket脚本
    private WebScoket: WebSocketManage = null;
    start() {
        this.WebScoket = cc.find('WebScoket').getComponent(WebSocketManage);
    }
    onBeginContact(contact, selfCollider, otherCollider) {
        var otherName = otherCollider.node.name.substring(5, 11);
        if (otherName === 'buttle') {
            var scoreType = 0;
            if (this.node.name === 'tank_1') scoreType = 1;
            this.WebScoket.sendMessage({
                msg: 25,
                data: {
                    scoreType: scoreType,
                    buttleName: otherCollider.node.name
                }
            })
        }
    }
    public gameOver(response) {
        if (cc.find('Canvas/BattlePagePanel/BattleBox/BattleRegion').parent.getChildByName('operation'))
            cc.find('Canvas/BattlePagePanel/BattleBox/BattleRegion').parent.getChildByName('operation').destroy();
        var boom = cc.instantiate(this.Boom);
        boom.setPosition(this.node.x, this.node.y);
        this.node.parent.addChild(boom);
        this.node.destroy();
    }
}
