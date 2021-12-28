import React,{useEffect,useState} from 'react'
import axios from 'axios'
function SideVideo() {
    const [sideVideos, setsideVideos] = useState([])
    useEffect(() => {
        axios.get('/api/video/getVideos')
        .then(response=>{
            if(response.data.success){
                setsideVideos(response.data.videos)
            }else{
                alert('비디오가져오기를 실패하였습니다.')
            }
        })
    }, [])
    const renderSideVideo = sideVideos.map((video,index)=>{
        var minutes = Math.floor(video.duration / 60);
        var seconds = Math.floor(video.duration - minutes * 60);

        return <div key={index} style={{display:'flex',marginBottom:"1rem",padding:'0 2rem'}}>
            <div style={{width:'40%',marginBottom:'1 rem'}}>
                <a href={`/video/${video._id}`} style={{color:'gray'}}>
                    <img style={{width:'100%'}} src={`http://localhost:5000/${video.thumbnail}`} alt="thumbnail"></img>
                </a>
            </div>
            <div style={{width:'50%'}}>
                <a herf={`/video/${video._id}`} style={{color:'gray'}}>
                    <span style={{ fontSize: '1rem', color: 'black' }}>{video.title}  </span><br />
                <span>{video.writer.name}</span><br />
                <span>{video.views}</span><br />
                <span>{minutes} : {seconds}</span><br />
                </a>
            </div>
        </div>
    })
    return (
        <React.Fragment>
            <div style={{ marginTop:'3rem' }}></div>
            {renderSideVideo}
        </React.Fragment>
    )
}

export default SideVideo
