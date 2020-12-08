import React, { Component } from 'react';
import './header.css';
import logo from '../../image/bankLogo.png'

class Header extends Component{
    render(){
      return(
        <div>
          <div className="logoBox">
            <img src={logo} className="logo" alt="prpo" />
          </div>
          <div className="headerMenu">
            <ul>
              <li>Your accounts</li>
              <li>Payment & transfer</li>
              <li>Investment & trading</li>
              <li>Customer service</li>
              <li>Open an account</li>
              <li>Rewards</li>
            </ul>
          </div>
        </div>
      )
    }
}

export default Header
                   