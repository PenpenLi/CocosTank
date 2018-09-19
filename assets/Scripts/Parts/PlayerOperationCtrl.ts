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
    private BattleRegion: cc.Node = null;
    @property(cc.Prefab)
    private Buttle: cc.Prefab = null;
    @property(cc.Prefab)
    private Buttle6: cc.Prefab = null;

    // 当前玩家控制节点
    private currentPlayer: cc.Node = null;
    private vicePlayer: cc.Node = null;
    // 旋转状态控制
    private rotationStatus = 0;
    // 移动状态控制
    private moveStatus = 0;
    // 战斗区域脚本
    private BattleCtrl: BattleCtrl = null;
    // webScoket脚本
    private WebScoket: WebSocketManage = null;

    private mainActionList = [];
    private viceActionList = [];
    private currentPlayerKeyBord = {
        top: false,
        right: false,
        bottom: false,
        left: false
    }

    // 子弹类型
    private buttleType = 6;

    private buttle1Status = false;
    // 用于控制坦克子弹的生成控制
    private i = 0;
    private Density = 0;
    start() {
        this.BattleRegion = this.node.parent.getChildByName('BattleRegion');
        this.BattleCtrl = this.node.parent.parent.getComponent(BattleCtrl);
        this.getPlayer(this.BattleCtrl.playerName);
        this.WebScoket = cc.find('WebScoket').getComponent(WebSocketManage);
        this.onEventListener();
    }

    update(dt) {
        if (this.buttle1Status) {
            this.Density++;
            if (this.Density % 5 === 0) {
                this.i++;
                var len = 0;
                this.currentPlayer.parent.children.map((node) => {
                    if (node.name.length > 11) {
                        len++;
                    }
                })
                if (len < 20) {
                    this.generateBullet(`tank_buttle_${this.currentPlayer.name.substring(5, 6)}_${this.i}`, 5 - Math.random() * 10 >> 0)
                }
            }
        }
        this.Density++;
        if (this.currentPlayerKeyBord.left) {
            if (this.currentPlayer.rotation - 5 < 0) {
                this.currentPlayer.rotation = 360 - this.currentPlayer.rotation - 5;
            } else {
                this.currentPlayer.rotation = this.currentPlayer.rotation - 5;
            }
            this.sendTankData()
        }
        if (this.currentPlayerKeyBord.right) {
            this.currentPlayer.rotation = (this.currentPlayer.rotation + 5) % 360;
            this.sendTankData()
        }
        if (this.currentPlayerKeyBord.top) {
            var speed = 5;
            this.currentPlayer.x += speed * Math.sin(Math.PI * this.currentPlayer.rotation / 180)
            this.currentPlayer.y += speed * Math.cos(Math.PI * this.currentPlayer.rotation / 180)
            this.sendTankData()
        }
        if (this.currentPlayerKeyBord.bottom) {
            var speed = 5;
            this.currentPlayer.x -= speed * Math.sin(Math.PI * this.currentPlayer.rotation / 180)
            this.currentPlayer.y -= speed * Math.cos(Math.PI * this.currentPlayer.rotation / 180)
            this.sendTankData()
        }
        if (this.viceActionList.length !== 0) {
            // 位置联调
            for (let i = 0; i < this.viceActionList.length; i++) {
                if (this.viceActionList[0] && this.viceActionList[0].type === 0) {
                    this.vicePlayer.x = this.viceActionList[0].x;
                    this.vicePlayer.y = this.viceActionList[0].y;
                    this.vicePlayer.rotation = this.viceActionList[0].rotation;
                    this.viceActionList.splice(0, 1);
                } else if (this.viceActionList[0].type === 1) { // 子弹发射
                    this.generateReceiveButtle(this.viceActionList[0])
                    this.viceActionList.splice(0, 1);
                }
            }
        }
    }
    onEventListener() {
        var self = this;
        this.node.getChildByName('left').on(cc.Node.EventType.TOUCH_START, function (event) {
            self.currentPlayerKeyBord.left = true;
        })
        this.node.getChildByName('left').on(cc.Node.EventType.TOUCH_END, function (event) {
            self.currentPlayerKeyBord.left = false;
        })
        this.node.getChildByName('left').on(cc.Node.EventType.TOUCH_CANCEL, function (event) {
            self.currentPlayerKeyBord.left = false;
        })
        this.node.getChildByName('right').on(cc.Node.EventType.TOUCH_START, function (event) {
            self.currentPlayerKeyBord.right = true;
        })
        this.node.getChildByName('right').on(cc.Node.EventType.TOUCH_CANCEL, function (event) {
            self.currentPlayerKeyBord.right = false;
        })
        this.node.getChildByName('right').on(cc.Node.EventType.TOUCH_END, function (event) {
            self.currentPlayerKeyBord.right = false;
        })
        this.node.getChildByName('up').on(cc.Node.EventType.TOUCH_START, function (event) {
            self.currentPlayerKeyBord.top = true;
        })
        this.node.getChildByName('up').on(cc.Node.EventType.TOUCH_CANCEL, function (event) {
            self.currentPlayerKeyBord.top = false;
        })
        this.node.getChildByName('up').on(cc.Node.EventType.TOUCH_END, function (event) {
            self.currentPlayerKeyBord.top = false;
        })
        this.node.getChildByName('bottom').on(cc.Node.EventType.TOUCH_START, function (event) {
            self.currentPlayerKeyBord.bottom = true;
        })
        this.node.getChildByName('bottom').on(cc.Node.EventType.TOUCH_CANCEL, function (event) {
            self.currentPlayerKeyBord.bottom = false;
        })
        this.node.getChildByName('bottom').on(cc.Node.EventType.TOUCH_END, function (event) {
            self.currentPlayerKeyBord.bottom = false;
        })
        if (this.buttleType === 0) {
            this.node.getChildByName('fire').on(cc.Node.EventType.TOUCH_START, function (event) {
                var len = 0;
                self.currentPlayer.parent.children.map((node) => {
                    if (node.name.length > 11) {
                        len++;
                    }
                })
                if (len < 5) {
                    self.i = (self.i + 1) % 5;
                    self.generateBullet(`tank_buttle_${self.currentPlayer.name.substring(5, 6)}_${self.i}`, 0)
                }
            })
        }
        if (this.buttleType === 6) {
            this.node.getChildByName('fire').on(cc.Node.EventType.TOUCH_START, function (event) {
                var buttle = cc.instantiate(self.Buttle6);
                buttle.name = 'tank_buttle6_'
                buttle.scale = self.currentPlayer.scale;
                buttle.rotation = self.currentPlayer.rotation;
                buttle.zIndex = -1;
                buttle.setPosition(self.currentPlayer.x, self.currentPlayer.y);
                self.currentPlayer.parent.addChild(buttle);
            })
        }
        if (this.buttleType === 1) {
            this.node.getChildByName('fire').on(cc.Node.EventType.TOUCH_START, function (event) {
                self.buttle1Status = true;
            })
            this.node.getChildByName('fire').on(cc.Node.EventType.TOUCH_END, function (event) {
                self.buttle1Status = false;
            })
            this.node.getChildByName('fire').on(cc.Node.EventType.TOUCH_CANCEL, function (event) {
                self.buttle1Status = false;
            })
        }
    }
    // 子弹生成
    generateBullet(name, offset) {
        var buttle = cc.instantiate(this.Buttle);
        buttle.name = name
        buttle.scale = this.currentPlayer.scale;
        buttle.rotation = this.currentPlayer.rotation + offset;
        buttle.zIndex = -1;
        var centerPointx = this.currentPlayer.x;
        var centerPointy = this.currentPlayer.y;
        var buttleX = this.currentPlayer.x;
        var buttleY = this.currentPlayer.y + this.currentPlayer.height * this.currentPlayer.scale / 2;
        var x = (buttleY - centerPointy) * Math.sin(Math.PI * this.currentPlayer.rotation + offset / 180) + centerPointx;
        var y = (buttleY - centerPointy) * Math.cos(Math.PI * this.currentPlayer.rotation + offset / 180) + (buttleX - centerPointx) * Math.sin(Math.PI * this.currentPlayer.rotation + offset / 180) + centerPointy;
        buttle.setPosition(x, y)
        this.currentPlayer.parent.addChild(buttle);
        this.mainActionList.push({
            type: 1,
            buttleName: buttle.name,
            scale: this.currentPlayer.scale,
            x: x,
            y: y,
            rotation: this.currentPlayer.rotation + offset
        })

        this.WebScoket.sendMessage({
            msg: 22,
            data: this.mainActionList
        })
        this.mainActionList = []
    }
    generateReceiveButtle(response) {
        var buttle = cc.instantiate(this.Buttle);
        buttle.name = response.buttleName;
        buttle.scale = response.scale;
        buttle.rotation = response.rotation;
        buttle.setPosition(response.x, response.y);
        this.vicePlayer.parent.addChild(buttle);
    }
    // 得到对面子弹生成信息，添加到我方区域
    public addReceiveButtle(response) {
        this.viceActionList.push(response)
    }
    // 获得玩家信息
    getPlayer(mainTank) {
        var viceTank = 'tank_1'
        if (mainTank === 'tank_1') {
            viceTank = 'tank_2'
        }
        var children = this.BattleRegion.children;
        if (!children) {
            return
        }
        for (let i = 0; i < children.length; i++) {
            if (children[i].getChildByName(mainTank)) {
                this.currentPlayer = children[i].getChildByName(mainTank);
            }
            if (children[i].getChildByName(viceTank)) {
                this.vicePlayer = children[i].getChildByName(viceTank)
            }
            if (this.currentPlayer && this.vicePlayer) {
                return
            }
        }
    }
    sendTankData() {
        this.mainActionList.push({
            type: 0,
            x: this.currentPlayer.x,
            y: this.currentPlayer.y,
            rotation: this.currentPlayer.rotation
        })
        if (this.mainActionList.length > 0) {
            this.WebScoket.sendMessage({
                msg: 22,
                data: this.mainActionList
            })
            this.mainActionList = []
        }
    }
    public setOtherTankDataFor2(response) {
        for (let i = 0; i < response.data.length; i++) {
            this.viceActionList.push(response.data[i])
        }
    }
}
