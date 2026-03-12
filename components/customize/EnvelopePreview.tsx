'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'
import type { SealChoice, EnvelopeChoice } from '@/types/letter'

interface Props {
  envelope: EnvelopeChoice
  stickers: string[]
  seal:     SealChoice
}

export function EnvelopePreview({ envelope, stickers, seal }: Props) {
  return (
    <motion.div
      className="relative mx-auto cursor-pointer"
      style={{ width: 500, height: 450 }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
    >
      {/* Real envelope image */}
      <Image
        src={`/envelopes/${envelope}.png`}
        alt={envelope}
        fill
        className="object-contain drop-shadow-xl"
      />

      {/* Wax seal */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-40 h-40">
        {seal === 'none' ? (
          <div className="w-full h-full rounded-full bg-[#e8c06c] border-2 border-[#c8962c]
            flex items-center justify-center text-lg shadow-md">
            ✦
          </div>
        ) : (
          <motion.div
            initial={{ scale: 0, rotate: -20 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 300 }}
            className="w-full h-full"
          >
            <Image
              src={`/seals/${seal}.png`}
              alt={seal}
              width={80}
              height={80}
              className="w-full h-full object-contain drop-shadow-lg"
            />
          </motion.div>
        )}
      </div>
      
    </motion.div>
  )
}