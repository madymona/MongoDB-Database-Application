const express = require('express');
const mongoose = require ('mongoose')
const dotenv = require ('dotenv');
const mongodb = require ('mongodb')
const articleRouter = require ('./routes/articles')


dotenv.config();
mongoose.connect(process.env.ATLAS_URI);
const app = express();
const PORT = process.env.PORT || 5700;
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
