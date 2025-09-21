import { MetadataRoute } from 'next'
import { getPayload } from 'payload'
import config from '@payload-config'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const payload = await getPayload({ config })

  const staticRoutes = [
    '',
    '/news',
    '/offer',
    '/galery',
    '/contact',
  ]

  const staticPages = staticRoutes.map((route) => ({
    url: `${process.env.URL || 'https://slodkapetelka.pl'}${route}`,
    lastModified: new Date(),
  }))

  const productResults = await payload.find({
    collection: 'product',
    limit: 0
  })

  const productPages = productResults.docs.map((product) => ({
    url: `${process.env.URL || 'https://slodkapetelka.pl'}/product/${encodeURIComponent(product.title)}`,
    lastModified: product.updatedAt || new Date(),
  }))

  return [...staticPages, ...productPages]
}
