let uid = require('./uid')
let saved = {}
let lifetime = 60//minutes

function upload(id, problems){
    saved[id] = problems
    setTimeout(()=>{
        saved[id] = null
        delete saved[id]
    },1000*60*60*lifetime)
}

function get(id){
    return saved[id]
}

exports.upload = upload
exports.get = get