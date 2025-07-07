import React from "react";
import { Bounce, toast, ToastContainer } from "react-toastify";

const ToastMessage = ({ message }) => {
 
  return (
    <div>
      <ToastContainer
position="top-right"
autoClose={2000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick={false}
rtl={false}
pauseOnFocusLoss={false}
draggable
pauseOnHover
theme="light"
transition={Bounce}
/>
    </div>
  );
};

export default ToastMessage;
