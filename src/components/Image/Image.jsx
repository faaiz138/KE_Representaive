import React from 'react'
import './Image.css'
import People from "../../components/Carousel/People-bg-new.png"
function Image() {
  return (
    <div className='img'>
      <img src={People} alt="sample" width="100"></img>
      </div>
  )
}

export default Image