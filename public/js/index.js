on_load_calls.push(()=>{
    let btn = document.getElementById('generate')
    let options = document.getElementsByClassName("checkbox")
    btn.onclick = () => {
        let req = {}
        req["problems"] = []
        req["num_problems"] = document.getElementById("num_problems").value

        for (let i = 0; i < options.length; i++){
            let input = options[i].getElementsByTagName('input')[0]
            if (input.checked){req.problems.push(input.id)}
        }

        fetch('/generate',
        {
            method:'POST',
            mode: 'cors',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(req)
        })
        .then(res => res.text())
        .then(url => {
            console.log(url)
            window.location.replace(window.location.href+url.slice(1))
        })
    }
})