import React, { Component } from 'react';
import { Col,Row,Image,Container} from 'react-bootstrap'
import { yellow, green, blue } from '@material-ui/core/colors';
import "./About.css"
import Toolbar from "../../layout/Toolbar/Toolbar"
import ToolbarOUT from "../../layout/Toolbar/ToolbarSignout";
//import { yellowA100 } from 'material-ui/styles/colors';
class About extends Component { 
      state = {
         BOAs : [],
         PHLs : [],
         OHLs : [],
         MSs : [],
         FSs :[],
         LSs:[],
         MDSs :[],
         RSs :[],
         DHLs : []
      }
  
    

    componentDidMount()
    {
       //BOAS
       fetch('/api/Users/tiq/BOA/')
      .then(res=>res.json())
      .then(BOAs=> this.setState({BOAs:BOAs.data},()=>console.log("fetched",BOAs)));
      //PHL 
      fetch('/api/Users/tiq/PHL/')
      .then(res=>res.json())
      .then(PHLs=> this.setState({PHLs : PHLs.data},()=>console.log("fetched",PHLs.data)));
      //OHL
      fetch('/api/Users/tiq/OHL/')
      .then(res=>res.json())
      .then(OHLs=> this.setState({OHLs : OHLs.data},()=>console.log("fetched",OHLs.data)));
      //DHL
      fetch('/api/Users/tiq/DHL/')
      .then(res=>res.json())
      .then(DHLs=> this.setState({DHLs : DHLs.data},()=>console.log("fetched",DHLs.data)));
      //MS
      fetch('/api/Users/tiq/MS/')
      .then(res=>res.json())
      .then(MS=> this.setState({MSs : MS.data},()=>console.log("fetched",MS.data)));
      ///.catch(console.log("cannot fetch"))
      //.then(MS=> this.setState({MS : MS.data},()=>console.log("fetched",MS.data)));
      //LS
      fetch('/api/Users/tiq/LS/')
      .then(res=>res.json())
      .then(LS=> this.setState({LSs : LS.data},()=>console.log("fetched",LS.data)));
      //FS
      fetch('/api/Users/tiq/FS/')
      .then(res=>res.json())
      .then(FS=> this.setState({FSs : FS.data},()=>console.log("fetched",FS.data)));
      //MDS
      fetch('/api/Users/tiq/MDS/')
      .then(res=>res.json())
      .then(MDS=> this.setState({MDSs : MDS.data},()=>console.log("fetched",MDS.data)));
      //RS
      fetch('/api/Users/tiq/RS/')
      .then(res=>res.json())
      .then(RS=> this.setState({RSs:RS.data},()=>console.log("fetched",RS.data)));
    }

