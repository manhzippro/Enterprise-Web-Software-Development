
const { array } = require('joi')
const db = require('../models/index')
const sendEmail = require('../utils/mailer')
const CsvParser = require('json2csv').Parser
const Ideas = db.ideas
const ClosureDate = db.closureDate
const Department = db.department
const Category = db.category
const Like = db.like
const Comment = db.comment
const Role = db.role
const Account = db.account

exports.createIdeas = async (req, res) => {
    const department = await Department.findOne({ departmentName: req.body.departmentName })
    if (!department) {
        return res.status(500).send({
            errorCode: 500,
            message: 'Department server is error'
        })
    }
    const category = await Category.findOne({ categoryName: req.body.categoryName })
    if (!category) {
        return res.status(500).send({
            errorCode: 500,
            message: 'Category server is error'
        })
    }
    const closureDate = await ClosureDate.findOne({ departmentID: department._id })
    if (!closureDate) {
        return res.status(500).send({
            errorCode: 500,
            message: 'Closure date server is error'
        })
    }
    const ideas = new Ideas({
        ideasContent: req.body.ideasContent,
        ideasFile: req.file.path,
        numberOfLike: 0,
        numberOfDislike: 0,
        closureDateID: closureDate._id,
        accountID: req.accountID, // req.accountID,
        departmentID: department._id,
        categoryID: category._id
    })
    // xử lý ngày để cho đăng ideas lên
    const d = new Date()
    const date = await closureDate.firstClosureDate.split('/')
    if (parseInt(date[2]) > parseInt(d.getFullYear())) {
        console.log('da di vao so sanh nam lon hon')
        ideas.save(async (err, ideas) => {
            if (err) res.status(500).send({
                errorCode: 500,
                message: err
            })
            if (req.body.departmentName === 'IT') {
                const role = await Role.findOne({ roleName: 'QA of IT' })
                const user = await Account.findOne({ roleID: role._id })
                const email = user.accountEmail
                const link = `localhost:1000/ideas/${ideas._id}`
                await sendEmail(email, 'New ideas uploaded', link)
            }
            else if (req.body.departmentName === 'business') {
                const role = await Role.findOne({ roleName: 'QA of business' })
                const user = await Account.findOne({ roleID: role._id })
                const email = user.accountEmail
                const link = `localhost:1000/ideas/${ideas._id}`
                await sendEmail(email, 'New ideas uploaded', link)
            }
            else {
                const role = await Role.findOne({ roleName: 'QA of graphic design' })
                const user = await Account.findOne({ roleID: role._id })
                const email = user.accountEmail
                const link = `localhost:1000/ideas/${ideas._id}`
                await sendEmail(email, 'New ideas uploaded', link)
            }
            res.status(200).send({
                errorCode: 0,
                message: 'add ideas successfuly'
            })
        })
    } else if (parseInt(date[2]) === parseInt(d.getFullYear())) {
        console.log('da di vao so sanh nam bang nhau')
        if (parseInt(date[1]) > (parseInt(d.getMonth()) + 1)) {
            console.log('da di vao so sanh thang lon hon')
            ideas.save(async (err, ideas) => {
                if (err) res.status(500).send({
                    errorCode: 500,
                    message: err
                })
                if (req.body.departmentName === 'IT') {
                    const role = await Role.findOne({ roleName: 'QA of IT' })
                    const user = await Account.findOne({ roleID: role._id })
                    const email = user.accountEmail
                    const link = `localhost:1000/ideas/${ideas._id}`
                    await sendEmail(email, 'New ideas uploaded', link)
                }
                else if (req.body.departmentName === 'business') {
                    const role = await Role.findOne({ roleName: 'QA of business' })
                    const user = await Account.findOne({ roleID: role._id })
                    const email = user.accountEmail
                    const link = `localhost:1000/ideas/${ideas._id}`
                    await sendEmail(email, 'New ideas uploaded', link)
                }
                else {
                    const role = await Role.findOne({ roleName: 'QA of graphic design' })
                    const user = await Account.findOne({ roleID: role._id })
                    const email = user.accountEmail
                    const link = `localhost:1000/ideas/${ideas._id}`
                    await sendEmail(email, 'New ideas uploaded', link)
                }
                res.status(200).send({
                    errorCode: 0,
                    message: 'add ideas successfuly'
                })
            })
        } else if (parseInt(date[1]) === (parseInt(d.getMonth()) + 1)) {
            console.log('da di vao so sanh thang bang nhau')
            if (parseInt(date[0]) > parseInt(d.getDate())) {
                ideas.save(async (err, ideas) => {
                    if (err) res.status(500).send({
                        errorCode: 500,
                        message: err
                    })
                    if (req.body.departmentName === 'IT') {
                        const role = await Role.findOne({ roleName: 'QA of IT' })
                        const user = await Account.findOne({ roleID: role._id })
                        const email = user.accountEmail
                        const link = `localhost:1000/ideas/${ideas._id}`
                        await sendEmail(email, 'New ideas uploaded', link)
                    }
                    else if (req.body.departmentName === 'business') {
                        const role = await Role.findOne({ roleName: 'QA of business' })
                        const user = await Account.findOne({ roleID: role._id })
                        const email = user.accountEmail
                        const link = `localhost:1000/ideas/${ideas._id}`
                        await sendEmail(email, 'New ideas uploaded', link)
                    }
                    else {
                        const role = await Role.findOne({ roleName: 'QA of graphic design' })
                        const user = await Account.findOne({ roleID: role._id })
                        const email = user.accountEmail
                        const link = `localhost:1000/ideas/${ideas._id}`
                        await sendEmail(email, 'New ideas uploaded', link)
                    }
                    res.status(200).send({
                        errorCode: 0,
                        message: 'add ideas successfuly'
                    })
                })
            } else {
                return res.status(401).send({
                    errorCode: 401,
                    message: 'over final closure date!'
                })
            }
        } else {
            return res.status(401).send({
                errorCode: 401,
                message: 'over final closure date!'
            })
        }
    } else {
        return res.status(401).send({
            errorCode: 401,
            message: 'over final closure date!'
        })
    }
}

