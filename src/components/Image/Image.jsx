import React from 'react'
import './Image.css'
import People from "../../components/Carousel/People-bg-new.jpg"
function Image() {
  return (
    <div className='img'>
      <img src={People} alt="sample" width="82.85%"></img>
      <figcaption1>Transforming Lives</figcaption1>
      <figcaption2>State of the Art Customer Service</figcaption2>
      </div>
  )
}

export default Image