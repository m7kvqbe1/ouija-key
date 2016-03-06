'use strict';

var app = app || {};

require('./components/userinterface');
var socket = require('./components/websocket');
var sampler = require('./components/sampler');

app.socket = new socket('http://tomhumphris.com:8080');
app.sampler = new sampler('/public');