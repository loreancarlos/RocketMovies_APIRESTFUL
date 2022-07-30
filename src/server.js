require("express-async-errors");
const express = require("express");
const { request, response } = require("express");
const routes = require("./routes");
const AppError = require("./utils/AppError");

//Configurando o Server para utilização do json como padrão de comunicação
const app = express();
app.use(express.json());

//Setando as rotas da aplicação
app.use(routes);

//Tratamento - Classificação dos erros
app.use((error, request, response, next) => {
   if (error instanceof AppError) {
      return response.status(error.statusCode).json({
         status: "error",
         message: error.message
      });
   }
   return response.status(500).json({
      status: "error",
      message: "Internal server error"
   });
});

//Setando a porta que ficará ouvindo as requisições
const port = 3333;
app.listen(port, () => {
   console.log(`Server is running on port ${port}`);
});