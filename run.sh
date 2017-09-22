#!/bin/bash
#(VS Code) For pretty-print logging while debugging add "runtimeExecutable": "${workspaceRoot}/run.sh" to launch.json
node $@ | node_modules/.bin/bunyan