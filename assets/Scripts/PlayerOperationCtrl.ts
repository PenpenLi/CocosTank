import BattleCtrl from './BattleCatrl';
import { PositionType, Rect } from '../../creator';
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
    @property(cc.Node)
    BattleRegion: cc.Node = null;

    player: cc.Node = null;

    rotationStatus = 0;
    moveStatus = 0;
    start() {
        this.getPlayer();
        var self = this;
        this.node.getChildByName('left').on(cc.Node.EventType.TOUCH_START, function (event) {
            self.rotationStatus = 1;
        })
        this.node.getChildByName('left').on(cc.Node.EventType.TOUCH_END, function (event) {
            self.rotationStatus = 0;
        })
        this.node.getChildByName('right').on(cc.Node.EventType.TOUCH_START, function (event) {
            self.rotationStatus = 2;
        })
        this.node.getChildByName('right').on(cc.Node.EventType.TOUCH_END, function (event) {
            self.rotationStatus = 0;
        })
        this.node.getChildByName('up').on(cc.Node.EventType.TOUCH_START, function (event) {
            self.moveStatus = 1;
        })
        this.node.getChildByName('up').on(cc.Node.EventType.TOUCH_END, function (event) {
            self.moveStatus = 0;
        })
        this.node.getChildByName('bottom').on(cc.Node.EventType.TOUCH_START, function (event) {
            self.moveStatus = 2;
        })
        this.node.getChildByName('bottom').on(cc.Node.EventType.TOUCH_END, function (event) {
            self.moveStatus = 0;
        })
    }
    getPlayer() {
        var children = this.BattleRegion.children;
        for (let i = 0; i < children.length; i++) {
            if (children[i].getChildByName('tank_1')) {
                this.player = children[i].getChildByName('tank_1');
                return;
            }
        }
    }
    onLoad() {
    }
    update(dt) {
        if (this.rotationStatus === 1) {
            if (this.player.rotation - 5 < 0) {
                this.player.rotation = 360 - this.player.rotation - 5
            } else {
                this.player.rotation = this.player.rotation - 5
            }
        }
        if (this.rotationStatus === 2) {
            this.player.rotation = (this.player.rotation + 5) % 360;
        }
        if (this.moveStatus === 1) {
            var speed = 5;
            this.player.x += speed * Math.sin(Math.PI * this.player.rotation / 180)
            this.player.y += speed * Math.cos(Math.PI * this.player.rotation / 180)
        }
        if (this.moveStatus === 2) {
            var speed = 5;
            this.player.x -= speed * Math.sin(Math.PI * this.player.rotation / 180)
            this.player.y -= speed * Math.cos(Math.PI * this.player.rotation / 180)
        }
    }
}
