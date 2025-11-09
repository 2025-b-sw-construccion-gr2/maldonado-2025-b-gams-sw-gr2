// lib/logger.js
const chalk = require('chalk');

// Simple level mechanism: lower number = more verbose
const LEVELS = { debug: 0, info: 1, warn: 2, error: 3, silent: 4 };
let currentLevel = LEVELS.info;

function setLevel(levelName) {
  if (LEVELS[levelName] === undefined) return false;
  currentLevel = LEVELS[levelName];
  return true;
}

function shouldLog(levelName) {
  return LEVELS[levelName] >= currentLevel;
}

function timestamp() {
  return new Date().toISOString();
}

function info(msg) {
  if (!shouldLog('info')) return;
  console.log(chalk.cyan(`[INFO] ${timestamp()}`), msg);
}

function debug(msg) {
  if (!shouldLog('debug')) return;
  console.log(chalk.gray(`[DEBUG] ${timestamp()}`), msg);
}

function success(msg) {
  if (!shouldLog('info')) return;
  console.log(chalk.green(`[OK] ${timestamp()}`), msg);
}

function warn(msg) {
  if (!shouldLog('warn')) return;
  console.log(chalk.yellow(`[WARN] ${timestamp()}`), msg);
}

function error(msg) {
  if (!shouldLog('error')) return;
  console.error(chalk.red(`[ERROR] ${timestamp()}`), msg);
}

function resultadoBAC(bac, estado) {
  if (!shouldLog('info')) return;
  console.log(chalk.bold('\n--- RESULTADO DEL ALCOHOLÍMETRO ---'));
  console.log(chalk.yellow(`Nivel estimado de alcohol en sangre (BAC): ${bac}%`));
  console.log(chalk.magenta(`Estado: ${estado}`));
  if (typeof bac === 'number') {
    if (bac >= 0.08) {
      console.log(chalk.redBright('\n⚠️  No puede conducir, supera el límite legal.'));
    } else if (bac >= 0.03) {
      console.log(chalk.yellowBright('\n⚠️  Precaución: sus reflejos pueden estar afectados.'));
    } else {
      console.log(chalk.greenBright('\n✅ Está sobrio o dentro del límite seguro.'));
    }
  }
  console.log('------------------------------------\n');
}

module.exports = { setLevel, info, debug, success, warn, error, resultadoBAC };
