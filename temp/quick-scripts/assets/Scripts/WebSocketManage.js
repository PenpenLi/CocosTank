(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Scripts/WebSocketManage.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '8aeccTbL45CTogTfRwPMgzA', 'WebSocketManage', __filename);
// Scripts/WebSocketManage.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var WebSocketManage = /** @class */ (function (_super) {
    __extends(WebSocketManage, _super);
    function WebSocketManage() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    WebSocketManage.prototype.start = function () {
        this.ws = new WebSocket("ws://172.17.0.13:8080/tankWar/websocket.do");
        this.ws.onopen = function (event) {
            console.log("服务器已打开");
        };
        this.ws.onerror = function (event) {
            console.log("连接服务器失败");
        };
        this.ws.onclose = function (event) {
            console.log("服务器关闭");
        };
        var that = this;
        //监听消息接收
        this.ws.onmessage = function (event) {
            if (that.callbackObj != null) {
                eval("that.callbackObj." + that.funName + "(event.data)");
            }
        };
    };
    /**
     *
     * @param JSONmessage 消息内容
     * @param callbackObj 回调对象
     * @param funName 回调方法名
     */
    WebSocketManage.prototype.sendMessage = function (JSONmessage, callbackObj, funName) {
        if (callbackObj === void 0) { callbackObj = null; }
        if (funName === void 0) { funName = null; }
        //获得回调对象和回调方法名
        this.callbackObj = callbackObj;
        this.funName = funName;
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
        