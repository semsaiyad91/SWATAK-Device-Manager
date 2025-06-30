import React from 'react'

const MainHeading = () => {
  return (
    <div className="flex items-center justify-between bg-[#334052] px-6 py-3 shadow-md">
      <div className="flex items-center">
        {/* Placeholder Logo */}
        <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-lg mr-3">
          S
        </div>

        {/* Brand Text */}
        <h1 className="text-2xl font-extrabold text-white tracking-wide">
          SWATAK
        </h1>
      </div>

      {/* Window Controls - Improved Design */}
      <div className="flex items-center space-x-2">
        {/* Minimize Button */}
        <button className="w-6 h-6 flex items-center justify-center hover:bg-gray-600 rounded transition-colors duration-200 group">
          <span className="block w-3 h-[2px] bg-gray-300 group-hover:bg-white"></span>
        </button>
        
        {/* Maximize/Restore Button */}
        <button className="w-6 h-6 flex items-center justify-center hover:bg-gray-600 rounded transition-colors duration-200 group">
          <div className="relative w-3 h-3 border border-gray-300 group-hover:border-white">
            <div className="absolute -top-[3px] -left-[3px] w-2 h-2 border border-gray-300 group-hover:border-white"></div>
          </div>
        </button>
        
        {/* Close Button */}
        <button className="w-6 h-6 flex items-center justify-center hover:bg-red-600 rounded transition-colors duration-200 group">
          <div className="relative w-3 h-[2px]">
            <span className="absolute block w-full h-[2px] bg-gray-300 group-hover:bg-white rotate-45"></span>
            <span className="absolute block w-full h-[2px] bg-gray-300 group-hover:bg-white -rotate-45"></span>
          </div>
        </button>
      </div>
    </div>
  )
}

export default MainHeading