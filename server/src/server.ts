import express from "express";

const app = express();

app.get('/ads', (req, res) => {
  return res.json([
    {
      id: 1,
      name: 'Gustavo Siqueira'
    },
    {
      id: 2,
      name: 'Thais Bortoli'
    }
  ]);
})

app.listen(3333);