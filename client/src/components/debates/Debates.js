import React, { Component } from "react";
import DebateCard from "./debatecard.js";
import Test from "./test.js"
import { withStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import SearchIcon from "@material-ui/icons/Search";
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Logo from "../images/debatecover.jpg";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import "./Debates.css";
import Typography from "@material-ui/core/Typography";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import ToolBar from "../../layout/Toolbar/Toolbar";
import ToolbarOUT from "../../layout/Toolbar/ToolbarSignout";
const mapStateToProps = state => {
  return { token: state.token, usertype: state.usertype, id: state.id };
};

const styles = theme => ({
  fab: {
    // margin: theme.spacing.unit,
    color: "#333",
    background: "#333",
    onmouseover: "#fff"
  },
  rightIcon: {
    marginLeft: theme.spacing.unit
  },
  fab2: {
    margin: theme.spacing.unit,
    color: "#333",
    background: "#333",
    marginRight: theme.spacing.unit
  }
});

class Debates extends Component {
  constructor(props) {
    super(props);
    this.state = {
      debates: [],
      createopen: false,
      title: null,
      category: null,
      date: null,
      info: null,
      description: null,
      debatePicture:null,
      error: "",
      selecteddate: null,
      selectedcategory: null,
      admin: this.props.usertype === "TIQadmin"
    };
  }

  createDebate = async event => {
    axios
      .post("/api/Debates", {
        title: this.state.title,
        category: this.state.category,
        date: this.state.date,
        info: this.state.info,
        description: this.state.description
      })
      .then(response => {
        if (Object.keys(response.data)[0] === "err")
          this.setState({ error: "Missing/Incomplete Data" });
        else {
          this.setState({ debates: [...this.state.debates,,response.data.data] });
       
        }
        
      })
      .catch(err => {
        this.setState({ error: "Missing/Incomplete Data" });
        return;
      });
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  handleCreateClick = () => {
    this.setState(state => ({ createopen: !state.createopen }));
  };
  handleDateSearch = () => {
    if (this.state.selecteddate === null) return;
    this.props.history.push(`debates/searchbydate/${this.state.selecteddate}`);
  };

  handleCategorySearch = () => {
    if (this.state.selectedcategory === null) return;
    this.props.history.push(
      `debates/searchbycategory/${this.state.selectedcategory}`
    );
  };

  componentDidMount() {
    axios
      .get("/api/debates")
      .then(res => this.setState({ debates: res.data.data }));
  }
  handleClick =() => {
    this.props.history.push("/signin");
 };
 
  render() {
    const { classes } = this.props;
    if (this.props.token === null) {
      return (
        <>
        <div>
          <ToolBar/>
          </div>
          <div class="thumbnails">
            <div class="box">
              <div class="inner">
                <h3>You have to sign in first!</h3>
               
                <button
                  variant="contained"
                  onClick={() => {
                    this.handleClick();
                  }}
                  //onClick={() => (document.location = "/signin")}
                  className="btn"
                >
                  Sign In
                </button>
                
              </div>
            </div>
          </div>
         
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
        </>
      );
    }
    console.log(this.props.usertype);
    const auth = this.props.usertype === "TIQadmin";
    if (auth) {
      return (
        <>
          <ToolbarOUT />

          <Dialog
            open={this.state.createopen}
            onClose={this.handleCreateClick}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title">Create Debate</DialogTitle>
            <DialogContent>
              <TextField
                required
                id="title"
                label="Title"
                className={classes.textField}
                onChange={this.handleChange("title")}
                margin="normal"
                variant="outlined"
              />

              <TextField
                required
                id="category"
                label="Category"
                className={classes.textField}
                onChange={this.handleChange("category")}
                margin="normal"
                variant="outlined"
              />

              <TextField
                id="description"
                label="Description"
                multiline
                rowsMax="100"
                //          value={this.state.multiline}
                onChange={this.handleChange("description")}
                className={classes.textField}
                margin="normal"
                variant="outlined"
              />

              <TextField
                id="info"
                label="Info"
                multiline
                rowsMax="100"
                //        value={this.state.multiline}
                onChange={this.handleChange("info")}
                className={classes.textField}
                margin="normal"
                variant="outlined"
              />

              <TextField
                required
                id="date"
                label="Date"
                type="date"
                className={classes.textField}
                onChange={this.handleChange("date")}
                InputLabelProps={{
                  shrink: true
                }}
              />
              
              <Typography paragraph>{this.state.error}</Typography>
            </DialogContent>
            <DialogActions>
            <input 
                  type="Submit" 
                  value="Cancel"
                  className="btn"
                  onClick={this.handleCreateClick}
                  />
             <input 
                  type="Submit" 
                  value="Create"
                  className="btn"
                  onClick={() => this.createDebate()}
                  />
            
              
                
            </DialogActions>
          </Dialog>

          <div className="button-div">
            <Fab
              // color="transparent"
              aria-label="Add"  
              className={classes.fab2}
              onClick={this.handleCreateClick}
              style={{ left: "20px", top: "-50px" , background: "#333" }}
            >
              <AddIcon />
            </Fab>
            <Typography paragraph> </Typography>

            <TextField
              id="selecteddate"
              label="Date"
              type="date"
              className={classes.textField}
              onChange={this.handleChange("selecteddate")}
              InputLabelProps={{
                shrink: true
              }}
              style={{ left: "670px", top: "-130px" }}
            />

            <Button
              variant="extended"
              aria-label="Search by Date"
              className={classes.fab}
              onClick={this.handleDateSearch}
              style={{ left: "700px", top: "-120px", background:"#333" }}
            >
              Search by Date
              <SearchIcon />
            </Button>

            <Typography paragraph> </Typography>

            <TextField
              id="selectedcategory"
              label=  {"Category"}
              type= "textField"
              className={classes.textField}
              onChange={this.handleChange("selectedcategory")}
              style={{ left: "1060px", top: "-195px"  }}
            />

            <Button
              variant="extended"
              aria-label="Search by Category"
              className={classes.fab}
              onClick={this.handleCategorySearch}
              style={{ left: "1080px", top: "-190px",  background:"#333" }}
            >
              Search by Category
              <SearchIcon />
            </Button>
            <h1 style={{ color: '#FFDA00', textShadow: '2px 2px #B83126',textAlign: 'center', postion:'relative', 
              marginTop:"-150px",fontWeight: 'bold',fontSize:'60px'}} > Our Debates  </h1>
          </div>
          
          <div class="inner" >
            <div class="thumbnails" >
            {this.state.debates.map(debate => (
              <DebateCard
                key={debate._id}  
                id={debate._id}
                title={debate.title}
                date={debate.date}
                category={debate.category}
                description={debate.description}
                info={debate.info}
                debatePicture={debate.debatePicture}
                auth={auth}
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
    } else {
      return (
        <>
          <ToolbarOUT />
          <div className="button-div">
          <TextField
              id="selecteddate"
              label="Date"
              type="date"
              className={classes.textField}
              onChange={this.handleChange("selecteddate")}
              InputLabelProps={{
                shrink: true
              }}
              style={{ left: "670px", top: "-55px" }}
            />

            <Button
              variant="extended"
              aria-label="Search by Date"
              className={classes.fab}
              onClick={this.handleDateSearch}
              style={{ left: "700px", top: "-45px", background:"#333" }}
            >
              Search by Date
              <SearchIcon />
            </Button>

            <Typography paragraph> </Typography>

            <TextField
              id="selectedcategory"
              label=  {"Category"}
              type= "textField"
              className={classes.textField}
              onChange={this.handleChange("selectedcategory")}
              style={{ left: "1060px", top: "-120px"  }}
            />

            <Button
              variant="extended"
              aria-label="Search by Category"
              className={classes.fab}
              onClick={this.handleCategorySearch}
              style={{ left: "1080px", top: "-110px",  background:"#333"}}
            >
              Search by Category
              <SearchIcon />
            </Button>
            <h1 style={{ color: '#FFDA00', textShadow: '2px 2px #B83126',textAlign: 'center', postion:'relative', 
              marginTop:"-70px",fontWeight: 'bold',fontSize:'60px'}} > Our Debates  </h1>
          </div>


          <div class="inner">
            <div class="thumbnails">
            {this.state.debates.map(debate => (
              <DebateCard
                key={debate._id}
                id={debate._id}
                title={debate.title}
                date={debate.date}
                category={debate.category}
                description={debate.description}
                info={debate.info}
                debatePicture={debate.debatePicture}
                auth={auth}
              />
            ))}
          </div> 
          </div>
        </>
      );
    }
  }
}

const Form = connect(
  mapStateToProps,
  null
)(withStyles(styles)(Debates));
export default Form;
