// Load modules

var Hapi = require('../../../lib');


// Declare internals

var internals = {};


var handler = function (request) {

    request.reply.view('basic/index', {
        title: 'examples/views/handlebars/basic.js | Hapi ' + Hapi.utils.version(),
        message: 'Hello World!'
    }).send();
};


internals.main = function () {

    var options = {
        views: {
            path: __dirname + '/templates',
            engine: {
                module: 'handlebars'
            }
        }
    };

    var server = new Hapi.Server(3000, options);
    server.addRoute({ method: 'GET', path: '/', handler: handler });
    server.start();
};


internals.main();
