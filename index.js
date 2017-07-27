const restify = require('restify')
    , fs = require('fs')
    , bunyan = require('bunyan')
    , server = restify.createServer({
        name: 'HunterFm Load Balances'
        , version: '0.0.0'
        , port: 9090
        , log: bunyan.createLogger({ name: 'hunter-load-balancer' })
    })
    , controllers = {}
    , controllers_path = process.cwd() + '/app/controllers'

fs.readdirSync(controllers_path).forEach(function (file) {
    if (file.indexOf('.js') != -1) {
        controllers[file.split('.')[0]] = require(controllers_path + '/' + file)
    }
})

server.get('/', (req, res)=>{
    res.status(200)
    res.json({
        status: '200'
        , message: 'Hi, my name is "' + server.name + '" XD'
    })
})

server.post('/yp-cgi', controllers.ypController.postRecv)


/* eslint no-console: 0 */
server.listen(9090, function (err) {
    if (err)
        console.error(err)
    else
        console.log('%s listening at port 9090', server.name)
})

if (process.env.environment == 'production')
    process.on('uncaughtException', function (err) {
        console.error(JSON.parse(JSON.stringify(err, ['stack', 'message', 'inner'], 2)))
    })