import React, { Component } from "react";
import ToolbarOUT from "../../layout/Toolbar/ToolbarSignout";
import axios from "axios";
import DeleteUser from "./DeleteUser";
import DetailedExpansionPanel from "./DetailedExpansionPanel";
import FormDialog from "./FormDialog";
import Toolbar from "../../layout/Toolbar/Toolbar";

class GetUsers extends Component {
  constructor() {
    super();
    this.state = {
      users: []
    };
    this.deleteUser = this.deleteUser.bind(this);
    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
  }

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

  update =  (id,
    type,
    house,
    din,
    dor,
    tiqStatus,
    supervisorType,
    score
    ) => {
      console.log(type)
      console.log(house)
      console.log(din)
      console.log(tiqStatus)
      console.log(supervisorType)
      console.log(score)

    if(type=="member"){
      axios.put("api/Users/update/admin/" + id, {
        house,
        din,
        tiqStatus,
        supervisorType,
        score})
      .then(res => {
        axios.get('/api/Users')
        .then(res => this.setState({ users: res.data.data }))
         alert("Updated successfully!")
      });
    }
    if(type=="disciple"){
      axios.put("api/Users/update/admin/" + id, {
        house ,
        score
               })
      .then(res => {
        axios.get('/api/Users')
        .then(res => this.setState({ users: res.data.data }))
         alert("Updated successfully!")
      });
    }
    if(type=="alumni"){
      axios.put("api/Users/update/admin/" + id, {
      din,
      dor,
      type,
      house
      })
      .then(res => {
        axios.get('/api/Users')
        .then(res => this.setState({ users: res.data.data }))
         alert("Updated successfully!")
      });
    }
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