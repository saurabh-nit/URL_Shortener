var mongoose = require ("mongoose");


var ShortenSchema = new mongoose.Schema({

         inputurl : String,
        outputurl : String

});

module.exports = mongoose.model("Shorten",ShortenSchema);
