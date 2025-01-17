const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

// essa porta pode ser tanto configurada manual quanto de forma automatica
const PORT = process.env.PORT || 3333;

let corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// requests de json
app.use(bodyParser.json());


app.use(bodyParser.urlencoded({ extended: true }));



// dropa a tabela se ela já existir
const db = require("./app/models");
db.sequelize.sync();

// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Dropando e fazendo re-sync db.");
// });


require("./app/routes/routes")(app);
// rota teste
app.get("/", (req, res) => {
  res.json({ message: "test" });
});


app.listen(PORT, () => {
  console.log(`Servidor RODANDO na porta: ${PORT} com SUCESSO.`);
});
