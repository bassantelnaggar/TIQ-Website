import React, { Component } from "react";
import Content from "./Content";
// import ReviewCard from "../../layout/ReviewCard/ReviewCard";
import Logo from '../../components/images/news.jpg'
import { Link } from 'react-router-dom'
import Home from "../../pages/Homee/Home";

class AllContent extends Component {
  render() {
    return (
      <div class="inner">
      <div class="thumbnails">
        {  this.props.allContent.map(content => (
          <div class="box">
           <div class="inner">
            <Link class="image fit">
                    <img src={Logo} alt="" />
                  </Link>
               <h3>{content.type}</h3>
              <p>{content.description} </p>
              <p>{content.date} </p>
        
            </div>
          </div>
        ))}
      </div>
    </div>
    )
  
  }
}

export default AllContent;
