import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const [modules, tracks] = await Promise.all([
    getCollection('modules', ({ data }) => !data.draft && data.status === 'published'),
    getCollection('tracks'),
  ]);

  // Build a lookup: track slug → numeric order from tracks collection
  const trackOrder = Object.fromEntries(tracks.map(t => [t.id, t.data.order]));

  const sorted = modules.sort((a, b) => {
    const trackDiff = (trackOrder[a.data.track] ?? 0) - (trackOrder[b.data.track] ?? 0);
    if (trackDiff !== 0) return trackDiff;
    return a.data.order - b.data.order;
  });

  return rss({
    title: 'AI Explained: New Modules',
    description: 'Free, open-source AI education; new modules as they are published.',
    site: context.site!,
    items: sorted.map(mod => {
      const slug = mod.slug.split('/')[1];
      return {
        title: mod.data.title,
        description: mod.data.seoDescription ?? mod.data.description,
        pubDate: new Date(mod.data.lastReviewed),
        link: `/learn/${mod.data.track}/${slug}`,
        categories: [mod.data.track, mod.data.volatility],
      };
    }),
    customData: `<language>en-gb</language>`,
  });
}
