import React, { Component } from "react";
import "./test.css";
import axios from "axios";
import ToolbarOUT from "../../layout/Toolbar/ToolbarSignout";
import Toolbar from '../../layout/Toolbar/Toolbar'
import news from "../../components/images/debate.jpg";
import { connect } from "react-redux";
import { Link } from 'react-router-dom'
const mapStateToProps = state => {
  return { token: state.token, usertype: state.usertype, id: state.id };
};

class test extends Component {
    constructor(props) {
        super(props);
        this.state = {
          debates: [],
          debate:[],
          createopen: false,
          title: null,
          category: null,
          date: null,
          info: null,
          description: null,
          error: "",
          selecteddate: null,
          selectedcategory: null,
          admin: this.props.usertype === "TIQadmin"
        };
      }
    

    componentDidMount() {
            const id = this.props.match.params.key;
           axios
          .get("/api/debates")
          .then(res => this.setState({ debates: res.data.data }));
          axios
          .get("/api/debates/" + id)
          .then(res => this.setState({ debate: res.data.data }));
      }

  render() {
    if (this.props.token === null) {
      return (
        <div>
        <Toolbar/>
        <div class="body66">
          <div class="container"  data-0="transform:translateX(0%)"
          data-4000="transform:translateX(-300%)">
           <div class="section83">
          
                <>
                  <div class="imgBx">
                      <img src={news}/>
                  </div>
                  <div class="storyBx">
                      <h2>{this.state.debate.title}</h2>
                      <br></br><br></br>
                     <p> 
                      <strong style={{fontWeight:'bold', fontSize:'170%'}}>{"Background"} </strong><br></br>
                      {this.state.debate.info} <br></br>
                     <strong style={{fontWeight:'bold', fontSize:'170%'}}>{"Description"} </strong> <br></br>
                       {this.state.debate.description}</p>
                      </div> 
                      </>
             </div> 
          </div>

        </div>
         </div>
      )
    }
    else{
      return (
          <div>
          <ToolbarOUT/>
          <div class="body66">
            <div class="container"  data-0="transform:translateX(0%)"
            data-4000="transform:translateX(-300%)">
             <div class="section83">
            
                  <>
                    <div class="imgBx">
                        <img src={this.state.debate.debatePicture}/>
                    </div>
                    <div class="storyBx">
                        <h2>{this.state.debate.title}</h2>
                        <br></br><br></br>
                       <p> 
                        <strong style={{fontWeight:'bold', fontSize:'170%'}}>{"Background"} </strong><br></br>
                        {this.state.debate.info} <br></br>
                       <strong style={{fontWeight:'bold', fontSize:'170%'}}>{"Description"} </strong> <br></br>
                         {this.state.debate.description}</p>
                        </div> 
                        </>
               </div> 
            </div>

          </div>
           </div>
      )
    }}
}
       
const Form = connect(
  mapStateToProps,
  null
)(test);
export default Form;
