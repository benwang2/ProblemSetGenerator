let crypto = require('crypto')

let uids = []
let charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"

function generate(){
    let uid = ""
    do {
        uid = ""
        for (let i = 0; i < 6; i++){
            let char = Math.floor(Math.random() * charset.length)
            uid += charset.slice(char, char+1)
        }
    } while(uids.find(e => e == uid))
    uids.push(uid)
    return uid
}

function genseed(base){ // This might be vulnerable to hash collisions... too lazy to be concerned about that
    let num = 0
    let hash = ""
    base = base.replace(/[^A-z0-9]/g, '').toUpperCase()
    for (let i = 0; i < base.length; i++){
        num += (base.charCodeAt(i)-47) * 2**i
    }
    for (let i = 0; i < 6; i++){
        let tmp = Math.sin(num++) * 10000;
        tmp = tmp - Math.floor(tmp);
        let char = charset.charAt(Math.floor(tmp*charset.length))
        hash += char
    }
    return hash
}

exports.generate = generate
exports.genseed = genseed