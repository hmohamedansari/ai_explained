/** The only curriculum intentionally published in this rebuild. */
export const PUBLIC_TRACKS = [
  'automation-to-agents',
  'advanced',
  'agents-in-production',
] as const;

export type PublicTrack = (typeof PUBLIC_TRACKS)[number];

export function isPublicTrack(track: string): track is PublicTrack {
  return PUBLIC_TRACKS.includes(track as PublicTrack);
}

export function isPublicModule(data: { track: string; draft: boolean; status: string }): boolean {
  return isPublicTrack(data.track) && !data.draft && data.status === 'published';
}
