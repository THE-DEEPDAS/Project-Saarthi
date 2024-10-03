import React from 'react'

export function Input({ className, ...props }) {
  return (
    <input
      className={`w-full px-3 py-2 bg-white border border-[#06002e] rounded-md text-[#06002e] focus:outline-none focus:border-purple-500 transition-colors placeholder-[#06002e] ${className}`}
      {...props}
    />
  )
}