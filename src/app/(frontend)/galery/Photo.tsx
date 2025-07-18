'use client'

import Image from 'next/image'
import { motion } from 'motion/react'
import { GalleryMain, Media } from '@/payload-types'
import { usePopupStoreGalery } from '../state/store'
import { useAllGalleryImages } from '../lib/ReactQuery/useGallery'
import Link from 'next/link'

interface PhotoProps {
  image: GalleryMain
  index: number
  shouldAnimate: boolean
  onAnimationComplete: () => void
}

interface ProductLink {
  title: string
}

const Photo = ({ image, index, shouldAnimate, onAnimationComplete }: PhotoProps) => {
  const { setComponent, setImages: setStoreImages } = usePopupStoreGalery()
  const { fetchAllImages } = useAllGalleryImages()

  const handleImageClick = async (clickedImage: Media, clickedIndex: number) => {
    try {
      const allImages = await fetchAllImages()
      const globalIndex = allImages.findIndex(img => img.url === clickedImage.url)

      setStoreImages(allImages, globalIndex !== -1 ? globalIndex : clickedIndex)
      setComponent(<div />)
    } catch (error) {
      console.error('Error fetching gallery images:', error)
      setStoreImages([clickedImage], 0)
      setComponent(<div />)
    }
  }

  if (typeof image.image === 'number' || !image.image?.url) {
    return null
  }

  const isValidProductLink = (link: unknown): link is ProductLink => {
    return typeof link === 'object' && link !== null && 'title' in link
  }

  return (
    <motion.div
      className="relative w-full h-full group cursor-pointer overflow-hidden rounded-lg"
      initial={shouldAnimate ? { opacity: 0, y: 20 } : false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onAnimationComplete={onAnimationComplete}
      onClick={() => handleImageClick(image.image as Media, index)}
      role="button"
      onKeyDown={(e) => {
        if (e.key === 'Enter') handleImageClick(image.image as Media, index)
      }}
    >
      <Image
        src={image.image.url}
        alt={image.image.alt || 'Gallery image'}
        fill
        className="object-cover overflow-hidden h-full w-full rounded-lg transition-transform duration-300 group-hover:scale-105"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />

      <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-lg" />

      {image.link && typeof image.link !== 'number' && isValidProductLink(image.link) && (
        <Link
          href={`/product/${encodeURIComponent(image.link.title)}`}
          onClick={(e) => e.stopPropagation()}
          className="absolute bottom-0 backdrop-blur-2xl w-full text-white text-center text-2xl p-2 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
          tabIndex={0}
          aria-label={`Przejdź do produktu: ${image.link.title}`}
        >
          Sprawdź...
        </Link>
      )}
    </motion.div>
  )
}

export default Photo