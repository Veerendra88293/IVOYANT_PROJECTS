import React from 'react'
import { useLocation } from 'react-router-dom'

function Movie_Details() {
  const location = useLocation();
  const movie = location.state?.movie;

  return (
    <>
      <button  className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 m-3' onClick={() => window.history.back()}>back</button>
          <h1 className='text-2xl font-bold text-center m-6'>Movie Details</h1>
      <div>
        {movie && (
          <div className='flex justify-center gap-10 bg-gray-200 p-6 rounded-lg shadow-lg hover:shadow-2xl transition-all ease-in-out'>
            <div className='flex justify-center items-center'>
                <img 
                    src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} 
                    alt={movie.original_title} 
                    width={'300px'} 
                    className='rounded-lg shadow-md hover:scale-105 transition-transform duration-300' 
                />
            </div>
            <div className='text-2xl flex flex-col gap-4'>
                <h2 className='font-semibold text-xl text-gray-800'>{movie.original_title}</h2>
                <p className='text-gray-600'>{`Release Date: ${movie.release_date}`}</p>
                <p className='text-gray-500'>{`Rating: ${movie.vote_average} / 10`}</p>
                <p className='text-gray-500'>{`Popularity: ${movie.popularity.toFixed(1)}`}</p>
                <div className='text-lg text-gray-700'>
                    <h3 className='font-semibold'>Overview:</h3>
                    <p>{movie.overview}</p>
                </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default Movie_Details;
