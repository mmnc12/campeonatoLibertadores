import express from 'express';
import pool from './servicos/conexao.js';
import { retornaCampeonatos, retornaCampeonatosPorAno, retornaCampeonatosPorId, retornarCampeonatosPorTime } from './servicos/retornaCampeonatos_servicos.js';

const app = express();

app.get('/campeonatos', async (req, res) => {
  let campeonatos;

  const ano = req.query.ano;
  const time = req.query.time;

  if (typeof ano === 'undefined' && typeof time === 'undefined') {
    campeonatos = await retornaCampeonatos();
  } else if (typeof ano !== 'undefined') {
    campeonatos = await retornaCampeonatosPorAno(parseInt(ano));
  } else if (typeof time !== 'undefined') {
    campeonatos = await retornarCampeonatosPorTime(time);
  }

  if (campeonatos.length > 0) {
    res.json(campeonatos);
  } else {
    res.status(404).json({ mensagem: "Nenhum campeonato encontrado!" })
  }
});

app.get('/campeonatos/:id', async (req, res) => {
  const id = Number(req.params.id);
  const campeonatoId = await retornaCampeonatosPorId(id);

  if (campeonatoId.length > 0) {
    res.json(campeonatoId);
  } else {
    res.status(404).json({ messagem: "Nenhum campeonato encontrado!" })
  }
});

app.listen(8080, async () => {
  const data = new Date();
  console.log(`Servidor node iniciado em ${data}`);
});