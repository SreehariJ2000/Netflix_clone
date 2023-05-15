import React,{useEffect,useState} from 'react'
import './RowPost.css'
import Youtube from 'react-youtube'
import axios from '../../axios'
import {API_KEY,imageUrl} from '../../constants/constants'
function RowPost(props) {
  const [movies,setMovies]=useState([])
  const[urlId,setUrlId]=useState('')
  useEffect(()=>{

   // axios.get(`discover/tv?api_key=${API_KEY}&with_networks=213`).then(response=>{
    axios.get(props.url).then(response=>{   //get url dynamically
      console.log(response.data)
      setMovies(response.data.results)
    })

  },[])

//youtube
  const opts = {
    height: '390',
    width: '100%',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 0,
    },
  };
 const handleMovie=(id)=>{
  console.log(id)
  axios.get(`movie/${id}/videos?api_key=${API_KEY}&language=en-US`).then(response=>{ 
    console.log(response.data)      //youtube ath vpm module videoId pass chyanm
   
    if (response.data.results.length != 0) {
      setUrlId(response.data.results[0]); // result 0 you tube link varnne
    }
    else{
      console.log('Array empty')
    }
 })

 }
  return (
    <div className='row'>
<h2>  {props.title}</h2>


<div className='rowpost'>
  {movies.map((obj)=>

  

//<img className={props.isSmall ?'smallposter':'post'} src= {`${imageUrl+obj.backdrop_path}`} alt=""/>
<img  onClick={()=>handleMovie(obj.id)
} className={props.isSmall ?'smallposter':'post'} src= {`${imageUrl+obj.backdrop_path}`} alt=""/>  //video play chyan
)}

</div>

   {/* <Youtube opts={opts} videoId="2g811Eo7K8U" />  */}
      { urlId && <Youtube opts={opts} videoId={urlId.key} /> }
    </div>
  )
}

export default RowPost