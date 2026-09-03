import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const publicTracks = new Set(['automation-to-agents', 'advanced', 'agents-in-production']);
const retiredTracks = ['agents', 'evaluation', 'foundations', 'infrastructure', 'multimodal', 'protocols', 'rag', 'safety', 'strategy'];
const dist = join(process.cwd(), 'dist');
const sitemapIndex = readFileSync(join(dist, 'sitemap-index.xml'), 'utf8');
const sitemap = existsSync(join(dist, 'sitemap-0.xml'))
  ? readFileSync(join(dist, 'sitemap-0.xml'), 'utf8')
  : sitemapIndex;
const rss = readFileSync(join(dist, 'rss.xml'), 'utf8');
const failures = [];

for (const track of retiredTracks) {
  const retiredPath = `/learn/${track}/`;
  if (sitemap.includes(retiredPath) || rss.includes(retiredPath)) {
    failures.push(`retired track still appears in a public feed: ${track}`);
  }
}
for (const track of publicTracks) {
  if (!sitemap.includes(`/learn/${track}`)) failures.push(`published track is absent from sitemap: ${track}`);
}

if (failures.length) {
  console.error('Public surface verification failed:');
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}
console.log('Public surface verification passed: sitemap and RSS contain only the published journeys.');
