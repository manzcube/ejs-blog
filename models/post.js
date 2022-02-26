const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const PostSchema = new Schema ({
    title: String,
    type: String,
    link: String,
    image: String,
    date: String,
    body: String
})


module.exports = mongoose.model('Post', PostSchema);