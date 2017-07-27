const schema = require('../services/arangoService')
    , Yellow = schema.define('yellow', {
        content:     { type: schema.Text }
        , createAt: { type: schema.Date, default: Date.now }
    })
    
Yellow.afterUpdate = next => {
    this.updateAt = new Date()
    this.save()
    next()
}

module.exports = Yellow