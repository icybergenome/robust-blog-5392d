import React from 'react'
import { ClipLoader } from 'react-spinners'

 const LoadingSpinner = (props) => {
   console.log("Loaddder",props.isLoading)
  return (
    <div
    style={{
        width: "100%",
        height: "100",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <ClipLoader color="#000" loading={true} size={150} />
    </div>

  )
}


export default LoadingSpinner;