import type { Handle } from '@sveltejs/kit';

const securityHeaders: Record<string, string> = {
  'Cache-Control': 'public, max-age=0, s-maxage=86400',
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'Referrer-Policy': 'no-referrer',
  'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload'
};

export const handle: Handle = async ({ event, resolve }) => {
  const response = await resolve(event);

  for (const [header, value] of Object.entries(securityHeaders)) {
    response.headers.set(header, value);
  }

  return response;
};
