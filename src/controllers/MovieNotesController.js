const knex = require("../database/knex");
const AppError = require("../utils/AppError");

class MovieNotesController {
   async create(request, response) {
      const { title, description, rating, tags } = request.body;
      const user_id = request.user.id;

      const user = await knex("users")
         .where({ id: user_id }).first();

      if (!user) {
         throw new AppError("Este usuário não existe!");
      }

      const note_id = await knex("movie_notes")
         .insert({
            title,
            description,
            rating,
            user_id
         });

      const tagsInsert = tags.map(name => {
         return {
            user_id,
            note_id,
            name
         };
      });

      await knex("movie_tags").insert(tagsInsert);

      return response.status(201).json();
   }

   async update(request, response) {
      const { id, title, description, rating, tags } = request.body;
      const user_id = request.user.id;

      if (!id || !title || !description || !rating) {
         throw new AppError("Está faltando dados na requisição.");
      }

      const note = await knex("movie_notes").where({ id }).first();
      if (!note) {
         throw new AppError("Nota não encontrada!");
      }

      note.title = title ?? note.title;
      note.description = description ?? note.description;
      note.rating = rating ?? note.rating;

      await knex("movie_notes")
         .update({
            title: note.title,
            description: note.description,
            rating: note.rating,
            updated_at: knex.fn.now()
         })
         .where({ id });

      const tagsUpdate = tags.map(name => {
         return {
            user_id,
            note_id: id,
            name
         };
      });

      //+++++++++++++++++++++ Melhorar +++++++++++++++++++++

      await knex("movie_tags")
         .delete()
         .where({ user_id })
         .where({ note_id: id });

      await knex("movie_tags")
         .insert(tagsUpdate);

      return response.status(200).json();
   }

   async show(request, response) {
      const { id } = request.params;

      if (!id) {
         throw new AppError("Você não informou o ID.");
      }

      const note = await knex("movie_notes")
         .where({ id })
         .first();

      if (!note) {
         throw new AppError("Esta nota não existe.");
      }

      return response.json(note);
   }

   async index(request, response) {
      const notes = await knex("movie_notes");
    
      if (!notes.length) {
         throw new AppError("Não há notas cadastradas.");
      }

      response.json({ notes });
   }

   async delete(request, response) {
      const { id } = request.body;

      if (!id) {
         throw new AppError("Você precisa informar o ID da nota que será deletada.");
      }

      const note = await knex("movie_notes").where({ id }).first();
      
      if (!note) {
         throw new AppError("Esta nota não existe.");
      }

      await knex("movie_notes").delete().where({ id });
      return response.json();
   }
}

module.exports = MovieNotesController;