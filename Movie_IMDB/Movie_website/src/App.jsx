import React from 'react'
import Home from './component/Pages/Home'
import { Provider } from 'react-redux'
import { store } from './store/store'
import { Route, Routes ,BrowserRouter} from 'react-router-dom'
import Movie_Details from './component/Pages/Movie_Details'
import Navbar from './component/Navbar'
import WatchList from './component/Pages/WatchList'
import Search_List from './component/Search'


function App() {
  return (
    <div>
         <BrowserRouter>
         <Navbar/>
         <Provider store={store}>
            <Routes>
              <Route path='/' element={<Home/>}/>
              <Route path='movie/:id' element={<Movie_Details/>}/>
              <Route path='watchlist' element={<WatchList/>}/>
              <Route path='/search' element={<Search_List/>}/>
            </Routes>
        </Provider>
        </BrowserRouter>
    </div>
  )
}

export default App;