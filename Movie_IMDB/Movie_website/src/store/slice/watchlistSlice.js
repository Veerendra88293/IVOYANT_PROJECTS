import { createSlice } from "@reduxjs/toolkit";


const getLocalStorage = ()=>{
    const data = localStorage.getItem("watchlist");
    return data?JSON.parse(data):[]
};
export const WatchListSlice = createSlice({
    name:'watchlist',
    initialState:{
        watchlist:getLocalStorage(),
    },
    reducers:{
        addToWatchList:(state,action)=>{
                const data = action.payload;
                const exists = state.watchlist?.some((movie)=>movie.id===data.id);
                if(exists){
                    alert('Alredy added in watchlist');
                  
                }else{
                      state.watchlist.push(action.payload);
                      localStorage.setItem("watchlist", JSON.stringify(state.watchlist));
                }
                
        },
        removeFromWatchList:(state,action)=>{
        const id = action.payload;
         state.watchlist = state.watchlist.filter((m)=>m.id!==id);
         localStorage.setItem("watchlist", JSON.stringify(state.watchlist));
        }
    }
});

export const {addToWatchList,removeFromWatchList} = WatchListSlice.actions;