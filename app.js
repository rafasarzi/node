const express = require("express");
const res = require("express/lib/response");
const mongoose = require("mongoose");

require("./models/Artigos");
const Artigo = mongoose.model("artigo");
const app = express();

app.use(express.json());

mongoose
  .connect("mongodb://localhost/BDTeste", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Conexão MongoDB realizada com sucesso");
  })
  .catch((erro) => {
    console.log("Erro: Conexão MongoDB não foi realizada com sucesso");
  });

app.get("/", (req, res) => {
  Artigo.find({})
    .then((artigo) => {
      return res.json(artigo);
    })
    .catch((erro) => {
      return res.status(400).json({
        error: true,
        mensage: "nenhum artigo encontrado",
      });
    });
});

app.get("/artigo/:id", (req, res) => {
  Artigo.findOne({ _id: req.params.id })
    .then((artigo) => {
      return res.json(artigo);
    })
    .catch((erro) => {
      return res.status(400).json({
        error: true,
        mensage: "Nenhum artigo encontrado...",
      });
    });
});

app.post("/artigo", (req, res) => {
  const artigo = Artigo.create(req.body, (err) => {
    if (err)
      return res.status(400).json({
        error: true,
        message: "Error: artigo não foi cadastrado com sucesso",
      });
    return res.status(200).json({
      error: false,
      message: "Artigo cadastrado com sucesso",
    });
  });
});

app.put("/artigo/:id", (req, res) => {
  const artigo = Artigo.updateOne({ _id: req.params.id }, req.body, (err) => {
    if (err)
      return res.status(400).json({
        error: true,
        mensage: "Erro: Não foi editado nenhum artigo",
      });
    return res.json({
      error: false,
      message: "Artigo editado com sucesso",
    });
  });
});

app.delete("/artigo/:id", (req, res) => {
  const artigo = Artigo.deleteOne({ _id: req.params.id }, (err) => {
    if (err)
      return res.status(400).json({
        error: true,
        mensage: "Erro: Não foi apagado nenhum artigo",
      });
    return res.json({
      error: false,
      message: "Artigo apagado com sucesso",
    });
  });
});

app.listen(8080, () => {
  console.log("Servidor iniciado na porta 8080: http://localhost:8080/");
});
