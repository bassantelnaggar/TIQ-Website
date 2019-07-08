import React, { Component } from "react";
import "./App.css";
import Toolbar from "./layout/Toolbar/Toolbar";
import ToolbarOUT from "./layout/Toolbar/ToolbarSignout";
import "./contactUs.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
const mapStateToProps = state => {
  return { token: state.token, usertype: state.usertype, id: state.id };
};
export class ContactUs extends Component {
  render() {
    if (this.props.token === null) {
    return (
      <div>
        <Toolbar />

        <div class="Container-x">
          <form class="contactus-form">
            <h1 class="contactus-header">Contact Us</h1>
            <div class="border" />

            <div class="social-media">
              <li>
                <a href="https://www.facebook.com/TheIntelligentQuestion/">
                  <i class="fab fa-facebook-f" />
                </a>
              </li>
              <li>
                <a href=" https://tiqguc.blogspot.com.eg/p/welcome.html">
                  <i class="fas fa-blog" />
                </a>
              </li>
              <li>
                {" "}
                <a href="https://www.facebook.com/pg/TheIntelligentQuestion/about/?ref=page_internal">
                  <i class="fab fa-facebook-messenger" />
                </a>
              </li>
              <li>
                {" "}
                <a href="https://www.gmail.com">
                  <i class="fas fa-envelope" />
                </a>
              </li>
              <li>
                <a href="https://instagram.com/the.intelligent.question?igshid=8c0ego7b4mgg">
                  <i class="fab fa-instagram" />
                </a>
              </li>
              <li>
                <a href="https://www.youtube.com/channel/UCs-EFuX9iVRUdGfHcezy4Lg">
                  <i class="fab fa-youtube" />
                </a>
              </li>
            </div>

            {/* <div class="field">
              <label for="Facebook Page :">Facebook Page :</label>
              <Link
                class="link"
                to="https://www.facebook.com/TheIntelligentQuestion/"
              >
                <u>https://www.facebook.com/TheIntelligentQuestion/ </u>{" "}
              </Link>
            </div> */}

            <div class="field">
              <label for="Blog :">Blog :</label>
              <a
                class="link-1"
                href="https://tiqguc.blogspot.com.eg/p/welcome.html"
              >
                <u> https://tiqguc.blogspot.com.eg/p/welcome.html</u>
              </a>
            </div>

            <div class="field">
              <label for="Messenger :">Messenger :</label>
              <a class="link-1" style={{ color: "blue" }}>
                m.me/TheIntelligentQuestion
              </a>
            </div>

            <div class="field">
              <label for="Mail :">Mail :</label>
              <a class="link-1" style={{ color: "blue" }}>
                the.intelligent.question@gmail.com
              </a>
            </div>
          </form>
        </div>
        <footer id="footer" style={{position:"absolute",bottom:"0",width:"100%",marginBottom:"-500px"}}>
          <div >
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
      </div>
    );
  }
  else{
    return (
      <div>
        <ToolbarOUT />

        <div class="Container">
          <form class="contactus-form">
            <h1 class="contactus-header">Contact Us</h1>
            <div class="border" />

            <div class="social-media">
              <li>
                <a href="https://www.facebook.com/TheIntelligentQuestion/">
                  <i class="fab fa-facebook-f" />
                </a>
              </li>
              <li>
                <a href=" https://tiqguc.blogspot.com.eg/p/welcome.html">
                  <i class="fas fa-blog" />
                </a>
              </li>
              <li>
                {" "}
                <a href="https://www.facebook.com/pg/TheIntelligentQuestion/about/?ref=page_internal">
                  <i class="fab fa-facebook-messenger" />
                </a>
              </li>
              <li>
                {" "}
                <a href="https://www.gmail.com">
                  <i class="fas fa-envelope" />
                </a>
              </li>
              <li>
                <a href="https://instagram.com/the.intelligent.question?igshid=8c0ego7b4mgg">
                  <i class="fab fa-instagram" />
                </a>
              </li>
              <li>
                <a href="https://www.youtube.com/channel/UCs-EFuX9iVRUdGfHcezy4Lg">
                  <i class="fab fa-youtube" />
                </a>
              </li>
            </div>

            {/* <div class="field">
              <label for="Facebook Page :">Facebook Page :</label>
              <Link
                class="link"
                to="https://www.facebook.com/TheIntelligentQuestion/"
              >
                <u>https://www.facebook.com/TheIntelligentQuestion/ </u>{" "}
              </Link>
            </div> */}

            <div class="field">
              <label for="Blog :">Blog :</label>
              <a
                class="link-1"
                href="https://tiqguc.blogspot.com.eg/p/welcome.html"
              >
                <u> https://tiqguc.blogspot.com.eg/p/welcome.html</u>
              </a>
            </div>

            <div class="field">
              <label for="Messenger :">Messenger :</label>
              <a class="link-1" style={{ color: "blue" }}>
                m.me/TheIntelligentQuestion
              </a>
            </div>

            <div class="field">
              <label for="Mail :">Mail :</label>
              <a class="link-1" style={{ color: "blue" }}>
                the.intelligent.question@gmail.com
              </a>
            </div>
          </form>
        </div>
        <footer id="footer" style={{position:"absolute",bottom:"0",width:"100%",marginBottom:"-500px"}}>
          <div >
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
      </div>
    );
  }
}
  
}
const Form = connect(
  mapStateToProps,
  null
)(ContactUs);
export default Form;