exports.viewSubmitIdeas = async (req, res) => {
    Ideas.findById(req.params.ideasID, async (err, ideas) => {
        if (err) return res.status(500).send({
            errorCode: 0,
            message: err
        })
        var department = await Department.findById(ideas.departmentID)
        if (!department) {
            return res.status(500).send({
                errorCode: 500,
                message: 'Department server is error'
            })
        }
        var category = await Category.findById(ideas.categoryID)
        if (!category) {
            return res.status(500).send({
                errorCode: 500,
                message: 'Category server is error'
            })
        }
        var ideasShow = {
            ideasContent: ideas.ideasContent,
            ideasFile: ideas.ideasFile,
            numberOfLike: ideas.numberOfLike,
            numberOfDislike: ideas.numberOfDislike,
            numberOfComment: ideas.numberOfComment,
            departmentName: department.departmentName,
            categoryName: category.categoryName
        }
        return res.status(200).send({
            errorCode: 0,
            data: ideasShow
        })
    })
}

exports.listIdeas = async (req, res) => {
    try {
        Ideas.find({}, async (err, list) => {
            if (err) return res.status(500).send({
                errorCode: 0,
                message: 'Ideas server is error'
            })
            var listShow = []
            for (i = 0; i < list.length; i++) {
                var department = await Department.findById({ _id: list[i].departmentID })
                if (!department)
                    return res.status(500).send({
                        errorCode: 0,
                        message: 'department server is error'
                    })
                let category = await Category.findById({ _id: list[i].categoryID })
                if (category == null) return res.status(500).send({
                    errorCode: 0,
                    message: 'category server is error'
                })

                var listInfo = {
                    _id: list[i]._id,
                    ideasContent: list[i].ideasContent,
                    ideasFile: list[i].ideasFile,
                    numberOfLike: list[i].numberOfLike,
                    numberOfDislike: list[i].numberOfDislike,
                    numberOfComment: list[i].numberOfComment,
                    departmentName: department.departmentName,
                    categoryName: category.categoryName
                }
                listShow.push(listInfo)
            }
            Ideas.countDocuments((err, count) => {
                return res.status(200).send({
                    errorCode: 0,
                    data: listShow,
                })
            })
        })
    }
    catch (err) {
        console.log(err)
    }
}

