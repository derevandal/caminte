const schema = require('../services/arangoService')
    , Yellow = schema.define('yellow', {
        serv : { type : schema.String }
        , listeners : { type : schema.Int }
        , mounts:     { type: schema.Json }
        , createAt: { type: schema.Date, default: Date.now }
    })
    
Yellow.afterUpdate = next => {
    this.updateAt = new Date()
    this.save()
    next()
}

module.exports = Yellow