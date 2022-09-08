const { Router } = require("express");
const MovieTagsController = require("../controllers/MovieTagsController");

const movieTagsRoutes = Router();
const movieTagsController = new MovieTagsController();

const ensureAuthenticated = require("../middlewares/ensureAuthenticated");
movieTagsRoutes.use(ensureAuthenticated);

movieTagsRoutes.get("/", movieTagsController.index);

module.exports = movieTagsRoutes;