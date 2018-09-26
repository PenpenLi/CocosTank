import PlayerOperationCtrl from './PlayerOperationCtrl';
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
    private bullet: cc.RigidBody;
    private OperationCtrl: PlayerOperationCtrl = null;
    start () {
        var _self = this;
        this.OperationCtrl = cc.find('Canvas/BattlePagePanel/BattleBox/operation').getComponent(PlayerOperationCtrl);
        this.bullet = this.node.getComponent(cc.RigidBody);
        var speed = 500;
        var x = speed * Math.sin(Math.PI * this.node.rotation / 180)
        var y = speed * Math.cos(Math.PI * this.node.rotation / 180)
        this.bullet.linearVelocity = new cc.Vec2(x, y);
    }
    onBeginContact(contact, selfCollider, otherCollider) {
    }
    public boom() {
        var _self = this;
        for(let i = 0; i < 360 / 30; i++) {
            var bullet = _self.OperationCtrl.generateBullet({
                name: `tank_buttle_${i}`,
                type: 1,
                bulletType: 1,
                rotation: i * 30,
                scale: _self.node.scale,
                x: _self.node.x,
                y: _self.node.y
            }, 0)
            _self.node.parent.addChild(bullet);
        }
        _self.node.destroy();
    }
    update (dt) {}
}
