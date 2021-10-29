on_load_calls = []

window.onload = function(){
    for (let i = 0; i < on_load_calls.length; i++){
        on_load_calls[i]()
    }
}

let max_problems = 0;

function update_selection(id, checked){
    id = id.slice(5)
    max_problems += parseFloat(psets[id][1]) * (checked ? 1 : -1)
    max_problems = Math.max(max_problems, 0)

    let elmt = document.getElementById("num_problems")
    elmt.value = max_problems
    elmt.max = max_problems
    
    document.getElementById("generate").setAttribute("disabled", (max_problems == 0) ? "disabled" : "")
}

on_load_calls.push(function(){
    document.getElementById("generate").setAttribute("disabled", (max_problems == 0) ? "disabled" : "")
    let checkboxes = document.getElementsByClassName("checkbox")
    for (let i = 0; i < checkboxes.length; i++){
        let input = checkboxes[i].querySelector("input")
        if (input.checked) update_selection(input.id, input.checked)
    }
})