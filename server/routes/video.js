const express = require('express');
const router = express.Router();
const { Video } = require("../models/Video");
const multer = require('multer')
const { auth } = require("../middleware/auth");
var ffmpeg = require('fluent-ffmpeg');
//=================================
//             Video
//=================================
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`)
    },
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname)
        if (ext !== '.mp4') {
            return cb(res.status(400).end('only jpg, png, mp4 is allowed'), false);
        }
        cb(null, true)
    }
})
var upload = multer({ storage: storage }).single("file")

router.post('/uploadfiles',(req,res)=>{
    //비디오 저장
    upload(req,res,err=>{
        if(err){
            return res.json({success:false,err})
        }
        return res.json({success:true,filePath:res.req.file.path,fileName:res.req.file.filename})
    })
})
router.get('/getVideos',(req,res)=>{
    Video.find()
    .populate('writer')
    .exec((err,videos)=>{
        if(err) return res.status(400).send(err)
        res.status(200).json({success:true,videos})
    })
})
router.post('/uploadVideo',(req,res)=>{
    //비디오 저장
    const video =new Video(req.body)
    video.save((err,doc)=>{
        if(err) return res.json({success:false,err})
        res.status(200).json({success:true})
    })
})
router.post('/thumbnail',(req,res)=>{
    /*let filePath="";
    let fileDuration="";
    ffmpeg.setFfmpegPath('C:\\Program Files\\ffmpeg\\bin\\ffmpeg.exe');
    ffmpeg.ffprobe(req.body.filePath,function(err,metadata){
        console.dir(metadata);
        console.log(metadata.format.duration);
        fileDuration=metadata.format.duration;
    });
    //썸네일 생성
    ffmpeg(req.body.filePath)
    .on('filenames',function(filenames){
        console.log(filenames)
        filePath='uploads/thumbnails/'+filenames[0];
    })
    .on('end',function(){
        console.log('Screenshots taken')
        return res.json({ success: true, thumbsFilePath: thumbsFilePath,fileDuration: fileDuration})
        return res.json({ success: true, thumbsFilePath: thumbsFilePath,fileDuration: fileDuration})
    })
    .on('error',function(){
        console.log(err);
        return res.json({success:false,err});
    })
    .screenshot({
        count:1,
        folder:'uploads/thumbnails',
        size:'320x240',
        filename:'thumbnail-%b.png'
    })*/
    let thumbsFilePath ="";
    let fileDuration ="";
    ffmpeg.setFfmpegPath('C:\\Program Files\\ffmpeg\\bin\\ffmpeg.exe');
    ffmpeg.ffprobe(req.body.filePath, function(err, metadata){
        console.dir(metadata);
        console.log(metadata.format.duration);

        fileDuration = metadata.format.duration;
    })
    ffmpeg(req.body.filePath)
        .on('filenames', function (filenames) {
            console.log('Will generate ' + filenames.join(', '))
            thumbsFilePath = "uploads/thumbnails/" + filenames[0];
        })
        .on('end', function () {
            console.log('Screenshots taken');
            return res.json({ success: true, thumbsFilePath: thumbsFilePath,fileDuration: fileDuration})
        })
        .on('error',function(){
            console.log(err);
            return res.json({success:false,err});
        })
        .screenshots({
            // Will take screens at 20%, 40%, 60% and 80% of the video
            count: 1,
            folder: 'uploads/thumbnails',
            size:'320x240',
            // %b input basename ( filename w/o extension )
            filename:'thumbnail-%b.png'
        });
})
module.exports = router;