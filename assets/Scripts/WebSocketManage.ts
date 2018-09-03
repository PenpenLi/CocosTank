import BattleCtrl from './Page/BattleCatrl';
import PlayerOperationCtrl from './PlayerOperationCtrl'
import HomePageCtrl from './Page/HomePageCtrl'
import MatchingCtrl from './Page/MatchingCtrl'
const { ccclass, property } = cc._decorator;
@ccclass
export default class WebSocketManage extends cc.Component {
    public ws: WebSocket;
    public callbackObj: any;
    public funName: string;

    private BattlePage: cc.Node = null;
    private Operation: cc.Node = null;
    private HomePage: cc.Node = null;
    private MatchingPage: cc.Node =null;
    start() {
        let self = this;
        this.ws = new WebSocket("ws://172.17.0.13:8080/tankWar/echo.do");
        // this.ws = new WebSocket("ws://app.ei-marketing.net/tankWar/echo.do");
        this.ws.onopen = function (event) {
            console.log("服务器已打开");
        }
        this.ws.onerror = function (event) {
            console.log("连接服务器失败");
        };
        this.ws.onclose = function (event) {
            console.log("服务器关闭");
        };
        // 监听消息接收
        this.ws.onmessage = function (event) {
            // console.log('接受消息，当前执行回调函数=>', self.callbackObj)
            // if (self.callbackObj != null) {
            //     self.callbackObj(event)
            // }
            var response = JSON.parse(event.data)
            if(response.dataMessage === '-1') {
                self.HomePage = cc.find('Canvas/HomePagePanel');
                self.HomePage.getComponent(HomePageCtrl).getUserData(response);
            }
            // 生成地图
            if(response.dataMessage === '0') {
                // self.BattlePage = cc.find('Canvas/BattlePagePanel');
                // self.BattlePage.getComponent(BattleCtrl).sendCallBackFor0();
                self.HomePage = cc.find('Canvas/HomePagePanel');
                self.HomePage.getComponent(HomePageCtrl).enemyUserData = response.enemyData;
                self.MatchingPage = cc.find('Canvas/MatchingPagePanel');
                self.MatchingPage.getComponent(MatchingCtrl).setBattelData(response);
            }
            // 传输地图
            if(response.dataMessage === '1') {
                self.BattlePage = cc.find('Canvas/BattlePagePanel')
                self.BattlePage.getComponent(BattleCtrl).sendCallBackFor1(response)
            }
            // 位置联机
            if(response.dataMessage === '2') {
                self.Operation = cc.find('Canvas/BattlePagePanel/BattleBox/operation')
                self.Operation.getComponent(PlayerOperationCtrl).setOtherTankDataFor2(response);
            }
            if(response.dataMessage === '3') {
                self.Operation = cc.find('Canvas/BattlePagePanel/BattleBox/operation')
                self.Operation.getComponent(PlayerOperationCtrl).generateReceiveButtle(response);
            }   
        };

    }
    public sendMessage(JSONmessage) {
        let message = JSON.stringify(JSONmessage);
        //发送消息
        this.ws.send(message);
    }
}
