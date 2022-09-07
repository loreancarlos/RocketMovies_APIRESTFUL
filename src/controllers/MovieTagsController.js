const knex = require("../database/knex");
const AppError = require("../utils/AppError");

class MovieTagsController {
   async show(request, response) {
      const { user_id } = request.params;
      console.log("Estou dentro do show:" + user_id);

      if (!user_id) {
         throw new AppError("Este usuário não existe.");
      }

      const tags = await knex("movie_tags")
         .where({ user_id });

      if (!tags.length) {
         throw new AppError("Você não cadastrou nenhuma tag ainda.");
      }

      return response.json(tags);
   }

   async index(request, response) {
      const tags = await knex("movie_tags");
      if (!tags.length) {
         throw new AppError("Não há tags cadastradas.");
      }

      return response.json(tags);
   }
}

module.exports = MovieTagsController;