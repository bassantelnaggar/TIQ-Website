import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Navbar from "../../components/layout/Navbar";
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';

import { connect } from "react-redux";
import { signIn, signOut } from "../../store";
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
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    // margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    // margin: theme.spacing(1),
   // backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    // marginTop: theme.spacing(1),
  },
  submit: {
    // margin: theme.spacing(3, 0, 2),
  },
});

class InputAdornments extends React.Component {
  state = {
    email: "",
    password: "",
    showPassword: false,
    errormessgae: ""
  };
  handleClick33 =() => {
    this.props.history.push("/createuser");
  };
  handleClick = async event => {
    const Users = await axios.post(
      "/api/Users/authenticate",
      {
        email: this.state.email,
        password: this.state.password
      }
    );
    if (Users.data.token !== null) {
      this.props.signin(Users.data.token, Users.data.usertype, Users.data.id);
      this.props.history.push("/");
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
      <>
     <Navbar/>
        <div className={classes.root}  style={{ postion:'fixed',marginLeft:'31%',marginTop:'9%', width:'100%', lineHeight: '1', }}>
 <Grid container component="main" className={classes.root}>
      <CssBaseline />
      {/* <Grid item xs={false} sm={4} md={7} className={classes.image} /> */}
      <Grid item xs={12} sm={8} md={5} >
        <div className={classes.paper}>
          {/* <Typography component="h1" variant="h5">
            Sign in
          </Typography> */}
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
            <br></br> <br></br>
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
            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
            <br></br> <br></br>
            <Button
               style = {{background: '#410c12'}}
              fullWidth
              variant="contained"
              color="primary"

              onClick={() => {
                this.handleClick();
              }}
            >
              Sign In
            </Button>
            <Typography paragraph>{this.state.errormessgae}</Typography>
            <Grid container>
              {/* <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid> */}
              <Grid item>
                <Link  href="/createuser" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
            {/* <Box mt={5}>
              <MadeWithLove />
            </Box> */}
          </form>
        </div>
      </Grid>
    </Grid>
          
          
        </div>
      </>
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
