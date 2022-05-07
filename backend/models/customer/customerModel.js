const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
    cusname : { type: String, required : true },
    cusemail : { type: String, required : true },
    phoneno : { type: String, required : true },
    password : { type: String, required : true },
});

const customer = mongoose.model('customer', customerSchema);
module.exports = customer;