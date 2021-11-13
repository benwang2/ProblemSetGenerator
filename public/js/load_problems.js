function gen_element(text, image){
    const div = document.createElement('div')
    div.className = "problem"

    const left = document.createElement("div")
    left.className = "p-left"
    
    const main = document.createElement("div")
    main.className = "p-main"

    const right = document.createElement("div")
    right.className = "p-right"

    div.appendChild(left)
    div.appendChild(main)
    if (image) div.append(right)

    {
        const btn1 = document.createElement("button")
        btn1.className = "circle"
        const img = document.createElement("img")
        btn1.append(img)

        const btn2 = btn1.cloneNode(true)

        btn1.style = "background-color:#8B90FF"
        btn2.style = "background-color:#68E7A2"

        img.src = "/svg/regen.svg"
        img.style = "position: relative;top:1px"
        btn2.querySelector("img").src = "/svg/check.svg"
        btn2.querySelector("img").style = "position: relative;top:2px"

        left.append(btn1)
        left.append(btn2)
    }

    // <span>
    //                         The blades of a fan running at low speed turn at 290 rpm. When the fan is switched to high speed, the rotation rate increases uniformly to 470 rpm in 5.65 s. What is the magnitude of the angular acceleration of the blades?
    //                     </span>
    //                     <div style="position: relative;">
    //                         <input type="text" id="q_id_answer">
    //                         <label for="q_id_answer"> rad/s^2</label>
    //                     </div>

    const span = document.createElement("span")
    span.innerHTML = text
    
    const ans = document.createElement("div")
    ans.style = "position: relative"

    span.append(ans)
    div.appendChild(span)

    return div
}