import Transfer from './TransferClass';
const { ccclass, property } = cc._decorator;
@ccclass
export default class WebSocketManage extends cc.Component {
    public ws: WebSocket;
    // 事件处理中转对象
    private TransferClass = new Transfer();

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
                self.TransferClass.getUserDataForHomePageCtrl(response);
            }
            // 生成地图
            if(response.dataMessage === '0') {
                self.TransferClass.generateMapForHomePageCtrl(response);
            }
            // 传输地图
            if(response.dataMessage === '1') {
                self.TransferClass.getMapForBattlePageCtrl(response);
            }
            // 位置联机
            if(response.dataMessage === '2') {
                self.TransferClass.positionUnicomForOperationCtrl(response);
            }
            if(response.dataMessage === '3') {
                self.TransferClass.fireButtleForOperationCtrl(response);
            }
            if(response.dataMessage === 'selfToSelf') {
                self.TransferClass.selfToSelfForOperationCtrl(response);
            }
        };

    }
    public sendMessage(JSONmessage) {
        let message = JSON.stringify(JSONmessage);
        //发送消息
        this.ws.send(message);
    }
}
