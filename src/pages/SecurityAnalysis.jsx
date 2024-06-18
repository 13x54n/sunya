import React, { useState } from 'react'

export default function SecurityAnalysis() {
    const [activeAnalysis, setActiveAnalysis] = useState("starknet")
  return (
    <div className='py-3 px-2'>
      <div className='inline-flex overflow-hidden items-center shadow-lg border-2 border-gray-500 text-sm rounded-xl bg-gray-50'>
        <div className={`p-2 ${activeAnalysis === "starknet" && 'bg-gray-500 text-white'}`}>Starknet</div>
        <div className={`p-2 ${activeAnalysis === "ethereum" && 'bg-gray-500 text-white'}`}>Ethereum</div>
      </div>
    </div>
  )
}
