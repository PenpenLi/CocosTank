import BattleCtrl from './Page/BattleCatrl';
import WebSocketManage from './WebSocketManage';
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
    private BattleRegion: cc.Node = null;

    private player: cc.Node = null;

    private rotationStatus = 0;
    private moveStatus = 0;
    private BattleCtrl:BattleCtrl = null;
    private WebScoket:WebSocketManage = null;
    start() {
        this.BattleCtrl = this.node.parent.parent.getComponent(BattleCtrl);
        this.WebScoket = cc.find('WebScoket').getComponent(WebSocketManage);
        var self = this;
        this.node.getChildByName('left').on(cc.Node.EventType.TOUCH_START, function (event) {
            self.getPlayer(self.BattleCtrl.playerName);
            self.rotationStatus = 1;
        })
        this.node.getChildByName('left').on(cc.Node.EventType.TOUCH_END, function (event) {
            self.getPlayer(self.BattleCtrl.playerName);
            self.rotationStatus = 0;
        })
        this.node.getChildByName('right').on(cc.Node.EventType.TOUCH_START, function (event) {
            self.getPlayer(self.BattleCtrl.playerName);
            self.rotationStatus = 2;
        })
        this.node.getChildByName('right').on(cc.Node.EventType.TOUCH_END, function (event) {
            self.getPlayer(self.BattleCtrl.playerName);
            self.rotationStatus = 0;
        })
        this.node.getChildByName('up').on(cc.Node.EventType.TOUCH_START, function (event) {
            self.getPlayer(self.BattleCtrl.playerName);
            self.moveStatus = 1;
        })
        this.node.getChildByName('up').on(cc.Node.EventType.TOUCH_END, function (event) {
            self.getPlayer(self.BattleCtrl.playerName);
            self.moveStatus = 0;
        })
        this.node.getChildByName('bottom').on(cc.Node.EventType.TOUCH_START, function (event) {
            self.getPlayer(self.BattleCtrl.playerName);
            self.moveStatus = 2;
        })
        this.node.getChildByName('bottom').on(cc.Node.EventType.TOUCH_END, function (event) {
            self.getPlayer(self.BattleCtrl.playerName);
            self.moveStatus = 0;
        })
    }
    getPlayer(tank) {
        var children = this.BattleRegion.children;
        if (!children) {
            return
        }
        for (let i = 0; i < children.length; i++) {
            if (children[i].getChildByName(tank)) {
                this.player = children[i].getChildByName(tank);
                return;
            }
        }
        console.log(this.player)
    }
    onLoad() {
    }
    update(dt) {
        var self = this;
        if (this.rotationStatus === 1) {
            if (this.player.rotation - 5 < 0) {
                this.player.rotation = 360 - this.player.rotation - 5
            } else {
                this.player.rotation = this.player.rotation - 5
            }
            this.sendTankData()
        }
        if (this.rotationStatus === 2) {
            this.player.rotation = (this.player.rotation + 5) % 360;
            this.sendTankData()
        }
        if (this.moveStatus === 1) {
            var speed = 5;
            this.player.x += speed * Math.sin(Math.PI * this.player.rotation / 180)
            this.player.y += speed * Math.cos(Math.PI * this.player.rotation / 180)
            this.sendTankData()
        }
        if (this.moveStatus === 2) {
            var speed = 5;
            this.player.x -= speed * Math.sin(Math.PI * this.player.rotation / 180)
            this.player.y -= speed * Math.cos(Math.PI * this.player.rotation / 180)
            this.sendTankData()
        }
    }
    sendTankData() {
        let self = this;
        this.WebScoket.sendMessage({
            msg: 22,
            data: {
                tankName: self.BattleCtrl.playerName,
                x: self.player.x,
                y: self.player.y,
                rotation: self.player.rotation
            }
        })
    }
}
