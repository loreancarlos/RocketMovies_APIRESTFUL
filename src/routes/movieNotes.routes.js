const { Router } = require("express");
const MovieNotesController = require("../controllers/MovieNotesController");

const movieNotesRoutes = Router();
const movieNotesController = new MovieNotesController();

movieNotesRoutes.post("/", movieNotesController.create);
movieNotesRoutes.put("/", movieNotesController.update);
movieNotesRoutes.get("/:id", movieNotesController.show);
movieNotesRoutes.get("/", movieNotesController.index);
movieNotesRoutes.delete("/", movieNotesController.delete);

module.exports = movieNotesRoutes;