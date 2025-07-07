import React from 'react'

const CustomButton = ({children,loading,className, ...props}) => {
  return (
    <button {...props} disabled={loading} className={`${className} border border-green-400 p-2 rounded-lg bg-green-100 disabled:bg-grey-200 disabled:border-grey-200`}>
        {children}
      
    </button>
  )
}

export default CustomButton
