#!/usr/bin/env node
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

writeHookOutput(getInventorInstructions());
