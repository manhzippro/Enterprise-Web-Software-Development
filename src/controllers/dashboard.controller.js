const db = require('../models/index')
const Ideas = db.ideas
const Department = db.department

exports.dashboard = async (req, res) => {
    try {
        var IT = await Department.findOne({ departmentName: 'IT' })
        var graphic = await Department.findOne({ departmentName: 'graphic design' })
        var business = await Department.findOne({ departmentName: 'business' })
        //Count ideas for each department
        //count user submit ideas in each department
        //IT
        const listIdeasIT = await Ideas.find({ departmentID: IT._id })
        if (!listIdeasIT) return res.status(500).send({
            errorCode: 500,
            message: 'ideas server is error'
        })
        var numberIdeasIT = 0
        var listIDIT = []
        listIdeasIT.forEach(e=>{
            listIDIT.push(e.accountID.toString())
            numberIdeasIT++
        })
        let UserITUnique = listIDIT.filter((v,i) => listIDIT.indexOf(v) === i)
        //graphic
        const listIdeasGraphic = await Ideas.find({ departmentID: graphic._id })
        if (!listIdeasGraphic) return res.status(500).send({
            errorCode: 500,
            message: 'ideas server is error'
        })
        var numberIdeasGraphic = 0
        var listIDGraphic = []
        listIdeasGraphic.forEach(e=>{
            listIDGraphic.push(e.accountID.toString())
            numberIdeasGraphic++
        })
        let UserGraphicUnique = listIDGraphic.filter((v,i) => listIDGraphic.indexOf(v) === i)
        //business
        const listIdeasBusiness = await Ideas.find({ departmentID: business._id })
        if (!listIdeasBusiness) return res.status(500).send({
            errorCode: 500,
            message: 'ideas server is error'
        })
        var numberIdeasBusiness = 0
        var listIDBusiness = []
        listIdeasBusiness.forEach(e=>{
            listIDBusiness.push(e.accountID.toString())
            numberIdeasBusiness++
        })
        let UserBusinessUnique = listIDBusiness.filter((v,i) => listIDBusiness.indexOf(v) === i)
        
        return res.status(200).send({
            errorCode: 0,
            numberIdeasIT,
            numberIdeasGraphic,
            numberIdeasBusiness,
            countUserIT : UserITUnique.length,
            countUserGraphic: UserGraphicUnique.length,
            countUserBusiness : UserBusinessUnique.length,
        })
    } catch (error) {
        console.log(error)
    }


}
