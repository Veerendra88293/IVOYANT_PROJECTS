import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeFromWatchList } from '../../store/slice/watchlistSlice';

function WatchList() {
    const [search, setSearch] = useState("");
    const [isSorted, setIsSorted] = useState(false);

    const movies = useSelector((state)=>state.watchList.watchlist);
     let finalList = movies;
    const IMG_BASE = 'https://image.tmdb.org/t/p/original/';
    const dispatch = useDispatch();
    if(movies.length<=0){
    return (
        <div>
            <h1 className='text-center font-bold text-2xl mt-10'>No Movies in WatchList</h1>
            <a href="/" className="text-blue-500 hover:underline text-center block">Goto Home</a>
        </div>
    )
    }
    if(isSorted){
         finalList = [...movies].sort((a,b)=>b.popularity - a.popularity);
    }
const filteredMovies = finalList.filter((m) =>
m.title.toLowerCase().includes(search.toLowerCase())
);


   return (
    <div className="overflow-x-auto">
<input
  className="border border-gray-400 rounded-md p-2 float-right m-2 mr-9"
  placeholder="Search..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
/>
 <button onClick={() => setIsSorted(!isSorted)} className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md text-sm float-right m-4 cursor-pointer">
    Sort By Popularity
  </button>

      <table className="min-w-full table-auto border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-3 text-left text-sm font-medium">Poster</th>
            <th className="px-4 py-3 text-left text-sm font-medium">Title</th>
            <th className="px-4 py-3 text-left text-sm font-medium">Original Title</th>
            <th className="px-4 py-3 text-left text-sm font-medium">Original Lang</th>
            <th className="px-4 py-3 text-left text-sm font-medium">Release Date</th>
            <th className="px-4 py-3 text-left text-sm font-medium">Popularity</th>

            <th className="px-4 py-3 text-left text-sm font-medium">Remove From WatchList</th>
          </tr>
        </thead>

        <tbody>
        {filteredMovies.length === 0 ? (
            <tr>
              <td colSpan="7" className="px-4 py-3 text-center text-sm text-gray-500">
                No movies found.
              </td>
            </tr>
          ) : (
            filteredMovies.map((m) => (
              <tr key={m.id} className="even:bg-white odd:bg-gray-50">
                <td className="px-4 py-3">
                {m.poster_path ? (
                  <img
                    src={IMG_BASE + m.poster_path}
                    alt={m.title}
                    className="w-20 h-28 object-cover rounded"
                  />
                ) : (
                  <div className="w-20 h-28 bg-gray-200 rounded flex items-center justify-center text-xs text-gray-400">
                    No image
                  </div>
                )}
              </td>

              <td className="px-4 py-3 text-sm font-medium">{m.title}</td>

              <td className="px-4 py-3 text-sm">{m.original_title}</td>

              <td className="px-4 py-3 text-sm">{m.original_language}</td>

              <td className="px-4 py-3 text-sm">{m.release_date}</td>

              <td className="px-4 py-3 text-sm">{m.popularity?.toFixed?.(2) ?? m.popularity}</td>

             <td>
  <button onClick={()=>dispatch(removeFromWatchList(m.id))} className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md text-sm">
    Delete
  </button>
</td>
</tr>
)))}
        </tbody>
      </table>
    </div>
  );
}

export default WatchList;
