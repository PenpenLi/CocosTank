(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Scripts/WebSocketManage.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '8aeccTbL45CTogTfRwPMgzA', 'WebSocketManage', __filename);
// Scripts/WebSocketManage.ts

Object.defineProperty(exports, "__esModule", { value: true });
var BattleCatrl_1 = require("./Page/BattleCatrl");
var PlayerOperationCtrl_1 = require("./PlayerOperationCtrl");
var HomePageCtrl_1 = require("./Page/HomePageCtrl");
var MatchingCtrl_1 = require("./Page/MatchingCtrl");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var WebSocketManage = /** @class */ (function (_super) {
    __extends(WebSocketManage, _super);
    function WebSocketManage() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.BattlePage = null;
        _this.Operation = null;
        _this.HomePage = null;
        _this.MatchingPage = null;
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
                self.HomePage = cc.find('Canvas/HomePagePanel');
                self.HomePage.getComponent(HomePageCtrl_1.default).getUserData(response);
            }
            // 生成地图
            if (response.dataMessage === '0') {
                // self.BattlePage = cc.find('Canvas/BattlePagePanel');
                // self.BattlePage.getComponent(BattleCtrl).sendCallBackFor0();
                self.HomePage = cc.find('Canvas/HomePagePanel');
                self.HomePage.getComponent(HomePageCtrl_1.default).enemyUserData = response.enemyData;
                self.MatchingPage = cc.find('Canvas/MatchingPagePanel');
                self.MatchingPage.getComponent(MatchingCtrl_1.default).setBattelData(response);
            }
            // 传输地图
            if (response.dataMessage === '1') {
                self.BattlePage = cc.find('Canvas/BattlePagePanel');
                self.BattlePage.getComponent(BattleCatrl_1.default).sendCallBackFor1(response);
            }
            // 位置联机
            if (response.dataMessage === '2') {
                self.Operation = cc.find('Canvas/BattlePagePanel/BattleBox/operation');
                self.Operation.getComponent(PlayerOperationCtrl_1.default).setOtherTankDataFor2(response);
            }
            if (response.dataMessage === '3') {
                self.Operation = cc.find('Canvas/BattlePagePanel/BattleBox/operation');
                self.Operation.getComponent(PlayerOperationCtrl_1.default).generateReceiveButtle(response);
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
        