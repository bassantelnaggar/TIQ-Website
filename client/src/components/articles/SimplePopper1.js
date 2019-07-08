import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import Popper from '@material-ui/core/Popper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Fade from '@material-ui/core/Fade';
import Paper from '@material-ui/core/Paper';
import { createMuiTheme } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import orange from'@material-ui/core/colors/orange';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import AddArticle from './AddArticle';
import UpdateArticlehelper from './UpdateArticlehelper';
const styles = theme => ({
  margin: {
    margin: theme.spacing.unit,
  },

}
);

class SimplePopper1 extends React.Component {
  state = {
    title:this.props.article.title,
    body:this.props.article.body,
    description:this.props.article.description,
    date:this.props.article.date,
    author:this.props.article.author,
    anchorEl: null,
    open: false,
  
  };

  handleClick = event => {
    const { currentTarget } = event;
    this.setState(state => ({
      anchorEl: currentTarget,
      open: !state.open,
    }));
  };
  onChange = (e) => this.setState({[e.target.name]: e.target.value});
  Close = () => this.setState({open:!this.state.open});

  render() {
    const { classes } = this.props;
    const { anchorEl, open } = this.state;
    const id = open ? 'simple-popper' : null;

    return (
      <div>
          <input 
                   type="Submit" 
                   value="Update ARTICLE"
                   className="btn"
                   onClick={this.handleClick}
                   style={{flex: '10'}}
                    />
      {/* <Button variant="contained"   onClick={this.handleClick}>
  
        Update ARTICLE
        
      </Button> */}
      
      <Popper id={id} open={open} anchorEl={anchorEl} style={{paddingLeft:'80px',width:"50%"}} transition>
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Paper style={{padding:'10px 80px 5px 80px',width:"100%",height:"50%"}}>
            <form>
            <div>
      <br></br>

        <input
          type="text"
          name="title"
          placeholder={this.props.article.title}
          onChange={this.onChange}
        />
      <br></br>
         <input
          type="text"
          name="description"
          placeholder={this.props.article.description}
          onChange={this.onChange}
        />
         <br></br>
        <textarea
          type="textarea"
          name="body"
          placeholder={this.props.article.body}
          style={{height: "200px"}}
          onChange={this.onChange}
        />
        <br></br>
        <input
          type="text"
          name="author"
          placeholder={this.props.article.author}
          onChange={this.onChange}
        />
         <br></br>
        <input
          type="text"
          name="date"
          placeholder={this.props.article.date}
          onChange={this.onChange}
        />
        <br></br>
        <input 
                   type="Submit" 
                   value="UPDATE"
                   className="btn"
                   onClick={this.props.updatearticle1.bind(this, this.props.article._id,this.state.title, this.state.description,this.state.body,this.state.author,this.state.date)}
                   style={{flex: '10'}}
                    />
    
        </div>
            </form>
         

            
            </Paper>
          </Fade>
        )}
      </Popper>
    </div>
    );
  }
}

// const btnStyle = {
//   background: '#5ec0b6',
//   color: '#fff',
//   border: 'none',
//   padding: '5px 10px',
//   textalign: 'center',
//   textdecoration: 'none',
//   display: 'inline-block',
//   fontsize: '16px',
//   borderradius: '12px'
// }
// const btnStyle2 = {
//   background: '#',
//   color: 'black',
//   border: 'none',
//   padding: '5px 10px',
//   textalign: 'center',
//   textdecoration: 'none',
//   display: 'inline-block',
//   fontsize: '16px',
//   borderradius: '12px'
// }
// const edit={
//   backgroundColor:'#5ec0b6' ,
//   marginBottom:'9px'
// }

export default (SimplePopper1);
