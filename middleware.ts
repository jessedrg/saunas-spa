import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const LOCALES = ['es', 'en', 'de', 'fr', 'it', 'pt', 'nl', 'pl', 'sv', 'da', 'no', 'fi', 'cs', 'ro', 'hu', 'el', 'bg', 'sk', 'hr', 'sl', 'et', 'lv', 'lt', 'mt', 'ga', 'tr', 'ru', 'uk', 'ja', 'ko', 'zh', 'ar'];
const DEFAULT_LOCALE = 'en';

function getPreferredLocale(request: NextRequest): string {
  // Check Accept-Language header
  const acceptLanguage = request.headers.get('accept-language');
  if (!acceptLanguage) return DEFAULT_LOCALE;

  // Parse Accept-Language header (e.g., "es-ES,es;q=0.9,en;q=0.8")
  const languages = acceptLanguage
    .split(',')
    .map(lang => {
      const [code, q = '1'] = lang.trim().split(';q=');
      return { code: code.split('-')[0].toLowerCase(), q: parseFloat(q) };
    })
    .sort((a, b) => b.q - a.q);

  // Find first matching locale
  for (const { code } of languages) {
    if (LOCALES.includes(code)) {
      return code;
    }
  }

  return DEFAULT_LOCALE;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only redirect on root path
  if (pathname !== '/') {
    return NextResponse.next();
  }

  // Check if user has a locale cookie (to remember their choice)
  const localeCookie = request.cookies.get('NEXT_LOCALE')?.value;
  if (localeCookie && LOCALES.includes(localeCookie)) {
    return NextResponse.redirect(new URL(`/${localeCookie}`, request.url));
  }

  // Get preferred locale from browser
  const preferredLocale = getPreferredLocale(request);
  
  // Redirect to locale-specific page and set cookie
  const response = NextResponse.redirect(new URL(`/${preferredLocale}`, request.url));
  response.cookies.set('NEXT_LOCALE', preferredLocale, { 
    maxAge: 60 * 60 * 24 * 365, // 1 year
    path: '/' 
  });
  
  return response;
}

export const config = {
  matcher: ['/'],
};
