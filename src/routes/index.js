const { Router } = require("express");
const usersRoutes = require("./users.routes");
const movieNotesRoutes = require("./movieNotes.routes");
const movieTagsRoutes = require("./movieTags.routes");
const sessionsRoutes = require("./sessions.routes");

const routes = Router();

//Criando e redirecionando Rotas
routes.use("/users", usersRoutes);
routes.use("/movieNotes", movieNotesRoutes);
routes.use("/movieTags", movieTagsRoutes);
routes.use("/sessions", sessionsRoutes);

module.exports = routes;