import { Helmet } from 'react-helmet-async'

const SITE_NAME = 'Allstar Prints LLC'
const SITE_URL  = import.meta.env.VITE_SITE_URL || 'https://allstarprints.com'
const OG_IMAGE  = `${SITE_URL}/brand_assets/openart-image_1775569332019_55a69ae4_1775569332054_46e7f565.png`

interface SEOProps {
  title: string
  description: string
  /** Relative path, e.g. "/custom-tshirts" */
  path?: string
  /** Override OG image URL */
  image?: string
  /** 'website' | 'article' — defaults to 'website' */
  type?: string
  /** Prevent search engine indexing (e.g. thank-you pages) */
  noIndex?: boolean
}

export default function SEO({
  title,
  description,
  path = '',
  image = OG_IMAGE,
  type = 'website',
  noIndex = false,
}: SEOProps) {
  const fullTitle    = `${title} | ${SITE_NAME}`
  const canonicalUrl = `${SITE_URL}${path}`

  return (
    <Helmet>
      {/* Primary */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />
      {noIndex && <meta name="robots" content="noindex, nofollow" />}

      {/* Open Graph */}
      <meta property="og:type"        content={type} />
      <meta property="og:url"         content={canonicalUrl} />
      <meta property="og:title"       content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image"       content={image} />
      <meta property="og:site_name"   content={SITE_NAME} />

      {/* Twitter Card */}
      <meta name="twitter:card"        content="summary_large_image" />
      <meta name="twitter:title"       content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image"       content={image} />

      {/* Local business schema */}
      <meta name="geo.region"        content="US" />
      <meta name="geo.placename"     content="Allstar Prints LLC" />
    </Helmet>
  )
}
