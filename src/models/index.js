const mongoose = require('mongoose')
mongoose.Promise = global.Promise
const { Account } = require("./account.schema")
const { Role } = require("./role.schema")

const db = {}

db.mongoose = mongoose

db.account = Account
db.role = Role

db.ROLES = ['staff', 'admin','QA', 'QA of IT','QA of business','QA of graphic design']

module.exports = db