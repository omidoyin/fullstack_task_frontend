import React, { useState } from "react";
import { useNavigate } from "react-router";
import CustomButton from "../components/CustomButton";
import CustomInput from "../components/CustomInput";
import Title from "../components/customHeaders/Title";

import API from "../services/api";
import useAuth from "../hooks/useAuth";
import toast from "react-hot-toast";

const Welcome = () => {
  const [loginForm, setLoginForm] = useState({ name: "" });
  const [registerForm, setRegisterForm] = useState({ name: "" });
  const [registerError, setRegisterError] = useState();
  const [loginError, setLoginError] = useState();
  const {login} = useAuth()

  const navigate = useNavigate();

  const handleNavigateToHome = () => {
    navigate("/home");
  };
  const handleSetRegisterValue = (e) => {
    setRegisterForm({ ...registerForm, [e.target.name]: e.target.value });
  };
  const handleSetLoginValue = (e) => {
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError("");

    try {
      const res = await API.post("/login", loginForm);
      if (!res.error) {
        toast.success("Login successfully")
        login(res?.data?.token,res?.data?.user )
        navigate("/tasks");
      } else {
        setLoginError(res.error);
      }
    } catch (error) {
      console.log({ error });
      toast.error("An error occured")
      setLoginError(error);
    }
  };
  const handleRegister = async (e) => {
    e.preventDefault();
    setRegisterError("");
    try {
      const res = await API.post("/register", registerForm);
      if (!res.error) {
           toast.success("Login successfully")
      } else {
        setRegisterError(res.error);
      }
    } catch (error) {
      console.log({ error });
       toast.error("An error occured")
      setRegisterError(error);
    }
  };
  return (
    <div className=" flex justify-center">
      <div className=" ">
        <Title classNames=" mb-20 mt-5">welcome</Title>
        <div className=" flex items-center gap-10 mb-10">
          <div className="">
            <p>register</p>

            {registerError && (
              <p className="text-red-500 my-2">{registerError}</p>
            )}
            <form
              onSubmit={handleRegister}
              className=" w-full max-w-lg flex flex-col gap-2"
            >
              <CustomInput
                placeholder="name"
                name="name"
                value={registerForm?.name}
                onChange={handleSetRegisterValue}
              />
              <CustomInput
                placeholder="email"
                name="email"
                value={registerForm?.email}
                onChange={handleSetRegisterValue}
              />
              <CustomInput
                placeholder="password"
                name="password"
                value={registerForm?.password}
                onChange={handleSetRegisterValue}
              />
              <CustomButton type="submit">Register</CustomButton>
            </form>
          </div>
          <div className="">
            <p>login</p>
            {loginError && <p className="text-red-500 my-2">{loginError}</p>}
            <form
              onSubmit={handleLogin}
              className=" w-full max-w-lg flex flex-col gap-2"
            >
              <CustomInput
                placeholder="email"
                name="email"
                value={loginForm?.email}
                onChange={handleSetLoginValue}
              />
              <CustomInput
                placeholder="password"
                name="password"
                value={loginForm?.password}
                onChange={handleSetLoginValue}
              />
              <CustomButton type="submit">Login</CustomButton>
            </form>
          </div>
        </div>

        <div>
          <CustomButton onClick={handleNavigateToHome}>Go to home</CustomButton>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
