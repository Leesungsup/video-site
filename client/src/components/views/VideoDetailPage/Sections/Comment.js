import Axios from 'axios'
import React,{useState} from 'react'
import {useSelector} from 'react-redux'
import { Button, Input } from 'antd';
import SingleComment from './SingleComment';
import ReplyComment from './ReplyComment';
const { TextArea } = Input;
function Comment(props) {
    const videoId=props.postId
    const user = useSelector(state => state.user)
    const [commentValue, setcommentValue] = useState("")
    const handleClick=(e)=>{
        setcommentValue(e.currentTarget.value)
    }
    const onSubmit=(e)=>{
        e.preventDefault()
        const variable={
            content: commentValue,
            writer: user.userData._id,
            postId: videoId
        }
        Axios.post('/api/comment/saveComment',variable)
        .then(response=>{
            console.log(variable)
            if(response.data.success){
                console.log(response.data.result)
                setcommentValue("")
                props.refreshFunction(response.data.result)
            }else{
                alert('커멘트를 저장하지 못했습니다.')
            }
        })
    }
    return (
        <div>
            <br />
            <p> replies</p>
            <hr />
            {/* Comment Lists  */}
            {props.commentList && props.commentList.map((comment,index)=>(
                (!comment.responseTo &&
                <React.Fragment>
                <SingleComment refreshFunction={props.refreshFunction} comment={comment} postId={videoId} />
                <ReplyComment refreshFunction={props.refreshFunction} parentCommentId={comment._id} postId={videoId} commentList={props.commentList}/>
                </React.Fragment>
                )
            ))}
            {/* Root Comment Form */}
            <form style={{ display: 'flex' }} onSubmit={onSubmit}>
                <TextArea
                    style={{ width: '100%', borderRadius: '5px' }}
                    onChange={handleClick}
                    value={commentValue}
                    placeholder="write some comments"
                />
                <br />
                <Button style={{ width: '20%', height: '52px' }} onClick={onSubmit}>Submit</Button>
            </form>

        </div>
    )
}

export default Comment
