import path from 'path'
import fs from 'fs'
import { Command } from 'commander'
import { convertTypes1ToTypes2 } from './lib'

const program = new Command()
  .version('0.0.1')
  .description('converter anchor idl')

program.command('to-old')
  .requiredOption('-i, --input <path>', 'Input file path')
  .requiredOption('-o, --output <path>', 'Output file path')
  .action((options) => {
    try {
      const cwd = process.cwd()
      const inputPath = path.resolve(cwd, options.input)
      const outputPath = path.resolve(cwd, options.output)
      const data = JSON.parse(fs.readFileSync(inputPath, 'utf8'))

      // convert
      const convertedIDL = convertTypes1ToTypes2(data)
      fs.writeFileSync(outputPath, JSON.stringify(convertedIDL, null, 2))
      console.log(`converted types written to: ${outputPath}`)
    } catch (error) {
      console.error(`error when converting: ${error}`)
    }
  })
  
program.parse(process.argv)