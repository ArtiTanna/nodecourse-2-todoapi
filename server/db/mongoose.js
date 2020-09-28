var mongoose = require('mongoose');

mongoose.promise = global.Promise;
mongoose.connect(process.env.MONGODBURI);

module.exports = {mongoose};
