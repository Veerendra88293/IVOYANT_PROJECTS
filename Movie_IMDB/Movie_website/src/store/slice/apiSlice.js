import { fetchBaseQuery } from '@reduxjs/toolkit/query'
import {createApi} from '@reduxjs/toolkit/query/react'


export const apiSlice = createApi({
    reducerPath:'fetchapi',
    baseQuery:fetchBaseQuery({baseUrl:'https://api.themoviedb.org/3'}),
    endpoints:(builder)=>({
            GetMovie:builder.query({
                query:(page=1)=>`/movie/popular?api_key=38b5350b152fb6613afe7091606dc798&language=en-US&page=${page?.toString()}`,
            }),
            GetSearch:builder.query({
                query: ({ query, page = 1 }) =>({
                    url: `/search/movie?query=${encodeURIComponent(query)}&include_adult=false&language=en-US&page=${page?.toString()}`,
                    method: 'GET',
                     headers: {
      Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3OTQ5Y2UyYjQ4NzQ5ZmY2MTdjMjMzMjlhNzY5NWU0MyIsIm5iZiI6MTc2NTc5OTY3Ny45NDU5OTk5LCJzdWIiOiI2OTNmZjZmZDNlNzA4NGMzYmZhZWQxNGYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.GSR_ytVlCt4zd32jWg-bJBO8FVoK08otg7rmewPA_jc`,
      Accept: 'application/json',
    },
                })
            }),
    //         })https://api.themoviedb.org/3/search/keyword?api_key=38b5350b152fb6613afe7091606dc798&query=chan//query:(query)=>`/search/movie?query=${query}&page=1`,
    })
});

export const {useGetMovieQuery,useGetSearchQuery} = apiSlice;