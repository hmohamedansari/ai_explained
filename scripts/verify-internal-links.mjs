import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { extname, join, relative } from 'node:path';

const dist = join(process.cwd(), 'dist');
const failures = [];

function walk(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    return entry.isDirectory() ? walk(path) : [path];
  });
}

for (const file of walk(dist).filter((path) => path.endsWith('.html'))) {
  const html = readFileSync(file, 'utf8');
  for (const match of html.matchAll(/(?:href|src)=["'](\/[^"'#?]*)["']/g)) {
    const target = match[1];
    if (target.startsWith('/_astro/') || target.startsWith('/favicon')) continue;
    const output = extname(target)
      ? join(dist, target)
      : join(dist, target, 'index.html');
    if (!existsSync(output)) failures.push(`${relative(dist, file)} links to missing ${target}`);
  }
}

if (failures.length) {
  console.error('Internal link verification failed:');
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log('Internal link verification passed.');
