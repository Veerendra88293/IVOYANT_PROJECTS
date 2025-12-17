import React, { useState } from 'react'
import { useGetMovieQuery } from '../store/slice/apiSlice'
import { Link } from 'react-router-dom';
import { addToWatchList, removeFromWatchList } from '../store/slice/watchlistSlice';
import { useDispatch, useSelector } from 'react-redux';

function Movies_List() {
const [page, setPage] = useState(1);
const {data,isError,isLoading} = useGetMovieQuery(page);
const WatchListdata = useSelector((state)=>state.watchList.watchlist);
const dispatch = useDispatch();
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
    if(isError){
        return <h1 className='font-bold text-red-600'>Something Went Wrong</h1>
    };
const HandleRemove = (e, id) => {
  e.preventDefault();
  e.stopPropagation();
  dispatch(removeFromWatchList(id));
};

const HandleAdd = (e, movie) => {
  e.preventDefault();
  e.stopPropagation();
  dispatch(addToWatchList(movie));
};

  return (
    <div className='p-4'>
        <div className='flex flex-wrap justify-center'>
        {data?.results.map((Movie)=>{
        const issome = WatchListdata.some((obj)=>{
                return obj.id===Movie.id
        })
        return(
            <Link state={{movie: Movie}} to={`movie/${Movie.id}`} key={Movie.id}>
            <div className=" w-50 h-66 rounded-md m-8 bg-no-repeat bg-cover hover:scale-110 transition duration-500 ease-in-out"
            style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original/${Movie.poster_path})`,
            }}
        >
        {issome ?
            <div className="cursor-pointer " onClick={(e) => HandleRemove(e, Movie.id)}>❌</div>
        : <div className="cursor-pointer" onClick={ (e)=>HandleAdd(e,Movie)}>&#128525;</div>}
        </div>
            </Link>
        )})}
        </div>

        <div className="flex justify-center gap-4 mt-4 ">
            <button onClick={() => setPage(prev => Math.max(prev - 1, 1))} className="px-4 py-2 cursor-pointer bg-gray-300 rounded hover:bg-gray-400 transition">
            Prev
            </button>
            <button onClick={() => setPage(prev => prev + 1)} className="px-4 py-2 cursor-pointer bg-gray-300 rounded hover:bg-gray-400 transition">
            Next
            </button>
        </div>
    </div>
  )
}

export default Movies_List;
