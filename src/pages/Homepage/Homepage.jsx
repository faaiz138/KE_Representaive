import Carousel from "../../components/Carousel/Carousel"
import Sidebar from "../../components/Sidebar/Sidebar"
import Image from "../../components/Image/Image"
function Homepage(){
    return(
        <div className="Homepage">
        <Carousel/>
        <Sidebar/> 
        <Image/>
        </div>  
    )
        
}
export default Homepage