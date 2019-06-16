import React ,{Component} from 'react'
import AddComment from './AddComment';
import { Link } from 'react-router-dom'
class Article extends Component{
    
    render(){
         var s = "";
         const headerStyle = {
 
            color: '#E2A325',
            textAlign: 'center',
            padding: '10px',
            postion:'fixed',
            left: '0',
            width:' 100%'
           
          }
        
        // for(var i = 0 ; i<this.props.article.comments.length ; i++){
        //   s +=  this.props.article.comments[i].username
        //   s += " : "
        //   s += this.props.article.comments[i].comment
        //   s += "\n" 
        
        // }
        return(
            
            <div>
            <header style={headerStyle}>{this.props.article.title}</header>
                <p>{this.props.article.description} <br></br> {" on "} {this.props.article.date} </p>
                <p1>{" By "} {this.props.article.author}</p1>
                {/* <Link to ="/getUsers"> {" By "} {this.props.article.author} </Link> */}
                <br></br>
                <br></br>
                <Link to={"/articlebody/" + this.props.article._id} class="btn">
                      Read More !
                    </Link>
                {/* <p>  {"comments :"} {s}</p> */}
                <div>
                {/* <AddComment article = {this.props.article} /> */}
                {/* updateComment = {this.props.updateComment} */}
                </div>
            </div>
        )
    }
}
export default Article 