import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import Toolbar from "./layout/Toolbar/Toolbar";
import ToolbarOUT from "./layout/Toolbar/ToolbarSignout";
import AllArticles from './components/articles/AllArticles'
import AddArticle from './components/articles/AddArticle'
import DeleteArticle from './components/articles/DeleteArticle'
import UpdateArticlehelper from './components/articles/UpdateArticlehelper';
import { Link } from 'react-router-dom'
import {connect} from "react-redux";

const mapStateToProps = state => {
  return { token: state.token, usertype: state.usertype, id: state.id }
}

class Articles extends Component {
  state = {
    allArticles : [] 
  }
  componentDidMount(){
    axios.get('/api/Articles')
    .then(res=>this.setState({allArticles:res.data.data}))
  }
  handleClick =() => {
    this.props.history.push("/ArticlesHome");
 };
  
  addArticle = (article)=>{
      //console.log(article)
      axios.post('/api/Articles/create' , article)
      .then(res=>this.setState({allArticles:[...this.state.allArticles,res.data.data]}))
      .catch(error=> {
        console.log('erorr')
      });
  }

  updateComment = (comment)=>{
    console.log(this.props.id)
    console.log(this.usertype)
    axios.put(`/api/Articles/comment/${comment.article._id}/${this.props.id}`,{comments:comment.comment})
    axios.get('/api/Articles')
    .then(res=>this.setState({allArticles:res.data.data}))  
    }
  
  deleteArticle = (id) =>{
    axios.delete(`/api/Articles/${id}`)
    .then(res=>this.setState({allArticles:[...this.state.allArticles.filter(article=>article._id!== id)]}))
  }

  updateArticle = article => {
    const articles =this.state.allArticles
    for(var i = 0 ; i<articles.length;i++){
      if(articles[i]._id === article._id){
        if(article.title !== ""){
          articles[i].title = article.title 
        }
        if(article.description !== ""){
          articles[i].description = article.description 
        }
      }
    }
    const back = {}
    if(article.title !== ""){
      back.title = article.title
    }
    if(article.description !== ""){
      back.description = article.description
    }
    axios.put(`/api/Articles/${article._id}`,back)
    .then(this.setState({allArticles : articles})) 
  }

  render() {
    const auth = this.props.usertype === "TIQadmin";
    if (auth) {
    return (
      <>
      <div className="App">
        <ToolbarOUT />
        <button
            className="button"
            style={{ position: "absolute", left: "20px", top: "63px" }}
            onClick={() => {
              this.handleClick();
            }}
          >
            BACK
          </button>
      <h1>add new Article</h1>
      <AddArticle addArticle = {this.addArticle} />
      <h1>delete article</h1>
      <DeleteArticle deleteArticle ={this.deleteArticle} allArticles={this.state.allArticles} updateComment = {this.updateComment}/>
      <h1>update articles</h1>
      <UpdateArticlehelper allArticles ={this.state.allArticles} updateArticle = {this.updateArticle} />
      </div>
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
      </>
    );
  }
}
}

const Form = connect(
  mapStateToProps,
  null
)(Articles)
export default Form