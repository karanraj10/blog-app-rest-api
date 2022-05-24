const express = require('express')
const app = express()
const mongoese = require('mongoose')
const article = require('./models/article')
const ArticleRouter = require('./routes/articles')
const methodOverride = require('method-override')

mongoese.connect('mongodb://localhost:27017/blog',{
    useNewUrlParser: true, useUnifiedTopology: true
})

app.set('view engine','ejs')
app.use(express.urlencoded({extended: false}))
app.use(methodOverride('_method'))


app.use('/articles',ArticleRouter)
app.get('/',async (req, res) =>{
    const articles = await article.find().sort({createdAt: 'desc'})
    res.render('articles/index', {articles: articles})
})
app.listen(5000)