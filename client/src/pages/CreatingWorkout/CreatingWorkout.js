import React, {useState, useEffect} from 'react';
import Table from '../../components/Table/Table';
import YoutubePlayer from '../../components/YoutubePLayer/YoutubePlayer'

//mock data 

//youtube url, please note that the user copied an url with time too, to consider as case scenario
const testUrl = 'https://www.youtube.com/watch?v=vc1E5CfRfos&t=563s'
//day selected for the workout
const day = 'Wednesday';
//time of the video, to implement timestamps
let time = 0;


function getIdVideoYoutube (url) {
  var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  var match = url.match(regExp);
  console.log((match&&match[7].length==11)? match[7] : false)
  return (match&&match[7].length==11)? match[7] : false;
}
//-------------------------------------------
function CreatingWorkout () {

  const [url, setUrl] = useState('');
  
  useEffect(() => {
    const youtubeId =  getIdVideoYoutube(testUrl);
    setUrl(`https://www.youtube.com/embed/${youtubeId}`)
  },[])

  console.log(url)
  // let urlForEmbeddedVideo = `https://www.youtube.com/embed/${youtubeId}${ time===0 ?  '' : '?start=32'}`

  return (
    <div className = 'div-creating'>
      <h1>Create your day workout</h1>
      <h3>Video name</h3>
      <p>{day}</p>
      <iframe width="560" height="315" src={url} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
      <Table/>
      <YoutubePlayer/>
      <button onClick={()=> {    setUrl(url+`?start=32`)}}>Change time</button>
    </div>
  ) 
}

export default CreatingWorkout;