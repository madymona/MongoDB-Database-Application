const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const mongodb = require('mongodb');
const Article = require('./models/article');
const articleRouter = require('./routes/articles');
const userRouter = require('./routes/users');
const commentRouter = require('./routes/comments');

dotenv.config();
mongoose.connect(process.env.ATLAS_URI);
const app = express();
const PORT = process.env.PORT || 3000;
app.set('view engine', 'pug');
app.use(express.urlencoded({ extended: false }));

app.get("/", async (req, res) => {
    const article = await Article.find().sort({ createdAt: 'desc' });
    res.render('articles/index', { articles: article });
});

app.use('/articles', articleRouter);
app.use('/users', userRouter);
app.use('/comments', commentRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});
