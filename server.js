const express = require('express');
const mongoose = require ('mongoose')
const articleRouter = require ('./routes/articles')
const app = express();

const PORT = process.env.PORT ||3000
mongoose.connect('mongodb://localhost/blog')
app.set('view engine', 'pug')
app.use(express.urlencoded({ extended: false}))


app.get("/", (req, res) => {
    const article =[{
        title: 'Test Article',
        createdAt: new Date(),
        description:'Test description'

    },
    {
        title: 'Test Article 2',
        createdAt: new Date(),
        description:'Test description'

    }]
    res.render('articles/index', {articles: article});
});

app.use('/articles', articleRouter)

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});