'use client'
import Image from 'next/image'
import type { SealChoice, EnvelopeChoice } from '@/types/letter'

interface Props {
  envelope: EnvelopeChoice
  seal: SealChoice
}

export function EnvelopePreview({ envelope, seal }: Props) {
  const sealNode = seal === 'none' ? (
    <div className="w-full h-full rounded-full bg-[#e8c06c] border-2 border-[#c8962c] flex items-center justify-center text-lg shadow-md">
      ✦
    </div>
  ) : (
    <Image
      src={`/seals/${seal}.png`}
      alt={seal}
      width={80}
      height={80}
      className="w-full h-full object-contain drop-shadow-lg"
    />
  )

  return (
    <div
      className="relative mx-auto select-none"
      style={{ width: 560, height: 420 }}
    >
      <Image
        src={`/envelopes/${envelope}.png`}
        alt={envelope}
        fill
        className="object-contain pointer-events-none drop-shadow-xl"
      />

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-40 h-40 pointer-events-none">
        {sealNode}
      </div>
    </div>
  )
}