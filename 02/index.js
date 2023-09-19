// const express = require('express')
// const app = express()


// function formatarTempo(minutos, segundos) {
//   const minutosFormatados = minutos < 10 ? `0${minutos}` : minutos;
//   const segundosFormatados = segundos < 10 ? `0${segundos}` : segundos;
//   const tempoFormatado = `${minutosFormatados} minutos e ${segundosFormatados} segundos`;
//   return tempoFormatado;
// }

// const minutos = 1
// const segundos = 7
// // let intervalo;
// let tempoAtual = formatarTempo(minutos, segundos);


// app.get('/', (req, res)=>{
//   res.send(`Tempo Atual do cronômetro: ${formatarTempo(minutos,segundos)}`)
// })

// app.get('/iniciar', (req, res)=>{
//     // intervalo = setInterval(()=>{
//     //   if (segundos === 60) {
//     //     minutos++;
//     //     segundos = 0;
//     //   }
//     //   tempoAtual = `${minutos} minutos e ${segundos} segundos`
//     // },1000);
//   res.send(`Cronômetro iniciado!
//   \nTempo Atual do cronômetro: ${tempoAtual}`)
// })

// // app.get('/pausar', (req, res)=>{
// //   res.send("Cronômetro Pausado!")
// // })

// // app.get('/continuar', (req, res)=>{
// //   res.send("Cronômetro Continuando!")
// // })

// app.get('/zerar', (req, res)=>{
//   tempoAtual = formatarTempo(0,0)
//   res.send(`Cronômetro Zerado!\nTempo Atual do cronômetro: ${tempoAtual}`)
// })



const express = require('express');
const app = express();

//teste
// let minutos = 1;
// let segundos = 7;

let minutos = 1;
let segundos = 7;
let interval;


function formatarTempo() {
  let minutosFormatados;
  let segundosFormatados;

  if (minutos < 10) {
    minutosFormatados = `0${minutos}`;
  } else {
    minutosFormatados = minutos;
  }

  if (segundos < 10) {
    segundosFormatados = `0${segundos}`;
  } else {
    segundosFormatados = segundos;
  }

  const tempoFormatado = `${minutosFormatados} minutos e ${segundosFormatados} segundos`;
  return tempoFormatado;
}

app.get('/', (req, res) => {
  const tempoAtual = formatarTempo();
  res.send(`Tempo atual do cronômetro: ${tempoAtual}`);
});

app.get('/iniciar', (req, res) => {
  if (!interval) {
    interval = setInterval(() => {
      segundos++;
      if (segundos === 60) {
        minutos++;
        segundos = 0;
      }
    }, 1000);
    const tempoAtual = formatarTempo();
    res.send(`Cronômetro iniciado! Tempo atual: ${tempoAtual}`);
  }
});

app.get('/pausar', (req, res) => {
  clearInterval(interval);
  interval = undefined;
  const tempoAtual = formatarTempo();
  res.send(`Cronômetro pausado! Tempo atual: ${tempoAtual}`);
});

app.get('/continuar', (req, res) => {
  if (!interval) {
    interval = setInterval(() => {
      segundos++;
      if (segundos === 60) {
        minutos++;
        segundos = 0;
      }
    }, 1000);
    const tempoAtual = formatarTempo();
    res.send(`Cronômetro continuando! Tempo atual: ${tempoAtual}`);
  }
});

app.get('/zerar', (req, res) => {
  minutos = 0;
  segundos = 0;
  clearInterval(interval);
  interval = undefined;
  const tempoAtual = formatarTempo();
  res.send(`Cronômetro zerado! Tempo atual: ${tempoAtual}`);
});


app.listen(8000, ()=>{
  console.log('Servidor rodando em http://localhost:8000/');
})