// lib/math-lib.js
'use strict';

/**
 * Comprueba si un valor es un número finito válido (no NaN, no Infinity).
 * @param {*} val
 * @returns {boolean}
 */
function esNumero(val) {
  return typeof val === 'number' && Number.isFinite(val);
}

/**
 * Redondea a 2 decimales. Devuelve null si la entrada no es un número válido.
 * @param {number} num
 * @returns {number|null}
 */
function redondear2(num) {
  if (!esNumero(num)) return null;
  return Math.round(num * 100) / 100;
}

/**
 * Convierte una entrada (string o number) a número.
 * Acepta coma decimal y espacios. Devuelve null si no es convertible.
 * @param {string|number} val
 * @returns {number|null}
 */
function aNumero(val) {
  if (val === null || val === undefined) return null;
  if (typeof val === 'number') return esNumero(val) ? val : null;
  if (typeof val !== 'string') return null;

  const cleaned = val.replace(/,/g, '.').trim();
  if (cleaned === '') return null;

  const n = Number(cleaned);
  return esNumero(n) ? n : null;
}

module.exports = { esNumero, redondear2, aNumero };
