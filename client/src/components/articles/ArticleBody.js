import React, { Component } from "react";
import axios from "axios";
//import Header from "./Header";
import Toolbar from "../../layout/Toolbar/Toolbar";
import List from '@material-ui/core/List';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { connect } from "react-redux";

const mapStateToProps = state => {
  return { token: state.token, usertype: state.usertype, id: state.id };
};
const useStyles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    background: '#yellow',
  },
  inline: {
    display: 'inline',
  },
});


export class ArticleBody extends Component {
    constructor(props) {
          super(props);
           this.state = {
              articleee: [],
              commments: "",
              allComments:[],
              user:{}
           }
        }
        handleClick =() => {
            this.props.history.push("/ArticlesHome");
         };
         onChange = e => this.setState({ [e.target.name]: e.target.value });
         onSubmit = e => {
          e.preventDefault();
          // this.setState(this.state.debateLiveTitle);
      
          this.setState({ commments: "" });
         
        };
  componentDidMount() {
    const id = this.props.match.params.key;
    axios.get('/api/Users/'+ this.props.id)
    .then(user=>this.setState({user : user.data.data},()=>console.log("fetched",user.data.data)))
    .catch(console.log('cannot fetch'))
    axios.get('/api/Articles/' + id)
    .then(articleee=>this.setState({articleee : articleee.data.data},()=>console.log("fetched",articleee.data.data)))
    .catch(console.log('cannot fetch'))

    fetch("/api/Articles/getAllComments/" + id)
      .then(res => res.json())
      .then(allComments =>
        this.setState({ allComments: allComments }, () =>
          console.log("chatbars fetched...", allComments)
        )
      );
    
  }


  
  addcomment(article) {
    const updatedData = {};
    if (article.commments !== "")
      updatedData.commments = article.commments;
      console.log(article.commments)
    axios.put(
      " /api/Articles/comment/" +
        this.props.match.params.key,
      {
        comments: article.commments
      }
    )
    .then(res => this.setState({ allComments: [...this.state.allComments, res.data.data] }));
  //  alert("Your comment has been added successfully!");
    //  .then(res => this.setState({ chatbars: [...this.state.chatbars, res.data] },console.log(forResponses_)));
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
        textAlign: 'left',
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
      const commStyle = {
        color: 'black',
        textAlign: 'center',
        // padding: '55px',
        postion:'fixed',
        left: '0',
        width:'100%',
        fontSize:'30px'
       
      }
      
      const classes = useStyles();

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
        <Divider variant="dense" component="li" />
        <br></br>
        {/* <h1 style={commStyle}> {"COMMENTS"}</h1> */}
        
        <form onSubmit={this.onSubmit} >
           <textarea
                type="text"
                name="commments"
                style={{
                    color: "black",
                    height: "100px",
                    width:"60%",
                    marginLeft:'9%'
                }}
                placeholder="Write your comment here..."
                value={ this.state.commments}
                onChange={this.onChange}
              />
              <br></br>
             <input
                type="Submit"
                value=" Comment"
                className="button"
                style={{ 
                  color: '#E2A325',
                  textAlign: 'center',
                  padding: '35px',
                 // postion:'fixed',
                  marginLeft:'52%',
                  width:'17%',
                  lineHeight: '0',
                  }}
                onClick={this.addcomment.bind(this, {
                  commments: [this.state.user.firstName +" "+ this.state.user.lastName ,this.state.commments]
                })}
            
              /> </form>
        {this.state.allComments.map(commenttt => (
          <List className={classes.root} style={{background:'',width:"60%",  marginLeft:'9%'}}>
          <ListItem alignItems="flex-start" style={{background:''}}>
          {/* <ListItemAvatar>
            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
          </ListItemAvatar> */}
          <ListItemText
           style={{color:"black"}}
            primary= {commenttt[1]}
            secondary={
              <React.Fragment>
                <Typography
                  component="span"
                  variant="body2"
                  className={classes.inline}
                  style={{color:"black",fontWeight:'bold'}}
                >
                  {"BY: "} {commenttt[0]}
                  {/* {"BY: "}{ this.state.user.firstName +" "+ this.state.user.lastName} */}
                 
                </Typography>
              </React.Fragment>
            }
          />
        </ListItem>
        <Divider variant="dense" component="li" />
      
         </List>
        ))}  
        <br></br>
      
              <br></br>
              <br></br>
              <br></br>
              
      
      </div>
    );
  }
}

const Form = connect(
  mapStateToProps,
  null
)(ArticleBody);

export default Form;
