'use strict';

window.app = window.app || {};

// Globally exposed modules
window.app.ui = require('./components/userinterface')();
window.app.socket = require('./components/websocket')('http://tomhumphris.com:8080');
window.app.sampler = require('./components/sampler')('/public');
