import React from "react";
import { useNavigate } from "react-router";

const About = () => {
  const navigate = useNavigate();

  const handleNavigateToHome = () => {
    navigate("/home");
  };
  const handleNavigateToTasks = () => {
    navigate("/tasks");
  };
  return (
    <div>
      <h2> welcome to About</h2>

      <div>
        <button onClick={handleNavigateToHome}>Go to home</button>
        <button onClick={handleNavigateToTasks}>View tasks</button>
      </div>
    </div>
  );
};

export default About;
