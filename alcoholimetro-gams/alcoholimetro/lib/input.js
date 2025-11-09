// lib/input.js
const readline = require('readline');
const { aNumero } = require('./math-lib');
const logger = require('./logger');

function preguntar(rl, texto) {
  return new Promise(resolve => rl.question(texto, ans => resolve(ans.trim())));
}

function parseSexo(raw) {
  if (!raw) return null;
  const s = String(raw).trim().toLowerCase();
  if (['h', 'm'].includes(s)) return s;
  if (s === 'masculino' || s === 'macho' || s === 'male') return 'h';
  if (s === 'f' || s === 'femenino' || s === 'female') return 'm';
  return null;
}

function validar({ peso, sexo, tragos, horas }) {
  const errores = [];
  if (aNumero(peso) === null || aNumero(peso) <= 0) errores.push('peso');
  if (!['h', 'm'].includes(sexo)) errores.push('sexo');
  if (aNumero(tragos) === null || aNumero(tragos) < 0) errores.push('tragos');
  if (aNumero(horas) === null || aNumero(horas) < 0) errores.push('horas');
  return errores;
}

async function obtenerDatos() {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

  logger.info('\n--- ALCOHOLÍMETRO INTERACTIVO ---');

  while (true) {
    const pesoStr = await preguntar(rl, 'Ingrese su peso (kg): ');
    const sexoStr = await preguntar(rl, 'Ingrese su sexo (H/M): ');
    const tragosStr = await preguntar(rl, '¿Cuántos tragos estándar ha consumido?: ');
    const horasStr = await preguntar(rl, '¿Hace cuántas horas fue su último trago?: ');

    const data = {
      peso: aNumero(pesoStr),
      sexo: parseSexo(sexoStr),
      tragos: aNumero(tragosStr),
      horas: aNumero(horasStr)
    };

    const errores = validar(data);
    if (errores.length === 0) {
      rl.close();
      return data;
    }

    logger.warn(`Entradas inválidas: ${errores.join(', ')}. Por favor ingrese los datos nuevamente.`);
  }
}

module.exports = { obtenerDatos };
