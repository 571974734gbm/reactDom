import React, { Component } from 'react';
import './confirmPage.css';
import axios from 'axios';

class ConfirmPage extends Component{
  /**
   * next点击
   */
  next = () => {
    console.log('ss')
    axios.post('/api/readRedis', {'cardNo': this.props.cardNum, 'newAmount': this.props.newAmount}).then(res => {
      if (res.data.code === '200') {
        if (res.data.data === this.props.newAmount) {
          axios.post('/api/submitButton', { 'customerId' : "00001", 'cardNo': this.props.cardNum, 'newAmount': this.props.newAmount}).then(res => { // 确认提交再chaeack一遍是是否遵循我们的规则
            if (res.data.code === '200') { // 遵循规则调用父级方法，方法详情在mainPage.js中有注释
              this.props.changeAmount(this.props.newAmount)
              this.props.pageChange(4)
            } else {
              alert(res.data.msg)
            }
          })
        } else {
          alert('确认金额与提交金额不一致')
        }
      }
    })
  }

  /**
   * back点击
   */
  back = () => {
    this.props.pageChange(2)
  }
  render(){
    return(
      <div>
        <div className="card_box_top">Change Credit Limit</div>
        <div>
          <div className="cardSelectionText">Change Credit Limit to</div>
          <div className="selectBox">
            <div>{this.props.cardNum}</div>
            <div>New Credit Limit</div>
            <div className="money">MYR {this.props.newAmount}</div>
          </div>
        </div>
        <div className="bottomButton">
          <button onClick={this.back}>back</button>
          <button onClick={this.next}>Submit</button>
        </div>
      </div>
    )
  }
}

export default ConfirmPage