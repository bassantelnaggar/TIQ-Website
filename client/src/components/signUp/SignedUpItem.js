import React, { Component } from 'react';

export class SignedUpItem extends Component {

 


  render() {
    
   const { _id,email,type,firstName,lastName,birthDate,bio,din,dor,house,tiqStatus,supervisorType} = this.props.signedUp;
    return (
      <div >
        
      <p style={answerStyle}>
          First Name:  { firstName }
          
        </p>
        <button  className="btn" style={btnStyle} onClick={this.props.accept.bind(this,_id)} >Accept</button>
        <button  className="btn" style={btnStyle} onClick={this.props.decline.bind(this,_id)} >Decline</button>


        <p style={answerStyle}>
           Last Name: { lastName }
          
        </p> 
        <p style={answerStyle}>
           Email: { email }
          
        </p> 
        <p style={answerStyle}>
           Type: { type }
       </p>   
       
        <p style={answerStyle}>
           Birthdate: { birthDate }
          
        </p> 
        <p style={answerStyle}>
          Bio:  { bio }
          
        </p> 
        <p style={answerStyle}>
           Date In: { din }
          
        </p> 
        <p style={answerStyle}>
           Date Out: { dor }
          
        </p> 
        <p style={answerStyle}>
            House:{ house }
          
        </p> 
        <p style={answerStyle}>
           TIQ Status { tiqStatus }
          
        </p> 
        <p style={answerStyle}>
            Supervisor Type:{ supervisorType }
          
        </p> 
        
      </div>
    )
  }
}


const questionStyle={
  textTransform: 'uppercase',
  lineheight: '0.8',
  fontWeight:'bold',
  color:'#3e3939bf',
  lineHeight:'1',
  fontSize:'25px',

}
const answerStyle={
  textTransform: 'capitalize',
  color:'#6d7173',
  lineHeight:'1',
  fontSize:'20px',


}
const btnStyle = {
  background: '#5ec0b6',
  color: '#fff',
  border: 'none',
  padding: '5px 10px',
  textalign: 'center',
  textdecoration: 'none',
  display: 'inline-block',
  fontsize: '16px',
  borderradius: '12px'
}

export default SignedUpItem;