    render(){
        const BOAList= this.state.BOAs.map((BOA)=>{
                return(
                    <div class = "col s1"  >
                    <img class="materialboxed" width="60" src={BOA.profilePicture} className=".image1555" />
                    <div className="center555">
                    <h6 className="BOAname">{BOA.firstName} {BOA.lastName}</h6>
                    </div>
                    </div>
                    )
                })
        
          const PHLList = this.state.PHLs.map((PHL)=>
        {
            return( 
                <div class="row" >
                     <div class="col s1 ">
                     <img class = "materialboxed"  src={PHL.profilePicture} width="60"/>
                     <div className="center555">
                    <h6 className="Pname" >{PHL.firstName} {PHL.lastName}</h6> 
                    </div>
                    </div>
                </div>
            )
        })
        
        const MSmember = this.state.MSs.map((MS)=>
         {
            return(
                <div class = "col s1" >
                   <img class="materialboxed" width="60" src={MS.profilePicture} />
                   <div className="center555">
                    <h6 className="Fname">{MS.firstName} {MS.lastName}</h6>
                    <h6 className="type">MARKETING</h6> 
                    </div>
                </div>
            )
         })
         
          const FSmember = this.state.FSs.map((FS)=>
        {
             return(
                <div class="col s1">
                <img class="materialboxed" width="60" src={FS.profilePicture} />
            
                 <h6 className="Fname">{FS.firstName} {FS.lastName}</h6>
                 <h6 className="type">FUNDRAISING</h6> 
                
                </div>
             )
        })

        const LSmember = this.state.LSs.map((LS)=>
        {
             return(
                <div class="col s1" >
                <img class="materialboxed" src={LS.profilePicture} width="60" />
                <div className="center555">
                    <h6 className="Fname" >{LS.firstName} {LS.lastName}</h6> 
                    <h6 className="type">CO-ORDINATION
                     &LOGISTICS</h6>
                </div>
                
                </div>
             )
        })


        const RSmember = this.state.RSs.map((RS)=>
        {
             return(
                <div class="col s1">
                <img class="materialboxed" width="60" src={RS.profilePicture}/>
                <div className="center555">
                 <h6 className="Fname">{RS.firstName} {RS.lastName}</h6>
                 <h6 className="type">INVESTORS' 
                     RELATION</h6> 
                </div>
             </div>
             )
        })


     const LSRS = 
            
                <div class="row">
                        <div class ="col s1">
                            {LSmember}
                        </div> 
                        <div class="col s1 " >
                            {RSmember}
                            
                        </div>
                    </div>


        const MDSmember = this.state.MDSs.map((MDS)=>
        {
             return(
                <div class="col s2">
                
                <img class="materialboxed" width="60" src={MDS.profilePicture} />
                 <h6 className="Fname">{MDS.firstName} {MDS.lastName}</h6>
                 <h6>MEDIA DESGIN</h6>
                 
               </div>
             )
        })
        
        const MSFS = <div class="row">
                        <div class="col s1">
                            {MSmember}
                        </div> 
                        <div class="col s1"><span class="flow-text">
                        {FSmember}</span>
                        </div>
                    </div>  
    
    const OHLList = this.state.OHLs.map((OHL)=>
    {
        return(
            <div class="row" >
                <div class="col s1">
               <img class="materialboxed" src={OHL.profilePicture} width="60"/>
               <div className="center555">
                <h6 className="Oname">{OHL.firstName} {OHL.lastName}</h6> 
                </div>
                </div>
            </div>
        )
    })

      const DHLList = this.state.DHLs.map((DHL)=>
        {
            return(
                <div col s2 offset-s1>
                   <img class="materialboxed" src={DHL.profilePicture} width="60"/>
                   <div className="center555">
                    <h5 className="Dname">{DHL.firstName} {DHL.lastName}</h5>
                   <b></b>
                   </div>
                </div>
            )
        })
        if (this.props.token === null) {
    return(
     <div>  
         <Toolbar/> 
         <div className="whole">
         <div class="container">
         <h2 className="about">First Worlds style debate club in Egypt and North Africa. Established and located in the German University in Cairo.
                </h2> 
         </div>
         <div className="container">
         <h3 className="vision">Achieving progress through effective communication and perpetually seeking knowledge"
    
                                 We live in a world of diversity, diversity of culture, diversity of belief, diversity of thought. When we ask ourselves the important questions we reach many important conclusions but it is through constantly communicating with one another, constantly trying to understand and at the same time influence that we can together shape as satisfying a possible resolution.

                                TIQ is a debate club, where we strive to produce dialogue in it's most exciting form, up on stage, going head to head with other people. There is nothing more remarkable than the free flowing of words carrying ideas, ideas that prevail with the passion, steadiness and charisma of those who deliver them. If riveting debate is something you long to learn and participate in then here is your home. </h3>
         </div>      
      <div className="tree">
      {/* <div class="container1"> */}
      <div className="BOAtitle">
          <h3 className="Btitle">BOARD OF ADJUDICATORS</h3>
      </div>
      <div className="first">
      <div class="container">
          <div class = "row " >
          {BOAList}
          </div>    
      </div> 
      </div>
     <div className="PHFSOH">
     <div class="row">
     <div className="PH">
     <h4 className="Ptitle">PEGASUS HOUSE
          LEADERS</h4></div>
     <div className="FS">
     <h4 className="Ftitle">FUNCTION SUPERVISORS</h4></div>
     <div className="OH">
     <h4 className="Otitle">ORION HOUSE 
         LEADERS</h4></div>
     
     </div>
    </div>
    <div className="middle">
     {/* <div class="col s12"> */}
     <div class = "row">
      <div  class="col s1">
        {PHLList}
      </div>
      
      {/* <div class = "col s8" > */}
      <div class="container" >
                                {/* <div class="container"> */}
                                    {LSRS}     
                                {/* </div> */}
                                {/* <div class="container"> */}
                                    {MSFS}
                                {/* </div> */}
                                {/* <div class = "container"> */}
                                    <div class="row">
                                    <div class="col" >{MDSmember}</div>
                                    </div>  
                                {/* </div> */}
      {/* </div> */}
      </div>
    
      <div class="col s1">
                            {/* <Container id="OHLs555"> */}
                            <div className="OHL">
                                <div class="col s1">
                                {OHLList}
                                </div>
                            </div>
                            {/* </Container> */}
        </div>
      </div>
      </div>
       <div className="Disciples">
       <h4 className="Dtitle">DISCIPLES HOUSE LEADERS</h4>
       </div>
      <div className="last">
      
          <div class = "row " >
          {DHLList}
          </div>    
      

      </div>


      </div>
    {/* </div>    */}
    </div>
    </div>
    )}
    else{
    return(
        <div>  
            <ToolbarOUT/> 
            <div className="whole">
            <div class="container">
            <h2 className="about">First Worlds style debate club in Egypt and North Africa. Established and located in the German University in Cairo.
                   </h2> 
            </div>
            <div className="container">
            <h3 className="vision">Achieving progress through effective communication and perpetually seeking knowledge"
       
                                    We live in a world of diversity, diversity of culture, diversity of belief, diversity of thought. When we ask ourselves the important questions we reach many important conclusions but it is through constantly communicating with one another, constantly trying to understand and at the same time influence that we can together shape as satisfying a possible resolution.
   
                                   TIQ is a debate club, where we strive to produce dialogue in it's most exciting form, up on stage, going head to head with other people. There is nothing more remarkable than the free flowing of words carrying ideas, ideas that prevail with the passion, steadiness and charisma of those who deliver them. If riveting debate is something you long to learn and participate in then here is your home. </h3>
            </div>      
         <div className="tree">
         {/* <div class="container1"> */}
         <div className="BOAtitle">
             <h3 className="Btitle">BOARD OF ADJUDICATORS</h3>
         </div>
         <div className="first">
         <div class="container">
             <div class = "row " >
             {BOAList}
             </div>    
         </div> 
         </div>
        <div className="PHFSOH">
        <div class="row">
        <div className="PH">
        <h4 className="Ptitle">PEGASUS HOUSE
             LEADERS</h4></div>
        <div className="FS">
        <h4 className="Ftitle">FUNCTION SUPERVISORS</h4></div>
        <div className="OH">
        <h4 className="Otitle">ORION HOUSE 
            LEADERS</h4></div>
        
        </div>
       </div>
       <div className="middle">
        {/* <div class="col s12"> */}
        <div class = "row">
         <div  class="col s1">
           {PHLList}
         </div>
         
         {/* <div class = "col s8" > */}
         <div class="container" >
                                   {/* <div class="container"> */}
                                       {LSRS}     
                                   {/* </div> */}
                                   {/* <div class="container"> */}
                                       {MSFS}
                                   {/* </div> */}
                                   {/* <div class = "container"> */}
                                       <div class="row">
                                       <div class="col" >{MDSmember}</div>
                                       </div>  
                                   {/* </div> */}
         {/* </div> */}
         </div>
       
         <div class="col s1">
                               {/* <Container id="OHLs555"> */}
                               <div className="OHL">
                                   <div class="col s1">
                                   {OHLList}
                                   </div>
                               </div>
                               {/* </Container> */}
           </div>
         </div>
         </div>
          <div className="Disciples">
          <h4 className="Dtitle">DISCIPLES HOUSE LEADERS</h4>
          </div>
         <div className="last">
         
             <div class = "row " >
             {DHLList}
             </div>    
         
   
         </div>
   
   
         </div>
       {/* </div>    */}
       </div>
       </div>
       )
    }

  }
}
    export default About  