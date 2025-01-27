const mongoose = require('mongoose');
const Comment = require('./comment')
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  author:
  {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  title: String,
  description: String,
  body: String,
  image: [
    {
      url: String,
      filename: String
    }
  ],
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Comment'
    }
  ]
})

PostSchema.post('findOneAndDelete', async function (doc) {
  if (doc) {
    await Comment.deleteMany({
      _id: {
        $in: doc.comments
      }
    })
  }
})

module.exports = mongoose.model("Post", PostSchema);
