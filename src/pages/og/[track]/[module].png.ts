import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { generateOGImage } from '@/utils/og-image';

export async function getStaticPaths() {
  const modules = await getCollection('modules', ({ data }) =>
    !data.draft && data.status === 'published'
  );
  return modules.map(mod => {
    const [track, slug] = mod.slug.split('/');
    return { params: { track, module: slug }, props: { mod } };
  });
}

export const GET: APIRoute = async ({ props }) => {
  const { mod } = props as Awaited<ReturnType<typeof getStaticPaths>>[number]['props'];
  const png = await generateOGImage({
    title: mod.data.title,
    trackLabel: mod.data.track.replace(/-/g, ' '),
    moduleId: mod.data.moduleId,
  });
  return new Response(png, {
    headers: { 'Content-Type': 'image/png' },
  });
};
