import * as AGLint from '@adguard/aglint'
import * as AGTree from '@adguard/agtree'

export class LintDaemon {
  private readonly Filters = null

  constructor(Filters: string) {
    this.Filters = Filters
  }

  private Lint() {
    const Linter = new AGLint.Linter(true)
    Linter.setConfig({ syntax: [AGTree.AdblockSyntax.Common] })
    return Linter.lint(this.Filters)
  }

  Run() {
    return this.Lint().fatalErrorCount === 0
  }
}