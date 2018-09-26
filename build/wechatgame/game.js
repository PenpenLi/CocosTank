require('libs/weapp-adapter/index');
var Parser = require('libs/xmldom/dom-parser');
window.DOMParser = Parser.DOMParser;
require('libs/wx-downloader.js');
wxDownloader.REMOTE_SERVER_ROOT = "http://app.ei-marketing.net/Tank_resources";
wxDownloader.SUBCONTEXT_ROOT = "";
require('src/settings.195d4');
require('main.79b8b');