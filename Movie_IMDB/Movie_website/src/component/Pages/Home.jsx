
import Movies_List from '../Movies_List'
import Banner from '../banner'

function Home() {
  return (
    <div>
      <Banner/>
      <div className='bg-black'>
        <h1 className='text-2xl font-bold text-center p-4' >Trending Movies</h1>
        <Movies_List/>
      </div> 
    </div>
  )
}

export default Home;

