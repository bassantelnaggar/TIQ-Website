import React, { Component } from "react";
import "./assets/css/ie9.css";
import "./assets/css/main.css";
import pic1 from "./images/pic01.jpg";
import pic2 from "./images/pic02.jpg";
import pic5 from "./images/pic5.jpeg";
import pic8 from "./images/pic8.jpg";
import pic12 from "./images/pic12.jpg";
import pic13 from "./images/pic13.jpg";
import pic17 from "./images/pic17.jpg";
import pic18 from "./images/pic18.jpg";
import pic19 from "./images/pic19.jpg";
import pic20 from "./images/pic20.jpg";
import TIQ from "./images/TIQ.png";
import PegaOrion from './images/orion-pegasus.jpeg'
import Toolbar from "../../layout/Toolbar/Toolbar";
import ToolbarOUT from "../../layout/Toolbar/ToolbarSignout";
import { Link } from "react-router-dom";
import EventPic from "./images/event.jpg";
import axios from "axios";
import { connect } from "react-redux";
const mapStateToProps = state => {
  return { token: state.token, usertype: state.usertype, id: state.id };
};

export class Home extends Component {
  state = {
    allConents: []
  };

  componentDidMount() {
    axios
      .get("/api/Contents")
      .then(res => this.setState({ allConents: res.data.data }));
  }
  render() {
    if (this.props.token === null) {
      return (
        <>
        <div>
          <Toolbar />
        </div>
        <section id="banner" style={{position:'relative',top:'-57px'}}>
          {/* <i className="icon" /> */}
          <h1 style={{fontWeight:'bold',fontSize:"400%"}}>Welcome to <br></br> TIQ </h1>
          <p>READY FOR THE CHALLANGE ? </p>

          <ul className="actions">
            <li>
              <Link to="/getUsers" className="button big special">
                Our People
              </Link>
            </li>
          </ul>
        </section>

        {/* FIRST SECTION */}
        <section id="one" className="wrapper style1">
          <div className="inner">
            <article class="feature left">
              <span class="image">
                <img src={PegaOrion} alt="" />
              </span>
              <div class="content">
                <h2>WHO IS LEADING NOW ....!!</h2>

                <ul class="actions">
                  <li>
                    <Link to="/Score" class="button alt">
                      Check Scores
                    </Link>
                  </li>
                </ul>
              </div>
            </article>
            <article class="feature right">
              <span class="image">
                <img src={EventPic} alt="" />
              </span>
              <div class="content">
                <h2>OUR LATEST EVENTS</h2>

                <ul class="actions">
                  <li>
                    <Link to="/contents" class="button alt">
                      Check All Events
                    </Link>
                  </li>
                </ul>
              </div>
            </article>
          </div>
        </section>

        <section id="two" className="wrapper special">
          <div className="inner">
            <header className="major narrow">
              <h2>SOME OF OUR MOMENTS</h2>
              <p>{/* KLLLLAMMM BLAAA BLAAA BLAAA */}</p>
            </header>
            <div className="image-grid">
              <Link to="#" className="image">
                <img src={pic5} alt="" />
              </Link>
              <Link to="#" className="image">
                <img src={pic8} alt="" />
              </Link>
              <Link to="#" className="image">
                <img src={pic12} alt="" />
              </Link>
              <Link to="#" className="image">
                <img src={pic18} alt="" />
              </Link>
              <Link to="#" className="image">
                <img src={pic17} alt="" />
              </Link>
              <Link to="#" className="image">
                <img src={pic13} alt="" />
              </Link>
              <Link to="#" className="image">
                <img src={pic19} alt="" />
              </Link>
              <Link to="#" className="image">
                <img src={pic20} alt="" />
              </Link>
            </div>
            <ul className="actions">
              {/* <li>
                  <Link to="#" className="button big alt">
                    Tempus Aliquam
                  </Link>
                </li> */}
            </ul>
          </div>
        </section>

        <section id="three" className="wrapper style3 special">
          <div className="inner">
            <header className="major narrow	">
              <p
                style={{
                  textAlign: "center",
                  position: "relative",
                  left: "200px",
                  fontSize: "38px"
                }}
              >
                Get to Know more about our family ?
              </p>
            </header>
            <ul className="actions">
              <li>
                <Link to="/ContactUs" className="button big alt">
                 Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </section>

        <section id="four" className="wrapper style2 special">
          <div className="inner">
            <header className="major narrow">
              <h2
                style={{
                  textAlign: "center",
                  position: "relative",
                  left: "250px"
                }}
              >
                It's better to debate a question without settling it than to
                settle it without debating it.
              </h2>
              <p />
            </header>
            <form action="#" method="POST">
              {/* <p>
                We live in a world of diversity, diversity of culture, diversity
                of belief, diversity of thought. When we ask ourselves the
                important questions we reach many important conclusions but it
                is through constantly communicating with one another, constantly
                trying to understand and at the same time influence that we can
                together shape as satisfying a possible resolution. TIQ is a
                debate club, where we strive to produce dialogue in it's most
                exciting form, up on stage, going head to head with other
                people. There is nothing more remarkable than the free flowing
                of words carrying ideas, ideas that prevail with the passion,
                steadiness and charisma of those who deliver them. If riveting
                debate is something you long to learn and participate in then
                here is your home.
              </p> */}
            </form>
          </div>
        </section>

        <footer id="footer">
          <div className="inner">
            <ul className="icons">
              <li>
                
                <a className="icon fa-facebook" href="https://www.facebook.com/TheIntelligentQuestion/?epa=SEARCH_BOX?>" target="_blank"><i ></i></a>

                {/* </Link> */}
              </li>
              <li>
              <a className="icon fa-youtube" href="https://www.youtube.com/channel/UCs-EFuX9iVRUdGfHcezy4Lg" target="_blank"><i ></i></a>

              </li>
              <li>
              <a className="icon fa-instagram" href="https://www.instagram.com/the.intelligent.question/" target="_blank"><i ></i></a>

              </li>
            </ul>
            <ul className="copyright">
              <li>&copy; ERROR 404.</li>
            </ul>
          </div>
        </footer>

        <script src="assets/js/jquery.min.js" />
        <script src="assets/js/skel.min.js" />
        <script src="assets/js/util.js" />
        <script src="assets/js/ie/respond.min.js" />
        <script src="assets/js/main.js" />
      </>
      )
    }
      else{
    return (
      <>
        <div>
          <ToolbarOUT />
        </div>
        <section id="banner" style={{position:'relative',top:'-57px'}}>
          {/* <i className="icon" /> */}
          <h1 style={{fontWeight:'bold',fontSize:"400%"}}>Welcome to <br></br> TIQ </h1>
          <p>READY FOR THE CHALLANGE </p>

          <ul className="actions">
            <li>
              <Link to="/getUsers" className="button big special">
                Our People
              </Link>
            </li>
          </ul>
        </section>

        {/* FIRST SECTION */}
        <section id="one" className="wrapper style1">
          <div className="inner">
            <article class="feature left">
              <span class="image">
                <img src={PegaOrion} alt="" />
              </span>
              <div class="content">
                <h2>WHO IS LEADING NOW ....!!</h2>

                <ul class="actions">
                  <li>
                    <Link to="/Score" class="button alt">
                      Check Scores
                    </Link>
                  </li>
                </ul>
              </div>
            </article>
            <article class="feature right">
              <span class="image">
                <img src={EventPic} alt="" />
              </span>
              <div class="content">
                <h2>OUR LATEST EVENTS</h2>

                <ul class="actions">
                  <li>
                    <Link to="/contents" class="button alt">
                      Check All Events
                    </Link>
                  </li>
                </ul>
              </div>
            </article>
          </div>
        </section>

        <section id="two" className="wrapper special">
          <div className="inner">
            <header className="major narrow">
              <h2>SOME OF OUR MOMENTS</h2>
              <p>{/* KLLLLAMMM BLAAA BLAAA BLAAA */}</p>
            </header>
            <div className="image-grid">
              <Link to="#" className="image">
                <img src={pic5} alt="" />
              </Link>
              <Link to="#" className="image">
                <img src={pic8} alt="" />
              </Link>
              <Link to="#" className="image">
                <img src={pic12} alt="" />
              </Link>
              <Link to="#" className="image">
                <img src={pic18} alt="" />
              </Link>
              <Link to="#" className="image">
                <img src={pic17} alt="" />
              </Link>
              <Link to="#" className="image">
                <img src={pic13} alt="" />
              </Link>
              <Link to="#" className="image">
                <img src={pic19} alt="" />
              </Link>
              <Link to="#" className="image">
                <img src={pic20} alt="" />
              </Link>
            </div>
            <ul className="actions">
              {/* <li>
                  <Link to="#" className="button big alt">
                    Tempus Aliquam
                  </Link>
                </li> */}
            </ul>
          </div>
        </section>

        <section id="three" className="wrapper style3 special">
          <div className="inner">
            <header className="major narrow	">
              <p
                style={{
                  textAlign: "center",
                  position: "relative",
                  left: "200px",
                  fontSize: "38px"
                }}
              >
                Get to Know more about our family ?
              </p>
            </header>
            <ul className="actions">
              <li>
              <Link to="/ContactUs" className="button big alt">
                 Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </section>

        <section id="four" className="wrapper style2 special">
          <div className="inner">
            <header className="major narrow">
              <h2
                style={{
                  textAlign: "center",
                  position: "relative",
                  left: "250px"
                }}
              >
                It's better to debate a question without settling it than to
                settle it without debating it.
              </h2>
              <p />
            </header>
            <form action="#" method="POST">
              {/* <p>
                We live in a world of diversity, diversity of culture, diversity
                of belief, diversity of thought. When we ask ourselves the
                important questions we reach many important conclusions but it
                is through constantly communicating with one another, constantly
                trying to understand and at the same time influence that we can
                together shape as satisfying a possible resolution. TIQ is a
                debate club, where we strive to produce dialogue in it's most
                exciting form, up on stage, going head to head with other
                people. There is nothing more remarkable than the free flowing
                of words carrying ideas, ideas that prevail with the passion,
                steadiness and charisma of those who deliver them. If riveting
                debate is something you long to learn and participate in then
                here is your home.
              </p> */}
            </form>
          </div>
        </section>

        <footer id="footer">
          <div className="inner">
            <ul className="icons">
              <li>
                
                <a className="icon fa-facebook" href="https://www.facebook.com/TheIntelligentQuestion/?epa=SEARCH_BOX?>" target="_blank"><i ></i></a>

                {/* </Link> */}
              </li>
              <li>
              <a className="icon fa-youtube" href="https://www.youtube.com/channel/UCs-EFuX9iVRUdGfHcezy4Lg" target="_blank"><i ></i></a>

              </li>
              <li>
              <a className="icon fa-instagram" href="https://www.instagram.com/the.intelligent.question/" target="_blank"><i ></i></a>

              </li>
            </ul>
            <ul className="copyright">
              <li>&copy; ERROR 404.</li>
            </ul>
          </div>
        </footer>

        <script src="assets/js/jquery.min.js" />
        <script src="assets/js/skel.min.js" />
        <script src="assets/js/util.js" />
        <script src="assets/js/ie/respond.min.js" />
        <script src="assets/js/main.js" />
      </>
    )}
  }
}

const Form = connect(
  mapStateToProps,
  null
)(Home);
export default Form;