exports.myIdeas = async (req, res) => {
    try {
        Ideas.find({ accountID: req.accountID }, async (err, list) => {
            if (err) return res.status(500).send({
                errorCode: 0,
                message: 'Ideas server is error'
            })
            var listShow = []
            for (i = 0; i < list.length; i++) {
                var department = await Department.findById({ _id: list[i].departmentID })
                if (!department)
                    return res.status(500).send({
                        errorCode: 0,
                        message: 'department server is error'
                    })
                let category = await Category.findById({ _id: list[i].categoryID })
                if (category == null) return res.status(500).send({
                    errorCode: 0,
                    message: 'category server is error'
                })

                var listInfo = {
                    _id: list[i]._id,
                    ideasContent: list[i].ideasContent,
                    ideasFile: list[i].ideasFile,
                    numberOfLike: list[i].numberOfLike,
                    numberOfDislike: list[i].numberOfDislike,
                    numberOfComment: list[i].numberOfComment,
                    departmentName: department.departmentName,
                    categoryName: category.categoryName
                }
                listShow.push(listInfo)
            }
            return res.status(200).send({
                errorCode: 0,
                data: listShow,
            })
        })
    }
    catch (err) {
        console.log(err)
    }
}


exports.likeIdeas = async (req, res) => {
    try {
        const ideasID = req.params.ideasID
        const accountID = req.accountID

        const like = new Like({
            like: true,
            ideasID: ideasID,
            accountID: accountID
        })
        await like.save()
        const number = await Like.find({ ideasID: ideasID })
        let sum = 0
        number.forEach(e => {
            if (e.like === true) {
                sum = sum + 1
            }
        })
        await Ideas.findByIdAndUpdate({ _id: ideasID }, { numberOfLike: sum }, { new: true })
        return res.status(200).send({
            errorCode: 0,
            message: 'number of like update successfully'
        })
    }
    catch (err) {
        console.log(err)
    }
}

exports.dislikeIdeas = async (req, res) => {
    try {
        const ideasID = req.params.ideasID
        const accountID = req.accountID

        const dislike = new Like({
            dislike: true,
            ideasID: ideasID,
            accountID: accountID
        })
        await dislike.save()
        const number = await Like.find({ ideasID: ideasID })
        let sum = 0
        number.forEach(e => {
            if (e.dislike === true) {
                sum = sum + 1
            }
        })
        await Ideas.findByIdAndUpdate({ _id: ideasID }, { numberOfDislike: sum }, { new: true })
        return res.status(200).send({
            errorCode: 0,
            message: 'number of like update successfully'
        })
    }
    catch (err) {
        console.log(err)
    }
}

exports.commentIdeas = async (req, res) => {

    try {
        const ideasID = req.params.ideasID
        const comment = new Comment({
            commentText: req.body.commentText,
            ideasID,
            accountID: req.accountID
        })
        await comment.save((err, comment) => {
            if (err) return res.status(500).send({
                errorCode: 0,
                message: 'Comment server is error'
            })
        })
        const user = await Account.findById(req.accountID)
        if (!user) return res.status(500).send({
            errorCode: 500,
            message: err
        })
        link = `localhost:1000/ideas/list-comment-ideas/${ideasID}`
        await sendEmail(user.accountEmail, 'Someone commented on your idea', link)
        const number = await Comment.find({ ideasID: ideasID })
        let sum = 0
        number.forEach(e => {
            sum = sum + 1
        })
        await Ideas.findByIdAndUpdate({ _id: ideasID }, { numberOfComment: sum }, { new: true })
        return res.status(200).send({
            errorCode: 0,
            message: 'number of comment update successfully'
        })
    }
    catch (err) {
        console.log(err)
    }
}

