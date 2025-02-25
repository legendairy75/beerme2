const User = require('../models/user')

module.exports.renderRegister = (req, res) => {
  res.render('users/register', { title: 'Register' })
}

module.exports.register = async (req, res) => {
  try {
    const { email, username, password } = req.body;
    const user = new User({ email, username });
    const registeredUser = await User.register(user, password);
    req.login(registeredUser, err => {
      if (err) return next(err);
      req.flash('success', 'Welcome to Yelp Camp!');
      res.redirect('/posts');
    })
  } catch (e) {
    req.flash('error', e.message)
    res.redirect('/register')
  }

}

module.exports.renderLogin = (req, res) => {
  res.render('users/login', { title: 'Login' })
}

module.exports.login = (req, res) => {
  req.flash('success', 'Welcome Back!')
  redirectUrl = req.session.returnTo || '/posts';
  res.redirect(redirectUrl)
}

module.exports.logout = (req, res,) => {
  req.logout();
  req.flash('success', "Goodbye!");
  res.redirect('/posts');
}
