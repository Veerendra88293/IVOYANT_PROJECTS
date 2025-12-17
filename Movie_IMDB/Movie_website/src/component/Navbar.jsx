import React from 'react'
import { NavLink } from 'react-router-dom'
import image from '../assets/logo.png'
function Navbar() {
  return (
    <div>
        <div className='flex justify-between text-2xl p-7 bg-black text-amber-50'>
            <img src={image} alt="" width={'110px'}/>
            <h1 className='font-bold'>Movies</h1>
            <div className='flex gap-9 text-2xl'>
                <NavLink to='/'>Home</NavLink>
                <NavLink to='/watchlist'>WatchList</NavLink>
                <NavLink to='/Search'>Search Movies</NavLink>
            </div>
        </div>
    </div>
)
}
export default Navbar;
