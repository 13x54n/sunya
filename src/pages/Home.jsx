import React from "react";

export default function Home() {
  return (
    <div className="container mx-auto gap-3">
      <div className="flex items-end justify-center gap-6 opacity-95">
        <img
          className="w-[13vw]"
          src="https://img.freepik.com/free-vector/automation-testing-abstract-concept-vector-illustration-software-testing-solution-development-process-automation-website-developer-optimization-online-service-site-menu-bar-abstract-metaphor_335657-6140.jpg?t=st=1718592961~exp=1718596561~hmac=194dd57ff1bda6d10b127246209f046da667d0026682998a94f5639f94ee03f8&w=1380"
          alt=""
        />
        <img
          className="w-[15vw]"
          src="https://img.freepik.com/free-vector/contract-carriage-abstract-concept-vector-illustration_335657-5698.jpg?w=1380&t=st=1718600714~exp=1718601314~hmac=78a33ee2ae6aefa96eedbf24a9db4175a490bad79645e7e861e93ac7a56611f9"
          alt=""
        />
        <img
          className="w-[13vw]"
          src="https://img.freepik.com/free-vector/electrotechnology-abstract-concept-vector-illustration-certification-electrotechnology-electrical-engineering-practice-industrial-science-power-system-design-electronics-abstract-metaphor_335657-6324.jpg?w=1380&t=st=1718600784~exp=1718601384~hmac=ccac604980595da23f454c4d031bad8566b6be727b7a42ea364419f9a99f75b5"
          alt=""
        />
      </div>
      <div className="text-center font-medium flex items-center gap-1 justify-center">
        <img
          className="h-8"
          src="https://www.starknet.io/wp-content/themes/Starknet/assets/img/starknet-logo.svg"
          alt=""
        />
        <i className="ri-arrow-left-right-fill"></i>
        <img
          className="w-8 h-8"
          src="https://imgs.search.brave.com/jYn_WJDWSD9sFPdZWYOlK78dCJAX09YV8u4XC7fn4NQ/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9jbG91/ZGZyb250LXVzLWVh/c3QtMS5pbWFnZXMu/YXJjcHVibGlzaGlu/Zy5jb20vY29pbmRl/c2svWkpaWks1QjJa/TkYyNUxZUUhNVVRC/VE9NTFUucG5n"
          alt=""
        />
      </div>
      <h1 className="text-center text-4xl font-medium mt-4 font_tiny5 text-gray-700">
        Smart Contract Security Analysis, Deployment, <br />
        and Verification on Starknet x Ethereum.
      </h1>

      <div className="flex items-center gap-5 justify-center mt-14">
        <div className="border-black rounded-lg w-[15vw] border-2 p-2 px-3 bg-gray-50 cursor-pointer ease-in-out transition-all hover:scale-105 flex items-center justify-between">
          <div>
            <p className="text-2xl font_bebas text-gray-600">
              🦠 Vulnerability Analysis
            </p>
            <p className="text-sm ml-8 my-1">
              Security Analysis against known vulnerabilities.
            </p>
          </div>
          <p className="font_tiny5 font-semibold text-8xl text-gray-400">1.</p>
        </div>
        <div className="text-4xl">*</div>
        <div className="border-black rounded-lg w-[15vw] border-2 p-2 px-3 bg-gray-50 cursor-pointer ease-in-out transition-all hover:scale-105 flex items-center justify-between">
          <div>
            <p className="text-2xl font_bebas text-gray-600">📦 Deployment</p>
            <p className="text-sm ml-8 my-1">
              Smart Contract deployment across multiple chains.
            </p>
          </div>
          <p className="font_tiny5 font-semibold text-8xl text-gray-400">2.</p>
        </div>
        <div className="text-4xl">*</div>

        <div className="border-black rounded-lg w-[15vw] border-2 p-2 px-3 bg-gray-50 cursor-pointer ease-in-out transition-all hover:scale-105 flex items-center justify-between">
          <div>
            <p className="text-2xl font_bebas text-gray-600">
              🧾 Verification, voila Proof!
            </p>
            <p className="text-sm ml-8 my-1">
              Contract verification & ownership utilising Voyager API's.
            </p>
          </div>
          <p className="font_tiny5 font-semibold text-8xl text-gray-400">3.</p>
        </div>
      </div>

      <div className="flex gap-2 items-center justify-center mt-12 text-md">
        <img
          className="w-5 h-5"
          src="https://imgs.search.brave.com/_kHkOj0rQGazc6sqY0ZeglYK_a8fA6vv2plHMAelW3Y/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9hc3Nl/dHMuc3RpY2twbmcu/Y29tL2ltYWdlcy81/ODQ3Zjk4ZmNlZjEw/MTRjMGI1ZTQ4YzAu/cG5n"
          alt=""
        />
        <p><a href="" className="underline" target="_blank">Sunya</a> by Lexy Team.</p>
      </div>

      
    </div>
  );
}
