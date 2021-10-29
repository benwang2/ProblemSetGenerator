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

exports.generate = generate