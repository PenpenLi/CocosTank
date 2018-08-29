"use strict";
cc._RF.push(module, '8aeccTbL45CTogTfRwPMgzA', 'WebSocketManage');
// Scripts/WebSocketManage.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var WebSocketManage = /** @class */ (function (_super) {
    __extends(WebSocketManage, _super);
    function WebSocketManage() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    WebSocketManage.prototype.start = function () {
        var self = this;
        this.ws = new WebSocket("ws://172.17.0.13:8080/tankWar/echo.do");
        this.ws.onopen = function (event) {
            console.log("服务器已打开");
        };
        this.ws.onerror = function (event) {
            console.log("连接服务器失败");
        };
        this.ws.onclose = function (event) {
            console.log("服务器关闭");
        };
        // 监听消息接收
        this.ws.onmessage = function (event) {
            if (self.callbackObj != null) {
                self.callbackObj(event);
            }
        };
    };
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
    WebSocketManage.prototype.sendMessage = function (JSONmessage, callbackObj) {
        if (callbackObj === void 0) { callbackObj = null; }
        //获得回调对象和回调方法名
        this.callbackObj = callbackObj;
        //转为字符串
        var message = JSON.stringify(JSONmessage);
        //发送消息
        this.ws.send(message);
    };
    WebSocketManage = __decorate([
        ccclass
    ], WebSocketManage);
    return WebSocketManage;
}(cc.Component));
exports.default = WebSocketManage;

cc._RF.pop();