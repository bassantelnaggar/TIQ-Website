import React, { Component } from "react";
import FaqItem from "./FaqItem";

class FAQs extends Component {
  render() {
    return(
      <div>
    { this.props.FAQs.map(faq => (
        <FaqItem
          key={faq._id}
          faq={faq}
          change={this.props.change}
          delfaq={this.props.delfaq}
          updatefaq={this.props.updatefaq}
          
        />

        ))}
         <br></br> <br></br> 
      </div>
      );
  }
}

export default FAQs;
