import React from 'react'

export default function Loader() {
  return (
    <div className="pointer-events-none absolute bottom-0 right-0 z-10 flex justify-end p-2">
      <div className="inline-flex items-center rounded-md bg-sky-500 px-4 py-2 text-sm font-semibold leading-6 text-white shadow">
        Please wait, setting up environment...
      </div>
    </div>
  )
}
