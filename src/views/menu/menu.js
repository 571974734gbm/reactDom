import React, { Component } from 'react';
import './menu.css';

class Menu extends Component{
  constructor(props){
    super(props);
    this.state = {
      menuList: [
        'Activate ATM card',
        'Request for debit card PIN',
        'Reset Debit Card/ATM PIN',
        'Request for ATM PIN',
        'Report lost ATM card',
        'Overseas card use',
        'Dispute Declaration',
        'Manage contactless ATM card',
        'ATM Withdrawal & Spending Limit'
      ],
      showIndex: null
    }
  }
  clickTab = (num) => {
    this.setState({
      showIndex: num
    })
    if (num === 3) {
      this.props.changeMenuTab(true)
    } else {
      this.props.changeMenuTab(false)
    }
  }
  render(){
    const { menuList, showIndex } = this.state
    return(
      <div className="menu_Box">
        <div className="menu_top">Cards</div>
        <div className="pageMenu">
          <ul>
            {menuList.map((item,index) => {
              return <li onClick={() => {this.clickTab(index)}} className={showIndex === index ? 'menuSelectColor' : ''} key={index}>{item}</li>
            })}
          </ul>
        </div>
      </div>
    )
  }
}

export default Menu