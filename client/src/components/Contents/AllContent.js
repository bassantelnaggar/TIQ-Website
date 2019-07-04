import React, { Component } from "react";
import Content from "./Content";
// import ReviewCard from "../../layout/ReviewCard/ReviewCard";
import Logo from '../../components/images/news.jpg'
import { Link } from 'react-router-dom'
import Home from "../../pages/Homee/Home";

class AllContent extends Component {
  render() {
    return (
      <>
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
    <footer id="footer" style={{position:"relative",bottom:"0",width:"100%",marginBottom:"-500px"}}>
          <div >
            <ul className="icons">
              <li>
                
                <a className="icon fa-facebook" href="https://www.facebook.com/TheIntelligentQuestion/?epa=SEARCH_BOX?>" target="_blank"><i ></i></a>

                {/* </Link> */}
              </li>
              <li>
              <a className="icon fa-youtube" href="https://www.youtube.com/channel/UCs-EFuX9iVRUdGfHcezy4Lg" target="_blank"><i ></i></a>

              </li>
              <li>
              <a className="icon fa-instagram" href="https://www.instagram.com/the.intelligent.question/" target="_blank"><i ></i></a>

              </li>
            </ul>
            <ul className="copyright">
              <li>&copy; ERROR 404.</li>
            </ul>
          </div>
        </footer>
    </>
    )
  
  }
}

export default AllContent;
