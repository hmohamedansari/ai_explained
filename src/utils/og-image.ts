/**
 * OG image generation utility.
 * Uses satori (JSX → SVG) + @resvg/resvg-js (SVG → PNG).
 * Fonts loaded from @fontsource/inter at build time — no network calls required.
 */

import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import { createElement as h } from 'react';
import { readFileSync } from 'node:fs';
import path from 'node:path';

// process.cwd() is the project root when running `astro build`
const fontBase = path.join(process.cwd(), 'node_modules/@fontsource/inter/files');
const fontRegular = readFileSync(path.join(fontBase, 'inter-latin-400-normal.woff'));
const fontBold    = readFileSync(path.join(fontBase, 'inter-latin-700-normal.woff'));

export interface OGParams {
  title: string;
  trackLabel: string;
  moduleId: string;
}

export async function generateOGImage({ title, trackLabel, moduleId }: OGParams): Promise<Buffer> {
  const element = h(
    'div',
    {
      style: {
        display: 'flex',
        width: '1200px',
        height: '630px',
        backgroundColor: '#0f1117',
      },
    },
    // Left brand accent bar
    h('div', { style: { width: '8px', height: '630px', backgroundColor: '#4f62fa', flexShrink: 0 } }),

    // Content column
    h(
      'div',
      { style: { display: 'flex', flexDirection: 'column', flex: 1, padding: '60px 72px' } },

      // Site name — top
      h('div', { style: { fontSize: '15px', fontWeight: 700, color: '#4f62fa', letterSpacing: '3px' } }, 'AI EXPLAINED'),

      // Spacer
      h('div', { style: { flex: 1 } }),

      // Module title
      h(
        'div',
        {
          style: {
            fontSize: title.length > 40 ? '56px' : '68px',
            fontWeight: 700,
            color: '#ffffff',
            lineHeight: '1.1',
            marginBottom: '28px',
            maxWidth: '1020px',
          },
        },
        title,
      ),

      // Track + moduleId row
      h(
        'div',
        { style: { display: 'flex', alignItems: 'center', gap: '16px' } },
        h('span', { style: { fontSize: '22px', fontWeight: 400, color: '#94a3b8' } }, trackLabel),
        h(
          'span',
          {
            style: {
              fontSize: '14px',
              fontWeight: 700,
              color: '#4f62fa',
              backgroundColor: 'rgba(79,98,250,0.15)',
              padding: '5px 14px',
              borderRadius: '8px',
            },
          },
          moduleId,
        ),
      ),
    ),
  );

  const svg = await satori(element, {
    width: 1200,
    height: 630,
    fonts: [
      { name: 'Inter', data: fontRegular, weight: 400, style: 'normal' },
      { name: 'Inter', data: fontBold,    weight: 700, style: 'normal' },
    ],
  });

  const resvg = new Resvg(svg);
  return resvg.render().asPng();
}
