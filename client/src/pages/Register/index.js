import React, { useEffect, useState } from "react";
import { Form, Input, message } from "antd";
import Button from "../../components/Button";
import { Link, useNavigate } from "react-router-dom";
import { RegisterUser } from "../../apicalls/users";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../../redux/loadersSlice";

function Register() {
  const [isAdmin, setIsAdmin] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onFinish = async (values) => {
    try {
      dispatch(ShowLoading());
      values = {...values, isAdmin: isAdmin};
      console.log(values);
      const response = await RegisterUser(values);
      console.log(response);
      dispatch(HideLoading());
      if (response.success) {
        message.success(response.message);
        navigate("/login");
      } else {
        message.error(response.message);
      }
    } catch (error) {
      // dispatch(HideLoading());
      message.error(error.message);
    }
  };
  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  }, [navigate]);
  return (
    <div className="flex justify-center h-screen items-center bg-primary">
      <div className="card p-3 w-400">
        <h1 className="text-xl mb-1 pl-1">CINEMAGHAR - {isAdmin ? "ADMIN REGISTRATION" : "REGISTER"} </h1>
        <hr />
        <Form
          layout="vertical"
          className="mt-1"
          onFinish={onFinish}
          initialValues={{ name: "", email: "", password: ""}}
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please input your name" }]}
          >
            <Input type="text" />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please input your email" }]}
          >
            <Input type="email" />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password" }]}
          >
            <Input type="password" />
          </Form.Item>
          <div className="flex flex-col mt-2 ml-1 mr-1 gap-1">
            <Button fullwidth title="REGISTER" type="submit" />
            <Link to="/login" className="text-primary">
              Already have an account? Login
            </Link>
            <div
              onClick={() => setIsAdmin(!isAdmin)} className="cursor-pointer">
                {isAdmin ? "Don't want to apply for admin?" : "Want to apply for admin?"} Click here
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default Register;
