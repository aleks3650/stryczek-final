'use client'

import Image from 'next/image'
// import { motion, useScroll, useTransform } from 'framer-motion'
import { useScroll, motion, useTransform } from 'motion/react'
import { useState, useEffect, useRef } from 'react'
import SVGComponent from './SVGComponent'
import { GalleryTop } from '@/payload-types'
import { usePopupStore } from '../state/store'

const GalleryClient = () => {
  const [images, setImages] = useState<GalleryTop[] | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const container = useRef(null)

  const { setComponent } = usePopupStore()

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end'],
  })

  const scale = useTransform(scrollYProgress, [0, 1], [0.2, 1])
  const translateXLeft = useTransform(scrollYProgress, [0, 0.4, 1], ['-30%', '0%', '0%'])
  const translateXRight = useTransform(scrollYProgress, [0, 0.4, 1], ['30%', '0%', '0%'])
  const translateYUp = useTransform(scrollYProgress, [0, 0.4, 1], ['-30%', '0%', '0%'])
  const translateYDown = useTransform(scrollYProgress, [0, 0.4, 1], ['30%', '0%', '0%'])

  const textOpacity = useTransform(scrollYProgress, [0, 1], [1, 0])
  const textScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.8])
  const textY = useTransform(scrollYProgress, [0, 0.3], ['0%', '-20%'])

  useEffect(() => {
    const fetchLatest = async () => {
      try {
        const res = await fetch('/api/gallery-top?limit=5')
        const newData = await res.json()
        const images = newData.docs
        setImages(images)
      } catch (error) {
        console.error('Error refreshing data:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchLatest()
  }, [])

  const getSizeClass = (index: number) => {
    const sizePattern = ['col-span-1 row-span-1', 'col-span-1 row-span-2', 'col-span-2 row-span-1']
    if (index % 2 === 0) return sizePattern[1]
    if (index % 3 === 0) return sizePattern[2]
    return sizePattern[0]
  }

  const opacityVariants = {
    hidden: { opacity: 0 },
    visible: (index: number) => ({
      opacity: 1,
      transition: { delay: index * 0.15 },
    }),
  }

  const handleImageClick = (url: string) => {
    setComponent(
      <motion.div
        className="w-full h-full"
        layoutId={`photo-${url}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <Image
          alt="Enlarged content preview"
          className="object-contain rounded-md aspect-auto w-full h-full
            pointer-events-none max-w-[90vw] max-h-[90vh]"
          src={url}
          width={1500}
          height={1500}
          priority
        />
      </motion.div>,
    )
  }

  return (
    <>
      <div ref={container} className="relative h-[calc(200dvh-7rem)] w-full ">
        <SVGComponent scrollYProgress={scrollYProgress} />
        <motion.h1
          style={{
            opacity: textOpacity,
            scale: textScale,
            y: textY,
          }}
          className="text-4xl font-bold text-gray-800 fixed left-0 w-full text-center top-1/2 -translate-y-1/2 py-8"
        >
          Our Gallery
        </motion.h1>
        <motion.h2
          style={{
            opacity: textOpacity,
            scale: textScale,
            y: textY,
          }}
          className="text-xl text-gray-600 fixed left-0 w-full text-center top-1/2 -translate-y-1/2 py-8 mt-16"
        >
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores, nisi?
        </motion.h2>

        {loading ? (
          <div className="w-full h-full flex items-center justify-center">
            <p className="text-lg">Loading images...</p>
          </div>
        ) : (
          <div className="w-full h-[calc(100dvh-7rem)] sticky inset-0 top-28 grid grid-cols-3 grid-rows-3">
            {images?.map((image, index) => {
              if (typeof image.image === 'number' || !image.image.url) {
                return null
              }
              return (
                <motion.div
                  key={image.id}
                  style={{
                    scale,
                    translateX: index === 4 || index === 2 ? translateXLeft : translateXRight,
                    translateY: index === 0 || index === 2 ? translateYUp : translateYDown,
                  }}
                  initial="hidden"
                  animate="visible"
                  custom={index}
                  variants={opacityVariants}
                  className={`relative m-4 rounded-lg overflow-hidden ${getSizeClass(index)}`}
                >
                  <Image
                    src={image.image.url}
                    onClick={() => {
                      if (typeof image.image !== 'number' && image.image.url) {
                        handleImageClick(image.image.url)
                      }
                    }}
                    alt={image.image.alt}
                    fill
                    className="w-full cursor-pointer h-full object-cover rounded-lg transition-transform duration-300 hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority={index < 3}
                  />
                </motion.div>
              )
            })}
          </div>
        )}
      </div>
    </>
  )
}

export default GalleryClient
