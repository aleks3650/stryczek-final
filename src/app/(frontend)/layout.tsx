import React from 'react'
import './styles.css'
import ReactLenis from './lib/ReactLenis'
import Footer from './footer/Footer'
import Navbar from './navbar/Navbar'
import Script from 'next/script'
import Providers from './lib/ReactQuery/Providers'
import { GoogleAnalytics } from '@next/third-parties/google';

export const metadata = {
  title: 'Słodka Pętelka – Ciasta i wypieki z Tychów',
  description: 'Słodka Pętelka - domowe ciasta i słodycze z Tychów. Działamy na Śląsku. Zamów pyszności już dziś!',
  keywords: [
    'ciasta',
    'słodycze',
    'domowe ciasta',
    'domowe wypieki',
    'Tychy',
    'Śląsk',
    'cukiernia Tychy',
    'wypieki Tychy',
    'domowa piekarnia Tychy'
  ],
  metadataBase: new URL('https://slodkapetelka.pl'),
  openGraph: {
    title: 'Słodka Pętelka – Ciasta z Tychów',
    description: 'Zamów domowe ciasta i słodycze z Tychów – idealne na każdą okazję. Słodka Pętelka – lokalna cukiernia z pasją.',
    url: 'https://slodkapetelka.pl',
    locale: 'pl_PL',
    type: 'website',
    siteName: 'Słodka Pętelka',
    images: [
      {
        url: 'https://slodkapetelka.pl/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Domowe wypieki z Tychów – Słodka Pętelka',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Słodka Pętelka – Tychy',
    description: 'Domowe wypieki i słodycze z Tychów – zamów online.',
    images: ['https://slodkapetelka.pl/og-image.jpg'],
  },
  alternates: {
    canonical: 'https://slodkapetelka.pl',
  },
}

const schemaData = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Słodka Pętelka",
  "image": "https://slodkapetelka.pl/og-image.jpg",
  "url": "https://slodkapetelka.pl",
  "telephone": "+48 789 741 964",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "ul. Mąkołowska 150",
    "addressLocality": "Tychy",
    "postalCode": "43-100",
    "addressCountry": "PL"
  },
  "description": "Słodka Pętelka - domowe ciasta i słodycze z Tychów. Działamy na Śląsku. Zamów pyszności już dziś!"
}

export default async function FrontendLayout(props: { children: React.ReactNode }) {
  const { children } = props
  const GA_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID;
  if (!GA_ID) {
    throw new Error('Brakuje NEXT_PUBLIC_GOOGLE_ANALYTICS_ID – uzupełnij plik .env');
  }

  return (
    <html lang='pl'>
      <body>
        <>
          <Script
            id="structured-data"
            type="application/ld+json"
            strategy="beforeInteractive"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
          />
          <GoogleAnalytics gaId={GA_ID} />
          <Providers>
            <Navbar />
            <main>
              <div className="container mx-auto min-h-screen">{children}</div>
              <Footer />
            </main>
          </Providers>
          <ReactLenis />
        </>
      </body>
    </html>
  )
}