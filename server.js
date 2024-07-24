const express = require('express');
const articleRouter = require ('./routes/articles')
const app = express();

const PORT = process.env.PORT ||3000

app.set('view engine', 'pug')

app.use('/articles', articleRouter)

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

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});