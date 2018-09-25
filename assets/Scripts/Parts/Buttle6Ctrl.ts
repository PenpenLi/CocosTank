import WebSocketManage from '../Unit/WebSocketManage';
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
export default class NewClass extends cc.Component {
    // webScoket脚本
    private WebScoket: WebSocketManage = null;
    start() {
        var _self = this;
        this.WebScoket = cc.find('WebScoket').getComponent(WebSocketManage);
        var manager = cc.director.getCollisionManager();
        manager.enabled = false;
        setTimeout(() => {
            _self.node.opacity = 20;
            manager.enabled = true;
        }, 3000)
    }
    onCollisionEnter(other, self) {
        var scoreType = 0;
        if (other.node.name === 'tank_1') scoreType = 1;
        this.WebScoket.sendMessage({
            msg: 25,
            data: {
                scoreType: scoreType,
                buttleName: this.node.name
            }
        })
    }
    // update (dt) {}
}
