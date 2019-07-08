import React, { Component } from 'react';
import axios from 'axios';
import './Chatbars.css';
import Header from './Header';
import Toolbar from '../../layout/Toolbar/Toolbar';
import ToolbarOUT from "../../layout/Toolbar/ToolbarSignout";
import { connect } from "react-redux";
import { Link } from 'react-router-dom'
import CircularProgress from '@material-ui/core/CircularProgress';

const mapStateToProps = state => {
  return { token: state.token, usertype: state.usertype, id: state.id };
};

export class DeleteChatBar extends Component {
        constructor() {
          super();
          this.state = {
            chatbars: [],
            debateLiveTitle: '',
            loaded:false
          };
          
        }
  componentDidMount() {
      fetch('/api/Chatbars/')
      .then(res => res.json())
      .then(chatbars => this.setState({chatbars: chatbars.data,  loaded:true}));
  }
  onSubmit= (e) => {
    e.preventDefault();
      // this.setState(this.state.debateLiveTitle);
    
       this.setState({debateLiveTitle:''})
       this.render();
}
handleClick =() => {
  this.props.history.push("/chatbars");
};
onChange= (e) => this.setState({[e.target.name]: e.target.value});

  getStyle = () => {
    return {
     // background: '#f4f4f4',
      padding: '10px',
      textAlign: 'bottom'
    }
  }
 
    deleteDebateLive= (id)=> {
        axios.delete(' /api/Chatbars/'+id)
        .then(this.setState({chatbars: [...this.state.chatbars.filter(chatbar => chatbar._id !== id)]}))
    
      } 
      addDebateLive = () => {
        axios.post(' /api/Chatbars/create', {
            debateLiveTitle:this.state.debateLiveTitle
            
        })
          .then(res => this.setState({ chatbars: [...this.state.chatbars, res.data.data] }));
          alert("The new motion has been added successfully");
      }
      render() {
        const auth = this.props.usertype === "TIQadmin";
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
        if (auth) {
        return (
          <div   >
        <div>
        <ToolbarOUT/>
        <input 
                  type="Submit" 
                  value="Back"
                  className="btn"
                  onClick={() => {
                    this.handleClick();
                  }}
                  style={{ position: "absolute", left: "20px", top: "63px"}}
                  />
          <br></br>
        <h1 style={{ color: '#FFDA00', textShadow: '2px 2px #B83126',textAlign: 'left', postion:'fixed', marginLeft: '200px',
                      fontWeight: 'bold',fontSize:'60px'}} >Add new Debate Live  </h1>
        
      </div>
      <form onSubmit={this.onSubmit}>
                <input
                 type="text"
                 name="debateLiveTitle" 
                //  style={{flex: '10' , padding: '5px',color:"black",width:'70%',marginLeft:"20%"}}
                 style={{width:"70%",marginLeft:"13%",background:"#E0E0E0",color:"black"}}
                 placeholder="Add a new Debate live..."
                 value={this.state.debateLiveTitle}
                 onChange={this.onChange}
                 />
                 <br></br>
                <input 
                  type="Submit" 
                  value="Create"
                  className="btn"
                  onClick= {this.addDebateLive}
                  style={{flex: '1',marginLeft:"63%",width:"20%"}}
                  />
                  
            </form>
            <br></br>
            <h1 style={{ color: '#FFDA00', textShadow: '2px 2px #B83126',textAlign: 'left', postion:'fixed', marginLeft: '200px',
                      fontWeight: 'bold',fontSize:'60px'}} >Manage Debate Live  </h1>
            <div class="thumbnails">
      {this.state.chatbars.map(chatbar =>
							<div class="box">
							
							
								 <div class="inner">
									<h3>{chatbar.debateLiveTitle}</h3>
									<p> {chatbar.date} </p>
                  <input 
                  type="Submit" 
                 value="delete"
                 className="btn"
                  onClick= {this.deleteDebateLive.bind(this,chatbar._id)}

                   style={{flex: '10'}}
                  />
									{/* <a href={'/addResponse/'+chatbar._id} class="btn">Debate it Now!</a> */}
								</div>
							</div>)}
          
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
       
        </div>
        
        )
      }
    }
  }
}
const Form = connect(
  mapStateToProps,
  null
)(DeleteChatBar);

export default Form;
//export default DeleteChatBar