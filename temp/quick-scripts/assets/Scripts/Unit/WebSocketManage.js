(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Scripts/Unit/WebSocketManage.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'c388ajcATZPpbzuPQDZar4D', 'WebSocketManage', __filename);
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
        // this.ws = new WebSocket("ws://app.i-mineral.cn/tankWar/echo.do");
        this.ws.onopen = function (event) {
            console.log("服务器已打开");
        };
        this.ws.onerror = function (event) {
            console.log("连接服务器失败", event);
        };
        this.ws.onclose = function (event) {
            console.log("服务器关闭", event);
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
            // 子弹
            // if(response.dataMessage === '3') {
            //     self.TransferClass.fireButtleForOperationCtrl(response);
            // }
            // 死亡
            if (response.dataMessage === '4') {
                self.TransferClass.dieForTankCtrl(response);
            }
            // 重新开始
            if (response.dataMessage === '5') {
                self.TransferClass.restartForBattleCtrl(response);
            }
            // 对方离开房间
            if (response.dataMessage === '6') {
                self.TransferClass.leaveForBattleCtrl(response);
            }
            // 收到道具生成信息
            if (response.dataMessage === '7') {
                self.TransferClass.genteraPropsForBattleCtrl(response);
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
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=WebSocketManage.js.map
        