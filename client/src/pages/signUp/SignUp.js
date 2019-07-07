import React from "react";
import PropTypes from "prop-types";
import Avatar from "@material-ui/core/Avatar";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import Toolbar from "../../layout/Toolbar/Toolbar";
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { Link } from 'react-router-dom'

const types=[{
  value: 'member',
  label: 'Member',
},
{
  value: 'alumni',
  label: 'Alumni',
},
{
  value: 'disciple',
  label: 'Disciple',
},
{
  value: 'parent',
  label: 'Parent',
},];
const status=["House Leader","BOA","Supervisor","Disciples House Leader"]
const houses=["Pegasus","Orion","Neutral"];
const supervisor=["Marketing","Fundraising","Logistics","Relations","Media Design"]

const styles = theme => ({
  main: {
    width: "auto",
    display: "block", // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing.unit
  },
  submit: {
    marginTop: theme.spacing.unit * 3
  }
});

class SignUp extends React.Component {
  
  state = {
    type: "",
    firstName: "",
    lastName: "",
    birthDate: "",
    bio: "",
    email: "",
    password: "",
    house: "",
    din: "",
    dor: "",
    tiqStatus:"",
    supervisorType:"",
    redirect:"false"
  };
  required = ( type,firstName, lastName, birthDate,bio,email, password,house,din,dor,tiqStatus,supervisorType) => {
    if(firstName=="" || lastName=="" || birthDate=="" ||email=="" ||password==""){
      
    }
}
  
