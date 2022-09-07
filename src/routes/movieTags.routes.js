const { Router } = require("express");
const MovieTagsController = require("../controllers/MovieTagsController");

const movieTagsRoutes = Router();
const movieTagsController = new MovieTagsController();

/* movieTagsRoutes.post("/", movieTagsController.create);
movieTagsRoutes.put("/", movieTagsController.update); */
movieTagsRoutes.get("/:user_id", movieTagsController.show);
movieTagsRoutes.get("/", movieTagsController.index);
/* movieTagsRoutes.delete("/", movieTagsController.delete); */

module.exports = movieTagsRoutes;