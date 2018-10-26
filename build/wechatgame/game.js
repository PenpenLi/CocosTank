require('libs/weapp-adapter/index');
var Parser = require('libs/xmldom/dom-parser');
window.DOMParser = Parser.DOMParser;
require('libs/wx-downloader.js');
wxDownloader.REMOTE_SERVER_ROOT = "http://app.ei-marketing.net/Tank_resources";
wxDownloader.SUBCONTEXT_ROOT = "";
require('src/settings.dafaf');
require('main.79f07');