import React, { useState, useEffect, useRef  } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom"
import LoginComponent from "../loginComponent/LoginComponent";
import "./WelcomeStyles.css"
import CategoryTab from "./CategoryTabComponent";
import axios from "axios";
import { apiClient } from "../api/ApiClient";
import HotelCard from "../HotelCardComponent/HotelCardComponent";

function WelcomeComponent() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scroll, setScroll] = useState(0)
  const [pageWidth, setPageWidth] = useState(window.innerWidth);
  const [left, setLeft] = useState(true)
  const [right, setRight] = useState(true)
  const [scrolled, setScrolled] = useState(0)
  const [suggestedHotels, setSuggestedHotels] = useState([])
  const [search, setSearch] = useState('')
  const [hotelResult, setHotelResult] = useState([])
  const [regionResult, setRegionResult] = useState([])
  const [searchStyles, setSearchStyles] = useState({})
  const [clicked, setClicked] = useState(false)
  useEffect(()=> {
    apiClient.get("/hotels/suggestions")
    .then((response)=> {
      if (response){
        console.log(response.data)
        setSuggestedHotels(response.data)
      }
    })
    .catch((error) => {
      console.log(error)
    })
  }, [])

  useEffect(() => {
    const handleResize = () => {
      setPageWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    // Clean up the event listener
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(()=> {
    if (containerRef.current){
      if (scroll > containerRef.current.scrollWidth - containerRef.current.clientWidth)
        setScroll(containerRef.current.scrollWidth - containerRef.current.clientWidth)
      }
  }, [pageWidth])

  useEffect(()=> {
    console.log(scrolled)
    if (containerRef.current){

      // if page width is smaller than the scroll left then set it back

      if (scroll >= containerRef.current.scrollWidth - containerRef.current.clientWidth){
        setScroll(containerRef.current.scrollWidth - containerRef.current.clientWidth)
        containerRef.current.scrollLeft = containerRef.current.scrollWidth - containerRef.current.clientWidth
        setRight(false)
      }
      else {
        containerRef.current.scrollLeft = scroll;
        setRight(true)
      }

      if (scroll <= 0){
        setScroll(0)
        containerRef.current.scrollLeft = 0
        setLeft(false)
      }
      else {
        containerRef.current.scrollLeft = scroll;
        setLeft(true)
      }
    }
    console.log("Scroll Left: ", containerRef.current?.scrollLeft)
  }, [scrolled, pageWidth])


  const container = containerRef.current;
  console.log(container)
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollLeft = 0;
      setScroll(0);
      setLeft(false);
      setRight(true);
    }
  }, []);

  const scrollToLeft = () => {
    const scrollAmount = 200; // Adjust the scroll distance as needed
    if (containerRef.current != null) {
      setScrolled(scrolled+1)
      // containerRef.current.scrollLeft -= scrollAmount;
      setScroll(containerRef.current.scrollLeft - 200)
  }
  };

  const scrollToRight = () => {
    if (containerRef.current) {
      setScrolled(scrolled+1)

      const scrollAmount = 200; // Adjust the scroll distance as needed
      // containerRef.current.scrollLeft += scrollAmount;
      setScroll(containerRef.current.scrollLeft + 200)
    }
  };

  function handleChange(query: string) {
    // Every time the user types something, make a request searching for that results
    // on the backend.
    setSearch(query)
    console.log('query:', query)
    if (!query && !clicked){
      setHotelResult([])
      setRegionResult([])
      setSearchStyles({})
    }
    else if (!query){
      setHotelResult([])
      setRegionResult([])
      console.log('set back to empty')
    }

    if (clicked) {
    setSearchStyles({
      boxShadow: 'none',
      borderRadius: '25px 25px 0px 0px'
    })
    }
    const body = {'query': query}
    if (query) {
    apiClient.post('/search', body)
    .then((res)=>{
      console.log(query, 'aaa')
      setHotelResult(res.data.matchingHotels)
      setRegionResult(res.data.uniqueRegion)
      console.log(res.data)
    })
    .catch(e=>console.log(e))
  }
  }

  useEffect(
    ()=>handleChange(search), [search, clicked]
  )
  return (
    <div>
    {clicked && <div className="page-white" onClick={(e)=>{setClicked(false)}}></div>}
    <div className="whole-page">
    <div className="home-page" ref={containerRef}>
      {pageWidth < 992 && left ? <span onClick={scrollToLeft} className="scroll-left">&#x3c;</span> : ""}
      {pageWidth < 992 && right ? <span onClick={scrollToRight} className="scroll-right">&#x3e;</span> : ""}

        <CategoryTab text={'Hotels'} img={<svg viewBox="0 0 24 24" width="24px" height="24px"><path fill-rule="evenodd" clip-rule="evenodd" d="M2.832 5.228c0-.469.38-.85.85-.85h15.624c.47 0 .85.381.85.85v6.65c.68.561 1.22 1.392 1.22 2.543v4.847h-1.5v-1.673H3.284v1.673h-1.5V14.394c.025-.655.304-1.589 1.049-2.351V5.228zm2.634 5.587c.264-.034.542-.051.837-.051h3.896c-.503-.483-1.31-.931-2.433-.931-1.09 0-1.83.467-2.3.982zm7.39-.051h4.468l.036.003c.161.016.343.042.536.082a2.36 2.36 0 00-.221-.233c-.447-.41-1.18-.783-2.254-.783-1.078 0-1.751.273-2.181.584a2.395 2.395 0 00-.385.347zm5.8-1.283c-.726-.651-1.812-1.148-3.235-1.148-1.347 0-2.339.347-3.06.868-.342.248-.61.525-.821.802-.736-.86-2.005-1.67-3.774-1.67-1.629 0-2.733.712-3.434 1.503V5.878h14.324v3.603zM3.283 16.095h16.594V14.42c0-.703-.355-1.188-.888-1.545-.56-.374-1.263-.561-1.74-.612H6.304c-1.118 0-1.81.316-2.237.677-.57.482-.765 1.123-.783 1.496v1.658z"></path></svg>}/>
        <CategoryTab text={'Things to Do'} img={<svg viewBox="0 0 24 24" width="24px" height="24px"><path fill-rule="evenodd" clip-rule="evenodd" d="M2.25 5.25h19.5v4.454l-.536.16a2.752 2.752 0 000 5.272l.536.16v4.454H2.25v-4.454l.536-.16a2.752 2.752 0 000-5.272l-.536-.16V5.25zm1.5 1.5v1.876a4.25 4.25 0 010 7.748v1.876h16.5v-1.876a4.25 4.25 0 010-7.748V6.75H3.75z"></path><path d="M12 15a1 1 0 110 2 1 1 0 010-2zM12 11.5a1 1 0 110 2 1 1 0 010-2zM12 8a1 1 0 110 2 1 1 0 010-2z"></path></svg>}/>
        <CategoryTab text={'Rentals'} img={<svg viewBox="0 0 24 24" width="24px" height="24px"><path d="M3 21.2h-.75v.75H3v-.75zm0-12l-.416-.624-.334.223V9.2H3zm9-6l.416-.624L12 2.299l-.416.277L12 3.2zm9.01 6h.75v-.402l-.334-.222-.416.624zm0 12v.75h.75v-.75h-.75zm-17.26 0v-12h-1.5v12h1.5zM3.416 9.824l9-6-.832-1.248-9 6 .832 1.248zm8.168-6l9.01 6 .832-1.248-9.01-6-.832 1.248zM20.26 9.2v12h1.5v-12h-1.5zm.75 11.25H3v1.5h18.01v-1.5zM18 12.96h-6.99v1.5H18v-1.5zm-7.74.75c0 .69-.56 1.25-1.25 1.25v1.5a2.75 2.75 0 002.75-2.75h-1.5zm-1.25 1.25c-.69 0-1.25-.56-1.25-1.25h-1.5a2.75 2.75 0 002.75 2.75v-1.5zm-1.25-1.25c0-.69.56-1.25 1.25-1.25v-1.5a2.75 2.75 0 00-2.75 2.75h1.5zm1.25-1.25c.69 0 1.25.56 1.25 1.25h1.5a2.75 2.75 0 00-2.75-2.75v1.5zm5.24 1.25v3h1.5v-3h-1.5z"></path></svg>}/>
        <CategoryTab text={'Restaurants'} img={<svg viewBox="0 0 24 24" width="24px" height="24px"><path fill-rule="evenodd" clip-rule="evenodd" d="M14.798 5.141L17.47 2.47l1.06 1.06-2.671 2.672c-.679.679-1.055 1.462-1.12 2.199-.043.5.054 1.003.327 1.472L19.97 4.97l1.06 1.06-4.906 4.906c.473.281.974.387 1.466.354.718-.047 1.467-.394 2.096-1.023A905.812 905.812 0 0022.24 7.7l.226-.228 1.067 1.055-.228.23a1012.001 1012.001 0 01-2.559 2.57c-.849.849-1.927 1.384-3.057 1.459a4.027 4.027 0 01-2.647-.768l-1.231 1.231 7.72 7.72-1.061 1.06-5.97-5.97-3 3-1.75-1.75-4.72 4.72-1.06-1.06 4.72-4.72-4.392-4.391a4.75 4.75 0 010-6.718L5 4.44l7.75 7.75 1.232-1.232a3.971 3.971 0 01-.737-2.686c.1-1.147.67-2.246 1.553-3.13zM13.439 15L5.028 6.588a3.25 3.25 0 00.33 4.21L11.5 16.94 13.44 15z"></path></svg>}/>
        <CategoryTab text={'Travel'} img={<svg viewBox="0 0 24 24" width="24px" height="24px"><path fill-rule="evenodd" clip-rule="evenodd" d="M9.566 11.25h4.873c-.07-1.831-.397-3.448-.87-4.628-.268-.672-.57-1.165-.865-1.478-.25-.264-.458-.364-.62-.388H11.922c-.161.024-.37.124-.62.388-.296.313-.597.806-.866 1.478-.472 1.18-.798 2.797-.869 4.628zm-.133-6.027a8.259 8.259 0 00-.39.841c-.554 1.385-.907 3.198-.978 5.186H4.788a7.252 7.252 0 014.645-6.027zm2.393-1.965C7.078 3.348 3.25 7.226 3.25 12a8.744 8.744 0 008.747 8.75c4.833 0 8.753-3.918 8.753-8.75a8.741 8.741 0 00-8.57-8.742 2.079 2.079 0 00-.354 0zm2.746 1.965c.142.263.272.545.39.841.554 1.385.907 3.198.978 5.186h3.272a7.248 7.248 0 00-4.64-6.027zm4.64 7.527H15.94c-.071 1.988-.424 3.8-.977 5.185-.12.298-.25.581-.393.845a7.259 7.259 0 004.642-6.03zm-9.774 6.036a8.244 8.244 0 01-.395-.851c-.554-1.384-.907-3.197-.978-5.185H4.788a7.25 7.25 0 004.65 6.036zm5.001-6.036c-.07 1.83-.397 3.448-.87 4.628-.268.671-.57 1.164-.865 1.477-.295.312-.532.395-.701.395-.17 0-.407-.083-.701-.395-.297-.313-.598-.806-.867-1.477-.472-1.18-.798-2.797-.869-4.628h4.873z"></path></svg>}/>
        <CategoryTab text={'More'} img={<svg viewBox="0 0 24 24" width="24px" height="24px" x="0" y="0"><circle cx="4.5" cy="11.9" r="2.5"></circle><circle cx="19.5" cy="11.9" r="2.5"></circle><circle cx="12" cy="11.9" r="2.5"></circle></svg>}/>
    </div>
    <div className="search-container">
      <div className="img-container">
        <img className='home-search-img' src="https://static.tacdn.com/img2/brand/home/homemar2022_dt_trans.png"></img>
        <form>
          <input placeholder="Where to?" style={searchStyles} className="search-bar" onChange={(event)=>{handleChange(event.target.value)}} onClick={()=>{setClicked(true)}}></input>
          <svg viewBox="0 0 24 24" width="1em" height="1em" className="search-svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M9.74 3.75a5.99 5.99 0 100 11.98 5.99 5.99 0 000-11.98zM2.25 9.74a7.49 7.49 0 1113.3 4.728l5.44 5.442-1.06 1.06-5.44-5.439A7.49 7.49 0 012.25 9.74z"></path></svg>
        </form>

      </div>
      {(clicked) && <div className="query-results">
          {hotelResult.map((item: any) => (
          <div key={item._id}>{item.name}</div>
          ))}
          <div>{regionResult}</div>
        </div>}
    </div>
    <div className="img-container2">
      <img className="top-hotels-image" src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/10/cd/50/0f/romance-hotel-boutique.jpg?w=1200&h=-1&s=1" role="none" alt="" loading="lazy" width="1200" height="1400"></img>
      <div className="top-hotels-title">Travelers' Choice of the Best Hotels</div>
      <div className="top-hotels-subtitle">See our top 1%, powered by real reviews.</div>
      <Button className="top-hotels-button">See the list</Button>
    </div>
    <h2 className="suggestions">You might like these</h2>

    <div style={{position:'relative'}}>
      <div className="back-arrow-circle"></div>
      <div className="back-arrow">&#x2190;</div>

      <div className="next-arrow-circle"></div>
      <div className="next-arrow">&#x2192;</div>

    <div className="hotel-carousel">

      {/* Build a basic end point that will get 8 random hotels and their photo and show em. */}
      {
        suggestedHotels.map((item: any) => (
          <HotelCard key={item.id} hotelItem={item} />
        ))
      }
    </div>
    </div>
    <div>
      List a bunch of cities and stuff you can explore there
    </div>
    </div>
    </div>
  )
}

export default WelcomeComponent;