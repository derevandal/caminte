const caminte = require('caminte')
    , db = {
        driver       : 'arango'
        , username   : 'root'
        , password   : 'nigri1261'
        , port       : '8529'
        , host       : 'fr01.hunter.fm'
        , database   : 'adawong'
    }
    , Schema = caminte.Schema
    , schema = new Schema(db.driver, db)

module.exports = schema