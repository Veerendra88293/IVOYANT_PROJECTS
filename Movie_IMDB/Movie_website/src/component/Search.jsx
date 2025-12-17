import React, { useState } from 'react';
import {
  useGetMovieQuery,
  useGetSearchQuery,
} from '../store/slice/apiSlice';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  addToWatchList,
  removeFromWatchList,
} from '../store/slice/watchlistSlice';

function Search_List() {
 const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [searchData, setSearchData] = useState('');


  const { data: trendingData,isLoading: trendingLoading,isError: trendingError,} = useGetMovieQuery(1);


  const {data: searchResults,isLoading: searchLoading,isError: searchError} = useGetSearchQuery(
  { query: searchData, page },
  { skip: !searchData.trim() }
);
 const handleSearch = () => {
    setSearchData(search);
  };

  const dispatch = useDispatch();
  const watchList = useSelector(
    (state) => state.watchList.watchlist
  );


  const movies = searchData && searchResults?.results?.length 
        ? searchResults.results
      : trendingData?.results;

  const isLoading = trendingLoading || searchLoading;
  const isError = trendingError || searchError;

 

  const handleAdd = (e, movie) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(addToWatchList(movie));
  };

  const handleRemove = (e, id) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(removeFromWatchList(id));
  };

  if(isLoading){
        const arr = new Array(10).fill(0);
        return <>
                <div className="className flex flex-wrap justify-center">
                    {arr.map((_,index)=>(
                        <div key={index} className="w-50 h-66 rounded-md m-8 bg-gray-300 animate-pulse">
                        </div>
                    ))}
                </div>
             </>
    };

  if (isError) {
    return <h1 className="text-red-600">Something went wrong</h1>;
  }
console.log(searchResults)

  return (
    <div className="p-4 bg-black">
      <div className="flex justify-end gap-2 mb-6 ">
        <input
          className="border p-1 bg-white"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Batman..."
        />
        <button onClick={handleSearch} className="px-3 py-1 bg-blue-500 text-white rounded">
          Search
        </button>
      </div>


      <div className="flex flex-wrap justify-center">
        {searchData &&
  
  searchResults?.results?.length === 0 && alert('no movies found')}
        {movies?.map((movie) => {
          const inWatchList = watchList.some(
            (m) => m.id === movie.id
          );

          return (
            <Link key={movie.id} to={`/movie/${movie.id}`} state={{ movie }}>
              <div
                className="w-50 h-66 rounded-md m-8 bg-cover bg-no-repeat hover:scale-110 transition"
                style={{
                  backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie.poster_path})`,
                }}
              >
                {inWatchList ? (
                  <div
                    onClick={(e) =>
                      handleRemove(e, movie.id)
                    }
                  >
                    ❌
                  </div>
                ) : (
                  <div
                    onClick={(e) =>
                      handleAdd(e, movie)
                    }
                  >
                    😍
                  </div>
                )}
              </div>
            </Link>
          );
        })}
      </div>
      

     
      {searchData && (
        <div className="flex justify-center gap-4 mt-4">
          <button
            onClick={() =>
              setPage((p) => Math.max(p - 1, 1))
            }
            className="px-4 py-2 bg-gray-300 rounded"
          >
            Prev
          </button>
          <button
            onClick={() => setPage((p) => p + 1)}
            className="px-4 py-2 bg-gray-300 rounded"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default Search_List;
