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
    private WebScoket: WebSocketManage = null;
    private bullet: cc.RigidBody;
    start() {
        this.bullet = this.node.getComponent(cc.RigidBody);
        var speed = 500;
        var x = speed * Math.sin(Math.PI * this.node.rotation / 180)
        var y = speed * Math.cos(Math.PI * this.node.rotation / 180)
        this.bullet.linearVelocity = new cc.Vec2(x, y)
        var self = this;
        this.WebScoket = cc.find('WebScoket').getComponent(WebSocketManage);
        setTimeout(() => {
            if (self.node) {
                self.node.destroy();
            }
        }, 5000);
    }
    update(dt) {
        
    }
    onDestroy() {
        this.node.destroy();
    }
}
