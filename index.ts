import * as Commander from 'commander'
import * as Actions from '@actions/core'
import * as Os from 'node:os'
import * as Fs from 'node:fs'

Actions.info(`Running on ${Os.cpus()[0].model} with ${Os.cpus().length} threads/vCPUs.`)

const Program = new Commander.Command()

// Set options.
Program.option('--gh-token <TOKEN>', 'GitHub token', '')
	.option('--ci-workspace-path <PATH>', 'A path to the CI workspace.', '')
	.option('--ci-action-path <PATH>', 'A path to the CI action.', '')
	.option('--filterslistname <NAME>', 'Path of a targeted filters list', '')

// Initialize Input of the options and export them.
Program.parse()

const Options = Program.opts() as {
	// eslint-disable-next-line @typescript-eslint/naming-convention
	ghToken: string
	// eslint-disable-next-line @typescript-eslint/naming-convention
	filterslistname: string
	// eslint-disable-next-line @typescript-eslint/naming-convention
	ciWorkspacePath: string
	// eslint-disable-next-line @typescript-eslint/naming-convention
	ciActionPath: string
}

if (!Fs.existsSync(Options.filterslistname)) {
	Actions.error(`The filters list file does not exist at the path: ${Options.filterslistname}`)
	process.exit(1)
}

