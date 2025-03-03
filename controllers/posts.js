const Post = require('../models/post')

module.exports.index = async (req, res) => {
  const posts = await Post.find({}).populate({
    path: 'comments'
  });
  res.render('posts/index', { posts, title: 'posts' });

};

module.exports.createPost = async (req, res) => {
  const post = new Post(req.body.post);
  post.image = req.files.map(f => ({ url: f.path, filename: f.filename }));
  post.author = req.user._id;
  await post.save();
  console.log(post)
  req.flash('success', 'Successfully made post!')
  res.redirect(`/posts/${post._id}`)
};

module.exports.renderNewForm = async (req, res) => {
  res.render('posts/new', { title: 'New' })
};

module.exports.showPost = async (req, res) => {
  const post = await Post.findById(req.params.id).populate({
    path: 'comments',
    populate: {
      path: 'author'
    }
  }).populate('author');
  console.log(post)
  if (!post) {
    req.flash('error', 'post does not exist.')
    res.redirect('/posts')
  }
  res.render('posts/show', { post, title: `${post.title}` });
};

module.exports.updatePost = async (req, res) => {
  const { id } = req.params;
  const post = await Post.findByIdAndUpdate(id, { ...req.body.post })
  imgs = req.files.map(f => ({ url: f.path, filename: f.filename }))
  post.image.push(...imgs);
  await post.save();
  req.flash('success', 'Successfully updated post!')
  res.redirect(`/posts/${post._id}`)
};

module.exports.deletePost = async (req, res) => {
  const { id } = req.params;
  await Post.findByIdAndDelete(id)
  req.flash('success', 'Successfully deleted post!')
  res.redirect('/posts')
};

module.exports.renderEditForm = async (req, res) => {
  const post = await Post.findById(req.params.id)
  if (!post) {
    req.flash('error', 'post does not exist.')
    res.redirect('/posts')
  }
  res.render('posts/edit', { post, title: 'Edit' })
};
