import React, { Component } from 'react';
import FaqUItem from './Faquitem'

class FAQUs extends Component {
  render() {
    return (
      <div style={{position:'absolute',top:"230px"}}> 
   { this.props.FAQs.map(faq => <FaqUItem key={faq._id} faq={faq} />)}
   <br></br>
    </div>
    )
  }
}

export default FAQUs;
