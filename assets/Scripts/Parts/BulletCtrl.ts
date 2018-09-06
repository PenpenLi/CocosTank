import { pIn } from '../../../creator';
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
    
    private speedX = 5;

    private speedY = 5;
    start() {
        var self = this;
        this.WebScoket = cc.find('WebScoket').getComponent(WebSocketManage);
        setTimeout(() => {
            if(self.node){
                self.node.destroy();
            }
        }, 5000);
    }
    update(dt) {
        var rotation = this.node.rotation;
        this.node.x += this.speedX * Math.sin(Math.PI * rotation / 180);
        this.node.y += this.speedY* Math.cos(Math.PI * rotation / 180);
    }
    onCollisionEnter(other, self) {
        switch (other.tag) {
            case 0:
                this.speedY *= -1; 
                break;
            case 1:
                this.speedX *= -1; 
                break;
            case 2:
                this.speedY *= -1; 
                break;
            case 3:
                this.speedX *= -1; 
                break;
        }
    }
    onDestroy() {
        this.node.destroy();
    }
}
