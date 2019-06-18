import React, { Component } from "react";
import axios from "axios";
//import Header from "./Header";
import Toolbar from "../../layout/Toolbar/Toolbar";
import { connect } from "react-redux";

const mapStateToProps = state => {
  return { token: state.token, usertype: state.usertype, id: state.id };
};
export class ArticleBody extends Component {
    constructor(props) {
          super(props);
           this.state = {
              articleee: [],
           }
        }
        handleClick =() => {
            this.props.history.push("/ArticlesHome");
  };

  componentDidMount() {
    const id = this.props.match.params.key;
    axios.get('/api/Articles/' + id)
    .then(articleee=>this.setState({articleee : articleee.data.data},()=>console.log("fetched",articleee.data.data)))
    .catch(console.log('cannot fetch'))
    
  }
  

  render() {
      console.log(this.state.articleee.title)
      const headerStyle = {
 
        color: '#E2A325',
        textAlign: 'center',
        padding: '55px',
        postion:'fixed',
        left: '0',
        width:'100%',
        lineHeight: '1',
        fontWeight: 'bold',
        fontSize:'90px'
      }
      const bodyStyle = {
 
        color: 'black',
        textAlign: 'center',
        padding: '150px',
        postion:'fixed',
        // left: '0',
        textmargin:'100px',
        width:'100%',
        fontSize:'20px'
      }
      const authStyle = {
        color: 'black',
        textAlign: 'center',
        padding: '55px',
        postion:'fixed',
        left: '0',
        width:'100%',
        fontSize:'30px'
       
      }
    return (

      <div >
          <div>
          <Toolbar />
          <button
            className="button"
            style={{ position: "absolute", left: "20px", top: "63px" }}
            onClick={() => {
              this.handleClick();
            }}
          >
            BACK
          </button>

        </div>
        <header style={headerStyle}> {this.state.articleee.title}</header>
        <h style={authStyle}> {"BY: "}{this.state.articleee.author}</h>
        {/* <img src={Blog} alt="" style={imageStyle}  /> */}
        {/* <header style={descStyle}>  {this.state.articleee.description}</header> */}
        <p style={bodyStyle}> {this.state.articleee.body}</p>
    
       
      
      </div>
    );
  }
}
const Form = connect(
  mapStateToProps,
  null
)(ArticleBody);

export default Form;
