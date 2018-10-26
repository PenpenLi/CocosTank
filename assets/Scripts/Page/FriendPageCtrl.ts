import WebSocketMange from '../Unit/WebSocketManage';
import HomePageCtrl from '../Page/HomePageCtrl';
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

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
    @property(cc.Prefab)
    private BattlePage: cc.Prefab = null;
    private HomePageCtrl: HomePageCtrl = null;
    private WebSocket: WebSocketMange = null;
    private roomNumber = '';

    private currentPlayer = true;
    private player = {
        // 主玩家
        main: {
            headImgNode: null,
            nickNameNode: null,
        },
        // 副玩家
        vice: {
            headImgNode: null,
            nickNameNode: null,
        }
    }
    start() {
        this.WebSocket = cc.find('WebScoket').getComponent(WebSocketMange);
        this.WebSocket.sendMessage({
            msg: 4
        })
    }
    public init(type) {
        var _self = this;
        this.player.main.headImgNode = this.node.getChildByName('Player').getChildByName('player1').getChildByName('Mask').getChildByName('headImg');
        this.player.main.nickNameNode = this.node.getChildByName('Player').getChildByName('player1').getChildByName('nickname');
        this.player.vice.headImgNode = this.node.getChildByName('Player').getChildByName('player2').getChildByName('Mask').getChildByName('headImg');
        this.player.vice.nickNameNode = this.node.getChildByName('Player').getChildByName('player2').getChildByName('nickname');
        this.HomePageCtrl = cc.find('Canvas/HomePagePanel').getComponent(HomePageCtrl);
        // 创建房间
        if(type === 0) {
            var userInfo = this.HomePageCtrl.userInfo;
            this.player.main.nickNameNode.getComponent(cc.Label).string = userInfo.nickname;
            cc.loader.load({url: userInfo.headimgurl, type: 'png'}, function(err, texture) {
                _self.player.main.headImgNode.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(texture);
            })
        }
        // 房主获取对方信息
        if(type === 1) {
            var viceuserInfo = this.HomePageCtrl.viceUserInfo;
            this.player.vice.nickNameNode.getComponent(cc.Label).string = viceuserInfo.nickname;
            cc.loader.load({url: viceuserInfo.headimgurl, type: 'png'}, function(err, texture) {
                _self.player.vice.headImgNode.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(texture);
            })
        }
        // 被邀请玩家进入房间
        if(type === 2) {
            this.currentPlayer = false;
            var userInfo = this.HomePageCtrl.userInfo;
            this.player.vice.nickNameNode.getComponent(cc.Label).string = userInfo.nickname;
            cc.loader.load({url: userInfo.headimgurl, type: 'png'}, function(err, texture) {
                _self.player.vice.headImgNode.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(texture);
            })
            this.node.getChildByName('ButtonBox').getChildByName('button_4').active = false;
            var viceuserInfo = this.HomePageCtrl.viceUserInfo;
            this.player.main.nickNameNode.getComponent(cc.Label).string = viceuserInfo.nickname;
            cc.loader.load({url: viceuserInfo.headimgurl, type: 'png'}, function(err, texture) {
                _self.player.main.headImgNode.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(texture);
            })
        }
    }
    onShare() {
        if(this.roomNumber === '') {
            return
        }
        wx.shareAppMessage({
            title: '坦克大战',
            query: `room=${this.roomNumber}`,
            success: function (res) {
                console.log(wx.getLaunchOptionsSync())
            },
            fail: function (res) {
                console.log(res, 'error')
            }
        })
    }
    onBack() {
        this.WebSocket.sendMessage({
            msg: '5'
        })
        this.node.destroy();
    }
    onClickStart() {
        this.WebSocket.sendMessage({
            msg: '211'
        })
        var battlePage = cc.instantiate(this.BattlePage);
        battlePage.parent = this.node.parent;
        battlePage.getComponent(BattleCtrl).initScore(0);
        battlePage.getComponent(BattleCtrl).generateMap();
        this.node.destroy();
    }
    public getOnClickStart() {
        var battlePage = cc.instantiate(this.BattlePage);
        battlePage.parent = this.node.parent;
        battlePage.getComponent(BattleCtrl).initScore(1);
        this.node.destroy();
    }
    // update (dt) {}
    public getRoomNumber(res) {
        this.roomNumber = res.data;
    }
}
