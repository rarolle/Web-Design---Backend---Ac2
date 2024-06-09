const mongoose = require('mongoose');

const TodoModel = mongoose.model('Todo', {
    title: String,
    description: String,
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null }
});

module.exports = TodoModel;
