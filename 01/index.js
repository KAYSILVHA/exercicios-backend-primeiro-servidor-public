const express = require('express')
const app = express()

const jogadores = ["José", "Maria", "João", "Marcos", "Fernanda"];
let indiceJogadorAtual = 0;

app.get('', (req, res)=>{
  let nomeDoJogador = jogadores[indiceJogadorAtual];
  console.log(indiceJogadorAtual)
  res.send(`É a vez de ${nomeDoJogador}`);
  indiceJogadorAtual= (indiceJogadorAtual+1) % jogadores.length;
})



app.listen(3000, ()=>{
  console.log('Servidor rodando em http://localhost:3000/');
})