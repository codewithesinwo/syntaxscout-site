import React from 'react'

export default function VerificationCode() {
  return (
    <>
      <div className="my-70 flex flex-col items-center justify-center text-center">
        {/* Verify you Identity h1 tag */}
        <div>
          <h1 className="text-5xl text-gray-900 font-extrabold">
            Verify your Identity
          </h1>
        </div>

        {/* Verify Code Input */}
        <div>
          <input
            type="text"
            name=""
            id=""
            className="text-center mt-5 px-6 py-2 border border-gray-950  text-black rounded-md text-3xl"
          />
        </div>

        {/* Verify Button */}
        <div>
          <button
            type="button"
            className="mt-5 px-6 py-2 bg-gray-900 text-white font-medium rounded-md hover:bg-gray-950 transition-all duration-300 cursor-pointer"
          >
            Verify
          </button>
        </div>
      </div>
    </>
  );
}
