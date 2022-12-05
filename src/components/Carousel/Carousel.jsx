import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css'
import './Carousel.css'
import Surjani from './i01_surjani-grid.jpg';
import KEhouse from './i01_ke-house-day2.jpg'
import khicity from './i01_khi.jpg'
function CarouselFadeExample() {
  return (
    <div className='carousel'>
    <Carousel fade>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={Surjani}
          alt="First slide"
        />
        <Carousel.Caption>
          <h1>Our Vision</h1>
          <h2>To restore and maintain pride in KE, Karachi and Pakistan.</h2>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={KEhouse}
          alt="Second slide"
        />

        <Carousel.Caption>
          <h1>Our Mission</h1>
          <h2>Brightening lives by building the capacity to deliver uninterrupted, safe and affordable power to Karachiites.</h2>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100 h-75"
          src={khicity}
          alt="Third slide"
          height = "20%"
        />

        <Carousel.Caption>
          <h1>Our Values</h1>
          <h2>
            PAt K-Electric, our employees are the key driver of our success. This ethos is reflected in our values – CARES – which define our corporate culture.
          </h2>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
    </div>
  );
}

export default CarouselFadeExample;