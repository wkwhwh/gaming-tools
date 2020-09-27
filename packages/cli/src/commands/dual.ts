import { Command, flags } from '@oclif/command'
import { cli } from 'cli-ux'
import { getDualInfo } from '@gaming-tools/libraries/dual'

export default class Dual extends Command {
  static description = 'describe the command here'

  static flags = {
    help: flags.help({ char: 'h' }),
  }

  static args = [{ name: 'command', required: true }]

  async run() {
    const { args } = this.parse(Dual)

    const oreInfo = []

    try {
      const dualInfo = await getDualInfo(args.command)

      for (const [i, planet] of dualInfo.planets.entries()) {
        oreInfo.push({
          planet,
          depth: dualInfo.oreValues[i],
        })
      }

      cli.table(oreInfo, {
        planet: {
          minWidth: 12,
        },
        depth: {},
      })
    } catch (error) {
      return this.warn(error)
    }
  }
}
