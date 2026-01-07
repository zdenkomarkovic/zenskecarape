'use client'

import { useState } from 'react'
import { CareSymbols, careLabelsData } from './CareSymbols'

interface CareInstructionsDisplayProps {
  instructions: string[]
}

export default function CareInstructionsDisplay({
  instructions,
}: CareInstructionsDisplayProps) {
  const [activeIcon, setActiveIcon] = useState<string | null>(null)

  if (!instructions || instructions.length === 0) return null

  return (
    <div>
      <h3 className="mb-4 text-sm font-semibold text-gray-900">
        Uputstvo za održavanje
      </h3>

      {/* Icons row */}
      <div className="flex flex-wrap gap-3 mb-4">
        {instructions.map((instruction) => {
          const symbol = CareSymbols[instruction as keyof typeof CareSymbols]
          const label = careLabelsData[instruction]

          if (!symbol || !label) return null

          return (
            <div
              key={instruction}
              className="relative group"
              onMouseEnter={() => setActiveIcon(instruction)}
              onMouseLeave={() => setActiveIcon(null)}
              onClick={() => setActiveIcon(activeIcon === instruction ? null : instruction)}
            >
              <div className="w-12 h-12 flex items-center justify-center border-2 border-gray-300 rounded-lg cursor-pointer transition-all hover:border-gray-900 hover:bg-gray-50">
                <div className="w-10 h-10 text-gray-700">
                  {symbol}
                </div>
              </div>

              {/* Tooltip on hover/click */}
              {activeIcon === instruction && (
                <div className="absolute z-10 left-1/2 -translate-x-1/2 top-full mt-2 w-max max-w-xs">
                  <div className="bg-gray-900 text-white text-xs rounded-lg px-3 py-2 shadow-lg">
                    {label.label}
                    <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-900 transform rotate-45" />
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Mobile: Show all labels below on small screens */}
      <div className="md:hidden space-y-1 text-xs text-gray-600">
        {instructions.map((instruction) => {
          const label = careLabelsData[instruction]
          if (!label) return null

          return (
            <div key={instruction} className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-gray-400" />
              <span>{label.label}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
