
import React, { Component } from "react";
import "./ourPeople.css";
import FormDialog from "../../../components/users/FormDialog";
import pic5 from "../images/pic5.jpeg";
import { connect } from "react-redux";

const mapStateToProps = state => {
  return { token: state.token, usertype: state.usertype, id: state.id };
};
class ourPeople extends Component {
  render() {
    console.log(this.props);
    if (this.props.usertype === "TIQadmin") {
      return (
        <div id="main">
          <div class="inner1">
            <div>
              <div class="box1">
                <a className="hoba">
                  <div class="feature1 flex_feature_item1 feature1">
                    <h3 className="hea1">{this.props.user.firstName}</h3>
                    <p>
                      {this.props.user.lastName}
                      <br />
                      {this.props.user.type}
                      <br />
                      {this.props.user.birthDate}
                      <br />
                      {this.props.user.bio}
                      <br />
                      {this.props.user.email}
                      <br />

                      {this.props.user.supervisorType}
                      <br />
                      {this.props.user.tiqStatus}
                      <br />
                      
                    </p>
                    <ul class="actions">
                      <li>
                        <button
                          type="button"
                          class="btn btn-primary"
                          onClick={() =>
                            this.props.deleteUser(this.props.user._id)
                          }
                        >
                          Delete
                        </button>
                        <br />

                        <FormDialog
                          user={this.props.user}
                          update={this.props.update}
                          // id={this.props.id}
                        />
                        <br></br>
                      </li>
                    </ul>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div id="main">
          <div class="inner1">
            <div>
              <div class="box1">
                <a className="hoba">
                  <div class="feature1 flex_feature_item1 feature1">
                  <br></br>
                    <p className="hea2">{this.props.user.firstName}</p>
                    <p>
                      {this.props.user.lastName}
                      <br />
                      {this.props.user.type}
                      <br />
                      {this.props.user.birthDate}
                      <br />
                      {this.props.user.bio}
                      <br />
                      {this.props.user.email}
                      <br />
                      {this.props.user.clubs}
                      <br />
                      {this.props.user.house}
                      <br />
                      {this.props.user.din}
                      <br />
                      {this.props.user.dor}
                    </p>
                  </div>
                </a>
              </div>
            </div>
            
          </div>
          
        </div>
      );
    }
  }
}

const Form = connect(
  mapStateToProps,
  null
)(ourPeople);

export default Form;