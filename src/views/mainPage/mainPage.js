import React, { Component } from 'react';
import './mainPage.css';
import SelectCard from './components/selectCard/selectCard';
import AdjustQuota from './components/adjustQuota/adjustQuota';
import ConfirmPage from './components/confirmPage/confirmPage';
import ApplicationSuccess from './components/applicationSuccess/applicationSuccess';

class MainPage extends Component{
  constructor(props){
    super(props);
    this.state = {
      showIndex: 1, // 展示哪一个页面1(SelectCard)：选择信用卡。 2(AdjustQuota)：调整调整信用卡金额。 3(ConfirmPage)：确认画面。 4(ApplicationSuccess)：提交成功画面
      cardNum: '', // 用于存储用户第一个页面选择的信用卡号
      newAmount: '' //用户存储用户填写的更改后的信用卡金额
    }
  }
  /**
   * 暴露给子组件的方法改变用户选择的信用卡号
   */
  getSelectCardNum = (cardNum) => {
    this.setState({
      cardNum: cardNum
    })
  }
  
  /**
   * 暴露给子组件的方法改变用户填写的更改后的信用卡金额
   */
  changeAmount = (newAmount) => {
    this.setState({
      newAmount: newAmount
    })
  }

  /**
   * 页面点击back/next掉用的方法
   */
  pageChange = (num) => {
    this.setState({
      showIndex: num
    })
  }
  render(){
    return(
      <div>
        { this.state.showIndex === 1 ? <SelectCard pageChange={this.pageChange} getSelectCardNum={this.getSelectCardNum} /> : null }
        { this.state.showIndex === 2 ? <AdjustQuota cardNum={this.state.cardNum} pageChange={this.pageChange} changeAmount={this.changeAmount} /> : null }
        { this.state.showIndex === 3 ? <ConfirmPage newAmount={this.state.newAmount} cardNum={this.state.cardNum} pageChange={this.pageChange} changeAmount={this.changeAmount} /> : null }
        { this.state.showIndex === 4 ? <ApplicationSuccess newAmount={this.state.newAmount} cardNum={this.state.cardNum} pageChange={this.pageChange} /> : null }
      </div>
    )
  }
}

export default MainPage