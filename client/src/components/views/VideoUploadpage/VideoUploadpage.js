import React,{useState} from 'react'
import {Typography,Button,Form,message,Input,Icon, Descriptions} from 'antd';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import {useSelector} from 'react-redux';

//import { response } from 'express';
const {Title}=Typography;
const {TextArea}=Input;
const PrivateOptions = [
    { value: 0, label: 'Private' },
    { value: 1, label: 'Public' }
]

const CategoryOptions = [
    { value: 0, label: "Film & Animation" },
    { value: 1, label: "Autos & Vehicles" },
    { value: 2, label: "Music" },
    { value: 3, label: "Pets & Animals" },
    { value: 4, label: "Sports" },
]
function VideoUploadpage(props) {
    const user = useSelector(state => state.user)
    const [VideoTitle, setVideoTitle] = useState("")
    const [Description, setDescription] = useState("")
    const [Private, setPrivate] = useState(0)
    const [Category, setCategory] = useState("Film & Animation")
    const [FilePath, setFilePath] = useState("")
    const [Duration, setDurationPath] = useState("")
    const [ThumbnailPath, setThumbnailPath] = useState("")
    const handleChangeTitle = (e) => {
        setVideoTitle(e.currentTarget.value)
    }

    const handleChangeDecsription = (e) => {
        console.log(e.currentTarget.value)

        setDescription(e.currentTarget.value)
    }

    const handleChangePrivate = (e) => {
        setPrivate(e.currentTarget.value)
    }

    const handleChangeCategory = (e) => {
        setCategory(e.currentTarget.value)
    }
    const onSubmit=(e)=>{
        e.preventDefault();
        let variable={
            writer: user.userData._id,
            title: VideoTitle,
            description: Description,
            privacy:Private,
            filePath:FilePath,
            category:Category,
            duration:Duration,
            thumbnail:ThumbnailPath
        }
        axios.post('/api/video/uploadVideo',variable)
        .then(response=>{
            if(response.data.success){
                console.log(variable)
                message.success('성공적으로 업로드를 했습니다.')
                setTimeout(()=>{
                    props.history.push('/')
                },3000);
            }
            else{
                alert("비디오 업로드에 실패 했습니다.")
            }
        })
    }
    const onDrop=(files)=>{
        let formData = new FormData();
        const config = {
            header: { 'content-type': 'multipart/form-data' }
        }
        console.log(files)
        formData.append("file", files[0])
        axios.post('/api/video/uploadfiles',formData,config)
        .then(response=>{
            if(response.data.success){
                let variable={
                    filePath:response.data.filePath,
                    fileName:response.data.fileName
                }
                setFilePath(response.data.filePath)
                console.log(response.data.filePath)
                axios.post('/api/video/thumbnail',variable).then(response=>{
                    if(response.data.success){
                        console.log(response.data)
                        setDurationPath(response.data.fileDuration)
                        setThumbnailPath(response.data.thumbsFilePath)
                    }else{
                        alert('썸네일 생성에 실패 했습니다.')
                    }
                })
            }else{
                alert('비디오 업로드를 실패했습니다.')
            }
        })
    }
    return (
        <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <Title level={2}>Upload Video</Title>
            </div>
            <Form onSubmit={onSubmit}>
                <div style={{display:'flex', justifyContent:'space-between'}}>
                    <Dropzone onDrop={onDrop} multiple={false} maxSize={1000000000}>
                        {({ getRootProps, getInputProps }) => (
                            <div style={{ width: '300px', height: '240px', border: '1px solid lightgray', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                {...getRootProps()}
                            >
                                <input {...getInputProps()} />
                                <Icon type="plus" style={{ fontSize: '3rem' }} />

                            </div>
                        )}
                    </Dropzone>
                    {ThumbnailPath &&
                        <div>
                            <img src={`http://localhost:5000/${ThumbnailPath}`} alt='Thumbnail' />
                        </div>
                    
                    }
                    <div>
                        <img src></img>
                    </div>
                </div>
                    <label>Title</label>
                    <Input onChange={handleChangeTitle} value={VideoTitle} />
                    <br />
                    <br />
                    <label>Description</label>
                    <TextArea onChange={handleChangeDecsription} value={Description} />
                    <br />
                    <br />
                    <select onChange={handleChangePrivate}>
                        {PrivateOptions.map((item,index)=>(
                            <option key={index} value={item.value}>{item.label}</option>
                        ))}
                    </select>
                    <br />
                    <br />
                    <select onChange={handleChangeCategory}>
                        {CategoryOptions.map((item,index)=>(
                            <option key={index} value={item.value}>{item.label}</option>
                        ))}
                    </select>
                    <br />
                    <br />
                    <Button type="primary" size="large" onClick={onSubmit}>
                        Submit
                    </Button>
            </Form>
        </div>
    )
}

export default VideoUploadpage
