import BattleCtrl from '../Page/BattleCtrl';
import WebSocketManage from '../Unit/WebSocketManage';
import Bullet3 from './Buttle3Ctrl';
const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
    @property(cc.Prefab)
    private bullet: cc.Prefab = null;
    @property(cc.Prefab)
    private bullet6: cc.Prefab = null;
    @property(cc.Prefab)
    private bullet3: cc.Prefab = null;

    private currentSpecialBullet = null;
    // 战斗区域节点
    private BattleRegion: cc.Node = null;
    // WebSocket节点
    private WebSocket: WebSocketManage = null;
    // 玩家相关数据
    public player = {
        current: {
            node: null,
            actionList: [],
            fireStatus: 0,
            bulletLimit: 0,
            fireRate: 0,
            buttleType: 0
        },
        vice: {
            node: null,
            actionList: [],
            buttleType: 0
        }
    }
    private operationStatus = {
        up: false,
        right: false,
        bottom: false,
        left: false
    }
    start() {
        this.BattleRegion = this.node.parent.getChildByName('BattleRegion');
        this.WebSocket = cc.find('WebScoket').getComponent(WebSocketManage);
        this._onGetPlayerNode(this.BattleRegion.parent.parent.getComponent(BattleCtrl).playerName);
        this._onEventListener();
    }
    update(dt) {
        if (this.operationStatus.up) this.onCurrentOperation(0);
        if (this.operationStatus.right) this.onCurrentOperation(1);
        if (this.operationStatus.bottom) this.onCurrentOperation(2);
        if (this.operationStatus.left) this.onCurrentOperation(3);
        if (this.player.current.fireStatus === 1) {
            this.bulletLimit(0, 5, 0);
            this.player.current.fireStatus = 0;
        }
        // 加特林模式控制速率及偏移角度随机
        if (this.player.current.fireStatus === 2 && this.player.current.fireRate % 5 === 0) {
            this.bulletLimit(1, 20, 8 - Math.random() * 16);
        }
        this.player.current.fireRate++;
        this.onViceOperation()
    }
    // 当前玩家移动操作
    onCurrentOperation(type) {
        var speed = 5;
        switch (type) {
            case 0:
                this.player.current.node.x += speed * Math.sin(Math.PI * this.player.current.node.rotation / 180);
                this.player.current.node.y += speed * Math.cos(Math.PI * this.player.current.node.rotation / 180);
                break;
            case 1:
                this.player.current.node.rotation = (this.player.current.node.rotation + 5) % 360;
                break;
            case 2:
                this.player.current.node.x -= speed * Math.sin(Math.PI * this.player.current.node.rotation / 180);
                this.player.current.node.y -= speed * Math.cos(Math.PI * this.player.current.node.rotation / 180);
                break;
            case 3:
                this.player.current.node.rotation - 5 < 0 ?
                    this.player.current.node.rotation = 360 - this.player.current.node.rotation - 5 :
                    this.player.current.node.rotation -= 5;
                break;
        }
        this.sendOperationData({
            type: 0,
            x: this.player.current.node.x,
            y: this.player.current.node.y,
            rotation: this.player.current.node.rotation
        })
    }
    // 将自身操作信息发送给对方
    sendOperationData(data) {
        this.player.current.actionList.push(data);
        this.WebSocket.sendMessage({
            msg: 22,
            data: this.player.current.actionList
        })
        this.player.current.actionList = [];
    }
    // 根据对方玩家操作队列依次改变对方玩家位置
    onViceOperation() {
        if (this.player.vice.actionList.length === 0) return;
        for (let i = 0; i < this.player.vice.actionList.length; i++) {
            if (this.player.vice.actionList[0] && this.player.vice.actionList[0].type === 0) {
                this.player.vice.node.x = this.player.vice.actionList[0].x;
                this.player.vice.node.y = this.player.vice.actionList[0].y;
                this.player.vice.node.rotation = this.player.vice.actionList[0].rotation;
                this.player.vice.actionList.splice(0, 1);
            }
            if (this.player.vice.actionList[0] && this.player.vice.actionList[0].type === 1) {
                var bullet = this.generateBullet(this.player.vice.actionList[0], 1)
                this.player.vice.node.parent.addChild(bullet);
                this.player.vice.actionList.splice(0, 1);
            }
        }
    }
    // 获取当前玩家节点以及敌方玩家节点
    _onGetPlayerNode(mainNodeName) {
        var viceNodeName = 'tank_1';
        if (mainNodeName === 'tank_1') {
            viceNodeName = 'tank_2'
        }
        var children = this.BattleRegion.children;
        if (!children) return;
        for (let i = 0; i < children.length; i++) {
            if (children[i].getChildByName(mainNodeName)) {
                this.player.current.node = children[i].getChildByName(mainNodeName);
            }
            if (children[i].getChildByName(viceNodeName)) {
                this.player.vice.node = children[i].getChildByName(viceNodeName);
            }
            if (this.player.current.node && this.player.vice.node) {
                return
            }
        }
    }
    // 事件监听注册
    _onEventListener() {
        this._onMoveListener(this.node.getChildByName('left'), 'left');
        this._onMoveListener(this.node.getChildByName('right'), 'right');
        this._onMoveListener(this.node.getChildByName('bottom'), 'bottom');
        this._onMoveListener(this.node.getChildByName('up'), 'up');
        this._onFireListener();
    }
    // 移动事件注册
    _onMoveListener(node: cc.Node, moveType) {
        var _self = this;
        node.on(cc.Node.EventType.TOUCH_START, function (event) {
            _self.operationStatus[moveType] = true
        })
        node.on(cc.Node.EventType.TOUCH_END, function (event) {
            _self.operationStatus[moveType] = false
        })
        node.on(cc.Node.EventType.TOUCH_CANCEL, function (event) {
            _self.operationStatus[moveType] = false
        })
    }
    // 发射事件注册
    _onFireListener() {
        var _self = this;
        var node = this.node.getChildByName('fire');
        node.on(cc.Node.EventType.TOUCH_START, function (event) {
            // 普通炮弹类型
            if (_self.player.current.buttleType === 0) {
                _self.player.current.fireStatus = 1;
            } else if (_self.player.current.buttleType === 1) { // 加特林道具
                _self.player.current.fireStatus = 2;
            } else if (_self.player.current.buttleType === 6) { // 地雷
                var bullet = _self.generateBullet({
                    name: `tank_buttle_${_self.player.current.node.name.substring(5, 6)}_${_self.player.current.bulletLimit}`,
                    bulletType: 6,
                    scale: _self.player.current.node.scale,
                    rotation: _self.player.current.node.rotation,
                    x: _self.player.current.node.x,
                    y: _self.player.current.node.y
                }, 0);
                _self.sendOperationData({
                    type: 1,
                    bulletType: 6,
                    name: bullet.name,
                    scale: bullet.scale,
                    x: bullet.x,
                    y: bullet.y,
                    rotation: bullet.rotation
                });
                _self.player.current.node.parent.addChild(bullet);
            } else if(_self.player.current.buttleType === 3) { // 重弹
                var point = _self.bulletLocation();
                var bullet = _self.generateBullet({
                    name: `tank_buttle3`,
                    bulletType: 3,
                    scale: _self.player.current.node.scale,
                    rotation: _self.player.current.node.rotation,
                    x: point.x,
                    y: point.y
                }, 0)
                _self.currentSpecialBullet = bullet.getComponent(Bullet3);
                _self.player.current.buttleType = 31;
                _self.sendOperationData({
                    type: 1,
                    bulletType: 3,
                    name: bullet.name,
                    scale: bullet.scale,
                    x: bullet.x,
                    y: bullet.y,
                    rotation: bullet.rotation
                });
                _self.player.current.node.parent.addChild(bullet);
            } else if(_self.player.current.buttleType === 31) {
                _self.currentSpecialBullet.boom();
            }
        })
        node.on(cc.Node.EventType.TOUCH_END, function (event) {
            _self.player.current.fireStatus = 0
        })
        node.on(cc.Node.EventType.TOUCH_CANCEL, function (event) {
            _self.player.current.fireStatus = 0
        })
    }
    // 子弹发射出口生成位置计算
    bulletLocation() {
        var centerX = this.player.current.node.x;
        var CenterY = this.player.current.node.y;
        var buttleX = centerX;
        var buttleY = CenterY + this.player.current.node.height * this.player.current.node.scale / 2;
        var x = (buttleY - CenterY) * Math.sin(Math.PI * this.player.current.node.rotation / 180) + centerX;
        var y = (buttleY - CenterY) * Math.cos(Math.PI * this.player.current.node.rotation / 180) + (buttleX - centerX) * Math.sin(Math.PI * this.player.current.node.rotation / 180) + CenterY;
        return {
            x: x,
            y: y
        }
    }
    /**
     * data: 自带属性
     * type: 0为我方生成否则为敌方生成
     */
    public generateBullet(data, type) {
        var bullet: cc.Node;
        if (data.bulletType === 1 || data.bulletType === 0) {
            bullet = cc.instantiate(this.bullet);
            bullet.setPosition(data.x, data.y);
        }
        if (data.bulletType === 6) {
            if (type === 0) {
                bullet = cc.instantiate(this.bullet6);
                bullet.setPosition(this.player.current.node.x, this.player.current.node.y);
            } else {
                bullet = cc.instantiate(this.bullet6);
                bullet.setPosition(this.player.vice.node.x, this.player.vice.node.y);
            }
        }
        if(data.bulletType === 3) {
            bullet = cc.instantiate(this.bullet3);
            bullet.setPosition(data.x, data.y);
        }
        bullet.name = data.name;
        bullet.scale = data.scale;
        bullet.rotation = data.rotation;
        return bullet;
    }
    // 子弹数量控制
    bulletLimit(bulletType, maxNumber, offset) {
        var len = 0;
        this.player.current.node.parent.children.map((node) => {
            if (node.name.length > 11) {
                len++;
            }
        })
        if (len < maxNumber) {
            this.player.current.bulletLimit = (this.player.current.bulletLimit + 1) % maxNumber;
            var point = this.bulletLocation();
            var data = {
                name: `tank_buttle_${this.player.current.node.name.substring(5, 6)}_${this.player.current.bulletLimit}`,
                bulletType: bulletType,
                scale: this.player.current.node.scale,
                rotation: this.player.current.node.rotation + offset,
                x: point.x,
                y: point.y
            }
            var bullet = this.generateBullet(data, 0);
            this.player.current.node.parent.addChild(bullet);
            this.sendOperationData({
                type: 1,
                bulletType: bulletType,
                name: bullet.name,
                scale: bullet.scale,
                x: bullet.x,
                y: bullet.y,
                rotation: bullet.rotation
            })
        }
    }
    // 获取对方玩家操作信息添加到操作队列中
    public getViceOperationData(res) {
        this.player.vice.actionList.push(res.data[0]);
    }
}