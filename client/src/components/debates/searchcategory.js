import React, { Component } from "react";
import DebateCard from "./debatecard.js";
import { withStyles } from "@material-ui/core/styles";
import axios from "axios";
import "./Debates.css";
import ToolbarOUT from "../../layout/Toolbar/ToolbarSignout";
import CircularProgress from '@material-ui/core/CircularProgress';



const styles = theme => ({
  rightIcon: {
    marginLeft: theme.spacing.unit
  }
});

class SearchDate extends Component {
  componentDidMount() {
    const { category } = this.props.match.params;
    this.setState({ category: category });
    axios
    .get(`/api/debates/Search/${category}`)
    .then(res => this.setState({ debates: res.data.data ,loaded:true}));
  }
  constructor(props) {
    super(props);
    this.state = {
      debates: [],
      category: null,
      loaded:false
    };
  }
  handleClick =() => {
    this.props.history.push("/debates");
  };
  
  render() {
    const { classes } = this.props;
    if(!this.state.loaded){
      return (
        <>
        <ToolbarOUT />
        <div style={{position: 'fixed',top: '50%',left: '50%'}}>
      <CircularProgress/>
      </div>
      </>
      )
    }else{
    return (
      <>
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
        {/* <div className="center-div">
           */}
             <div class="inner">
            <div class="thumbnails">
            {/* <h1>Our Debates</h1> */}
          {/* <h1 style={{margin:'5%'}}>Debates with category {this.state.category}</h1> */}
    
          {this.state.debates.map(debate => (
            <DebateCard
              key={debate._id}
              id={debate._id}
              title={debate.title}
              date={debate.date}
              category={debate.category}
              description={debate.description}
              debatePicture={debate.debatePicture}
              info={debate.info}
            />
          ))}
        </div>
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

export default withStyles(styles)(SearchDate);
