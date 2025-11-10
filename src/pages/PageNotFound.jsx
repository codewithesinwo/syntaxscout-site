import React from 'react'
import {Link } from 'react-router-dom';

export default function PageNotFound() {
  

  return (
    <>
      <div className="flex items-center justify-center text-center">
        <div className="my-50 w-auto">
          <h1 className="text-6xl text-gray-900 font-extrabold">Oops!</h1>
          <p className="text-3xl text-gray-900 font-extrabold mt-2">
            PAGE NOT FOUND
          </p>
          <p className='mt-5 text-gray-900 text-3xl'>It seems the page you requested is unavailable or may have been moved.</p>
          <p className='text-gray-900 text-2xl mt-5'> Kindly retun to the homepage or use the navigation above</p>
          <Link to="/">
          <button
            type="button"
            className="mt-10 px-6 py-6 bg-gray-900 text-white font-bold rounded-md hover:bg-gray-950 transition-all duration-300 cursor-pointer text-2xl"
          >
            Go to Homepage
          </button>
            </Link>
        </div>
      </div>
    </>
  );
}