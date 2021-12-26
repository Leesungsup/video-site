import React,{useEffect} from 'react'
import { FaCode } from "react-icons/fa";
import axios from 'axios'
function LandingPage() {
    useEffect(() => {
        axios.get('/api/video/getVideos')
        .then(response=>{
            if(response.data.success){

            }else{
                alert('비디오가져오기를 실패하였습니다.')
            }
        })
    }, [])
    return (
        <>
            <div className="app">
                
            </div>
            <div style={{ float: 'right' }}>Thanks For Using This Boiler Plate by John Ahn</div>
        </>
    )
}

export default LandingPage