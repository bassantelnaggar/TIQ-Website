import React, { Component } from "react";
import DebateCard from "./debatecard.js";
import { withStyles } from "@material-ui/core/styles";
import axios from "axios";
import "./Debates.css";
import ToolbarOUT from "../../layout/Toolbar/ToolbarSignout";


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
    .then(res => this.setState({ debates: res.data.data }));
  }
  constructor(props) {
    super(props);
    this.state = {
      debates: [],
      category: null
    };
  }
  handleClick =() => {
    this.props.history.push("/debates");
  };
  
  render() {
    const { classes } = this.props;
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
              info={debate.info}
            />
          ))}
        </div>
        </div>
      </>
    );
  }
}

export default withStyles(styles)(SearchDate);
