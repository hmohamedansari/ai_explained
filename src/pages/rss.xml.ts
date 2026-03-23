import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const modules = await getCollection('modules', ({ data }) =>
    !data.draft && data.status === 'published'
  );

  const sorted = modules.sort((a, b) => {
    // Sort by track order, then module order
    if (a.data.track !== b.data.track) {
      return a.data.track.localeCompare(b.data.track);
    }
    return a.data.order - b.data.order;
  });

  return rss({
    title: 'AI Explained — New Modules',
    description: 'Free, open-source AI education — new modules as they are published.',
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
