
//Declaration of variables and requires

const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const Post = require('./models/post')
const methodOverride = require('method-override')
const ejsMate = require('ejs-mate')

//Mongoose connection and verification

mongoose.connect('mongodb://localhost:27017/trading-blog', {
    useNewUrlParser: true, 
    useUnifiedTopology: true
})

const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', () => {
    console.log('Database connected')
})

//Starting app and routes, take params information, ...

const app = express()

app.engine('ejs', ejsMate)
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use(express.urlencoded({extended: true}))
app.use(methodOverride('_method'))

 

//Starting of requests

app.get(['/', '/posts'], async (req, res) => {
    const posts = await Post.find({})
    res.render('posts/index', {posts})
})

app.get('/posts/improvement', async (req, res) => {
    const posts = await Post.find({type: "Improvement"})
    res.render('posts/index', {posts})    
})

app.get('/posts/trading', async (req, res) => {
    const posts = await Post.find({type: "Trading"})
    res.render('posts/index', {posts})
})

app.get('/posts/new', async (req, res) => {
    const posts = await Post.find({})
    res.render('posts/new', {posts})
})

app.post('/posts', async (req, res) => {
    const post = new Post(req.body.post)
    await post.save()
    res.redirect(`/posts/${post.id}`)
})

app.get('/posts/:id', async (req, res) => {
    const post = await Post.findById(req.params.id)
    res.render('posts/show', {post})
})

app.get('/posts/:id/edit', async (req, res) => {
    const post = await Post.findById(req.params.id)
    res.render('posts/edit', {post})
})

app.put('/posts/:id', async (req, res) => {
    const { id } = req.params
    const post = await Post.findByIdAndUpdate(id, {...req.body.post})
    res.redirect(`/posts/${post.id}`)
})

app.delete('/posts/:id', async (req, res) => {
    const { id } = req.params
    await Post.findByIdAndDelete(id)
    res.redirect('/posts')
})





app.listen(3000, () => {
    console.log('Serving on port 3000')
})