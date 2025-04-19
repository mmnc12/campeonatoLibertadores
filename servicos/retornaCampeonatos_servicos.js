import campeonatos from "../dados/dados.js";
import pool from "./conexao.js";

const conexao = await pool.getConnection();

const executaQuery = async (conexao, query) => {
  const resultado_query = await conexao.query(query);
  const resposta = resultado_query[0];

  return resposta;
}

export const retornaCampeonatos = async () => {
  const query = "SELECT id, campeao, vice, ano FROM campeonatos";
  const campeonatos = executaQuery(conexao, query);

  conexao.release();

  return campeonatos;
}

export const retornaCampeonatosPorId = async (id) => {
  const query = `SELECT id, campeao, vice, ano FROM campeonatos WHERE id = ${id}`;
  const campeonato = executaQuery(conexao, query);

  conexao.release();

  return campeonato;
}

export const retornaCampeonatosPorAno = async (ano) => {
  const query = `SELECT id, campeao, vice, ano FROM campeonatos WHERE ano = ${ano}`;
  const campeonato = executaQuery(conexao, query);

  conexao.release();

  return campeonato;
}

export const retornarCampeonatosPorTime = async (time) => {
  const query = `SELECT id, campeao, vice, ano FROM campeonatos WHERE campeao = "${time}"`;
  const campeonatos = executaQuery(conexao, query);

  conexao.release();

  return campeonatos;
}

