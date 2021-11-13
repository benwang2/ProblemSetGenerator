var pset = require('./controllers/problems')
var uid = require('./controllers/uid')
var cache = require('./controllers/cache')

exports.generate = function(app){

    app.post('/generate', function(req, res){
        try {
            let data = req.body
            let pset_ids = []
            for(let i = 0; i < data.problems.length; i++){
                pset_ids.push(req.body.problems[i])
            }

            let generated = pset.generate(pset_ids, data.num_problems)
            let id = uid.generate()
            cache.upload(id,generated)
            generated.unshift(id)
            res.send("/problems/"+id)
        } catch (e) {
            console.error(e)
            res.sendStatus(400)
        }
    })

    app.get('/problems/:id', function(req, res){
        let id = req.params.id
        if (id == null){res.redirect("/")}
        let problems = cache.get(id)
        if (cache.get(id) == null){res.redirect("/")}
        res.render(__dirname+'/views/problems.ejs',{
            problems: JSON.stringify(problems)
        })
    })
}
