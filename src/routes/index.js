const { Router } = require("express");
const usersRoutes = require("./users.routes");
const movieNotesRoutes = require("./movieNotes.routes");
const movieTagsRoutes = require("./movieTags.routes");
const sessionsRoutes = require("./sessions.routes");

const uploadConfig = require("../configs/upload");
const express = require("express");

const routes = Router();

//Criando e redirecionando Rotas
routes.use("/files", express.static(uploadConfig.UPLOADS_FOLDER));
routes.use("/users", usersRoutes);
routes.use("/movieNotes", movieNotesRoutes);
routes.use("/movieTags", movieTagsRoutes);
routes.use("/sessions", sessionsRoutes);

module.exports = routes;