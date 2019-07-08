import React, { Component } from 'react';
import axios from 'axios';
import Questions from './Questions';
import { connect } from "react-redux";
import Toolbar from "../../../layout/Toolbar/Toolbar";
import ToolbarOUT from "../../../layout/Toolbar/ToolbarSignout";
import { Link } from 'react-router-dom'
import CircularProgress from '@material-ui/core/CircularProgress';

const mapStateToProps = state => {
  return { token: state.token, usertype: state.usertype, id: state.id };
};


class Question extends Component {
  
  state={
      Questions:[],
      ask:'',
      loaded:false
      
      
  }
  
  componentDidMount()  {
      
    this.get(this.state.id )
    
   
  }
  get = () => {
    axios.get('/api/Questions/user/' +this.props.id )
    .then(res => this.setState({ Questions: res.data.data,loaded:true }))
    }
    
  
    ask = (ask) => {
      console.log("pp")
      axios.post('/api/Questions/ask',
      { "question":ask,
        "user":this.props.id
      })
      
    
    }
  

onChange= (e) => this.setState({[e.target.name]: e.target.value});
handleClick =() => {
  this.props.history.push("/faq");
};
onSubmit = (e) => {
  console.log("kk")
  e.preventDefault();
  this.ask(this.state.ask,this.state.id);
  this.setState({ ask: '' 
  
  });
}



  render() {

    if (this.props.token === null) {
      return (
        <div>
          <Toolbar/>
          <div class="thumbnails">
            <div class="box">
              <div class="inner">
                <h3>You have to sign in first!</h3>
                <button
                  variant="contained"
                  onClick={<Link to="/signin" />}
                  className="btn"
                  style={{backgroundColor:"#70c7be"}}
                >
                  Sign In
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }
    if(!this.state.loaded){
      return (
        <>
        <ToolbarOUT />
        <div style={{position: 'fixed',top: '50%',left: '50%'}}>
      <CircularProgress/>
      </div>
      </>
      )
    }
    else{
    return (
        <div className="Questions">
         <ToolbarOUT />
        
          <div>
          <h1 style={{ color: '#FFDA00', textShadow: '2px 2px #B83126',textAlign: 'left', postion:'fixed', marginLeft: '140px',
                      fontWeight: 'bold',fontSize:'60px'}} >Your <br></br>Questions </h1>  
            <br></br>   
           
            <Questions  Questions={this.state.Questions}  />

            <h3 style={{color:"#3e3939bf" ,postion:'relative', marginLeft:"880px",top:"90px"}}> Another Question?</h3>
             <form onSubmit={this.onSubmit} >
            <label>
                    <input
                       type="text"
                        name='ask'
                        value={this.state.ask}
                        placeholder="Add Question ..."

                        style={{width:'500px', postion:'fixed', marginLeft:"880px",top:"135px",fontSize:'15px',fontFamily:'Arial',backgroundColor:'#efefef'}}

                        onChange={this.onChange}/>
                </label>

          
            <input 
          type="submit" 
          value="Submit" 
         style={{ postion:'fixed',marginLeft:"880px",top:"190px"}}
          className="btn"
          />
       
        </form>
            
        <footer id="footer" style={{position:"absolute",bottom:"0",width:"100%",marginBottom:"-500px"}}>
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
        </div>
   
    );
    }
  }
}

const Form = connect(
  mapStateToProps,
  null
)(Question);
export default Form;
		
