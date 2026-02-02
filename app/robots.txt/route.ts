const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://saunaspa.io'

export async function GET() {
  const robotsTxt = `# SaunaSpa.io Robots.txt
# https://saunaspa.io

User-agent: *
Allow: /

# Sitemaps
Sitemap: ${BASE_URL}/sitemap.xml

# Crawl-delay for polite crawling
Crawl-delay: 1

# Block admin and API routes
Disallow: /api/
Disallow: /_next/
Disallow: /admin/

# Allow all search engines
User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

User-agent: Yandex
Allow: /

User-agent: Baiduspider
Allow: /
`

  return new Response(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, max-age=86400',
    },
  })
}