exports.listCommentIdeas = (req, res) => {
    const ideasID = req.params.ideasID
    Comment.find({ ideasID }, (err, listComment) => {
        if (err) {
            return res.status(500).send({
                errorCode: 500,
                message: err
            })
        }
        return res.status(200).send({
            errorCode: 0,
            data: listComment
        })
    })
}

exports.deleteCommentIdeas = async (req, res) => {
    const comment = await Comment.findById('622a10e1f965150f29d40efa')
    if (!comment) return res.status(500).send({
        errorCode: 500,
        message: 'Comment server is error'
    })
    await comment.delete()
    return res.status(200).send({
        errorCode: 0,
        message: 'Comment delete successfully'
    })
}

exports.downloadIdeas = async (req, res) => {
    try {
        const d = new Date()
        const ideas = await Ideas.find()
        var listDown = []
        ideas.forEach(async e => {
            var closureDate = await ClosureDate.findById(e.closureDateID)
            var date = await closureDate.finalClosureDate.split('/')
            if (parseInt(date[2]) > parseInt(d.getFullYear())) {
                const { _id, ideasContent, numberOfComment, numberOfLike, numberOfDislike } = e
                listDown.push({ _id, ideasContent, numberOfComment, numberOfLike, numberOfDislike })
            } else if (parseInt(date[2]) === parseInt(d.getFullYear())) {
                if (parseInt(date[1]) > (parseInt(d.getMonth()) + 1)) {
                    const { _id, ideasContent, numberOfComment, numberOfLike, numberOfDislike } = e
                    listDown.push({ _id, ideasContent, numberOfComment, numberOfLike, numberOfDislike })
                } else if (parseInt(date[1]) === (parseInt(d.getMonth()) + 1)) {
                    if (parseInt(date[0]) > parseInt(d.getDate())) {
                        const { _id, ideasContent, numberOfComment, numberOfLike, numberOfDislike } = e
                        listDown.push({ _id, ideasContent, numberOfComment, numberOfLike, numberOfDislike })
                    }
                }
            }
        })
        if (listDown === null) {
            return res.send({
                errorCode: 400,
                message: 'No idea to download!'
            })
        }
        const csvFields = ["Id", "Content", "Number of comment", "Number of like", "Number of dislike"];
        const csvParser = new CsvParser({ csvFields })
        const csvData = csvParser.parse(listDown)
        res.setHeader("Content-Type", "text/csv")
        res.setHeader("Content-Disposition", "attachment; filename=ideas.csv")
        res.status(200).send(csvData)
    }
    catch (err) {
        console.log(err)
    }
}

//filter 
exports.filterMostLike = async (req, res) => {
    Ideas.find({}, (err, list) => {
        if (err) return res.status(500).send({
            errorCode: 500,
            message: err
        })
        list.sort((a, b) => {
            return a.numberOfLike - b.numberOfLike
        })
        return res.status(200).send({
            errorCode: 0,
            data: list
        })
    })
}

exports.filterLeastLike = async (req, res) => {
    Ideas.find({}, (err, list) => {
        if (err) return res.status(500).send({
            errorCode: 500,
            message: err
        })
        list.sort((a, b) => {
            return b.numberOfDislike - a.numberOfDislike
        })
        return res.status(200).send({
            errorCode: 0,
            data: list
        })
    })
}

exports.filterMostComment = async (req, res) => {
    Ideas.find({}, (err, list) => {
        if (err) return res.status(500).send({
            errorCode: 500,
            message: err
        })
        list.sort((a, b) => {
            return b.numberOfComment - a.numberOfComment
        })
        return res.status(200).send({
            errorCode: 0,
            data: list
        })
    })
}

exports.filterLeastComment = async (req, res) => {
    Ideas.find({}, (err, list) => {
        if (err) return res.status(500).send({
            errorCode: 500,
            message: err
        })
        list.sort((a, b) => {
            return a.numberOfComment - b.numberOfComment
        })
        return res.status(200).send({
            errorCode: 0,
            data: list
        })
    })
}