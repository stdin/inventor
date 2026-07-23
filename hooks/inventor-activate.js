#!/usr/bin/env node
// Inventor is opt-in, not always-on: unlike a general coding ruleset, the
// patent-diligence pipeline is only relevant to a fraction of sessions, so it
// stays silent unless a project explicitly sets "alwaysOn": true in its
// .inventor.json. Without that opt-in, this hook produces no output at all —
// the pipeline still runs on demand via the $inventor skills.
const { isAlwaysOn } = require('./inventor-config');
const { getInventorInstructions } = require('./inventor-instructions');

function writeHookOutput(context) {
  const output = {
    systemMessage: 'INVENTOR:ACTIVE',
    hookSpecificOutput: {
      hookEventName: 'SessionStart',
      additionalContext: context
    }
  };

  process.stdout.write(JSON.stringify(output));
}

if (isAlwaysOn(process.cwd())) {
  writeHookOutput(getInventorInstructions());
}
