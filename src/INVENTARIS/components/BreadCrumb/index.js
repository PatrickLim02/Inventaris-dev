import React,{} from 'react'
import {} from 'react-redux'
import './styles.scss'
import { AiFillHome } from "react-icons/ai";
import { IoIosArrowForward } from "react-icons/io";
function BreadCrumb (props) {
    const {link} = props;
    
    return(
        <div className="breadcrumb-container"> 
            <span className="home-label">{<AiFillHome />}</span>
            
            {link.map((item, index) =>{
            if (index === 0) {
                return(
                    <span className="item-label pad10" key= {index}>
                         {item.name}
                    </span> 
                )
            } else {
                return(
                    <span className="item-label" key= {index}>
                         <IoIosArrowForward className="icon" /> {item.name}
                    </span> 
                )
            }   
               
            })}    
        </div>
    )
}
    
export default BreadCrumb 