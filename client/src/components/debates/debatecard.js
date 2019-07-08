import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import Axios from "axios";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Link } from 'react-router-dom';


const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

const styles = theme => ({
  card: {
    maxWidth: 1000,
    margin: "0 1em",
    padding: "0.25em 1em"
  },
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  },
  actions: {
    display: "flex"
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  }
});

class DebateCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
      date:
        months[new Date(props.date).getMonth()] +
        " " +
        new Date(props.date).getDate() +
        ", " +
        new Date(props.date).getFullYear(),
      updateOpen: false,
      updatetitle: this.props.title,
      updatecategory: this.props.category,
      updateinfo: this.props.info,
      updatedescription: this.props.description,
      updatedate: this.props.date,
      updatePicture: this.props.debatePicture,
      updateerror: ""
    };
  }

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };
  handleUpdateClick = () => {
    this.setState(state => ({ updateOpen: !state.updateOpen }));
  };

  handleDeleteClick = async () => {
    await Axios.delete(`/api/Debates/${this.props.id}`)
     window.location.reload();
  };
  UpdateDebate = async () => {
    console.log(this.state.updatePicture)    
    const reply = await Axios.put(
      `/api/Debates/${this.props.id}`,
      {
        title: this.state.updatetitle,
        category: this.state.updatecategory,
        date: this.state.updatedate,
        description: this.state.updatedescription,
        debatePicture:this.state.updatePicture,
        info: this.state.updateinfo
      }
    );
    if (Object.keys(reply.data)[0] === "err")
      this.setState({ updateerror: "Invalid/Missing Information" });
    else window.location.reload();
  };
  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };
  onChange = e =>  {
    var file = e.target.files[0];
    console.log( e.target.files[0])
    var formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "zcwrt7qz");
  
    Axios
      .post(
        "https://api.cloudinary.com/v1_1/dpny1nhaq/image/upload",
        formData,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          }
        }
      )
      .then(res=>this.setState({updatePicture:res.data.secure_url}))     
}
        
  render() {
    const { classes } = this.props;
    if (this.props.auth) {
      return (
        <>
          <Dialog
            open={this.state.updateOpen}
            onClose={this.handleUpdateClick}
            aria-labelledby="form-dialog-title"
           
          >
            <DialogTitle id="form-dialog-title">Update Debate</DialogTitle>
            <DialogContent>
               <label class="image fit">
               <img  src={this.state.updatePicture} style={{objectFit:"cover",height:"220px"}}/> 
               </label>
              <input 
               id="file-input"
               accept=".jpg,.png"
               type="file" 
               onChange={this.onChange.bind(this)} 
               color="black"
               style={{opacity:"1",marginLeft:'55%'}}
               
               />

              <TextField styles={{marginTop:"-20%"}}
                // autoFocus
                margin="dense"
                id="updatetitle"
                label="Title"
                onChange={this.handleChange("updatetitle")}
                defaultValue={this.props.title}
              />
              <TextField
                // autoFocus
                margin="dense"
                id="updatecategory"
                label="Category"
                defaultValue={this.props.category}
                onChange={this.handleChange("updatecategory")}
              />
              <TextField 
                autoFocus
                margin="dense"
                id="updatedescription"
                multiline
                label="Background"
                defaultValue={this.props.description}
                onChange={this.handleChange("updatedescription")}
              />
              <TextField
                autoFocus
                margin="dense"
                id="updateinfo"
                multiline
                label="Description"
                onChange={this.handleChange("updateinfo")}
                defaultValue={this.props.info}
              />
              <TextField
                autoFocus
                margin="dense"
                id="updateinfo"
                type="date"
                label="Date"
                className={classes.textField}
                defaultValue={this.props.date}
                onChange={this.handleChange("updatedate")}
                InputLabelProps={{
                  shrink: true
                }}
              />
              
              <Typography paragraph>{this.state.updateerror}</Typography>
            </DialogContent>
            <DialogActions>
            <input 
                  type="Submit" 
                  value="Cancel"
                  className="btn"
                  onClick={this.handleUpdateClick}
                  />
             <input 
                  type="Submit" 
                  value="Update"
                  className="btn"
                  onClick={() => this.UpdateDebate()} 
                  />
            
             
            </DialogActions>
          </Dialog>
                <div class="box" >
              <picture>
              <div class="image-upload">
              <label for="file-input" class="image fit">
              <img src={this.props.debatePicture} style={{objectFit:"cover",height:"220px"}}/> 
              </label> 
              <input id="file-input"  display="cover"/>
              
              </div>
              </picture>
                  <div class="inner">
                    <h3>{this.props.title}</h3>
                    <p> {this.props.category} </p>
                    <Link to={"/test/" + this.props.id} class="button" >
                     Read More!
                    </Link>
                    <br></br>
                    <DeleteIcon style={{margin:'5%' }}  onClick={() => {
                  this.handleDeleteClick();
                }}  />
                <EditIcon style={{margin:'5%'}} onClick={() => {
                  this.handleUpdateClick();
                }}  />
                  </div>
                </div>
            
        </>
      );
    } else {
      return (
        <>
          <div class="box">
                   <div class="image-upload">
              <label for="file-input" class="image fit">
                <img class="image fit" src={this.props.debatePicture} style={{objectFit:"cover",height:"220px"}}/> 
              </label> 
              <input id="file-input" display="cover"/>
              
              </div>
                  <div class="inner">
                    <h3>{this.props.title}</h3>
                    <p> {this.props.category} </p>
                    {/* <p>{debate.date} </p> */}
                    <Link to={"/test/" + this.props.id} class="button">
                     Read More!
                    </Link>
                  </div>
                </div>
          
        </>
      );
    }
  }
}

DebateCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(DebateCard);