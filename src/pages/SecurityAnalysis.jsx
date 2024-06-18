import React, { useState } from "react";

export default function SecurityAnalysis() {
  return (
    <div className="py-3 mt-5">
      <div className="flex items-start gap-10 mt-2">
        <div className="shadow-xl border-2 p-3 pb-5 px-5 border-gray-500 rounded-lg flex-1">
          <h1 className="text-md font-semibold text-2xl">🕷️ Detector</h1>
          <p className="mb-4 text-sm text-gray-600 font-medium">
            Spidey will auto detect if it's Ethereum or Starknet's smart
            contract.
          </p>
          <p className=" text-md font-medium">
            Enter <i className="ri-github-fill"></i> Reposity URL:
          </p>
          <input
            type="text"
            className="border-b-2 focus:outline-none py-1 p-2 border-gray-500 w-[100%] bg-transparent"
            placeholder="https://github.com/username/repo.git"
          />

          <p className="mt-5 text-md font-medium">
            Set project owner (default: it's you!)
          </p>
          <input
            type="text"
            className="border-b-2 focus:outline-none py-1 p-2 border-gray-500 w-[100%] bg-transparent"
            placeholder="0x00A...0000"
          />
          <p className="text-sm mt-1 font-medium text-[#ff7675]">Note: Make sure your repo visibility is public.</p>

          <button className="bg-gray-700 text-white mt-5 py-2 px-3 rounded-md text-sm font-semibold ease-in-out transition-all cursor-pointer hover:bg-gray-500">
            Import & Analyze
          </button>
        </div>
        <div className="shadow-xl border-2 p-3 pb-5 px-5 border-gray-500 rounded-lg flex-1 transition-all ease-in-out">
          <h1 className="text-md font-semibold text-2xl">🐞 Printer</h1>
          <p className="mb-4 text-sm text-gray-600 font-medium">Try importing your repository, let's see if something's broken!</p>
        </div>
      </div>
    </div>
  );
}
