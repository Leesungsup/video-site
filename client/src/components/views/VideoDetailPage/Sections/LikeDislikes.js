import React,{useEffect,useState} from 'react'
import {Tooltip,Icon} from 'antd'
import Axios from 'axios'
function LikeDislikes(props) {
    const [Likes, setLikes] = useState(0)
    const [DisLikes, setDisLikes] = useState(0)
    const [LikeAction, setLikeAction] = useState(null)
    const [DisLikeAction, setDisLikeAction] = useState(null)
    let variable={}
    if(props.video){
        variable={videoId: props.videoId, userId:props.userId}
    }else{
        variable={commentId: props.commentId, userId:props.userId }
    }
    useEffect(() => {
        Axios.post('/api/like/getLikes',variable)
        .then(response=>{
            if(response.data.success){
                setLikes(response.data.likes.length)
                response.data.likes.map(like=>{
                    if(like.userId===props.userId){
                        setLikeAction('liked')
                    }
                })
            }
            else{
                alert('좋아요. 정보를 받아오는데 실패하였습니다.')
            }
        })
        Axios.post('/api/like/getDisLikes',variable)
        .then(response=>{
            console.log(response.data)
            if(response.data.success){
                setDisLikes(response.data.dislikes.length)
                response.data.dislikes.map(dislike=>{
                    if(dislike.userId===props.userId){
                        setDisLikeAction('disliked')
                    }
                })
            }
            else{
                alert('싫어요. 정보를 받아오는데 실패하였습니다.')
            }
        })
    }, [])
    const onLike = () =>{
        if(LikeAction===null){
            Axios.post('/api/like/upLike',variable)
            .then(response=>{
                if(response.data.success){
                    setLikes(Likes+1)
                    setLikeAction('liked')
                    if(DisLikeAction !== null){
                        setDisLikeAction(null)
                        setDisLikes(DisLikes-1)
                    }
                }else{
                    alert('Like를 올리지 못하였습니다.')
                }
            })
        }else{
            Axios.post('/api/like/unLike',variable)
            .then(response=>{
                if(response.data.success){
                    setLikes(Likes-1)
                    setLikeAction(null)
                }else{
                    alert('Like를 내리지 못하였습니다.')
                }
            })
        }
    }
    const onDislike = () =>{
        if(DisLikeAction===null){
            Axios.post('/api/like/upDisLike',variable)
            .then(response=>{
                if(response.data.success){
                    setDisLikes(DisLikes+1)
                    setDisLikeAction('disliked')
                    if(LikeAction !== null){
                        setLikeAction(null)
                        setLikes(Likes-1)
                    }
                }else{
                    alert('Like를 올리지 못하였습니다.')
                }
            })
        }else{
            Axios.post('/api/like/unDislike',variable)
            .then(response=>{
                if(response.data.success){
                    setDisLikes(DisLikes-1)
                    setDisLikeAction(null)
                }else{
                    alert('Like를 내리지 못하였습니다.')
                }
            })
        }
    }
    return (
        <div>
            <span key="comment-basic-like">
                <Tooltip title="Like">
                    <Icon type="like"
                        theme={LikeAction === 'liked' ? 'filled' : 'outlined'}
                        onClick={onLike} />
                </Tooltip>
                <span style={{ paddingLeft: '8px', cursor: 'auto' }}>{Likes}</span>
            </span>&nbsp;&nbsp;
            <span key="comment-basic-dislike">
                <Tooltip title="Dislike">
                    <Icon
                        type="dislike"
                        theme={DisLikeAction === 'disliked' ? 'filled' : 'outlined'}
                        onClick={onDislike}
                    />
                </Tooltip>
                <span style={{ paddingLeft: '8px', cursor: 'auto' }}>{DisLikes}</span>
            </span>
        </div>
    )
}

export default LikeDislikes
