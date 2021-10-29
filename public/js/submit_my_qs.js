texTranslation = {"2E":".", "D7":"*"}
endpoint = ""

function convertMathJax(mathJax){
    myStr = ""
    let texs = mathJax.getElementsByTagName("use")
    for (let i = 0; i < texs.length; i++){
        let e = texs[i];
        let char = e.getAttribute("xlink:href").slice(-2)
        if (isNaN(char)){
           myStr += texTranslation[char]
        } else {
            let transform = e.parentElement.parentElement.getAttribute("transform");
            if (transform && transform.search("scale")>0){
                myStr += "^"
            }
            myStr += char.slice(1)
        }
    }
    return myStr
}

function convertQuestionsToPlainText(){
    let questions = document.getElementsByClassName("noSelect")
    let raw = [];
    for (let i = 0; i < questions.length; i++){
        let q = questions[i].getElementsByTagName("p")[0];

        let mjxs = q.getElementsByTagName("mjx-container")

        for (let j = 0; j < mjxs.length; j++){
            mjxs[j].innerHTML = convertMathJax(mjxs[j])
        }

        raw[i] = q.innerHTML.slice(11, q.innerHTML.search("<input"))
        raw[i] = raw[i].replace(/<\/?[^>]+(>|$)/g, "");
    }

    return raw
}

function uploadQuestions(questions){
    let response = confirm("Please confirm that you agree to submit your questions so they can be used to develop a General Physics 203 exam review website.")
    if (response){
        alert("Your questions have been submitted, have a nice day!")
    } else {
        alert("Your questions have not been submitted, have a nice day!")
    }
}

formatted = convertQuestionsToPlainText()
uploadQuestions(formatted)
// convertMathJax(document.getElementsByTagName("mjx-container")[0])