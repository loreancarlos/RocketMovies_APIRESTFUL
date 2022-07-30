const knex = require("../database/knex");
const AppError = require("../utils/AppError");
const { hash, compare } = require("bcryptjs");

class UsersController {
   async create(request, response) {
      const { name, email, password } = request.body;

      const emailInUse = await knex("users")
         .where({ email }).first();

      if (emailInUse) {
         throw new AppError("Este email já está em uso!");
      }

      const hashedPassword = await hash(password, 8);

      await knex("users")
         .insert({
            name,
            email,
            password: hashedPassword
         });

      return response.status(201).json();
   }

   async update(request, response) {
      const { id, name, email, oldPassword, password } = request.body;
      if (!id || !name || !email || !oldPassword || !password) {
         throw new AppError("Está faltando dados na requisição.");
      }

      const user = await knex("users").where({ id }).first();
      if (!user) {
         throw new AppError("Usuário não encontrado!");
      }

      const passwordIsRight = await compare(oldPassword, user.password);
      if (!passwordIsRight) {
         throw new AppError("Senha incorreta!");
      }

      const emailIsInUse = await knex("users").where({ email }).first();
      if ((emailIsInUse) && (emailIsInUse.id !== user.id)) {
         throw new AppError("Este email já está sendo usado!");
      }

      user.name = name ?? user.name;
      user.email = email ?? user.email;
      user.password = await hash(password, 8);

      await knex("users")
         .update({
            name: user.name,
            email: user.email,
            password: user.password,
            updated_at: knex.fn.now()
         })
         .where({ id });

      return response.status(200).json();
   }

   async show(request, response) {
      const { id } = request.params;
      if (!id) {
         throw new AppError("Você não informou o ID.");
      }

      const user = await knex("users").where({ id }).first();
      if (!user) {
         throw new AppError("Este usuário não existe.");
      }

      return response.json({ user });
   }

   async index(request, response) {
      const users = await knex("users");
      response.json(users);
   }

   async delete(request, response) {
      const { id, password } = request.body;
      if (!id || !password) {
         throw new AppError("Está faltando informações na requisição.");
      }

      const user = await knex("users").where({ id }).first();
      if (!user) {
         throw new AppError("Este usuário não existe.");
      }

      const passwordIsRight = await compare(password, user.password);
      if (!passwordIsRight) {
         throw new AppError("A senha está incorreta.");
      }

      await knex("users").delete().where({ id });
      return response.json();
   }
}

module.exports = UsersController;