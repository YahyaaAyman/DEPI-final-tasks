const express = require("express");
const pageController = require("../app/controllers/page.controller");
const router = express.Router();

router.get("/", pageController.index);
router.get("/about", pageController.about);
router.get("/contact", pageController.contact);
router.get("/posts", pageController.posts);

module.exports = router;
