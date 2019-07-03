// import React, { Component } from "react";
// import { connect } from "react-redux";
// import Toolbar from "../../layout/Toolbar/Toolbar";
// import Button from "@material-ui/core/Button";

// const mapStateToProps = state => {
//   return { token: state.token, usertype: state.usertype, id: state.id };
// };
// class resetPassword extends Component {
//   render() {
//     console.log("forg");
//     return (
//       <div>
//         <Toolbar />
//         <div class="forgot-form">
//           <Button
//             style={{ background: "#410c12" }}
//             variant="contained"
//             color="primary"
//             href="/SignIn"
//           >
//             Back
//           </Button>
//           <label> Reset New Passsword</label>
//           <input type="text" placeholder="Confirm New Passsword" />
//           <Button
//             style={{ background: "#410c12", alignItems: "center" }}
//             variant="contained"
//             color="primary"
//           >
//             Submit
//           </Button>
//         </div>
//       </div>
//     );
//   }
// }

// const Form = connect(
//   mapStateToProps,
//   null
// )(resetPassword);
// export default Form;
