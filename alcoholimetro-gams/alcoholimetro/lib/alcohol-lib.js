// lib/alcohol-lib.js
const { redondear2, esNumero } = require('./math-lib');

const GRAMOS_POR_TRAGO = 14; // gramos de alcohol puro por trago estándar
const ELIMINACION_POR_HORA = 0.015; // aproximado

/**
 * Calcula el BAC (porcentaje) usando una versión simplificada de Widmark.
 * @param {number} pesoKg
 * @param {number} tragos
 * @param {number} horas
 * @param {string} sexo  'h' o 'm'
 * @returns {number}
 */
function calcularBAC(pesoKg, tragos, horas, sexo) {
  if (![pesoKg, tragos, horas].every(esNumero)) {
    throw new Error('Datos numéricos inválidos. Asegúrese que peso, tragos y horas sean números.');
  }

  const s = (sexo || '').toString().toLowerCase();
  if (!['h', 'm'].includes(s)) throw new Error('Sexo inválido. Use "h" o "m".');

  const gramosAlcohol = tragos * GRAMOS_POR_TRAGO;
  const pesoGramos = pesoKg * 1000;
  const coef = s === 'h' ? 0.68 : 0.55;

  // Fórmula de Widmark (simplificada)
  let bac = (gramosAlcohol / (pesoGramos * coef)) * 100;
  bac -= ELIMINACION_POR_HORA * horas;
  bac = Math.max(0, bac);

  const r = redondear2(bac);
  if (r === null) throw new Error('Error al calcular BAC.');
  return r;
}

function estadoLegal(bac) {
  if (!esNumero(bac)) return 'Desconocido';
  if (bac === 0) return 'Sobrio';
  if (bac < 0.03) return 'Apto para conducir (casi sobrio)';
  if (bac < 0.08) return 'Afectado: No se recomienda conducir';
  return 'Ilegal: No debe conducir';
}

module.exports = { calcularBAC, estadoLegal };
