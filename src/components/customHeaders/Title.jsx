import React from 'react'

const Title = ({children,classNames, ...props}) => {
  return (
    <h2 {...props} className={`${classNames} font-bold text-2xl `}>
        {
            children
        }
      
    </h2>
  )
}

export default Title
