const knex = require("../database/knex");
const AppError = require("../utils/AppError");

class MovieTagsController {
   async index(request, response) {
      const tags = await knex("movie_tags");
      
      if (!tags.length) {
         throw new AppError("Não há tags cadastradas.");
      }

      return response.json({tags});
   }
}

module.exports = MovieTagsController;