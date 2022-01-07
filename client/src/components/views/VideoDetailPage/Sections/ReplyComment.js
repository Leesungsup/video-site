import React,{useState,useEffect} from 'react'
import SingleComment from './SingleComment'
function ReplyComment(props) {
    const [ChildCommentNumber, setChildCommentNumber] = useState(0)
    const [OpenReplyComments, setOpenReplyComments] = useState(false)
    useEffect(() => {
        let commentNumber=0;
        props.commentList.map((comment)=>{
            if(comment.responseTo===props.parentCommentId){
                commentNumber++
                console.log(comment.responseTo)
            }
        })
        setChildCommentNumber(commentNumber)
    }, [props.commentList])
    console.log(ChildCommentNumber)
    console.log(props.commentList)
    const renderReplyComment=(parentCommentId)=>{
        console.log(parentCommentId)
        props.commentList.map((comment,index)=>(
            <React.Fragment>
                {comment.responseTo === parentCommentId &&
                <div style={{width:'80%',marginLeft:'40px'}}>
                <SingleComment refreshFunction={props.refreshFunction} comment={comment} postId={props.postId} />
                <ReplyComment refreshFunction={props.refreshFunction} commentList={props.commentList} postId={props.postId} parentCommentId={comment._id}/>
                </div>
                }
            </React.Fragment>
        ))
    }
    const onhandleChange=()=>{
        setOpenReplyComments(!OpenReplyComments)
    }
    return (
        <div>
            {ChildCommentNumber>0 &&
            <p style={{fontSize:'14px',margin:0,color:'gray'}} onClick={onhandleChange}>
                View {ChildCommentNumber} more comment(s)
            </p>
            }
            {OpenReplyComments && renderReplyComment(props.parentCommentId)}
        </div>
    )
}

export default ReplyComment
