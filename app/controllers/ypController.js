const ypModel = require('../models/ypModel.js')
  , qs = require('querystring')


const ypController = {

    contador: 0, 

    saveData: async function saveData(data){
        const yellow = new ypModel(data)
        let _error = false
        await yellow.save((err) => {
            if(err) _error = true
        })
        return _error
    },

    postRecv : function(req, res, next){
      let body = [];
      req.on('data', function(chunk) {
        body.push(chunk);
      }).on('end', function() {
        body = qs.parse(Buffer.concat(body).toString());
        ypController.postAuthenticated(req, res, body);
      });
    },

    postAuthenticated : function(req, res, body){
      if(body.action == 'add') ypController.addMount(req, res, body);
      else if(body.action == 'touch') ypController.updateMount(req, res, body);
      else if(body.action == 'remove') ypController.removeMount(req, res, body);
      else {
        res.statusCode = 200;
        res.setHeader('YPResponse', 'Falha ao adicionar mount. Action invalido.');
        res.end();
      }
    },

    removeMount : function(req, res, body){
      res.statusCode = 200;
      res.setHeader('YPResponse', '1');
      res.end();
    },

    updateMount : function(req, res, body){
      res.statusCode = 200;
      res.setHeader('YPResponse', '1');
      res.end();
    },

    addMount : function(req, res, body){
      res.statusCode = 200;
      res.setHeader('YPResponse', '1');
      res.setHeader('SID', body.listenurl);
      res.setHeader('TouchFreq', '30');
      res.end();
    }
};

module.exports = ypController

// { action: 'add',
//   sn: 'RADIO HUNTER -=[: The Hitz Channel :]=- HUNTERFM.COM',
//   genre: 'Top40 Hits House Dance Various Rock Alternative 80s Pop',
//   cpswd: '',
//   desc: '',
//   url: 'http://www.hunterfm.com',
//   listenurl: 'http://192.168.0.100:8000/cobaia',
//   type: 'audio/mpeg',
//   stype: '',
//   b: '128',
//   '\r\n': '' }
// POST /yp-cgi 200 9.859 ms - -
// { action: 'touch',
//   sid: '1',
//   st: '',
//   listeners: '0',
//   max_listeners: '100',
//   stype: '\r\n' }
// POST /yp-cgi 200 1.536 ms - -
// { action: 'touch',
//   sid: '1',
//   st: 'Shawn Mendes - Treat You Better',
//   listeners: '0',
//   max_listeners: '100',
//   stype: '\r\n' }
// { action: 'remove', sid: '10' }