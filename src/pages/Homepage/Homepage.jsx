import Carousel from "../../components/Carousel/Carousel"
import Sidebar from "../../components/Sidebar/Sidebar"
import Image from "../../components/Image/Image"
import Navbar from "../../../src/components/navbar";
import Img from "../../../src/components/Img2/Img2"
function Homepage(){
    console.log(localStorage.getItem('auth'))
    return(
        <div className="Homepage">
            <Navbar/>
            <Img/>
            <Carousel/>
            <Image/>
        </div>  
    )    
}
export default Homepage