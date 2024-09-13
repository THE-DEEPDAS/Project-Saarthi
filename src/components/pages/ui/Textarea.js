import React from 'react'

export function Textarea({ className, ...props }) {
  return (
    <textarea
      className={`w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 ${className}`}
      {...props}
    />
    )
}