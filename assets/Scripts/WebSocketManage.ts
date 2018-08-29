const { ccclass, property } = cc._decorator;
@ccclass
export default class WebSocketManage extends cc.Component {
    public ws: WebSocket;
    public callbackObj: any;
    public funName: string;
    start() {
        let self = this;
        this.ws = new WebSocket("ws://172.17.0.13:8080/tankWar/echo.do");
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
            if (self.callbackObj != null) {
                self.callbackObj(event)
            }
        };

    }
    // public sendMessage(JSONmessage) {
    //     let message = JSON.stringify(JSONmessage);
    //     this.ws.send(message);
    // }
    /**
     * 
     * @param JSONmessage 消息内容
     * @param callbackObj 回调对象
     * @param funName 回调方法名
     */
    public sendMessage(JSONmessage, callbackObj: Object = null) {
        //获得回调对象和回调方法名
        this.callbackObj =  callbackObj;
        //转为字符串
        let message = JSON.stringify(JSONmessage);
        //发送消息
        this.ws.send(message);
    }
}
