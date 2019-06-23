import React, { Component } from "react";
import "./App.css";
import Toolbar from "./layout/Toolbar/Toolbar";
import "./contactUs.css";
import { Link } from "react-router-dom";
export class ContactUs extends Component {
  render() {
    return (
      <div>
        <Toolbar />

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
      </div>
    );
  }
}
export default ContactUs;
