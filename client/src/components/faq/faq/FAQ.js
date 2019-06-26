import React, { Component } from 'react';
import FAQUs from './FAQUs';
import FAQs from './FAQs';
import AddFaq from './AddFaq';
import NavbarSignedIn from "../../layout/NavbarSignedIn";
import Button from '@material-ui/core/Button';
import { connect } from "react-redux";                                                                  
import Navbar from "../../layout/Navbar";
import CreateFAQSimpleSnackbar from './CreateFAQSimpleSnackbar';
import UpdateFAQSimpleSnackbar from './UpdateFAQSimpleSnackbar';
import DeleteFAQSimpleSnackbar from './DeleteFAQSimpleSnackbar';
import axios from 'axios';


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
    axios.get('/api/FAQs')
    .then(res => this.setState({ FAQs: res.data.data }))
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
    const { classes } = this.props; 

    if (this.props.token == null) {
      return (
        <div>
        <Navbar/>
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
      const auth = this.props.usertype === "HUBadmin";
    if (auth) {
    return (
     
        <div className="FAQ">
        <NavbarSignedIn />

          <div >
            <h1 style={{color:"#3e3939bf"}}>FAQs <Button variant="contained"  style={edit} onClick={this.handleClick}>
            Questions     
            </Button></h1>      
            <AddFaq addFAQ={this.addFAQ} />
            <br></br>
            <FAQs  FAQs={this.state.FAQs} delfaq={this.delfaq} updatefaq={this.updatefaq} />
            {this.state.updated && <UpdateFAQSimpleSnackbar change={this.change} />}
            {this.state.created && <CreateFAQSimpleSnackbar change={this.change} />}
            {this.state.deleted && <DeleteFAQSimpleSnackbar undo={this.undo} change={this.change} />}

          </div>  
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
