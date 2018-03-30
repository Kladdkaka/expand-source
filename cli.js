#!/usr/bin/env node

const sourceMap = require('source-map')
const program = require('commander')
const fs = require('fs-extra')

program
  .option('-i, --input <filepath>', 'input bundle (required)')
  .option('-m, --map <filepath>', 'input source map (required)')
  .option('-o, --output <folderpath>', 'output folder (required)')
  .parse(process.argv)

if (!program.input && !program.map && !program.output) {
  program.outputHelp()
  process.exit(1)
}

if (!program.input) {
  console.error('You need to provide an input! (-i <filepath> or --input <filepath>)')
  process.exit(1)
}

if (!program.map) {
  console.error('You need to provide an source map! (-m <filepath> or --map <filepath>)')
  process.exit(1)
}

if (!program.output) {
  console.error('You need to provide an output directory! (-i <folderpath> or --input <folderpath>)')
  process.exit(1)
}

fs.pathExists(program.input)
  .then(exists => {
    if (!exists) throw new Error(`'${program.input}' does exist. Exiting.`)
    return fs.pathExists(program.map)
  })
  .then(exists => {
    if (!exists) throw new Error(`'${program.map}' does exist. Exiting.`)
    return fs.ensureDir(program.output)
  })
  .then(() => {
    
  })
  .catch(error => console.error(error))