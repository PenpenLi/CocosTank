import PlayerOperationCtrl from './PlayerOperationCtrl';
import BattleCtrl from '../Page/BattleCtrl';
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
export default class NewClass extends cc.Component {
    private nodeDestoryTime = null;
    start () {
        var self = this;
        console.log(this.node.name)
        setTimeout(() => {
            self.onNodeTwinkle();
            setTimeout(() => {
                clearTimeout(self.nodeDestoryTime)
                if(this.node){
                    self.node.destroy();
                }
            }, 3000)
        }, 12000)
    }
    // 消失前三秒闪烁
    onNodeTwinkle() {
        var self = this;
        this.nodeDestoryTime = setTimeout(() => {
            if(!this.node){
                return
            } 
            self.node.opacity = 20;
            setTimeout(() => {
                self.node.opacity = 200;
                self.onNodeTwinkle();
            }, 200) 
        }, 200)
    }
    // 碰撞事件
    onCollisionEnter(other, self) {
        var propType = parseInt(this.node.name.substring(5, 6))
        var spriteFrameName = `${other.node.name}_${propType}`
        var playerName = cc.find('Canvas/BattlePagePanel').getComponent(BattleCtrl).playerName;
        if(other.node.name === playerName) {
            cc.find('Canvas/BattlePagePanel/BattleBox/operation').getComponent(PlayerOperationCtrl).player.current.buttleType = propType
        } else {
            cc.find('Canvas/BattlePagePanel/BattleBox/operation').getComponent(PlayerOperationCtrl).player.vice.buttleType = propType
        }
        cc.loader.loadRes(spriteFrameName, cc.SpriteFrame, function(err, spriteFrame) {
            other.node.getComponent(cc.Sprite).spriteFrame = spriteFrame;
        })
        self.node.destroy();
    }
    // update (dt) {}
}
