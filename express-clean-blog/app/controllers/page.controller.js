function index(req, res) {
  res.render("pages/index.ejs");
}

function about(req, res) {
  res.render("pages/about.ejs");
}

function contact(req, res) {
  res.render("pages/contact.ejs");
}

function posts(req, res) {
  res.render("pages/posts.ejs");
}

module.exports = {
  index,
  about,
  posts,
  contact,
};
