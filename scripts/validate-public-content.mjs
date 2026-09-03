import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const root = join(process.cwd(), 'src', 'content', 'modules');
const publicTracks = new Set(['automation-to-agents', 'advanced', 'agents-in-production']);
const failures = [];

for (const track of readdirSync(root, { withFileTypes: true })) {
  if (!track.isDirectory() || !publicTracks.has(track.name)) continue;
  for (const file of readdirSync(join(root, track.name))) {
    if (!file.endsWith('.mdx')) continue;
    const path = join(root, track.name, file);
    const text = readFileSync(path, 'utf8');
    const frontmatter = text.match(/^---\n([\s\S]*?)\n---/);
    if (!frontmatter) {
      failures.push(`${path}: missing frontmatter`);
      continue;
    }
    const meta = frontmatter[1];
    const volatility = meta.match(/^volatility:\s*"?([^"\n]+)"?$/m)?.[1];
    if (['emerging', 'volatile'].includes(volatility ?? '') && (!/^references:/m.test(meta) || !/^\s+- title:/m.test(meta) || !/^\s+url:/m.test(meta))) {
      failures.push(`${path}: ${volatility} published lessons need at least one structured primary reference`);
    }
  }
}

if (failures.length) {
  console.error('Public content validation failed:');
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log('Public content validation passed: all emerging and volatile lessons have structured references.');
