import React from "react";
import { useNavigate } from "react-router";
import CustomButton from "./CustomButton";

const Home = () => {
  const navigate = useNavigate();

  const handleNavigateToHome = () => {
    navigate("/tasks");
  };
  return (
    <div>
      <h2 className=" mb-20"> welcome to Home</h2>

      <div>
        <CustomButton onClick={handleNavigateToHome}>view tasks</CustomButton>
      </div>
    </div>
  );
};

export default Home;
