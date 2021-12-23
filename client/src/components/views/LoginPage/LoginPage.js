import React,{useState} from 'react'
import Axios from 'axios'
import { useDispatch } from 'react-redux';
import { loginUser } from '../../../_actions/user_action';
import { useNavigate } from 'react-router-dom';
/*
import {
    useLocation,
    useNavigate,
    useParams
} from "react-router-dom";
  
function withRouter(Component) {
    function ComponentWithRouterProp(props) {
        let location = useLocation();
        let navigate = useNavigate();
        let params = useParams();
        return (<Component
            {...props}
            router={{ location, navigate, params }}
          />
        );
      }
    
      return ComponentWithRouterProp;
}
*/
function LoginPage(props) {
    const navigate=useNavigate();
    const dispatch = useDispatch();
    const [Email,setEmail] = useState("")
    const [Password, setPassword] = useState("")
    const onEmailHandler=(event)=>{
        setEmail(event.currentTarget.value)
    }
    const onPasswordHandler=(event)=>{
        setPassword(event.currentTarget.value)
    }
    const onSubmitHandler = (event) => {
        event.preventDefault();

        let body = {
            email: Email,
            password: Password
        }

        dispatch(loginUser(body))
            .then(response => {
                if (response.payload.loginSuccess) {
                    //props.history.push('/')
                    navigate(-1);
                } else {
                    alert('Error')
                }
            })


    }
    return (
        <div style={{display:'flex',justifyContent:'center',alignItems:'center',width:
        '100%',height:'100vh'}}>
            <form style={{display:'flex',flexDirection:'column'}} onSubmit={onSubmitHandler}>
                <lable>Email</lable>
                <input type="email" value={Email} onChange={onEmailHandler}/>
                <lable>Password</lable>
                <input type="password" value={Password} onChange={onPasswordHandler}/>
                <br />
                <button>
                    Login
                </button>
            </form>
        </div>
    )
}

export default LoginPage
