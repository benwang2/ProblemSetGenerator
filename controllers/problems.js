/* 
1. loop through psets
2. json to list
3. first arg of list is whether pset is visible
4. json is formatted as such:
[
    "homework 5", -- problem set name
    "true", -- if visible
    [
        "__variable1__ + __variable2__ = ?",
        ["variable1",-3,3], -- first arg is var name, second arg is min value, third arg is max value
        ["variable2",-10,15],
        "variable1+variable2" -- formula for solution
    ],
    [
        "__variable1__*__variable2__ = ?",
        ["variable1",0.1, 0.5, 0.1], -- third arg is a "step" argument. so the possible params for this would be: [0.1, 0.2, 0.3, 0.4, 0.5]
        ["variable2",1,20],          -- third arg will be 1 by default,
        "variable1*variable2"
    ]
]
*/

const problems = {}

var fs = require('fs')

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}
 
function list_problem_sets(){
    var files = fs.readdirSync(__dirname + '/../psets/');
    var psets = []
    for (let i = 0; i < files.length; i++){
        let file = fs.readFileSync(__dirname + '/../psets/' + files[i]);
        let data = JSON.parse(file);
        if (data[0]) psets.push(data[1])
    }
    return psets
}

function parse_pset_list(pset_names){
    let parsed = []
    for (let i = 0; i < pset_names.length; i++){
        parsed.append(JSON.parse(`${__dirname}/../psets/${pset_names[i]}`))
    }
    return parsed
}

function evaluate(formula, parameters){
    for (param in parameters){
        formula = formula.replace(`${param}`, `${parameters[param]}`)
    }
    return eval(formula)
}

function format_problem(pstring, var_name, value){
    return pstring.replace(`__${var_name}__`, `${value}`)
}

function generate_problem_set(psets = [], num_problems = 3){
    psets = parse_pset_list(psets)

    let generated = []
    let options = []

    for (let i = 0; i < psets.length; i++){
        for (let j = 1; j < psets[i].length; j++){
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
            let step = problem['variables'][k][3] ? problem['variables'][k][3] : 1
            let deviation = step * Math.floor(Math.random() * (problem['variables'][k][2] - problem['variables'][k][1])/step)

            parameters[problem['variables'][k][0]] = problem['variables'][k][1] + deviation
        }

        for (param in parameters){
            pstring = format_problem(pstring, param, parameters[param])
        }

        generated.push([pstring,evaluate(problem['solution'],parameters)])
    }

    console.log(generated)

    return generated
}

generate_problem_set(
    [
        JSON.parse(fs.readFileSync(__dirname+"/../psets/hw5.json"))
    ]
)

problems["list"] = list_problem_sets
problems["generate"] = generate_problem_set

export default problems