  componentDidMount() {
    console.log(this.props);
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
 
  render() {
    const { classes } = this.props;
    return (
      
      <main className={classes.main}style={{width:'35%',  boxShadow: '0 0 20px #000000b3'}}>
       <Toolbar/>
        {/* <CssBaseline /> */}
        <Paper className={classes.paper} >
          <Avatar className={classes.avatar}style={{background:"black"}}>
            <LockOutlinedIcon  />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          <form className={classes.form} >
          
            <FormControl margin="normal"  fullWidth>
              <InputLabel htmlFor="type"> </InputLabel>
              
              <TextField
               required
                id="standard-select-currency"
                select
                className={classes.textField}
                name="type"
                label="Type"
                value={this.state.type}
                onChange={this.onChange}
                SelectProps={{
                  MenuProps: {
                    className: classes.menu,
                  },
                }}
                helperText="Please select your type"
                margin="normal"
                variant="outlined"
              >
                {types.map(option => (
                  <MenuItem key={option} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
      </TextField>
            </FormControl>
            
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="firstName">First Name </InputLabel>
              <Input
                id="firstName"
                name="firstName"
                autoComplete="firstName"
                onChange={this.onChange}
                value={this.state.firstName}
                autoFocus
              />
            </FormControl>

            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="lastName">Last Name </InputLabel>
              <Input
                id="lastName"
                name="lastName"
                autoComplete="lastName"
                onChange={this.onChange}
                value={this.state.lastName}
                autoFocus
              />
            </FormControl>

            <FormControl margin="normal"  fullWidth>
              <InputLabel htmlFor="birthDate"></InputLabel>
              <TextField required
                id="date"
                label="Birth Date"
                type="date"
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={this.onChange}
                name="birthDate"
                //value={this.state.birthDate}
              />
            </FormControl>

            <FormControl margin="normal"  fullWidth>
              <InputLabel htmlFor="bio"> Bio</InputLabel>
              <Input
                id="bio"
                name="bio"
                onChange={this.onChange}
                value={this.state.bio}
                autoComplete="bio"
                autoFocus
              />
            </FormControl>

            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="email">Email Address</InputLabel>
              <Input
                id="email"
                name="email"
                onChange={this.onChange}
                value={this.state.email}
                placeholder="example@student.guc.edu.eg"
                autoComplete="email"
                autoFocus
              />
            </FormControl>

            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input
                name="password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={this.onChange}
                value={this.state.password}
              />
            </FormControl>
           {this.state.type=="alumni" && <div>              {/* alumni */}
           <FormControl margin="normal"  fullWidth>
              <InputLabel htmlFor="house"> </InputLabel>
              <TextField required
                id="standard-select-currency"
                select
                className={classes.textField}
                name="house"
                label="House"
                value={this.state.house}
                onChange={this.onChange}
                SelectProps={{
                  MenuProps: {
                    className: classes.menu,
                  },
                }}
                helperText="Please select your house"
                margin="normal"
                variant="outlined"
              >
                {houses.map(option => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
      </TextField>
            </FormControl>
            <FormControl margin="normal"  fullWidth>
              <InputLabel htmlFor="din"> </InputLabel>
              <TextField required
                id="date"
                label="Date Of Joining"
                type="date"
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={this.onChange}
                name="din"
              />
            </FormControl>

            <FormControl margin="normal"  fullWidth>
              <InputLabel htmlFor="dor"> </InputLabel>
              <TextField required
                id="date"
                label="Date Of Leaving"
                type="date"
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={this.onChange}
                name="dor"            
                  />
            </FormControl>

            </div>}
            {this.state.type=="disciple" && <div>
              {/* disciples */}
              <FormControl margin="normal"  fullWidth>
              <InputLabel htmlFor="house"> </InputLabel>
              <TextField required
                id="standard-select-currency"
                select
                className={classes.textField}
                name="house"
                label="House"
                value={this.state.house}
                onChange={this.onChange}
                SelectProps={{
                  MenuProps: {
                    className: classes.menu,
                  },
                }}
                helperText="Please select your house"
                margin="normal"
                variant="outlined"
              >
                {houses.map(option => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
      </TextField>
            </FormControl>

            </div>}
            {this.state.type=="member" &&<div>
              {/* member */}
              <FormControl margin="normal"  fullWidth>
              <InputLabel htmlFor="house"> </InputLabel>
              <TextField required
                id="standard-select-currency"
                select
                className={classes.textField}
                name="house"
                label="House"
                value={this.state.house}
                onChange={this.onChange}
                SelectProps={{
                  MenuProps: {
                    className: classes.menu,
                  },
                }}
                helperText="Please select your house"
                margin="normal"
                variant="outlined"
              >
                {houses.map(option => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
            </TextField>
            </FormControl>

            <FormControl margin="normal"  fullWidth>
              <InputLabel htmlFor="din"> </InputLabel>
              <TextField required
                id="date"
                label="Date Of Joining"
                type="date"
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={this.onChange}
                name="din"
              />
            </FormControl>
            <FormControl margin="normal"  fullWidth>
              <InputLabel htmlFor="tiqStatus"> </InputLabel>
                <TextField 
                id="standard-select-currency"
                select
                className={classes.textField}
                name="tiqStatus"
                label="TIQ Status"
                value={this.state.tiqStatus}
                onChange={this.onChange}
                SelectProps={{
                  MenuProps: {
                    className: classes.menu,
                  },
                }}
                helperText="Please select your TIQ Status"
                margin="normal"
                variant="outlined"
              >
                {status.map(option => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
            </TextField>
            </FormControl>
            <FormControl margin="normal"  fullWidth>
              <InputLabel htmlFor="supervisorType"></InputLabel>
              <TextField required
                id="standard-select-currency"
                select
                className={classes.textField}
                name="supervisorType"
                label="Supervisor Type"
                value={this.state.supervisorType}
                onChange={this.onChange}
                SelectProps={{
                  MenuProps: {
                    className: classes.menu,
                  },
                }}
                helperText="Please select your Supervisor Type"
                margin="normal"
                variant="outlined"
              >
                {supervisor.map(option => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
            </TextField>
            </FormControl>
            </div>}
            
            
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <br></br>
           <Link fullWidth variant="contained" class="button"  style = {{background: '#410c12'}} 
           onClick={
            this.props.addUser.bind(
                    this,
                    this.state.type,
                    this.state.firstName,
                    this.state.lastName,
                    this.state.birthDate,
                    this.state.bio,
                    this.state.email,
                    this.state.password,
                    this.state.house,
                    this.state.din,
                    this.state.dor,
                    this.state.tiqStatus,
                    this.state.supervisorType
                  )}
                   >
                 DEBATE NOW!
              </Link>

          </form>
          
        </Paper>
      </main>
    );
  }
}
SignUp.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SignUp);
