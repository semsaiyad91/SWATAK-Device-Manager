import React from 'react'

const MainHeading = () => {
  return (
    <div className="flex items-center justify-start bg-gray-100 px-6 py-3 shadow-md">
      {/* Placeholder Logo */}
      <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-lg mr-3">
        S
      </div>

      {/* Brand Text */}
      <h1 className="text-2xl font-extrabold text-gray-800 tracking-wide">
        SWATAK
      </h1>
    </div>
  )
}

export default MainHeading