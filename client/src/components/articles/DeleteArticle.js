import React, { Component } from 'react'
import Article from './Article';
import SimplePopper1 from './SimplePopper1';
import DeleteIcon from '@material-ui/icons/Delete';

class DeleteArticle extends Component {

   render(){
    return (
        <div class="thumbnails">
        {this.props.allArticles.map((article)=>(
                <div class="box">
                <div class="inner">
                    <h3>{article.title}</h3>
                  {/* <input 
                   type="Submit" 
                   value="delete"
                   className="btn"
                   onClick={this.props.deleteArticle.bind(this, article._id)}
                   style={{flex: '10'}}
                    /> */}
                  </div>
                  <SimplePopper1 article={article} deleteArticle ={this.props.deleteArticle} allArticles={this.props.allArticles} updateComment = {this.props.updateComment} allArticles ={this.props.allArticles} updatearticle1 = {this.props.updatearticle1} />
                  <DeleteIcon    onClick={this.props.deleteArticle.bind(this, article._id)}/>

                </div>    
                                ))}
            
            </div>
        )
    
   }

}
export default DeleteArticle 