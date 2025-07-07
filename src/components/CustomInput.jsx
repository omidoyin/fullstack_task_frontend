import React from 'react'

const CustomInput = ({children,...props}) => {
  return (
     <input
              type="text"
              className=" border border-green-500 p-2 w-full rounded-lg"
               {...props}
           
            />
  
  )
}

export default CustomInput
