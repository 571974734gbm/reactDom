import React, { Component } from 'react';
import './applicationSuccess.css';
import successLogo from '../../../../image/successLogo.png'

class ApplicationSuccess extends Component{
  constructor(props) {
    super(props);
    this.state = {
      dateStr: '19 Mar 2013 3.40PM' // 当前日期显示变量
    };
  }

  /**
   * 生命周期初始化后调用
   */
  componentDidMount() {
    // 获取当前日期并赋值
    var date = new Date()
    let monthArr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    let year = date.getFullYear() + ''
    let month = monthArr[date.getMonth() - 1]
    let day = date.getDate() + ''
    let time = date.getHours() > 12 ? date.getHours() - 12 + '.' + date.getMinutes() + 'PM' : date.getHours() + '.' + date.getMinutes() + 'AM'
    this.setState({
      dateStr: day + ' ' + month + ' ' + year + ' ' + time
    })
  }

  /**
   * next点击
   */
  next = () => {
    this.props.pageChange(1) // 调用父级方法，方法详情在mainPage.js中有注释
  }
  render(){
    return(
      <div>
        <div className="card_box_top">Change Credit Limit</div>
        <div className="successBox">
          <div className="successBoxLeft">
            <img src={successLogo} alt="prop"></img>
          </div>
          <div className="successBoxRight">
            <div>Your request has been submitted successfully</div>
            <div><span>Reterence no:</span>{this.props.cardNum}</div>
            <div><span>Date:</span>{this.state.dateStr}</div>
          </div>
        </div>
        <div>
          <div className="cardSelectionText">Change Credit Limit to</div>
          <div className="selectBox">
            <div>New Credit Limit</div>
            <div className="money">MYR {this.props.newAmount}</div>
          </div>
        </div>
        <div className="bottomButton">
          <div></div>
          <button onClick={this.next}>Submit</button>
        </div>
      </div>
    )
  }
}

export default ApplicationSuccess