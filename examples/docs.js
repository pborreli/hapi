// Load modules

var Hapi = require('../lib');


// Declare internals

var internals = {};


// Type shortcuts

var S = Hapi.Types.String;
var N = Hapi.Types.Number;
var A = Hapi.Types.Array;


internals.get = function (request) {

    request.reply('Success!\n');
};


internals.output = function (request) {

    request.reply({ myOutput: request.query.input });
};


internals.payload = function (request) {

    request.reply('Success!\n');
};


internals.echo = function (request) {

    request.reply(request.payload);
};


internals.main = function () {

    var http = new Hapi.Server('0.0.0.0', 8080);

    http.addRoutes([
        { method: 'GET', path: '/docs', handler: { docs: true } },
        { method: 'GET', path: '/', config: { handler: internals.get, validate: { query: { username: S() } } } },
        { method: 'POST', path: '/', config: { handler: internals.echo, payload: 'parse' } },
        { method: 'GET', path: '/admin', config: { handler: internals.get, validate: { query: { username: S().required().with('password'), password: S() } } } },
        { method: 'GET', path: '/users', config: { handler: internals.get, validate: { query: { email: S().email().required().min(18) } } } },
        { method: 'GET', path: '/config', config: { handler: internals.get, validate: { query: { choices: A().required() } } } },
        { method: 'GET', path: '/test', config: { handler: internals.get, validate: { query: { num: N().min(0) } } } },
        { method: 'GET', path: '/test2', config: { handler: internals.get, validate: { query: { p1: S().required().rename('itemId') } } } },
        { method: 'GET', path: '/simple', config: { handler: internals.get, validate: { query: { input: S().min(3) } } } },
        { method: 'GET', path: '/output', config: { handler: internals.output, validate: { query: { input: S().min(3) }, response: { myOutput: S().min(3) } } } },
        { method: 'GET', path: '/users/{id}', config: { description: 'Get a user', handler: internals.get, validate: { path: { id: N().required() }, query: { name: S().description('the user name').required() } } } }
    ]);

    var schema = {
        title: S().invalid('director'),
        status: S().valid('open', 'pending', 'close'),
        participants: A().includes(S(), N())
    };

    http.addRoute({
        method: 'POST',
        path: '/users/{id}',
        config: {
            handler: internals.payload,
            validate: {
                query: {},
                schema: schema
            }
        }
    });

    http.start();
};


internals.main();
