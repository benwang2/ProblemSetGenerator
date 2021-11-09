const problems = {}

var fs = require('fs')
var uid = require('./uid')

function init(){
    var files = fs.readdirSync(__dirname + '/../psets/');
    for (let i = 0; i < files.length; i++){
        let file = fs.readFileSync(__dirname + '/../psets/' + files[i]);
        let data = JSON.parse(file);
        if (data[0]){
            let my_uid = uid.generate()
            problems[my_uid] = [files[i], data[1], data.length-2];
        }
    }
}

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}
 
function list_problem_sets(){
    var psets = []
    for (id in problems){
        psets.push([id, problems[id][1], problems[id][2]])
    }
    return psets
}

function parse_pset_list(pset_ids){
    let parsed = []
    for (let i = 0; i < pset_ids.length; i++){
        let id = pset_ids[i].slice(5)
        if (problems[id] == undefined) continue;
        let fileContent = fs.readFileSync(`${__dirname}/../psets/${problems[id][0]}`)
        parsed.push(JSON.parse(fileContent))
    }
    return parsed
}

function evaluate(formula, parameters){
    try {
        return function(){
            with(this) {
                return ""+eval(formula);
            }
        }.call(parameters)
    } catch (err){
        console.log("variables:",parameters)
        console.log(err.message, "in formula:",formula)
        return err.message
    }
        
}

function format_problem(pstring, var_name, value){
    return pstring.replace(`__${var_name}__`, `${value}`)
}

function generate_problem_set(psets = [], num_problems = 10){
    psets = parse_pset_list(psets)
    if (psets.length == 0){ return 0;}

    let generated = []
    let options = []

    for (let i = 0; i < psets.length; i++){
        for (let j = 2; j < psets[i].length; j++){
            options.push([i,j])
        }
    }

    shuffleArray(options)

    while (generated.length < num_problems){
        let pdata = options.pop()

        let problem = psets[pdata[0]][pdata[1]]


        let parameters = {}

        let pstring = problem['problem']

        for (let k = 0; k < problem['variables'].length; k++){
            let step = problem['variables'][k][3] ?problem['variables'][k][3] : 1
            let deviation = step * Math.floor(Math.random() * (problem['variables'][k][2] - problem['variables'][k][1])/step)
            let value = problem['variables'][k][1] + deviation

            value = value.toFixed(Math.abs(Math.floor(Math.log10(step))))

            parameters[problem['variables'][k][0]] = parseFloat(value)
        }

        for (param in parameters){
            pstring = format_problem(pstring, param, parameters[param])
        }

        generated.push({
            "problem":pstring,
            "solution":evaluate(problem['solution'],parameters)
        })
    }

    return generated
}


let sin = function(deg){ return Math.sin(deg * (Math.PI/180))}
let cos = function(deg){ return Math.cos(deg * (Math.PI/180))}
let g = 9.8
let pi = Math.PI

exports.list = list_problem_sets
exports.generate = generate_problem_set
exports.init = init