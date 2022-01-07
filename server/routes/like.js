const express = require('express');
const router = express.Router();
const { Like } = require("../models/Like");

const { auth } = require("../middleware/auth");
const {Dislike} = require('../models/Dislike');
const { response } = require('express');
//=================================
//             Like
//=================================


router.post("/getLikes", (req, res) => {
    let variable={}
    if(req.body.videoId){
        variable={videoId:req.body.videoId}
    }
    else{
        variable={commentId:req.body.commentId}
    }
    Like.find(variable)
    .exec((err,likes)=>{
        if(err) return res.status(400).send(err)
        res.status(200).json({success:true,likes})
    })
});
router.post("/getDisLikes", (req, res) => {
    let variable={}
    if(req.body.videoId){
        variable={videoId:req.body.videoId}
    }
    else{
        variable={commentId:req.body.commentId}
    }
    Dislike.find(variable)
    .exec((err,dislikes)=>{
        if(err) return res.status(400).send(err)
        res.status(200).json({success:true,dislikes})
    })
});
router.post("/upLike",(req,res)=>{
    let variable={}
    if(req.body.videoId){
        variable={videoId:req.body.videoId,userId:req.body.userId}
    }
    else{
        variable={commentId:req.body.commentId, userId:req.body.userId}
    }
    const like = new Like(variable)
    like.save((err,likeResult)=>{
        if(err) return res.status(400).json({success:false,err})
        Dislike.findOneAndDelete(variable)
        .exec((err,disLikeResult)=>{
            if(err) return res.status(400).json({success:false,err})
            res.status(200).json({success:true})
        })
    })
})
router.post("/unLike",(req,res)=>{
    let variable={}
    if(req.body.videoId){
        variable={videoId:req.body.videoId,userId:req.body.userId}
    }
    else{
        variable={commentId:req.body.commentId, userId:req.body.userId}
    }
    
    Like.findOneAndDelete(variable)
    .exec((err,result)=>{
        if(err) return res.status(400).json({success:false,err})
        res.status(200).json({success:true})
    })
})
router.post("/unDislike",(req,res)=>{
    let variable={}
    if(req.body.videoId){
        variable={videoId:req.body.videoId,userId:req.body.userId}
    }
    else{
        variable={commentId:req.body.commentId, userId:req.body.userId}
    }
    
    Dislike.findOneAndDelete(variable)
    .exec((err,result)=>{
        if(err) return res.status(400).json({success:false,err})
        res.status(200).json({success:true})
    })
})
router.post("/upDisLike",(req,res)=>{
    let variable={}
    if(req.body.videoId){
        variable={videoId:req.body.videoId,userId:req.body.userId}
    }
    else{
        variable={commentId:req.body.commentId, userId:req.body.userId}
    }
    const dislike = new Dislike(variable)
    dislike.save((err,dislikeResult)=>{
        if(err) return res.status(400).json({success:false,err})
        Like.findOneAndDelete(variable)
        .exec((err,LikeResult)=>{
            if(err) return res.status(400).json({success:false,err})
            res.status(200).json({success:true})
        })
    })
})
module.exports = router;
