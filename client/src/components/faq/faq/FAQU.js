import React, { Component } from 'react';
import axios from 'axios';
import FAQUs from './FAQUs';
import { connect } from "react-redux";
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom'
import Toolbar from "../../../layout/Toolbar/Toolbar";
import ToolbarOUT from "../../../layout/Toolbar/ToolbarSignout";
const mapStateToProps = state => {
  return { token: state.token, usertype: state.usertype, id: state.id };
};

class FAQU extends Component {
  state={
      FAQs:[],
      ask:'',
      id:this.props.id
     
  }
  handleClickME =() => {
    let path = `/signin`;
    this.props.history.push(path);
 };
 handleClickME2 =() => {
  let path = `/createuser`;
  this.props.history.push(path);
};
  handleClick = event => {
    let path = `/userquestions`;
    this.props.history.push(path);
   
  };
  
  componentDidMount()  {
    axios.get('/api/FAQs')
    .then(res => this.setState({ FAQs: res.data.data }))
  }
  ask = (ask,id) => {
    console.log("pp")
    axios.post('/api/Questions/ask',
    { "question":ask,
      "user":id
    })
    alert("Added successfully!")
  
  }
  renderRedirect = () => {
    let path = `/faqAdmin`;
    this.props.history.push(path);
   
  }

onChange= (e) => this.setState({[e.target.name]: e.target.value});

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
        <div className="FAQU">
        <Toolbar />

    <div> <h1 style={{ color: '#FFDA00', textShadow: '2px 2px #B83126',textAlign: 'left', postion:'fixed', marginLeft: '200px',
                      fontWeight: 'bold',fontSize:'90px'}} >FAQs </h1>
      <view>
     
       <FAQUs  FAQs={this.state.FAQs}  />
     
       <h3 style={{color:"#3e3939bf",marginLeft:"880px" ,fontWeight:"bold"}}> Your question is not here? <br/>Ask Now!</h3>
                <form onSubmit={this.onSubmit} >
          
          
           <Link to="/createuser"  className="button" style={{marginLeft:"880px" }} >
            Sign Up   
             </Link>
            <Link to="/signin"  style={{marginLeft:"10px" }}  className="button">
            Sign in  
             </Link>
         </form>  
      </view>
     
      
     <br></br>

    </div>  
  </div>
        
      
        
   
      );
    }
else{
  if (this.props.usertype === "TIQadmin") {
    return(
        <div>
        {this.renderRedirect()}
       </div>
    );
  }
    else{
   return (
      

        <div className="FAQU">
              <ToolbarOUT />
              

          <div> <h1 style={{ color: '#FFDA00', textShadow: '2px 2px #B83126',textAlign: 'left', postion:'fixed', marginLeft: '200px',
                            fontWeight: 'bold',fontSize:'90px'}} >FAQs </h1>
            <view>
           
             <FAQUs  FAQs={this.state.FAQs}  />
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
         style={{ postion:'fixed',marginLeft:"880px",top:"170px"}}
          className="btn"
          />
           <Link className="button" style={{ postion:'fixed',marginLeft:"10px" }} onClick={this.handleClick}>
            My Questions     
            </Link>
        </form>
            </view>
           
            
           <br></br>
      
          </div>  
        </div>
   
    );
   }}
  }
}
const edit={
  backgroundColor:'#5ec0b6' ,
  '&:hover': {backgroundColor: 'red'},
  paddingBottom:'5px',
  marginLeft:"976px",
}
const Form = connect(
  mapStateToProps,
  null
)((FAQU));
export default Form;
	
