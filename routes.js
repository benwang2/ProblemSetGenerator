var pset = require('./controllers/problems')

exports.generate = function(app){

    app.post('/generate', function(req, res){
        try {
            let data = req.body
            let pset_ids = []
            for(let i = 0; i < data.problems.length; i++){
                pset_ids.push(req.body.problems[i])
            }

            let generated = pset.generate(pset_ids, data.num_problems)
            res.send(JSON.stringify(generated))
        } catch (e) {
            console.error(e)
            res.sendStatus(400)
        }
    })

    app.get('/problems', function(req, res){
        res.render(__dirname+'/views/problems.ejs')
    })
}
