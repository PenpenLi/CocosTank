import WebSocketManage from '../WebSocketManage';
// Learn TypeScript:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/typescript/index.html
// Learn Attribute:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/reference/attributes/index.html
// Learn life-cycle callbacks:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/life-cycle-callbacks/index.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
    @property (cc.Node)
    private userName: cc.Node = null;
    @property (cc.Node)
    private WebScoketNode: cc.Node = null;
    @property (cc.Prefab)
    private BattlePage: cc.Node = null;
    start () {

    }
    onLogin() {
        var userName = this.userName.getComponent(cc.EditBox).string;
        var webscoket = this.WebScoketNode.getComponent(WebSocketManage);
        webscoket.sendMessage({name: userName});
        var battlePage = cc.instantiate(this.BattlePage);
        battlePage.parent = this.node.parent;
        this.enabled = false;
    }
}
