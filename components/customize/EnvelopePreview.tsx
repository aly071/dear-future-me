'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'
import type { SealChoice } from '@/types/letter'

interface Props {
  color:    string
  stickers: string[]
  seal:     SealChoice
}

export function EnvelopePreview({ color, stickers, seal }: Props) {
  return (
    <motion.div
      className="relative mx-auto cursor-pointer"
      style={{ width: 360, height: 240 }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
    >
      {/* Envelope body */}
      <div className="absolute inset-0 rounded-sm shadow-lg" style={{ background: color }} />

      {/* Bottom flap */}
      <div className="absolute bottom-0 left-0 right-0 w-0 h-0 mx-auto" style={{
        borderLeft: '180px solid transparent',
        borderRight: '180px solid transparent',
        borderBottom: `130px solid ${color}`,
        filter: 'brightness(0.92)',
      }} />

      {/* Left flap */}
      <div className="absolute left-0 top-0 bottom-0" style={{
        borderTop: '120px solid transparent',
        borderBottom: '120px solid transparent',
        borderLeft: `130px solid ${color}`,
        filter: 'brightness(0.96)',
      }} />

      {/* Right flap */}
      <div className="absolute right-0 top-0 bottom-0" style={{
        borderTop: '120px solid transparent',
        borderBottom: '120px solid transparent',
        borderRight: `130px solid ${color}`,
        filter: 'brightness(0.96)',
      }} />

      {/* Top flap */}
      <div className="absolute top-0 left-0 right-0" style={{
        borderLeft: '180px solid transparent',
        borderRight: '180px solid transparent',
        borderTop: `120px solid ${color}`,
        filter: 'brightness(0.88)',
      }} />

      {/* Wax seal */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-30 h-30">
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
              width={100}
              height={100}
              className="w-full h-full object-contain drop-shadow-lg"
            />
          </motion.div>
        )}
      </div>

      {/* Stickers */}
      {stickers.map((s, i) => {
        const positions = [
          { top: '10px', left: '10px' },
          { top: '10px', right: '20px' },
          { bottom: '40px', left: '15px' },
          { top: '50%', right: '15px' },
          { bottom: '60px', right: '40px' },
        ]
        const pos = positions[i % positions.length]
        return (
          <motion.div key={i} className="absolute text-xl z-20" style={pos}
            initial={{ scale: 0, rotate: -20 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 300 }}>
            {s}
          </motion.div>
        )
      })}
    </motion.div>
  )
}