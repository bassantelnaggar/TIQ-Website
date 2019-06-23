import React, { Component } from 'react'
import { Link } from 'react-router-dom'
export class Navbar extends Component {
  render() {
    return (
      <header className="toolbar">
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
        <div className="container">
          <div className="collapse navbar-collapse" id="mobile-nav">
            <ul className="navbar-nav mr-auto">
            <li className="nav-item">
                <Link className="nav-link" to="/">HUB</Link>     
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/faq">FAQs</Link>     
              </li>
            </ul>
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/createuser">Sign Up</Link>     
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/signin">Login</Link>     
              </li>
            </ul>
          </div>
        </div>
      </nav>
      </header>
    ) 
  }
}

export default Navbar
