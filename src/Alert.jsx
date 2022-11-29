import React, { useEffect } from 'react'

function Alert({msg, type, list, removeAlert}) {

    useEffect(() =>{
        const timeout = setTimeout(() =>{
            removeAlert();
        }, 3000)
        return () => clearTimeout(timeout);
    })

  return (<p className={`alert alert-${type}`}>{msg}</p>
  )
}

export default Alert