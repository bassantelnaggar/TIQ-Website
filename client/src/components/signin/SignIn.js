import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Link from "@material-ui/core/Link";
import Toolbar from "../../layout/Toolbar/Toolbar";
import Grid from "@material-ui/core/Grid";
import { connect } from "react-redux";
import { signIn, signOut } from "../../store";
import "../../pages/Homee/assets/css/main.css";
import "../../components/Chatbar/Chatbars.css";
import axios from "axios";

const mapStateToProps = state => {
  return { token: state.token, usertype: state.usertype, id: state.id };
};

function mapDispatchToProps(dispatch) {
  return {
    signout: () => dispatch(signOut()),
    signin: (token, usertype, id) => dispatch(signIn(token, usertype, id))
  };
}

const styles = theme => ({
  // root: {
  //   display: "flex",
  //   flexWrap: "wrap",
  //   background: 'white'
  // },
  // margin: {
  //   margin: theme.spacing.unit
  // },
  // withoutLabel: {
  //   marginTop: theme.spacing.unit * 3
  // },
  // textField: {
  //   flexBasis: 200
  // }
});
const useStyles = theme => ({
  root: {
    height: "100vh"
  },
  image: {
    backgroundImage: "url(https://source.unsplash.com/random)",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center"
  },
  paper: {
    // margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    // margin: theme.spacing(1),
    // backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%" // Fix IE 11 issue.
    // marginTop: theme.spacing(1),
  },
  submit: {
    // margin: theme.spacing(3, 0, 2),
  }
});

class InputAdornments extends React.Component {
  state = {
    email: "",
    password: "",
    showPassword: false,
    errormessgae: ""
  };
  handleClick33 = () => {
    this.props.history.push("/createuser");
  };
  handleClickME = () => {
    this.props.history.push("/ForgotPassword");
  };
  handleClick = async event => {
    const Users = await axios.post("/api/Users/authenticate", {
      email: this.state.email,
      password: this.state.password
    });
    if (Users.data.token !== null) {
      this.props.signin(Users.data.token, Users.data.usertype, Users.data.id);
      this.props.history.push("/TIQhome");
    } else
      this.setState({
        errormessgae: "Incorrect Email or Password please try again"
      });
  };

  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };

  handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }));
  };

  render() {
    //const { classes } = this.props;
    const classes = useStyles();
    console.log(this.props.usertype);
    return (
      <div>
        <Toolbar />
        <div
          className={classes.root}
          style={{
            postion: "fixed",
            marginLeft: "31%",
            marginTop: "9%",
            width: "100%",
            lineHeight: "1"
          }}
        >
          <Grid container component="main" className={classes.root}>
            <Grid item xs={12} sm={8} md={5}>
              <div className={classes.paper}>
                <form className={classes.form} noValidate>
                  <InputLabel htmlFor="email">Email </InputLabel>
                  <Input
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    onChange={this.handleChange("email")}
                    // autoFocus
                  />
                  <br /> <br />
                  <InputLabel htmlFor="password">Password </InputLabel>
                  <Input
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    type={this.state.showPassword ? "text" : "password"}
                    value={this.state.password}
                    onChange={this.handleChange("password")}
                    autoComplete="current-password"
                  />
                  <br /> <br />
                  <Button
                    style={{ background: "#410c12" }}
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      this.handleClick();
                    }}
                  >
                    Sign In
                  </Button>
                  <br />
                  <br />
                  <Button
                    style={{ background: "#410c12" }}
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      this.handleClickME();
                    }}
                  >
                    Forgot Password
                  </Button>
                  <Typography paragraph style={{ color: "black" }}>
                    {this.state.errormessgae}
                  </Typography>
                  <Grid container>
                    <Grid item>
                      {/* <Link to="/createuser" variant="body2">
                        {"Don't have an account? Sign Up"}
                      </Link> */}
                    </Grid>
                  </Grid>
                </form>
              </div>
            </Grid>
          </Grid>
        </div>
        <footer
          id="footer"
          style={{
            position: "absolute",
            bottom: "0",
            width: "100%",
            marginBottom: "-500px"
          }}
        >
          <div>
            <ul className="icons">
              <li>
                <a
                  className="icon fa-facebook"
                  href="https://www.facebook.com/TheIntelligentQuestion/?epa=SEARCH_BOX?>"
                  target="_blank"
                >
                  <i />
                </a>

                {/* </Link> */}
              </li>
              <li>
                <a
                  className="icon fa-youtube"
                  href="https://www.youtube.com/channel/UCs-EFuX9iVRUdGfHcezy4Lg"
                  target="_blank"
                >
                  <i />
                </a>
              </li>
              <li>
                <a
                  className="icon fa-instagram"
                  href="https://www.instagram.com/the.intelligent.question/"
                  target="_blank"
                >
                  <i />
                </a>
              </li>
            </ul>
            <ul className="copyright">
              <li>&copy; ERROR 404.</li>
            </ul>
          </div>
        </footer>
      </div>
    );
  }
}

InputAdornments.propTypes = {
  classes: PropTypes.object.isRequired
};

const Form = connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(InputAdornments));
export default Form;
