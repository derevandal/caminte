const ypModel = require('../models/ypModel.js')
  , qs = require('querystring')


const ypController = {

    contador: 0, 

    saveData: async function saveData(data){
        const yellow = new ypModel({
                content: data
        })
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
          ypController.saveData(body)
          ypController.postAuthenticated(req, res, body);
      });
    },

    postAuthenticated : function(req, res, body){
      if(body.action == 'add') ypController.addMount(req, res, body);
      else if(body.action == 'touch') ypController.updateMount(req, res, body);
      else {
        res.statusCode = 200;
        res.setHeader('YPResponse', 'Falha ao adicionar mount. Action invalido.');
        res.end();
      }
    },

    updateMount : function(req, res, body){
      res.statusCode = 200;
      res.setHeader('YPResponse', '1');
      res.end();
    },

    addMount : function(req, res, body){
      res.statusCode = 200;
      res.setHeader('YPResponse', '1');
      res.setHeader('SID', ypController.contador++);
      res.setHeader('TouchFreq', '30');
      res.end();
    }
};

module.exports = ypController