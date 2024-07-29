const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    publishedDate: { type: Date, default: Date.now }
}, { timestamps: true });

ArticleSchema.index({ title: 'text', content: 'text' });

module.exports = mongoose.model('Article', ArticleSchema);
