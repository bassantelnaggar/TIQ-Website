import React, { Component } from "react";
import ToolbarOUT from "../../layout/Toolbar/ToolbarSignout";
import axios from "axios";
import DeleteUser from "./DeleteUser";
import DetailedExpansionPanel from "./DetailedExpansionPanel";
import FormDialog from "./FormDialog";
import Toolbar from "../../layout/Toolbar/Toolbar";
import SearchIcon from "@material-ui/icons/Search";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import ourPeopleBG from '../../pages/Homee/images/ourpeoplebg.png'
import SearchUser from '../users/searchUser'


class GetUsers extends Component {
  constructor() {
    super();
    this.state = {
      users: [],
      searchkey: null
    };
    this.deleteUser = this.deleteUser.bind(this);
    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
  }
  onChange = e => this.setState({ [e.target.name]: e.target.value });
  componentDidMount() {
    axios.get("/api/Users").then(res => {
      this.setState({ users: res.data.data });
    });
  }
  deleteUser = id => {
    console.log(id);

    axios.delete("/api/Users/" + id)
    .then(
      this.setState({
        users: [...this.state.users.filter(user => user._id !== id)]
      })
    );
  };
  handleClickOpen() {
    this.setState({ open: true });
  }

  handleClose() {
    this.setState({ open: false });
  }
  handleUpdateClick = () => {
    this.setState({ open: !this.state.open });
  };
  handleClickSearch =() => {
    this.props.history.push(`getUsers/search/${
      this.state.searchkey
    }`)
  };

  update =  (id,type,house,din,dor,tiqStatus,supervisorType) => {
  
    axios.put("/api/Users/update/" + id, {
      type:type,
      house: house,
      din:din,
      dor: dor,
      tiqStatus: tiqStatus,
      supervisorType: supervisorType,

    })
    .then(res => {
      axios.get('/api/Users')
      .then(res => this.setState({ users: res.data.data }))
       alert("Updated successfully!")
    });
  ;

    // if (Object.keys(update.data)[0] === "err")
    //   this.setState({ Error: "Invalid/Missing Information" });
    // else window.location.reload();
    /*
     * axios ... put whatver using this.state.firstName, this.staet.lastName
     */
  };

  render() {
    if (this.props.token === null) {
      return (
        <>
        <Toolbar />
        <div className="center-div">
          
          <h1
            style={{
              textAlign: "center",
              position: "relative",

              fontSize: "50px"
            }}
          >
            OUR PEOPLE{" "}
          </h1>
          <TextField
              id="selecteduser"
              label=  {"Search User"}
              type= "textField"
              value={this.state.searchkey}
              onChange={this.onChange}
             style={{ left: "520px", top: "-150px"  }}
            />

            <Button
              variant="extended"
              variant="extended"
              aria-label="Search by FirstName"
              onClick={this.handleClickSearch}
             style={{ left: "540px", top: "-140px",  background:"#333"}}
            >
              Search User 
              <SearchIcon />
            </Button>
            <SearchUser
             deleteUser={this.deleteUser}
             update={this.update}
              />
          <ul>
            {this.state.users && (
              <DeleteUser
                users={this.state.users}
                deleteUser={this.deleteUser}
              />
            )}
          </ul>
        </div>
      </>
      )
    }
    else{
    return (
      <>
        <ToolbarOUT />
        
        <div className="center-div">
          <h1
            style={{
              textAlign: "center",
              position: "relative",

              fontSize: "50px"
            }}
          >
            OUR PEOPLE{" "}
          </h1>
          <TextField
              id="selecteduser"
              label=  {"Search User"}
              type= "textField"
              name="searchkey"
              value={this.state.searchkey}
              onChange={this.onChange}
             style={{ left: "520px", top: "-150px"  }}
            />

            <Button
              variant="extended"
              aria-label="Search by FirstName"
              onClick={this.handleClickSearch}
             style={{ left: "540px", top: "-140px",  background:"#333"}}
            >
              Search User 
              <SearchIcon />
            </Button>
          <ul>
            {this.state.users && (
              <DeleteUser
                users={this.state.users}
                deleteUser={this.deleteUser}
                update={this.update}
              />
            )}
          </ul>
        </div>
      </>
    );
  }
}
}
export default GetUsers;