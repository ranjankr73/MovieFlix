import React, { useEffect } from 'react'
import {Form,message} from 'antd';
import Button from '../../components/Button';
import {Link,useNavigate} from 'react-router-dom';
import { LoginUser } from '../../apicalls/users';
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../../redux/loadersSlice";
function LOGIN() {
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const onFinish =async (values) => {
     try{
      dispatch(ShowLoading());
      const response=await LoginUser(values);

      if(response.success){
        message.success(response.message);
        localStorage.setItem("token",response.data);
        dispatch(HideLoading());
        navigate("/");
       console.log("Reached here");

      }else{
        message.error(response.message);
      }
     }catch(error){
      dispatch(HideLoading());
      message.error(error.message);
     }
  }
  // useEffect(()=>{
  //   if(localStorage.getItem("token")){
  //     console.log("Reached here in useEffect before navigate");
  //     navigate("/");
  //     console.log("Reached here in useEffect after navigate");
  //   }
  // }, []);

  return (
    <div className='flex justify-center h-screen items-center bg-primary'>
      <div className='card p-3 w-400'>
        <h1 className="text-xl mb-1 pl-1">MOVIEFLIX - LOGIN</h1>
        <hr />
        <Form
        layout='vertical'
        className='mt-1'
        onFinish={onFinish}
        initialValues={{email : '', password : ''}}
        >
           <Form.Item
           label='Email'
           name='email'
           rules={[{required: true, message: "Please input your email"}]}>
           <input type="email" />
           </Form.Item>
           <Form.Item
           label='Password'
           name='password'
           rules={[{required: true, message: "Please input your password"}]}>
           <input type="password" />
           </Form.Item>
           <div className="flex flex-col mt-2 ml-1 mr-1 gap-1">
           <Button fullwidth title="LOGIN" type="submit" />
           <Link to="/register"
           className='text-primary'
           >Don't have an account? Register</Link>
           </div>
        </Form>
      </div>
    </div>
  )
}

export default LOGIN