const Poll = require('./poll')

exports.pollGetController = (req, res, next) => {
    res.render('createPoll')
}

exports.pollPostController = async (req, res, next) => {
    let { title, description, options } = req.body

    options = options.map(opt => {
        return {
            name: opt,
            vote: 0
        }
    })

    let poll = new Poll({
        title,
        description,
        options
    })

    try {
        await poll.save()
        res.redirect('/polls')
    }
    catch (err) {
        console.log(err)
    }
}

exports.getAllPolls = async (req, res, next) => {
    try {
        const polls = await Poll.find()
        res.render('allPolls', { polls })
    } catch (e) {
        console.log(e)
    }
}

exports.singlePollController = async (req, res, next) => {
    let id = req.params.id
    try {
        const poll = await Poll.findById(id)
        res.render('singlePoll', {poll})
    } catch (e) {
        console.log(e)
    }
}