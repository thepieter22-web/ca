import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: ['nl'],
  defaultLocale: 'nl'
});

export const config = {
  matcher: ['/', '/nl/:path*']
};
