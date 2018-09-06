require('libs/weapp-adapter/index');
var Parser = require('libs/xmldom/dom-parser');
window.DOMParser = Parser.DOMParser;
require('libs/wx-downloader.js');
wxDownloader.REMOTE_SERVER_ROOT = "undefined";
wxDownloader.SUBCONTEXT_ROOT = "";
require('src/settings.db449');
require('main.676de');