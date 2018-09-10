"use strict";
cc._RF.push(module, 'c388ajcATZPpbzuPQDZar4D', 'WebSocketManage');
// Scripts/Unit/WebSocketManage.ts

Object.defineProperty(exports, "__esModule", { value: true });
var TransferClass_1 = require("./TransferClass");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var WebSocketManage = /** @class */ (function (_super) {
    __extends(WebSocketManage, _super);
    function WebSocketManage() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // 事件处理中转对象
        _this.TransferClass = new TransferClass_1.default();
        return _this;
    }
    WebSocketManage.prototype.start = function () {
        var self = this;
        this.ws = new WebSocket("ws://172.17.0.13:8080/tankWar/echo.do");
        // this.ws = new WebSocket("ws://app.ei-marketing.net/tankWar/echo.do");
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
            // console.log('接受消息，当前执行回调函数=>', self.callbackObj)
            // if (self.callbackObj != null) {
            //     self.callbackObj(event)
            // }
            var response = JSON.parse(event.data);
            if (response.dataMessage === '-1') {
                self.TransferClass.getUserDataForHomePageCtrl(response);
            }
            // 生成地图
            if (response.dataMessage === '0') {
                self.TransferClass.generateMapForHomePageCtrl(response);
            }
            // 传输地图
            if (response.dataMessage === '1') {
                self.TransferClass.getMapForBattlePageCtrl(response);
            }
            // 位置联机
            if (response.dataMessage === '2') {
                self.TransferClass.positionUnicomForOperationCtrl(response);
            }
            if (response.dataMessage === '3') {
                self.TransferClass.fireButtleForOperationCtrl(response);
            }
            if (response.dataMessage === 'selfToSelf') {
                self.TransferClass.selfToSelfForOperationCtrl(response);
            }
        };
    };
    WebSocketManage.prototype.sendMessage = function (JSONmessage) {
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