import React ,{Component} from 'react';
import Article from './Article' 
import Logo from "../images/debate2.jpg";
class AllArticles extends Component {
    render(){
        return (
            <div >
            {this.props.allArticles.map((article) =>(
                    <div class="box">
                    <div class="inner">
                        <h3> <Article key = {article._id} article = {article} /></h3>
          
           {/* updateComment = {this.props.updateComment} */}
                     
                      </div>
                    </div>))}
        <footer id="footer" style={{position:"relative",bottom:"0",width:"100%",marginBottom:"-500px"}}>
          <div>
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
          

                </div>
            )
       
    }
} 

export default AllArticles ;