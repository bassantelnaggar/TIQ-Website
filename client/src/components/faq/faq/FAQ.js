import React, { Component } from 'react';
import FAQUs from './FAQUs';
import FAQs from './FAQs';
import AddFaq from './AddFaq';
import Button from '@material-ui/core/Button';
import { connect } from "react-redux";                                                                  
import Toolbar from "../../../layout/Toolbar/Toolbar";
import ToolbarOUT from "../../../layout/Toolbar/ToolbarSignout";
import CreateFAQSimpleSnackbar from './CreateFAQSimpleSnackbar';
import UpdateFAQSimpleSnackbar from './UpdateFAQSimpleSnackbar';
import DeleteFAQSimpleSnackbar from './DeleteFAQSimpleSnackbar';
import axios from 'axios';
import { Link } from 'react-router-dom'


const mapStateToProps = state => {
  return { token: state.token, usertype: state.usertype, id: state.id };
};

class FAQ extends Component {
  state={
    snackbar:false,
    snackbardel:false,
    snackbarupdate:false,
    errcreate:false,
    created:false,
    updated:false,
    deleted:false,
    questionundo:'',
    answerundo:'',
    errmsg:"null",
      FAQs:[]
  }
  
  handleClick = event => {
    let path = `/adminquestions`;
    this.props.history.push(path);
   
  };
  
  componentDidMount()  {
    fetch("/api/FAQs/")
    .then(res => res.json())
    .then(res =>
      this.setState({ FAQs: res.data}, () =>
        console.log("FAQs fetched...", FAQs)
      )
    );
    // axios.get('/api/FAQs')
    // .then(res => this.setState({ FAQs: res.data.data }))
  }
  handleClickWWW =() => {
    this.props.history.push("/signin");
 };
  delfaq = (id,question,answer) => {
    axios.delete('/api/FAQs/'+id)
      .then(res => this.setState({ FAQs: [...this.state.FAQs.filter(faq => faq._id !== id)] }));
      // alert("Deleted successfully!")
      this.setState({deleted:true,questionundo:question,answerundo:answer })

}
updatefaq = (id,question,answer) => {
   axios.put('/api/FAQs/edit/'+id,
  {
    "answer":answer,
    "question":question
  })
  .then(res => {
    axios.get('/api/FAQs')
    .then(res => this.setState({ FAQs: res.data.data }))
    //  alert("Updated successfully!")
  });
  this.setState({updated:true })

}

change=()=>{this.setState({  created:false,updated:false,deleted:false})}
undo=()=>{ this.addFAQ(this.state.questionundo,this.state.answerundo)  }
   addFAQ = async(question,answer) => {
   axios.post('/api/FAQs/add', {
      question,
      answer
    })
      .then(res => this.setState({ FAQs: [...this.state.FAQs, res.data.data] }))
      // alert("Added successfully!");
      .catch(function (error) {
        if (error.response) {
          console.log(error.response.data);
          this.setState({errcreate:true, errmsg:error.response.data, created:false})
        }
      }) 
      this.setState({created:true })
  }



  render() {
    

    if (this.props.token === null) {
      return (
        <div>
        <Toolbar/>
        <div className="FAQU">
        <div >

                <h1 style={{paddingRight:'500px',boxAlign:"inline",color:"#3e3939bf",fontSize:"5000px"}} >FAQs </h1>
                <FAQUs  FAQs={this.state.FAQs}  />
                <br></br>
                <button
                  variant="contained"
                  onClick={() => {
                    this.handleClickWWW();
                  }}
                  className="btn"
                  style={{backgroundColor:"#70c7be"}}
                >
                  Sign In
                </button>
                </div>
          </div>
          
        </div>
      );
    }
    else{
      const auth = this.props.usertype === "TIQadmin";
    if (auth) {
    return (
     
        <div>
        <ToolbarOUT />
        <button
            className="button"
             background = "#202024"
            style={{ position: "absolute", left: "20px", top: "63px" }}
            onClick={this.handleClick}
          >
           Users' Questions   
          </button>
          <br></br>
          <div > 
           
          <h1 style={{ color: '#FFDA00', textShadow: '2px 2px #B83126',textAlign: 'left', postion:'fixed', marginLeft: '200px',
                      fontWeight: 'bold',fontSize:'90px'}} >FAQs </h1> 

            </div>  
            <AddFaq addFAQ={this.addFAQ} />
            <br></br> <br></br> <br></br>
            <FAQs  FAQs={this.state.FAQs} delfaq={this.delfaq} updatefaq={this.updatefaq} />
            {this.state.updated && <UpdateFAQSimpleSnackbar change={this.change} />}
            {this.state.created && <CreateFAQSimpleSnackbar change={this.change} />}
            {this.state.deleted && <DeleteFAQSimpleSnackbar undo={this.undo} change={this.change} />}

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
          {/* </div>   */}
        </div>
   
    );
    }
  }}
}
const edit={
  backgroundColor:'#5ec0b6' ,
  paddingBottom:'5px',
  marginLeft:"1000px"
  
}
const Form = connect(
  mapStateToProps,
  null
)((FAQ));
export default Form;
