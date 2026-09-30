// PostToolUse hook: format every file Claude edits or writes.
// Claude Code passes the tool call as JSON on stdin.
import { execSync } from 'node:child_process';

let input = '';
for await (const chunk of process.stdin) input += chunk;

const file = JSON.parse(input).tool_input?.file_path;

if (file && /\.(ts|html|scss|css|json|md)$/.test(file)) {
  try {
    execSync(`pnpm exec prettier --write "${file}"`, { stdio: 'ignore' });
  } catch {
    // Don't block Claude if formatting fails; just report it.
    process.stderr.write(`prettier failed on ${file}\n`);
  }
}
