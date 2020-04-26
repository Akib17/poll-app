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

// Get all polls controller
exports.getAllPolls = async (req, res, next) => {
    try {
        let polls = await Poll.find()
        res.render('allPolls', { polls })
    } catch (e) {
        console.log(e)
    }
}

// Single POST controller
exports.singlePollController = async (req, res, next) => {
    let id = req.params.id
    try {
        let poll = await Poll.findById(id)
        let options = [...poll.options]
        let result = []
        options.forEach(option => {
            let percentage = (option.vote * 100) / poll.totalVote
            result.push({
                ...option._doc,
                percentage: percentage ? percentage : 0
            })
        })
        
        res.render('singlePoll', { poll, result })
    } catch (e) {
        console.log(e)
    }
}

// Post opinion controller
exports.pollResultPostController = async (req, res, next) => {
    let id = req.params.id
    let optionId = req.body.option

    try {
        let poll = await Poll.findById(id)
        let options = [...poll.options]

        let index = options.findIndex(ind => ind.id === optionId)
        options[index].vote = options[index].vote + 1

        let totalVote = poll.totalVote + 1

        await Poll.findOneAndUpdate(
            { _id: poll._id },
            { $set: { options, totalVote } }
        )

        res.redirect('/polls/' + id)
    } catch (e) {
        console.log(e)
    }
}