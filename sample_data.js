const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/user');
const Article = require('./models/article');
const Comment = require('./models/comment');

dotenv.config();
mongoose.connect(process.env.ATLAS_URI);

let sampleUsers = [
    { "name": "Alice", "email": "alice@example.com", "password": "password1" },
    { "name": "Bob", "email": "bob@example.com", "password": "password2" },
    { "name": "Charlie", "email": "charlie@example.com", "password": "password3" },
    { "name": "David", "email": "david@example.com", "password": "password4" },
    { "name": "Eve", "email": "eve@example.com", "password": "password5" }
];

let sampleArticles = [
    { "title": "First Article", "content": "This is the first article.", "author": "1", "publishedDate": "2023-01-01" },
    { "title": "Second Article", "content": "This is the second article.", "author": "2", "publishedDate": "2023-02-01" },
    { "title": "Third Article", "content": "This is the third article.", "author": "3", "publishedDate": "2023-03-01" },
    { "title": "Fourth Article", "content": "This is the fourth article.", "author": "4", "publishedDate": "2023-04-01" },
    { "title": "Fifth Article", "content": "This is the fifth article.", "author": "5", "publishedDate": "2023-05-01" }
];

let sampleComments = [
    { "content": "Great article!", "author": "1", "articleId": "1", "createdDate": "2023-01-02" },
    { "content": "Very informative.", "author": "2", "articleId": "2", "createdDate": "2023-02-02" },
    { "content": "I learned a lot.", "author": "3", "articleId": "3", "createdDate": "2023-03-02" },
    { "content": "Thanks for sharing!", "author": "4", "articleId": "4", "createdDate": "2023-04-02" },
    { "content": "Awesome!", "author": "5", "articleId": "5", "createdDate": "2023-05-02" }
];

async function insertSampleData() {
    try {
        await User.deleteMany({});
        await Article.deleteMany({});
        await Comment.deleteMany({});

        const users = await User.insertMany(sampleUsers);
        
        sampleArticles = sampleArticles.map((article, index) => ({
            ...article,
            author: users[index % users.length]._id
        }));
        
        const articles = await Article.insertMany(sampleArticles);
        
        const comments = sampleComments.map((comment, index) => ({
            ...comment,
            author: users[index % users.length]._id,
            articleId: articles[index % articles.length]._id
        }));
        
        await Comment.insertMany(comments);

        console.log('Sample data inserted');
    } catch (error) {
        console.error('Error inserting sample data:', error);
    } finally {
        mongoose.disconnect();
    }
}
insertSampleData();