# FTO (Freedom-to-Operate) Chart — <candidate>

Produced by `$inventor-gate`. Unlike the patentability chart, this only considers **live claims** — expired and abandoned references don't create infringement risk, even though they matter for patentability. FTO asks a different question entirely: would *our planned implementation* infringe someone else's *active* claim?

## Planned implementation, step by step

List each planned product step or component from the invention card.

| Step/component | Description |
| --- | --- |
| 1 | |
| 2 | |

## Live claims charted against our implementation

| Live claim (patent #, claim #) | Jurisdiction | Expected expiration | Family/continuation status | Limitation | Our step/component | Literal infringement? | Doctrine-of-equivalents concern? | Available design-around |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| | | | | | | | | |

## Design-around options

For any row with infringement or equivalents risk, note whether a design-around exists and what it would cost (engineering effort, performance, or feature tradeoff).

## Detectability

Could infringement of *our* claims (if we file) realistically be observed or proved against a third party? An unenforceable-in-practice claim has little strategic value even if it issues.

## License-strategy check

Does the repository's own license already grant away some of the exclusivity being sought here? (e.g. a permissive license's built-in patent grant typically covers only claims a contribution necessarily infringes, alone or combined with the work — check `.inventor.json`'s `repositoryLicense` field and the actual license text.)

## Conclusion

<Overall FTO risk assessment for this candidate — clear / clear-with-design-around / blocked. This is an input to counsel's determination, not the determination itself.>
